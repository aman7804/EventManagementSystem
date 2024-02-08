import { Box } from "@mui/system";
import {
  Button,
  Card,
  Grid,
  IconButton,
  MenuItem,
  Pagination,
  PaginationItem,
  Select,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import {
  arrowBackwardIcon,
  arrowForwardIcon,
  deleteIcon,
  editIcon,
  plusLightIcon,
} from "assets/images";
import React, { useCallback, useEffect, useState } from "react";
// import AOS from "aos";
import "aos/dist/aos.css";
import {
  IVenue,
  IVenueContainerDispatch,
  IVenueContainerState,
  IVenuePagination,
} from "interfaces/venue.interface";
import { showLoader } from "utils/helper";
import { toast } from "react-toastify";
import { PAGE_SIZES, SOMETHING_WENT_WRONG } from "utils/constants";
import { Order } from "utils/enums";
import DeleteConfirmationModal from "components/modals/delete.confirm";
import AddEditVenue from "components/venue/venue.create";
import projectTheme from "App.theme";
import * as GENERIC from "interfaces/generic.interface";
import { GetDropDownListPayload } from "interfaces/city.interface";
import { get } from "lodash";

const ArrowBackIcon = () =>
  <img src={arrowBackwardIcon} alt="arrow-backward" />;
const ArrowForwardIcon = () =>
  <img src={arrowForwardIcon} alt="arrow-forward" />;

// capitalization
const capitalization = (str: string): string => 
  str.charAt(0).toUpperCase() + str.slice(1);

// child-component
interface EnhancedTableProps {
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    newOrderBy: keyof IVenue
  ) => void;
  order: Order;
  orderBy: string;
  columnHeader: string;
  columnName: keyof IVenue;
}
const EnhancedTableHead = (props: EnhancedTableProps) => {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler =
    (newOrderBy: keyof IVenue) => (event: React.MouseEvent<unknown>) =>
      onRequestSort(event, newOrderBy);

  const columnDisplayName:{[key in keyof IVenue]: string} = {
    name: "Name",
    address: "Address",
    minCapacity: "Minimum-capacity",
    maxCapacity: "Maximum-capacity",
    id: "",
    description: "",
    price: "",
    isActive: "",
    cityId: ""
  }
  
  return (
    <TableCell
      key={props.columnHeader}
      align="left"
      onClick={createSortHandler(props.columnName)}
      sortDirection={orderBy === props.columnName ? order : false}
    >
      {columnDisplayName[props.columnName]}
      <Box component="span" className="sorting-icon" />
    </TableCell>    
  );
};


export type VenueProps = IVenueContainerState &
  IVenueContainerDispatch;

