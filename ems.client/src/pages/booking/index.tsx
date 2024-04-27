import { connect, MapDispatchToProps } from "react-redux";
import BookingComponent, { BookingProps } from "pages/booking/booking";
import {
  confirmRequest,
  rejectRequest,
  deleteRequest,
  getByIdRequest,
  listRequest,
} from "store/booking/actions";
import {
  IBookingContainerDispatch,
  IBooking,
} from "interfaces/booking.interface";
import { RootState } from "store/root/root.reducer";
import { getCurrentBookingSelector, getBookingListSelector } from "store/booking/selector";

const mapDispatchToProps: MapDispatchToProps<
  IBookingContainerDispatch,
  IBooking
> = {
  listRequest,
  confirmRequest,
  rejectRequest,
  getRequest: getByIdRequest,
  deleteRequest,
};

const mapStateToProps = (state:RootState) => {
  return {
    list: getBookingListSelector(state),
    current: getCurrentBookingSelector(state),
  };  
}

const connector = connect(mapStateToProps, mapDispatchToProps);

const Booking: React.FC<BookingProps> = (props) => {
  return <BookingComponent {...props} />;
};

export default connector(Booking);
