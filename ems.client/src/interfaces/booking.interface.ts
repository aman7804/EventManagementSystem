import { EnumBookingReportType, EnumBookingStatus } from 'utils/enums';
import { UpdateStatusRequestPayload } from 'store/booking/types';
import * as GENERIC from './generic.interface'

/* Model */
export interface IBooking {
  id: number;
  numberOfGuests: number; 
  totalAmount: number;
  paidAmount: number;
  packageId: number;
  packageName: string;
  customerId: number;
  customerName: string;
  status: number;
  dateTime: any;
}

export interface IGetByIdBooking extends IBooking{
  packageDetails: {
        venueName : string,
        venueAddress : string,
        venuePrice : number,
        venueDescription : string,
        minCapacity : number,
        maxCapacity : number,
        cityId : number,
        photographyName : string,
        photographyPrice : number,
        photographyDescription : string,
        decorationName : string,
        decorationPrice : number,
        decorationDescription : string,
        cateringName : string,
        cateringPrice : number,
        cateringDescription : string,
  }
}

/* Search Model */
export interface IBookingSearch {
  search?: string;
  date?: Date;
}

/* Pagination Model */
export interface IBookingPagination extends GENERIC.IPagination<IBooking> {
  filter: IBookingSearch;
}

/* Dispatch Container Model */
export interface IBookingContainerDispatch {
  listRequest: (payload: GENERIC.ListRequestPayload<IBookingPagination>) => {};
  confirmRequest: (payload: UpdateStatusRequestPayload) => {};
  rejectRequest: (payload: UpdateStatusRequestPayload) => {};
  getRequest: (payload: GENERIC.GetRequestPayload) => {};
  deleteRequest: (payload: GENERIC.DeleteRequestPayload) => {};
}

/* State Container Model */
export interface IBookingContainerState {
  list: IBooking[];
  current: IBooking;
}

/* Dashboard Component Modals */
export interface IBookingSummary {
  noOfBookings: number,
  bookingRatio: number
}

export interface IBookingRevenue {
  totalRevenue: number,
  revenueRatio: number
}

export interface IBookingReport {
  noOfBookings: number[]
}

export interface IBookingReportRequestPayload {
  enumBookingReportType: EnumBookingReportType,
  message?: string,
  data?: IBooking,
}