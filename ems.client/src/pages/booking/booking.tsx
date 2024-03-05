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
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {
  IBooking,
  IBookingContainerDispatch,
  IBookingContainerState,
  IBookingPagination,
} from "interfaces/booking.interface";
import { showLoader } from "utils/helper";
import { toast } from "react-toastify";
import { PAGE_SIZES, RUPEE_SYMBOL, SOMETHING_WENT_WRONG } from "utils/constants";
import { Order } from "utils/enums";
import DeleteConfirmationModal from "components/modals/delete.confirm";
// import AddEditBooking from "components/booking.create";
import projectTheme from "App.theme";
import * as GENERIC from "interfaces/generic.interface";
import { get } from "lodash";
import EnhancedTableHead from "components/elements/EnhancedTableHead";

const ArrowBackIcon = () =>
  <img src={arrowBackwardIcon} alt="arrow-backward" />;
const ArrowForwardIcon = () =>
  <img src={arrowForwardIcon} alt="arrow-forward" />;

// capitalization
const capitalization = (str: string): string => 
  str.charAt(0).toUpperCase() + str.slice(1);

const columnDisplayName: GENERIC.IIndexable<IBooking> = {
  dateTime: "Booking Date",
  numberOfGuests: "Number of Guests",
  totalAmount: "Total Amount",
  paidAmount: "Due Amount",
  customerName: "Customer",
}

interface bookingStatus{
  [key: number]: string;
}
const BookingStatus: bookingStatus = {
  0: "Pending",
  1: "Cancelled",
  2: "Rejected",
  3: "Paid",
  4: "Confirmed"
};

export type BookingProps = IBookingContainerState &
  IBookingContainerDispatch;

