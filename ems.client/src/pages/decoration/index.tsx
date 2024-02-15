import { connect, MapDispatchToProps } from "react-redux";
import DecorationComponent, { DecorationProps } from "pages/decoration/decoration";
import {
  saveRequest,
  deleteRequest,
  getByIdRequest,
  listRequest,
} from "store/decoration/actions";
import {
  IDecorationContainerDispatch,
  IDecoration,
} from "interfaces/decoration.interface";
import { RootState } from "store/root/root.reducer";
import { getCurrentDecorationSelector, getDecorationListSelector } from "store/decoration/selector";

const mapDispatchToProps: MapDispatchToProps<
  IDecorationContainerDispatch,
  IDecoration
> = {
  listRequest: listRequest,
  saveRequest: saveRequest,
  getRequest: getByIdRequest,
  deleteRequest: deleteRequest,
};

const mapStateToProps = (state:RootState) => {
  return {
    list: getDecorationListSelector(state),
    current: getCurrentDecorationSelector(state),
  };  
}

const connector = connect(mapStateToProps, mapDispatchToProps);

const Decoration: React.FC<DecorationProps> = (props) => {
  return <DecorationComponent {...props} />;
};

export default connector(Decoration);
