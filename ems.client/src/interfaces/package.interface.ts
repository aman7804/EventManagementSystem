import * as GENERIC from './generic.interface'

/* Model */
export interface IPackage {
  id: number;
  name: string;
  isActive: boolean;
  isDraft: boolean;
  venueId: number;
  venueName: string;
  photographyId: number;
  photographyName: string;
  decorationId: number;
  decorationName: string;
  cateringId: number;
  cateringName: string;
}

/* Search Model */
export interface IPackageSearch {
  search?: string;
}

/* Pagination Model */
export interface IPackagePagination extends GENERIC.IPagination<IPackage> {
  filter: IPackageSearch;
}

/* Dispatch Container Model */
export interface IPackageContainerDispatch {
  listRequest: (payload: GENERIC.ListRequestPayload<IPackagePagination>) => {};
  saveRequest: (payload: GENERIC.SaveRequestPayload<IPackage>) => {};
  getRequest: (payload: GENERIC.GetRequestPayload) => {};
  deleteRequest: (payload: GENERIC.DeleteRequestPayload) => {};
}

/* State Container Model */
export interface IPackageContainerState {
  list: IPackage[];
  current: IPackage;
}