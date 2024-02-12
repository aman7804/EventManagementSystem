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
  IDecoration,
  IDecorationContainerDispatch,
  IDecorationContainerState,
  IDecorationPagination,
} from "interfaces/decoration.interface";
import { showLoader } from "utils/helper";
import { toast } from "react-toastify";
import { PAGE_SIZES, SOMETHING_WENT_WRONG } from "utils/constants";
import { Order } from "utils/enums";
import DeleteConfirmationModal from "components/modals/delete.confirm";
import AddEditDecoration from "components/decoration.create";
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
    newOrderBy: keyof IDecoration
  ) => void;
  order: Order;
  orderBy: string;
  columnHeader: string;
  columnName: keyof IDecoration;
}
const EnhancedTableHead = (props: EnhancedTableProps) => {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler =
    (newOrderBy: keyof IDecoration) => (event: React.MouseEvent<unknown>) =>
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


export type DecorationProps = IDecorationContainerState &
  IDecorationContainerDispatch;

const DecorationForm: React.FC<DecorationProps> = (props) => {
  const [decorationListMeta, setDecorationListMeta] = useState<IDecorationPagination | null>();
  const [page, setPage] = useState<string>("5");
  const [pageNo, setPageNo] = useState<number>(1);
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof IDecoration>("name");
  const [showScreen, setShowScreen] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>("");
  const [isEditDecoration, setIsEditDecoration] = useState<boolean>(false);
  const [isOpenDecorationDeleteModal, setIsOpenDecorationDeleteModal] = useState(false);
  const [deleteDecorationId, setDeleteDecorationId] = useState<number>();
  
  const handleRequestSort = useCallback(
    (event: React.MouseEvent<unknown>, newOrderBy: keyof IDecoration) => {
      const isAsc = orderBy === newOrderBy && order === "asc";
      const toggledOrder = isAsc ? "desc" : "asc";
      setOrder(toggledOrder);
      setOrderBy(newOrderBy);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [order, orderBy]
  );

  // handle-child-component
  const handleAddEditDecoration = (decorationId: number|null) => {
    if (decorationId) { //Edit Mode
      setIsEditDecoration(true);
      getDecoration(decorationId);
    }
    else { //Add Mode
      setIsEditDecoration(false);
      setShowScreen(true);
    }
  };
  const handleDecorationClose = () => {
    setShowScreen(false);
  }
  const handleDecorationDeleteModal = (decorationId: number) => {
    setDeleteDecorationId(decorationId);
    setIsOpenDecorationDeleteModal(true);
  };
  const handleDecorationDeleteCloseModal = () => {
    setDeleteDecorationId(0);
    setIsOpenDecorationDeleteModal(false);
  };

  useEffect(() => {
    getDecorationList(); 
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageNo, order, orderBy]);

  // callbacks
  const onDecorationListSuccess = (response: GENERIC.IApiSuccessResponse<IDecorationPagination>) => {
    setDecorationListMeta(response.data);
  };
  const onDeleteDecorationSuccess = (response: GENERIC.IApiSuccessResponse<IDecoration>) => {
    if (response.isSuccessStatusCode) {
      toast.success("Decoration deleted successfully.");
      handleDecorationDeleteCloseModal();
      getDecorationList();
    } else {
      toast.error(SOMETHING_WENT_WRONG);
    }
  };
  const onSaveDecorationSuccess = (response: GENERIC.IApiSuccessResponse<IDecoration>) => {
    if (response.isSuccessStatusCode) {
      toast.success
      (`Decoration ${isEditDecoration ? "updated" : "added"} successfully.`)
      handleDecorationClose();
      getDecorationList();
    } else if (response.message) {
      toast.warning(response.message);
    } else {
      toast.error(SOMETHING_WENT_WRONG);
    }
  };
  const onGetDecorationSuccess = (response: GENERIC.IApiSuccessResponse<IDecoration>) => {
    setShowScreen(true);
  };

  // action-dispatches
  const getDecorationList = async () => {
    const { listRequest } = props;
    
    if (listRequest) {
      showLoader();
      const payload: GENERIC.ListRequestPayload<IDecorationPagination> = {
        data: {
          sortByColumns: capitalization(orderBy),
          sortBy: order==="asc"  ? 0 : 1,
          pageNo: Number(pageNo),
          pageSize: Number(page),
          filter: {
            search: searchText
          },
        },
        callback: onDecorationListSuccess,
      };
      listRequest(payload);
    }
  };
  const handleDeleteDecoration = () => {
    const { deleteRequest } = props;

    if (deleteRequest) {
      showLoader();
      const payload = {
        data: {
          id: Number(deleteDecorationId),
        },
        callback: onDeleteDecorationSuccess,
      };

      deleteRequest(payload);
    }
  };
  const handleSaveDecoration = (formData: IDecoration) => {
    const { saveRequest } = props;
    if (saveRequest) {
      showLoader();
      const payload: GENERIC.SaveRequestPayload<IDecoration> = {
        data: {
          id: formData.id,
          name: formData.name,
          description: formData.description,
          isActive: formData.isActive,
          price: formData.price,
        },
        callback: onSaveDecorationSuccess,
      };
      saveRequest(payload);
    }
  };
  const getDecoration = (id: number) => {
    const { getRequest } = props;

    if (getRequest) {
      showLoader();
      const payload = {
        data: {id},
        callback: onGetDecorationSuccess,
      };
      getRequest(payload);
    }
  };

  // search
  const handleDecorationSearch = (event: any) => {
    setSearchText(event.target.value);
  };
  const handleDecorationSearchKeyDown = (e: any) => {
    if (e?.key === "Enter") {
      setPageNo(1);
      getDecorationList();
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

    if (decorationListMeta) {
      const minRange = (Number(pageNo) - 1) * Number(page) + 1;

      let maxRange = Number(pageNo) * Number(page);
      if (maxRange > Number(decorationListMeta?.recordCount)) {
        maxRange = Number(decorationListMeta?.recordCount);
      }
      const rangeString = `${minRange} - ${maxRange}`;
      rangeText = `Showing ${rangeString} of ${decorationListMeta?.recordCount} entries`;
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
                        onChange={handleDecorationSearch}
                        onKeyDown={handleDecorationSearchKeyDown}
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
                              columnHeader="Decoration"
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
                          {list && list?.map((row: IDecoration) => (
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
                                    onClick={() => handleAddEditDecoration(row?.id)}
                                  >
                                    <img src={editIcon} alt="edit" />
                                  </IconButton>
                                  <IconButton
                                    onClick={() => handleDecorationDeleteModal(row?.id)}
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
                          count={decorationListMeta?.pageCount}
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
            Decorations
          </Typography>
          {!showScreen && 
            <Button
              variant="contained"
              onClick={() => handleAddEditDecoration(null)}
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
          (<AddEditDecoration
              isEditDecoration={isEditDecoration}
              showScreen={showScreen}
              handleDecorationClose={handleDecorationClose}
              handleAddDecoration={handleSaveDecoration}
              currentDecorationData={isEditDecoration ? {...props.current} : {
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
        isOpenDeleteConfirmationModal={isOpenDecorationDeleteModal}
        handleDeleteConfirmationModalClose={handleDecorationDeleteCloseModal}
        deleteConfirmationMessage="Are you sure you want to delete decoration?"
        handleYesClick={handleDeleteDecoration}
      />
    </>
  );
};

export default DecorationForm;
