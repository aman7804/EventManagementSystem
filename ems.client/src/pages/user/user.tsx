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
  IUser,
  IUserContainerDispatch,
  IUserContainerState,
  IUserPagination,
} from "interfaces/user.interface";
import { showLoader } from "utils/helper";
import { toast } from "react-toastify";
import { PAGE_SIZES, SOMETHING_WENT_WRONG } from "utils/constants";
import { Order } from "utils/enums";
import DeleteConfirmationModal from "components/modals/delete.confirm";
import AddEditUser from "components/user.create";
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
    newOrderBy: keyof IUser
  ) => void;
  order: Order;
  orderBy: string;
  columnHeader: string;
  columnName: keyof IUser;
  align?: "left" | "center" | "right" | "justify" | "inherit" | undefined;
  width?: string | number | undefined;
}
const EnhancedTableHead = (props: EnhancedTableProps) => {
  const { order, orderBy, onRequestSort, align, width } = props;
  const createSortHandler =
    (newOrderBy: keyof IUser) => (event: React.MouseEvent<unknown>) =>
      onRequestSort(event, newOrderBy);
  
  interface ColumnDisplayName{
    [key: string] : string;    
  }
  const columnDisplayName: ColumnDisplayName = {
    firstName: "Name",
    address: "Address",
    emailId: "Email",
    mobileNo: "Mobile"
  }
  
  return (
    <TableCell
      key={props.columnHeader}
      align={align || "left"}
      onClick={createSortHandler(props.columnName)} 
      sortDirection={orderBy === props.columnName ? order : false}
      width={width}
    >
      {columnDisplayName[props.columnName]}
      <Box component="span" className="sorting-icon" />
    </TableCell>    
  );
};


export type UserProps = IUserContainerState &
  IUserContainerDispatch;

