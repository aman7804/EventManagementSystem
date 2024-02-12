import * as GENERIC from './generic.interface'

/* Model */
export interface IDecoration {
  id: number;
  name: string;
  description: string;
  price: number|undefined;
  isActive: boolean;
}

/* Search Model */
export interface IDecorationSearch {
  search?: string;
}

/* Pagination Model */
export interface IDecorationPagination extends GENERIC.IPagination<IDecoration> {
  filter: IDecorationSearch;
}

/* Dispatch Container Model */
export interface IDecorationContainerDispatch {
  listRequest: (payload: GENERIC.ListRequestPayload<IDecorationPagination>) => {};
  saveRequest: (payload: GENERIC.SaveRequestPayload<IDecoration>) => {};
  getRequest: (payload: GENERIC.GetRequestPayload) => {};
  deleteRequest: (payload: GENERIC.DeleteRequestPayload) => {};
}

/* State Container Model */
export interface IDecorationContainerState {
  list: IDecoration[];
  current: IDecoration;
}