const BookingForm: React.FC<BookingProps> = (props) => {
  const [bookingListMeta, setBookingListMeta] = useState<IBookingPagination | null>();
  const [page, setPage] = useState<string>("5");
  const [pageNo, setPageNo] = useState<number>(1);
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof IBooking>("packageName");
  const [showScreen, setShowScreen] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>("");
  const [isEditBooking, setIsEditBooking] = useState<boolean>(false);
  const [isOpenBookingDeleteModal, setIsOpenBookingDeleteModal] = useState(false);
  const [deleteBookingId, setDeleteBookingId] = useState<number>();
  const [searchBookingByDate, setSearchByBookingDate] = useState<Date>();
  
  const handleRequestSort = useCallback(
    (event: React.MouseEvent<unknown>, newOrderBy: keyof IBooking) => {
      const isAsc = orderBy === newOrderBy && order === "asc";
      const toggledOrder = isAsc ? "desc" : "asc";
      setOrder(toggledOrder);
      setOrderBy(newOrderBy);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [order, orderBy]
  );

  // handle-child-component
  const handleAddEditBooking = (bookingId: number|null) => {
    if (bookingId) { //Edit Mode
      setIsEditBooking(true);
      getBooking(bookingId);
    }
    else { //Add Mode
      setIsEditBooking(false);
      setShowScreen(true);
    }
  };
  const handleBookingClose = () => {
    setShowScreen(false);
  }
  const handleBookingDeleteModal = (bookingId: number) => {
    setDeleteBookingId(bookingId);
    setIsOpenBookingDeleteModal(true);
  };
  const handleBookingDeleteCloseModal = () => {
    setDeleteBookingId(0);
    setIsOpenBookingDeleteModal(false);
  };

  useEffect(() => {
    getBookingList(); 
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageNo, order, orderBy]);

  // callbacks
  const onBookingListSuccess = (response: GENERIC.IApiSuccessResponse<IBookingPagination>) => {
    setBookingListMeta(response.data);
  };
  const onDeleteBookingSuccess = (response: GENERIC.IApiSuccessResponse<IBooking>) => {
    if (response.isSuccessStatusCode) {
      toast.success("Booking deleted successfully.");
      handleBookingDeleteCloseModal();
      getBookingList();
    } else {
      toast.error(SOMETHING_WENT_WRONG);
    }
  };
  const onSaveBookingSuccess = (response: GENERIC.IApiSuccessResponse<IBooking>) => {
    if (response.isSuccessStatusCode) {
      toast.success
      (`Booking ${isEditBooking ? "updated" : "added"} successfully.`)
      handleBookingClose();
      getBookingList();
    } else if (response.message) {
      toast.warning(response.message);
    } else {
      toast.error(SOMETHING_WENT_WRONG);
    }
  };
  const onGetBookingSuccess = (response: GENERIC.IApiSuccessResponse<IBooking>) => {
    setShowScreen(true);
  };

  // action-dispatches
  const getBookingList = async () => {
    const { listRequest } = props;
    
    if (listRequest) {
      showLoader();
      const payload: GENERIC.ListRequestPayload<IBookingPagination> = {
        data: {
          sortByColumns: capitalization(orderBy),
          sortBy: order==="asc"  ? 0 : 1,
          pageNo: Number(pageNo),
          pageSize: Number(page),
          filter: {
            search: searchText,
            date: searchBookingByDate
          },
        },
        callback: onBookingListSuccess,
      };
      listRequest(payload);
    }
  };
  const handleDeleteBooking = () => {
    const { deleteRequest } = props;

    if (deleteRequest) {
      showLoader();
      const payload = {
        data: {
          id: Number(deleteBookingId),
        },
        callback: onDeleteBookingSuccess,
      };

      deleteRequest(payload);
    }
  };
  // const handleSaveBooking = (formData: IBooking) => {
  //   const { saveRequest } = props;
  //   if (saveRequest) {
  //     showLoader();
  //     const payload: GENERIC.SaveRequestPayload<IBooking> = {
  //       data: {
  //         id: formData.id,
  //         name: formData.name,
  //         description: formData.description,
  //         isActive: formData.isActive,
  //         price: formData.price,
  //       },
  //       callback: onSaveBookingSuccess,
  //     };
  //     saveRequest(payload);
  //   }
  // };
  const getBooking = (id: number) => {
    const { getRequest } = props;

    if (getRequest) {
      showLoader();
      const payload = {
        data: {id},
        callback: onGetBookingSuccess,
      };
      getRequest(payload);
    }
  };

  // search
  const handleBookingSearch = (event: any) => {
    setSearchText(event.target.value);
  };
  const handleBookingSearchKeyDown = (e: any) => {
    if (e?.key === "Enter") {
      setPageNo(1);
      getBookingList();
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

    if (bookingListMeta) {
      const minRange = (Number(pageNo) - 1) * Number(page) + 1;

      let maxRange = Number(pageNo) * Number(page);
      if (maxRange > Number(bookingListMeta?.recordCount)) {
        maxRange = Number(bookingListMeta?.recordCount);
      }
      const rangeString = `${minRange} - ${maxRange}`;
      rangeText = `Showing ${rangeString} of ${bookingListMeta?.recordCount} entries`;
    }

    return rangeText;
  };

  const handleDatePicker = (date: any) => {
    const newDate: Date = date?.toDate();
    if(date && !isNaN(newDate.getTime()))
      setSearchByBookingDate(newDate)
  }

  useEffect(()=>{
    if(searchBookingByDate){
      setPageNo(1);
      getBookingList();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[searchBookingByDate])

  const formateDate = (date: Date) => {
    const day = date.getDate().toString().padStart(2, '0'); // Get day and pad with zero if needed
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Get month (+1 because months are zero-based) and pad with zero if needed
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  const getListingScreen = () => {
    const list: IBooking[] = get(props, "list.data", [], );
    return <>
              <Grid
                container
                spacing={{ xs: "16px", lg: "20px", xl: "24px" }}
                className="content-container"
              >
                <Grid item xs={12}>
                  <Card>
                    <Box className="table-card-header">
                      <Grid item spacing={2}>
                        <Grid item xs={12} xl={6} md={6}>
                          <TextField
                            id="search"
                            variant="outlined"
                            className="search-input"
                            placeholder="Search by Name"
                            value={searchText}
                            onChange={handleBookingSearch}
                            onKeyDown={handleBookingSearchKeyDown}
                          />
                        </Grid>
                        <Grid item xs={12} xl={6} md={6}>
                          <DatePicker
                            sx={{ width: 260 }}
                            onChange={handleDatePicker}
                            slotProps={{
                              field: {
                                clearable: true,
                                onClear: () =>
                                  setSearchByBookingDate(undefined),
                              },
                              textField:{
                                onKeyDown: handleBookingSearchKeyDown,
                              }
                            }}
                          />
                        </Grid>
                      </Grid>
                    </Box>
                    <TableContainer>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <EnhancedTableHead
                              order={order}
                              orderBy={orderBy}
                              onRequestSort={handleRequestSort}
                              columnName="customerName"
                              columnHeader="CustomerName"
                              width={200}
                              columnDisplayName={columnDisplayName}
                            />
                            <EnhancedTableHead
                              order={order}
                              orderBy={orderBy}
                              onRequestSort={handleRequestSort}
                              columnName="dateTime"
                              columnHeader="DateTime"
                              width={200}
                              columnDisplayName={columnDisplayName}
                            />
                            <EnhancedTableHead
                              order={order}
                              orderBy={orderBy}
                              onRequestSort={handleRequestSort}
                              columnName="numberOfGuests"
                              columnHeader="NumberOfGuests"
                              columnDisplayName={columnDisplayName}
                            />
                            <EnhancedTableHead
                              order={order}
                              orderBy={orderBy}
                              onRequestSort={handleRequestSort}
                              columnName="totalAmount"
                              columnHeader="TotalAmount"
                              width={150}
                              columnDisplayName={columnDisplayName}
                            />
                            <EnhancedTableHead
                              order={order}
                              orderBy={orderBy}
                              onRequestSort={handleRequestSort}
                              columnName="paidAmount"
                              columnHeader="PaidAmount"
                              width={150}
                              columnDisplayName={columnDisplayName}
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
                          {list && list?.map((row: IBooking) => (
                            // eslint-disable-next-line react/no-array-index-key
                            <TableRow key={row?.id}>
                              <TableCell component="th" scope="row">
                                {row?.customerName}
                              </TableCell>
                              <TableCell component="th" scope="row">
                                {formateDate(new Date(row?.dateTime))}
                              </TableCell>
                              <TableCell component="th" scope="row">
                                {row?.numberOfGuests}
                              </TableCell>
                              <TableCell component="th" scope="row">
                                {RUPEE_SYMBOL} {row?.totalAmount}
                              </TableCell>
                              <TableCell component="th" scope="row">
                                {RUPEE_SYMBOL} {row?.paidAmount}
                              </TableCell>
                              <TableCell align="center">
                                <div className="table-actions">
                                  <IconButton
                                    onClick={() => handleAddEditBooking(row?.id)}
                                  >
                                    <img src={editIcon} alt="edit" />
                                  </IconButton>
                                  <IconButton
                                    onClick={() => handleBookingDeleteModal(row?.id)}
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
                          count={bookingListMeta?.pageCount}
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
            Booking
          </Typography>
          {!showScreen && 
            <Button
              variant="contained"
              onClick={() => handleAddEditBooking(null)}
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
          (<h1>Nothing to Show</h1>)
          // (<AddEditBooking
          //     isEditBooking={isEditBooking}
          //     showScreen={showScreen}
          //     handleBookingClose={handleBookingClose}
          //     handleAddBooking={handleSaveBooking}
          //     currentBookingData={isEditBooking ? {...props.current} : {
          //       id: 0,
          //       description: "",
          //       name: "",
          //       price: undefined,
          //       isActive: true,
          //     }}
          //   />)
        }            
      </div>
      <DeleteConfirmationModal
        isOpenDeleteConfirmationModal={isOpenBookingDeleteModal}
        handleDeleteConfirmationModalClose={handleBookingDeleteCloseModal}
        deleteConfirmationMessage="Are you sure you want to delete booking?"
        handleYesClick={handleDeleteBooking}
      />
    </>
  );
};

export default BookingForm;
