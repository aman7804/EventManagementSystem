import { UpdateStatusRequestPayload } from 'store/booking/types';
import * as GENERIC from './generic.interface'

/* Model */
export interface IBooking {
  id: number;
  minGuest: number;
  maxGuest: number;
  totalAmount: number;
  dueAmount: number;
  packageId: number;
  packageName: string;
  customerId: number;
  customerName: string;
  status: number;
}

/* Search Model */
export interface IBookingSearch {
  search?: string;
  date?: string;
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