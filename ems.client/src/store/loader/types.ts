import { HIDE_LOADER, SHOW_LOADER } from "./action.types";

export type ShowLoader = {
  type: typeof SHOW_LOADER;
  payload: boolean;
};

export type HideLoader = {
  type: typeof HIDE_LOADER;
  payload: boolean;
};

export type LoaderActions =
  | ShowLoader
  | HideLoader