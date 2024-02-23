import { HIDE_LOADER, SHOW_LOADER } from "./action.types";

export type ShowLoader = {
  type: typeof SHOW_LOADER;
};
export type HideLoader = {
  type: typeof HIDE_LOADER;
};

export type LoaderActions =
  | ShowLoader
  | HideLoader