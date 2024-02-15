import { connect, MapDispatchToProps } from "react-redux";
import CateringComponent, { CateringProps } from "pages/catering/catering";
import {
  saveRequest,
  deleteRequest,
  getByIdRequest,
  listRequest,
} from "store/catering/actions";
import {
  ICateringContainerDispatch,
  ICatering,
} from "interfaces/catering.interface";
import { RootState } from "store/root/root.reducer";
import { getCurrentCateringSelector, getCateringListSelector } from "store/catering/selector";

const mapDispatchToProps: MapDispatchToProps<
  ICateringContainerDispatch,
  ICatering
> = {
  listRequest: listRequest,
  saveRequest: saveRequest,
  getRequest: getByIdRequest,
  deleteRequest: deleteRequest,
};

const mapStateToProps = (state:RootState) => {
  return {
    list: getCateringListSelector(state),
    current: getCurrentCateringSelector(state),
  };  
}

const connector = connect(mapStateToProps, mapDispatchToProps);

const Catering: React.FC<CateringProps> = (props) => {
  return <CateringComponent {...props} />;
};

export default connector(Catering);
