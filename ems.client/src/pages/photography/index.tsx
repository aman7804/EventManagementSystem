import { connect, MapDispatchToProps } from "react-redux";
import PhotographyComponent, { PhotographyProps } from "pages/photography/photography";
import {
  saveRequest,
  deleteRequest,
  getByIdRequest,
  listRequest,
} from "store/photography/actions";
import {dropDownListRequest as cityDropDownListRequest} from "store/city/actions"
import {
  IPhotographyContainerDispatch,
  IPhotography,
} from "interfaces/photography.interface";
import { RootState } from "store/root/root.reducer";
import { getCurrentPhotographySelector, getPhotographyListSelector } from "store/photography/selectors";

const mapDispatchToProps: MapDispatchToProps<
  IPhotographyContainerDispatch,
  IPhotography
> = {
  listRequest: listRequest,
  saveRequest: saveRequest,
  getRequest: getByIdRequest,
  deleteRequest: deleteRequest,
  cityDropDownListRequest: cityDropDownListRequest
};

const mapStateToProps = (state:RootState) => {
  return {
    list: getPhotographyListSelector(state),
    current: getCurrentPhotographySelector(state),
  };  
}

const connector = connect(mapStateToProps, mapDispatchToProps);

const Photography: React.FC<PhotographyProps> = (props) => {
  return <PhotographyComponent {...props} />;
};

export default connector(Photography);
