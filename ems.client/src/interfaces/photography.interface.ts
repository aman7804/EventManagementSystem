import * as GENERIC from './generic.interface'

/* Model */
export interface IPhotography {
  id: number;
  name: string;
  description: string;
  price: number|undefined;
  isActive: boolean;
}

/* Search Model */
export interface IPhotographySearch {
  search?: string;
}

/* Pagination Model */
export interface IPhotographyPagination extends GENERIC.IPagination<IPhotography> {
  filter: IPhotographySearch;
}

/* Dispatch Container Model */
export interface IPhotographyContainerDispatch {
  listRequest: (payload: GENERIC.ListRequestPayload<IPhotographyPagination>) => {};
  saveRequest: (payload: GENERIC.SaveRequestPayload<IPhotography>) => {};
  getRequest: (payload: GENERIC.GetRequestPayload) => {};
  deleteRequest: (payload: GENERIC.DeleteRequestPayload) => {};
}

/* State Container Model */
export interface IPhotographyContainerState {
  list: IPhotography[];
  current: IPhotography;
}

