import { SHOW_LOADER, HIDE_LOADER} from "./action.types";
import { ShowLoader, HideLoader } from "./types";

export const showLoader = (
  payload: boolean
): ShowLoader => ({
  type: SHOW_LOADER,
  payload
});

export const hideLoader = (
  payload: boolean
): HideLoader => ({
  type: HIDE_LOADER,
  payload
});
