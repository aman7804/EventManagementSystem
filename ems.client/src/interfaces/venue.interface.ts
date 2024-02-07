import { GetDropDownListPayload } from './city.interface';
import * as GENERIC from './generic.interface'

/* Model */
export interface IVenue {
  id: number;
  name: string;
  address: string;
  description: string;
  price: number;
  isActive: boolean;
  cityId: number;
  minCapacity: number;
  maxCapacity: number;
}

/* Search Model */
export interface IVenueSearch {
  search?: string;
}

/* Pagination Model */
export interface IVenuePagination extends GENERIC.IPagination<IVenue> {
  filter: IVenueSearch;
}

/* Dispatch Container Model */
export interface IVenueContainerDispatch {
  listRequest: (payload: GENERIC.ListRequestPayload<IVenuePagination>) => {};
  saveRequest: (payload: GENERIC.SaveRequestPayload<IVenue>) => {};
  getRequest: (payload: GENERIC.GetRequestPayload) => {};
  deleteRequest: (payload: GENERIC.DeleteRequestPayload) => {};
  cityDropDownlistRequest: (payload: GetDropDownListPayload) => {};
}

/* State Container Model */
export interface IVenueContainerState {
  list: any;
}

