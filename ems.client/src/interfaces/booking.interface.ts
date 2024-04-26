import { EnumBookingReportType, EnumBookingStatus } from 'utils/enums';
import * as GENERIC from './generic.interface'

/* Model */
export interface IBooking {
  id: number;
  minGuest: number;
  maxGuest: number;
  totalAmount: number;
  dueAmount: number;
  packageId: number;
  status: EnumBookingStatus;
}


/* Search Model */
export interface IBookingSearch {
    search?: string;
  }

/* Pagination Model */
export interface IBookingPagination extends GENERIC.IPagination<IBooking> {
  filter: IBookingSearch;
}

/* Dispatch Container Model */
export interface IBookingContainerDispatch {
  listRequest: (payload: GENERIC.ListRequestPayload<IBookingPagination>) => {};
  saveRequest: (payload: GENERIC.SaveRequestPayload<IBooking>) => {};
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