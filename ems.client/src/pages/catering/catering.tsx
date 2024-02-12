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
  ICatering,
  ICateringContainerDispatch,
  ICateringContainerState,
  ICateringPagination,
} from "interfaces/catering.interface";
import { showLoader } from "utils/helper";
import { toast } from "react-toastify";
import { PAGE_SIZES, SOMETHING_WENT_WRONG } from "utils/constants";
import { Order } from "utils/enums";
import DeleteConfirmationModal from "components/modals/delete.confirm";
import AddEditCatering from "components/catering.create";
import projectTheme from "App.theme";
import * as GENERIC from "interfaces/generic.interface";
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
    newOrderBy: keyof ICatering
  ) => void;
  order: Order;
  orderBy: string;
  columnHeader: string;
  columnName: keyof ICatering;
}
const EnhancedTableHead = (props: EnhancedTableProps) => {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler =
    (newOrderBy: keyof ICatering) => (event: React.MouseEvent<unknown>) =>
      onRequestSort(event, newOrderBy);

  interface ColumnDisplayName{
    [key: string] : string;    
  }

  const columnDisplayName: ColumnDisplayName = {
    name: "Name",
    description: "Description",
    price: "Price",
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


export type CateringProps = ICateringContainerState &
  ICateringContainerDispatch;

const CateringForm: React.FC<CateringProps> = (props) => {
  const [cateringListMeta, setCateringListMeta] = useState<ICateringPagination | null>();
  const [page, setPage] = useState<string>("5");
  const [pageNo, setPageNo] = useState<number>(1);
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof ICatering>("name");
  const [showScreen, setShowScreen] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>("");
  const [isEditCatering, setIsEditCatering] = useState<boolean>(false);
  const [isOpenCateringDeleteModal, setIsOpenCateringDeleteModal] = useState(false);
  const [deleteCateringId, setDeleteCateringId] = useState<number>();
  
  const handleRequestSort = useCallback(
    (event: React.MouseEvent<unknown>, newOrderBy: keyof ICatering) => {
      const isAsc = orderBy === newOrderBy && order === "asc";
      const toggledOrder = isAsc ? "desc" : "asc";
      setOrder(toggledOrder);
      setOrderBy(newOrderBy);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [order, orderBy]
  );

  // handle-child-component
  const handleAddEditCatering = (cateringId: number|null) => {
    if (cateringId) { //Edit Mode
      setIsEditCatering(true);
      getCatering(cateringId);
    }
    else { //Add Mode
      setIsEditCatering(false);
      setShowScreen(true);
    }
  };
  const handleCateringClose = () => {
    setShowScreen(false);
  }
  const handleCateringDeleteModal = (cateringId: number) => {
    setDeleteCateringId(cateringId);
    setIsOpenCateringDeleteModal(true);
  };
  const handleCateringDeleteCloseModal = () => {
    setDeleteCateringId(0);
    setIsOpenCateringDeleteModal(false);
  };

  useEffect(() => {
    getCateringList(); 
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageNo, order, orderBy]);

  // callbacks
  const onCateringListSuccess = (response: GENERIC.IApiSuccessResponse<ICateringPagination>) => {
    setCateringListMeta(response.data);
  };
  const onDeleteCateringSuccess = (response: GENERIC.IApiSuccessResponse<ICatering>) => {
    if (response.isSuccessStatusCode) {
      toast.success("Catering deleted successfully.");
      handleCateringDeleteCloseModal();
      getCateringList();
    } else {
      toast.error(SOMETHING_WENT_WRONG);
    }
  };
  const onSaveCateringSuccess = (response: GENERIC.IApiSuccessResponse<ICatering>) => {
    if (response.isSuccessStatusCode) {
      toast.success
      (`Catering ${isEditCatering ? "updated" : "added"} successfully.`)
      handleCateringClose();
      getCateringList();
    } else if (response.message) {
      toast.warning(response.message);
    } else {
      toast.error(SOMETHING_WENT_WRONG);
    }
  };
  const onGetCateringSuccess = (response: GENERIC.IApiSuccessResponse<ICatering>) => {
    setShowScreen(true);
  };

  // action-dispatches
  const getCateringList = async () => {
    const { listRequest } = props;
    
    if (listRequest) {
      showLoader();
      const payload: GENERIC.ListRequestPayload<ICateringPagination> = {
        data: {
          sortByColumns: capitalization(orderBy),
          sortBy: order==="asc"  ? 0 : 1,
          pageNo: Number(pageNo),
          pageSize: Number(page),
          filter: {
            search: searchText
          },
        },
        callback: onCateringListSuccess,
      };
      listRequest(payload);
    }
  };
  const handleDeleteCatering = () => {
    const { deleteRequest } = props;

    if (deleteRequest) {
      showLoader();
      const payload = {
        data: {
          id: Number(deleteCateringId),
        },
        callback: onDeleteCateringSuccess,
      };

      deleteRequest(payload);
    }
  };
  const handleSaveCatering = (formData: ICatering) => {
    const { saveRequest } = props;
    if (saveRequest) {
      showLoader();
      const payload: GENERIC.SaveRequestPayload<ICatering> = {
        data: {
          id: formData.id,
          name: formData.name,
          description: formData.description,
          isActive: formData.isActive,
          price: formData.price,
        },
        callback: onSaveCateringSuccess,
      };
      saveRequest(payload);
    }
  };
  const getCatering = (id: number) => {
    const { getRequest } = props;

    if (getRequest) {
      showLoader();
      const payload = {
        data: {id},
        callback: onGetCateringSuccess,
      };
      getRequest(payload);
    }
  };

  // search
  const handleCateringSearch = (event: any) => {
    setSearchText(event.target.value);
  };
  const handleCateringSearchKeyDown = (e: any) => {
    if (e?.key === "Enter") {
      setPageNo(1);
      getCateringList();
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

    if (cateringListMeta) {
      const minRange = (Number(pageNo) - 1) * Number(page) + 1;

      let maxRange = Number(pageNo) * Number(page);
      if (maxRange > Number(cateringListMeta?.recordCount)) {
        maxRange = Number(cateringListMeta?.recordCount);
      }
      const rangeString = `${minRange} - ${maxRange}`;
      rangeText = `Showing ${rangeString} of ${cateringListMeta?.recordCount} entries`;
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
                        onChange={handleCateringSearch}
                        onKeyDown={handleCateringSearchKeyDown}
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
                              columnHeader="Catering"
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
                          {list && list?.map((row: ICatering) => (
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
                                    onClick={() => handleAddEditCatering(row?.id)}
                                  >
                                    <img src={editIcon} alt="edit" />
                                  </IconButton>
                                  <IconButton
                                    onClick={() => handleCateringDeleteModal(row?.id)}
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
                          count={cateringListMeta?.pageCount}
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
            Caterings
          </Typography>
          {!showScreen && 
            <Button
              variant="contained"
              onClick={() => handleAddEditCatering(null)}
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
          (<AddEditCatering
              isEditCatering={isEditCatering}
              showScreen={showScreen}
              handleCateringClose={handleCateringClose}
              handleAddCatering={handleSaveCatering}
              currentCateringData={isEditCatering ? {...props.current} : {
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
        isOpenDeleteConfirmationModal={isOpenCateringDeleteModal}
        handleDeleteConfirmationModalClose={handleCateringDeleteCloseModal}
        deleteConfirmationMessage="Are you sure you want to delete catering?"
        handleYesClick={handleDeleteCatering}
      />
    </>
  );
};

export default CateringForm;
