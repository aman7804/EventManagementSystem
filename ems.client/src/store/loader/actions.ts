import { SHOW_LOADER, HIDE_LOADER} from "./action.types";
import { ShowLoader, HideLoader } from "./types";

export const showLoader = (): ShowLoader => ({
  type: SHOW_LOADER
});
export const hideLoader = (): HideLoader => ({
  type: HIDE_LOADER
});
