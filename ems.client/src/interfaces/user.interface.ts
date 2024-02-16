import * as GENERIC from './generic.interface'

/* Model */
export interface IUser {
    id: number;
    firstName: string;
    lastName: string;
    emailId: string;
    mobileNo: string;
    password?: string;
    address: string;
    cityId: number;
}

/* Search Model */
export interface IUserSearch {
  search?: string;
}

/* Pagination Model */
export interface IUserPagination extends GENERIC.IPagination<IUser> {
  filter: IUserSearch;
}

/* Dispatch Container Model */
export interface IUserContainerDispatch {
  listRequest: (payload: GENERIC.ListRequestPayload<IUserPagination>) => {};
  saveRequest: (payload: GENERIC.SaveRequestPayload<IUser>) => {};
  getRequest: (payload: GENERIC.GetRequestPayload) => {};
  deleteRequest: (payload: GENERIC.DeleteRequestPayload) => {};
}

/* State Container Model */
export interface IUserContainerState {
  list: IUser[];
  current: IUser;
}

