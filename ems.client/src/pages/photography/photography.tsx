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
  IPhotography,
  IPhotographyContainerDispatch,
  IPhotographyContainerState,
  IPhotographyPagination,
} from "interfaces/photography.interface";
import { showLoader } from "utils/helper";
import { toast } from "react-toastify";
import { PAGE_SIZES, SOMETHING_WENT_WRONG } from "utils/constants";
import { Order } from "utils/enums";
import DeleteConfirmationModal from "components/modals/delete.confirm";
import AddEditPhotography from "components/photography/photography.create";
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
    newOrderBy: keyof IPhotography
  ) => void;
  order: Order;
  orderBy: string;
  columnHeader: string;
  columnName: keyof IPhotography;
}
const EnhancedTableHead = (props: EnhancedTableProps) => {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler =
    (newOrderBy: keyof IPhotography) => (event: React.MouseEvent<unknown>) =>
      onRequestSort(event, newOrderBy);

  const columnDisplayName:{[key in keyof IPhotography]: string} = {
    name: "Name",
    description: "Description",
    price: "Price",
    isActive: "",
    id: "",
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


export type PhotographyProps = IPhotographyContainerState &
  IPhotographyContainerDispatch;

const PhotographyForm: React.FC<PhotographyProps> = (props) => {
  const [photographyListMeta, setPhotographyListMeta] = useState<IPhotographyPagination | null>();
  const [page, setPage] = useState<string>("5");
  const [pageNo, setPageNo] = useState<number>(1);
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof IPhotography>("name");
  const [showScreen, setShowScreen] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>("");
  const [isEditPhotography, setIsEditPhotography] = useState<boolean>(false);
  const [isOpenPhotographyDeleteModal, setIsOpenPhotographyDeleteModal] = useState(false);
  const [deletePhotographyId, setDeletePhotographyId] = useState<number>();
  const [cityDropDownList, setCityDropDownList] = useState<GENERIC.IKeyValuePair[]|null>();
  
  const handleRequestSort = useCallback(
    (event: React.MouseEvent<unknown>, newOrderBy: keyof IPhotography) => {
      const isAsc = orderBy === newOrderBy && order === "asc";
      const toggledOrder = isAsc ? "desc" : "asc";
      setOrder(toggledOrder);
      setOrderBy(newOrderBy);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [order, orderBy]
  );

  // handle-child-component
  const handleAddEditPhotography = (photographyId: number|null) => {
    getCityDropDownList()
    if (photographyId) { //Edit Mode
      setIsEditPhotography(true);
      getPhotography(photographyId);
    }
    else { //Add Mode
      setIsEditPhotography(false);
      setShowScreen(true);
    }
  };
  const handlePhotographyClose = () => {
    setShowScreen(false);
  }
  const handlePhotographyDeleteModal = (photographyId: number) => {
    setDeletePhotographyId(photographyId);
    setIsOpenPhotographyDeleteModal(true);
  };
  const handlePhotographyDeleteCloseModal = () => {
    setDeletePhotographyId(0);
    setIsOpenPhotographyDeleteModal(false);
  };

  useEffect(() => {
    getPhotographyList(); 
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageNo, order, orderBy]);

  // callbacks
  const onPhotographyListSuccess = (response: GENERIC.IApiSuccessResponse<IPhotographyPagination>) => {
    setPhotographyListMeta(response.data);
  };
  const onDeletePhotographySuccess = (response: GENERIC.IApiSuccessResponse<IPhotography>) => {
    if (response.isSuccessStatusCode) {
      toast.success("Photography deleted successfully.");
      handlePhotographyDeleteCloseModal();
      getPhotographyList();
    } else {
      toast.error(SOMETHING_WENT_WRONG);
    }
  };
  const onAddPhotographySuccess = (response: GENERIC.IApiSuccessResponse<IPhotography>) => {
    if (response.isSuccessStatusCode) {
      toast.success
      (`Photography ${isEditPhotography ? "updated" : "added"} successfully.`)
      handlePhotographyClose();
      getPhotographyList();
    } else if (response.message) {
      toast.warning(response.message);
    } else {
      toast.error(SOMETHING_WENT_WRONG);
    }
  };
  const onEditPhotographySuccess = (response:
    GENERIC.IApiSuccessResponse<IPhotography>) => {
    setShowScreen(true);
  };
  const onCityListSuccess = (response:
    GENERIC.GetSuccessResponse<GENERIC.IKeyValuePair[]> | null) => {
    setCityDropDownList(response?.data) 
  }

  // action-dispatches
  const getPhotographyList = async () => {
    const { listRequest } = props;
    
    if (listRequest) {
      showLoader();
      const payload: GENERIC.ListRequestPayload<IPhotographyPagination> = {
        data: {
          sortByColumns: capitalization(orderBy),
          sortBy: order==="asc"  ? 0 : 1,
          pageNo: Number(pageNo),
          pageSize: Number(page),
          filter: {
            search: searchText
          },
        },
        callback: onPhotographyListSuccess,
      };
      listRequest(payload);
    }
  };
  const handleDeletePhotography = () => {
    const { deleteRequest } = props;

    if (deleteRequest) {
      showLoader();
      const payload = {
        data: {
          id: Number(deletePhotographyId),
        },
        callback: onDeletePhotographySuccess,
      };

      deleteRequest(payload);
    }
  };
  const handleSavePhotography = (formData: IPhotography) => {
    const { saveRequest } = props;
    if (saveRequest) {
      showLoader();
      const payload: GENERIC.SaveRequestPayload<IPhotography> = {
        data: {
          id: formData.id,
          name: formData.name,
          description: formData.description,
          isActive: formData.isActive,
          price: formData.price,
        },
        callback: onAddPhotographySuccess,
      };
      saveRequest(payload);
    }
  };
  const getPhotography = (id: number) => {
    const { getRequest } = props;

    if (getRequest) {
      showLoader();
      const payload = {
        data: {id},
        callback: onEditPhotographySuccess,
      };
      getRequest(payload);
    }
  };
  const getCityDropDownList = async (stateId?: number) => {
      const { cityDropDownListRequest } = props;
  
      if (cityDropDownListRequest) {
        const payload: GetDropDownListPayload = {
          data: { id: stateId },
          callback: onCityListSuccess,
        };
        console.log("sending request payload: ",payload)
        cityDropDownListRequest(payload);
      }
  }

  // search
  const handlePhotographySearch = (event: any) => {
    setSearchText(event.target.value);
  };
  const handlePhotographySearchKeyDown = (e: any) => {
    if (e?.key === "Enter") {
      setPageNo(1);
      getPhotographyList();
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

    if (photographyListMeta) {
      const minRange = (Number(pageNo) - 1) * Number(page) + 1;

      let maxRange = Number(pageNo) * Number(page);
      if (maxRange > Number(photographyListMeta?.recordCount)) {
        maxRange = Number(photographyListMeta?.recordCount);
      }
      const rangeString = `${minRange} - ${maxRange}`;
      rangeText = `Showing ${rangeString} of ${photographyListMeta?.recordCount} entries`;
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
                        placeholder="Search by Name"
                        value={searchText}
                        onChange={handlePhotographySearch}
                        onKeyDown={handlePhotographySearchKeyDown}
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
                              columnHeader="Photography"
                            />
                            <EnhancedTableHead
                              order={order}
                              orderBy={orderBy}
                              onRequestSort={handleRequestSort}
                              columnName="description"
                              columnHeader="From Capacity"
                            />
                            <EnhancedTableHead
                              order={order}
                              orderBy={orderBy}
                              onRequestSort={handleRequestSort}
                              columnName="price"
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
                          {list && list?.map((row: IPhotography) => (
                            // eslint-disable-next-line react/no-array-index-key
                            <TableRow key={row?.id}>
                              <TableCell component="th" scope="row">
                                {row?.name}
                              </TableCell>
                              <TableCell component="th" scope="row">
                                {row?.description}
                              </TableCell>
                              <TableCell component="th" scope="row">
                                {row?.price?.toLocaleString()}
                              </TableCell>
                              <TableCell align="center">
                                <div className="table-actions">
                                  <IconButton
                                    onClick={() => handleAddEditPhotography(row?.id)}
                                  >
                                    <img src={editIcon} alt="edit" />
                                  </IconButton>
                                  <IconButton
                                    onClick={() => handlePhotographyDeleteModal(row?.id)}
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
                                selected={pageSize?.selected}
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
                          count={photographyListMeta?.pageCount}
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
            Photographys
          </Typography>
          {!showScreen && 
            <Button
              variant="contained"
              onClick={() => handleAddEditPhotography(null)}
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
          (<AddEditPhotography
              isEditPhotography={isEditPhotography}
              showScreen={showScreen}
              handlePhotographyClose={handlePhotographyClose}
              handleAddPhotography={handleSavePhotography}
              cityDropDownList={cityDropDownList}
              currentPhotographyData={isEditPhotography ? {...props.current} : {
                id: 0,
                description: "",
                name: "",
                price: undefined,
                isActive: true,
              }}
            />)
        }            
      </div>
      <DeleteConfirmationModal
        isOpenDeleteConfirmationModal={isOpenPhotographyDeleteModal}
        handleDeleteConfirmationModalClose={handlePhotographyDeleteCloseModal}
        deleteConfirmationMessage="Are you sure you want to delete photography?"
        handleYesClick={handleDeletePhotography}
      />
    </>
  );
};

export default PhotographyForm;
