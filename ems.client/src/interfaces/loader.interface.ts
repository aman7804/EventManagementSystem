import { IDecorationPagination } from "./decoration.interface";

export interface ILoader{
  togglerLoader: boolean;
}

/* Dispatch Container Model */
export interface IDecorationContainerDispatch {
  showLoader: () => {};
  hideLoader: () => {};
}

/* State Container Model */
export interface IDecorationContainerState {
  loaderState: ILoader
}