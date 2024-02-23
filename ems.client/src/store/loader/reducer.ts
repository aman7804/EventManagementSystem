import { SHOW_LOADER, HIDE_LOADER} from "./action.types";
import { LoaderActions } from "./types";

interface ILoader{
  togglerLoader: boolean;
}
const initialState: ILoader = {
  togglerLoader: false 
};

const reducers = (state = initialState, action: LoaderActions): unknown => {
  switch (action.type) {
    case SHOW_LOADER:
      return {
        togglerLoader: true,
      };
    case HIDE_LOADER:
      return {
        togglerLoader: false,
      };
    default:
      return state;
  }
};

export default reducers;
