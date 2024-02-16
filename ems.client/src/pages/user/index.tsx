import { connect, MapDispatchToProps } from "react-redux";
import UserComponent, { UserProps } from "pages/user/user";
import {
  saveRequest,
  deleteRequest,
  getByIdRequest,
  listRequest,
} from "store/user/actions";
import {dropDownListRequest as cityDropDownListRequest} from "store/city/actions"
import {
  IUserContainerDispatch,
  IUser,
} from "interfaces/user.interface";
import { RootState } from "store/root/root.reducer";
import { getCurrentUserSelector, getUserListSelector } from "store/user/selector";

const mapDispatchToProps: MapDispatchToProps<
  IUserContainerDispatch,
  IUser
> = {
  listRequest: listRequest,
  saveRequest: saveRequest,
  getRequest: getByIdRequest,
  deleteRequest: deleteRequest,
};

const mapStateToProps = (state:RootState) => {
  return {
    list: getUserListSelector(state),
    current: getCurrentUserSelector(state),
  };  
}

const connector = connect(mapStateToProps, mapDispatchToProps);

const User: React.FC<UserProps> = (props) => {
  return <UserComponent {...props} />;
};

export default connector(User);