const UserForm: React.FC<UserProps> = (props) => {
  const [userListMeta, setUserListMeta] = useState<IUserPagination | null>();
  const [page, setPage] = useState<string>("5");
  const [pageNo, setPageNo] = useState<number>(1);
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof IUser>("firstName");
  const [showScreen, setShowScreen] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>("");
  const [isEditUser, setIsEditUser] = useState<boolean>(false);
  const [isOpenUserDeleteModal, setIsOpenUserDeleteModal] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState<number>();
  
  const handleRequestSort = useCallback(
    (event: React.MouseEvent<unknown>, newOrderBy: keyof IUser) => {
      const isAsc = orderBy === newOrderBy && order === "asc";
      const toggledOrder = isAsc ? "desc" : "asc";
      setOrder(toggledOrder);
      setOrderBy(newOrderBy);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [order, orderBy]
  );

  // handle-child-component
  const handleAddEditUser = (userId: number|null) => {
    if (userId) { //Edit Mode
      setIsEditUser(true);
      getUser(userId);
    }
    else { //Add Mode
      setIsEditUser(false);
      setShowScreen(true);
    }
  };
  const handleUserClose = () => {
    setShowScreen(false);
  }
  const handleUserDeleteModal = (userId: number) => {
    setDeleteUserId(userId);
    setIsOpenUserDeleteModal(true);
  };
  const handleUserDeleteCloseModal = () => {
    setDeleteUserId(0);
    setIsOpenUserDeleteModal(false);
  };

  useEffect(() => {
    getUserList(); 
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageNo, order, orderBy]);

  // callbacks
  const onUserListSuccess = (response: GENERIC.IApiSuccessResponse<IUserPagination>) => {
    setUserListMeta(response.data);
  };
  const onDeleteUserSuccess = (response: GENERIC.IApiSuccessResponse<IUser>) => {
    if (response.isSuccessStatusCode) {
      toast.success("User deleted successfully.");
      handleUserDeleteCloseModal();
      getUserList();
    } else {
      toast.error(SOMETHING_WENT_WRONG);
    }
  };
  const onSaveUserSuccess = (response: GENERIC.IApiSuccessResponse<IUser>) => {
    if (response.isSuccessStatusCode) {
      toast.success
      (`User ${isEditUser ? "updated" : "added"} successfully.`);
      handleUserClose();
      getUserList();
    } else if (response.message) {
      toast.warning(response.message);
    } else {
      toast.error(SOMETHING_WENT_WRONG);
    }
  };
  const onGetUserSuccess = (response: GENERIC.IApiSuccessResponse<IUser>) => {
    setShowScreen(true);
  };

  // action-dispatches
  const getUserList = async () => {
    const { listRequest } = props;
    
    if (listRequest) {
      showLoader();
      const payload: GENERIC.ListRequestPayload<IUserPagination> = {
        data: {
          sortByColumns: capitalization(orderBy),
          sortBy: order==="asc"  ? 0 : 1,
          pageNo: Number(pageNo),
          pageSize: Number(page),
          filter: {
            search: searchText
          },
        },
        callback: onUserListSuccess,
      };
      listRequest(payload);
    }
  };
  const handleDeleteUser = () => {
    const { deleteRequest } = props;

    if (deleteRequest) {
      showLoader();
      const payload = {
        data: {
          id: Number(deleteUserId),
        },
        callback: onDeleteUserSuccess,
      };

      deleteRequest(payload);
    }
  };
  const handleSaveUser = (formData: IUser) => {
    const { saveRequest } = props;
    if (saveRequest) {
      showLoader();
      const payload: GENERIC.SaveRequestPayload<IUser> = {
        data: {
          id: formData.id,
          firstName: formData.firstName,
          lastName: formData.lastName,
          address: formData.address,
          emailId: formData.emailId,
          password: formData.password,
          mobileNo: formData.mobileNo,
        },
        callback: onSaveUserSuccess,
      };
      saveRequest(payload);
    }
  };
  const getUser = (id: number) => {
    const { getRequest } = props;

    if (getRequest) {
      showLoader();
      const payload = {
        data: {id},
        callback: onGetUserSuccess,
      };
      getRequest(payload);
    }
  };

  // search
  const handleUserSearch = (event: any) => {
    setSearchText(event.target.value);
  };
  const handleUserSearchKeyDown = (e: any) => {
    if (e?.key === "Enter") {
      setPageNo(1);
      getUserList();
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

    if (userListMeta) {
      const minRange = (Number(pageNo) - 1) * Number(page) + 1;

      let maxRange = Number(pageNo) * Number(page);
      if (maxRange > Number(userListMeta?.recordCount)) {
        maxRange = Number(userListMeta?.recordCount);
      }
      const rangeString = `${minRange} - ${maxRange}`;
      rangeText = `Showing ${rangeString} of ${userListMeta?.recordCount} entries`;
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
                        placeholder="Search by Name, Email or Mobile"
                        value={searchText}
                        onChange={handleUserSearch}
                        onKeyDown={handleUserSearchKeyDown}
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
                              columnName="firstName"
                              columnHeader="FirstName"
                              width={200}
                            />
                            <EnhancedTableHead
                              order={order}
                              orderBy={orderBy}
                              onRequestSort={handleRequestSort}
                              columnName="address"
                              columnHeader="Address"
                              width={250}
                            />
                            <EnhancedTableHead
                              order={order}
                              orderBy={orderBy}
                              onRequestSort={handleRequestSort}
                              columnName="emailId"
                              columnHeader="EmailId"
                              width={200}
                              />
                            <EnhancedTableHead
                              order={order}
                              orderBy={orderBy}
                              onRequestSort={handleRequestSort}
                              columnName="mobileNo"
                              columnHeader="MobileNo"
                              width={100}
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
                          {list && list?.map((row: IUser) => (
                            // eslint-disable-next-line react/no-array-index-key
                            <TableRow key={row?.id}>
                              <TableCell component="th" scope="row">
                                {row?.firstName} {row?.lastName}
                              </TableCell>
                              <TableCell component="th" scope="row">
                                {row?.address}
                              </TableCell>
                              <TableCell component="th" scope="row">
                                {row?.emailId}
                              </TableCell>
                              <TableCell component="th" scope="row">
                                {row?.mobileNo}
                              </TableCell>
                              <TableCell align="center">
                                <div className="table-actions">
                                  <IconButton
                                    onClick={() => handleAddEditUser(row?.id)}
                                  >
                                    <img src={editIcon} alt="edit" />
                                  </IconButton>
                                  <IconButton
                                    onClick={() => handleUserDeleteModal(row?.id)}
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
                          count={userListMeta?.pageCount}
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
            User
          </Typography>
          {!showScreen && 
            <Button
              variant="contained"
              onClick={() => handleAddEditUser(null)}
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
          (<AddEditUser
              isEditUser={isEditUser}
              showScreen={showScreen}
              handleUserClose={handleUserClose}
              handleSaveUser={handleSaveUser}
              currentUserData={isEditUser ? {...props.current} : {
                id: 0,
                firstName: "",
                lastName: "",
                emailId: "",
                mobileNo: "",
                password: "",
                address: "",
              }}
            />)
        }            
      </div>
      <DeleteConfirmationModal
        isOpenDeleteConfirmationModal={isOpenUserDeleteModal}
        handleDeleteConfirmationModalClose={handleUserDeleteCloseModal}
        deleteConfirmationMessage="Are you sure you want to delete user?"
        handleYesClick={handleDeleteUser}
      />
    </>
  );
};

export default UserForm;
