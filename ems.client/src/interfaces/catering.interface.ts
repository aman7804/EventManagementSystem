import * as GENERIC from './generic.interface'

/* Model */
export interface ICatering {
  id: number;
  name: string;
  description: string;
  price: number|undefined;
  isActive: boolean;
}

/* Search Model */
export interface ICateringSearch {
  search?: string;
}

/* Pagination Model */
export interface ICateringPagination extends GENERIC.IPagination<ICatering> {
  filter: ICateringSearch;
}

/* Dispatch Container Model */
export interface ICateringContainerDispatch {
  listRequest: (payload: GENERIC.ListRequestPayload<ICateringPagination>) => {};
  saveRequest: (payload: GENERIC.SaveRequestPayload<ICatering>) => {};
  getRequest: (payload: GENERIC.GetRequestPayload) => {};
  deleteRequest: (payload: GENERIC.DeleteRequestPayload) => {};
}

/* State Container Model */
export interface ICateringContainerState {
  list: ICatering[];
  current: ICatering;
}