const VenueForm: React.FC<VenueProps> = (props) => {
  const [venueListMeta, setVenueListMeta] = useState<IVenuePagination | null>();
  const [page, setPage] = useState<string>("5");
  const [pageNo, setPageNo] = useState<number>(1);
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof IVenue>("name");
  const [showScreen, setShowScreen] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>("");
  const [isEditVenue, setIsEditVenue] = useState<boolean>(false);
  const [isOpenVenueDeleteModal, setIsOpenVenueDeleteModal] = useState(false);
  const [deleteVenueId, setDeleteVenueId] = useState<number>();
  const [cityDropDownList, setCityDropDownList] = useState<GENERIC.IKeyValuePair[]|null>();
  
  const handleRequestSort = useCallback(
    (event: React.MouseEvent<unknown>, newOrderBy: keyof IVenue) => {
      const isAsc = orderBy === newOrderBy && order === "asc";
      const toggledOrder = isAsc ? "desc" : "asc";
      setOrder(toggledOrder);
      setOrderBy(newOrderBy);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [order, orderBy]
  );

  // handle-child-component
  const handleAddEditVenue = (venueId: number|null) => {
    
    if (venueId) { //Edit Mode
      setIsEditVenue(true);
      getVenue(venueId);
      getCityDropDownList()
      // setEditVenueId(venueId); 
    }
    else { //Add Mode
      setIsEditVenue(false);
      setShowScreen(true);
    }
  };
  const handleVenueClose = () => {
    setShowScreen(false);
    // setEditVenueId(0)
  }
  const handleVenueDeleteModal = (venueId: number) => {
    setDeleteVenueId(venueId);
    setIsOpenVenueDeleteModal(true);
  };
  const handleVenueDeleteCloseModal = () => {
    setDeleteVenueId(0);
    setIsOpenVenueDeleteModal(false);
  };

  useEffect(() => {
    getVenueList(); 
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageNo, order, orderBy]);

  // callbacks
  const onVenueListSuccess = (response: GENERIC.IApiSuccessResponse<IVenuePagination>) => {
    // setVenueList(response.data?.data);
    setVenueListMeta(response.data);
  };
  const onDeleteVenueSuccess = (response: GENERIC.IApiSuccessResponse<IVenue>) => {
    if (response.isSuccessStatusCode) {
      toast.success("Venue deleted successfully.");
      handleVenueDeleteCloseModal();
      getVenueList();
    } else {
      toast.error(SOMETHING_WENT_WRONG);
    }
  };
  const onAddVenueSuccess = (response: GENERIC.IApiSuccessResponse<IVenue>) => {
    if (response.isSuccessStatusCode) {
      toast.success("Venue added successfully.");
      handleVenueClose();
      getVenueList();
    } else if (response.message) {
      toast.warning(response.message);
    } else {
      toast.error(SOMETHING_WENT_WRONG);
    }
  };
  const onEditVenueSuccess = (response: GENERIC.IApiSuccessResponse<IVenue>) => {
    setShowScreen(true);
  };
  const onCityListSuccess = (response: GENERIC.GetSuccessResponse<GENERIC.IKeyValuePair[]> | null) => {
    setCityDropDownList(response?.data) 
  }

  // action-dispatches
  const getVenueList = async () => {
    const { listRequest } = props;
    
    if (listRequest) {
      showLoader();
      const payload: GENERIC.ListRequestPayload<IVenuePagination> = {
        data: {
          sortByColumns: capitalization(orderBy),
          sortBy: order==="asc"  ? 0 : 1,
          pageNo: Number(pageNo),
          pageSize: Number(page),
          filter: {
            search: searchText
          },
        },
        callback: onVenueListSuccess,
      };
      listRequest(payload);
    }
  };
  const handleDeleteVenue = () => {
    const { deleteRequest } = props;

    if (deleteRequest) {
      showLoader();
      const payload = {
        data: {
          id: Number(deleteVenueId),
        },
        callback: onDeleteVenueSuccess,
      };

      deleteRequest(payload);
    }
  };
  const handleSaveVenue = (formData: IVenue) => {
    const { saveRequest } = props;
    if (saveRequest) {
      showLoader();
      const payload: GENERIC.SaveRequestPayload<IVenue> = {
        data: {
          id: formData.id,
          name: formData.name,
          address: formData.address,
          description: formData.description,
          isActive: formData.isActive,
          minCapacity: formData.minCapacity,
          maxCapacity: formData.maxCapacity,
          price: formData.price,
          cityId: formData.cityId,
        },
        callback: onAddVenueSuccess,
      };
      console.log("edited payload",payload)
      saveRequest(payload);
    }
  };
  const getVenue = (id: number) => {
    const { getRequest } = props;

    if (getRequest) {
      showLoader();
      const payload = {
        data: {id},
        callback: onEditVenueSuccess,
      };
      getRequest(payload);
    }
  };
  const getCityDropDownList = async () => {
      const { cityDropDownListRequest } = props;
  
      if (cityDropDownListRequest) {
        const payload: GetDropDownListPayload = {
          data: { },
          callback: onCityListSuccess,
        };
        console.log("sending request payload: ",payload)
        cityDropDownListRequest(payload);
      }
  }

  // search
  const handleVenueSearch = (event: any) => {
    setSearchText(event.target.value);
  };
  const handleVenueSearchKeyDown = (e: any) => {
    if (e?.key === "Enter") {
      setPageNo(1);
      getVenueList();
    }
  };
  // pagination
  const handleChange = (event: SelectChangeEvent) => {
    setPage(event.target.value);
    setPageNo(1);
  };
  const onPageChange = (e: any, value: number) => {
    setPageNo(value);
  };
  const getPaginationDetailText = () => {
    let rangeText = "";

    if (venueListMeta) {
      const minRange = (Number(pageNo) - 1) * Number(page) + 1;

      let maxRange = Number(pageNo) * Number(page);
      if (maxRange > Number(venueListMeta?.recordCount)) {
        maxRange = Number(venueListMeta?.recordCount);
      }
      const rangeString = `${minRange} - ${maxRange}`;
      rangeText = `Showing ${rangeString} of ${venueListMeta?.recordCount} entries`;
    }

    return rangeText;
  };


  const getListingScreen = () => {
    const list = get(props, "list.data", []);
    return <>
              <Grid
                container
                spacing={{ xs: "16px", lg: "20px", xl: "24px" }}
                className="content-container"
              >
                <Grid item xs={12}>
                  <Card>
                    <Box className="table-card-header">
                      <TextField
                        id="search"
                        variant="outlined"
                        className="search-input"
                        placeholder="Search"
                        value={searchText}
                        onChange={handleVenueSearch}
                        onKeyDown={handleVenueSearchKeyDown}
                      />
                    </Box>
                    <TableContainer>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <EnhancedTableHead
                              order={order}
                              orderBy={orderBy}
                              onRequestSort={handleRequestSort}
                              columnName="name"
                              columnHeader="Venue"
                            />
                            <EnhancedTableHead
                              order={order}
                              orderBy={orderBy}
                              onRequestSort={handleRequestSort}
                              columnName="address"
                              columnHeader="Location"
                            />
                            <EnhancedTableHead
                              order={order}
                              orderBy={orderBy}
                              onRequestSort={handleRequestSort}
                              columnName="minCapacity"
                              columnHeader="From Capacity"
                            />
                            <EnhancedTableHead
                              order={order}
                              orderBy={orderBy}
                              onRequestSort={handleRequestSort}
                              columnName="maxCapacity"
                              columnHeader="To Capacity"
                            />
                            <TableCell
                              align="center"
                              sx={{
                                width: "152px",
                                [projectTheme.breakpoints.down("sm")]: {
                                  width: "112px",
                                },
                              }}
                            >
                              Action
                            </TableCell>                      
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {list && list?.map((row: IVenue) => (
                            // eslint-disable-next-line react/no-array-index-key
                            <TableRow key={row?.id}>
                              <TableCell component="th" scope="row">
                                {row?.name}
                              </TableCell>
                              <TableCell component="th" scope="row">
                                {row?.address}
                              </TableCell>
                              <TableCell component="th" scope="row">
                                {row?.minCapacity}
                              </TableCell>
                              <TableCell component="th" scope="row">
                                {row?.maxCapacity}
                              </TableCell>
                              <TableCell align="center">
                                <div className="table-actions">
                                  <IconButton
                                    onClick={() => handleAddEditVenue(row?.id)}
                                  >
                                    <img src={editIcon} alt="edit" />
                                  </IconButton>
                                  <IconButton
                                    onClick={() => handleVenueDeleteModal(row?.id)}
                                  >
                                    <img src={deleteIcon} alt="delete" />
                                  </IconButton>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                    {list && list.length > 0 ? (
                      <Box className="custom-pagination">
                        <Box className="custom-rowperpage">
                          <Typography variant="body2" component="span">
                            Page:
                          </Typography>
                          <Select
                            id="pagination-select"
                            value={page}
                            onChange={handleChange}
                            MenuProps={{
                              className: "pagination-menu",
                            }}
                          >
                            {PAGE_SIZES?.map((pageSize) => (
                              <MenuItem
                                key={pageSize.value}
                                value={pageSize.value}
                                selected={pageSize?.selected} //why selected? and why only for 5 pageSize
                              >
                                {pageSize.label}
                              </MenuItem>
                            ))}
                          </Select>
                          <Typography variant="body2" component="span">
                            {getPaginationDetailText()}
                          </Typography>{" "}
                        </Box>
                        <Pagination
                          count={venueListMeta?.pageCount}
                          variant="outlined"
                          shape="rounded"
                          page={pageNo}
                          onChange={onPageChange}
                          renderItem={(item) => (
                            <PaginationItem
                              slots={{
                                previous: ArrowBackIcon,
                                next: ArrowForwardIcon,
                              }}
                              {...item}
                            />
                          )}
                        />
                      </Box>
                    ) : (
                      <Typography className="no-record-text">
                        No record found.
                      </Typography>
                    )}
                  </Card>
                </Grid>
              </Grid>
            </>
  }

  return (
    <>
      <div>
        <Box className="content-header">
          <Typography variant="h2" className="heading">
            Venues
          </Typography>
          {!showScreen && 
            <Button
              variant="contained"
              onClick={() => handleAddEditVenue(null)}
              className="btn-add"
            >
              <img src={plusLightIcon} alt="plus" />
              Add
            </Button>
          }
        </Box>
        
        {!showScreen ? 
          getListingScreen()
          :
          (<AddEditVenue
              isEditVenue={isEditVenue}
              showScreen={showScreen}
              handleVenueClose={handleVenueClose}
              handleAddVenue={handleSaveVenue}
              cityDropDownList={cityDropDownList}
              currentVenueData={isEditVenue ? {...props.current} : undefined}
            />)
        }            
      </div>
      <DeleteConfirmationModal
        isOpenDeleteConfirmationModal={isOpenVenueDeleteModal}
        handleDeleteConfirmationModalClose={handleVenueDeleteCloseModal}
        deleteConfirmationMessage="Are you sure you want to delete venue?"
        handleYesClick={handleDeleteVenue}
      />
    </>
  );
};

export default VenueForm;
