import { connect, MapDispatchToProps } from "react-redux";
import { changePasswordRequest } from "store/auth/actions";
import { IChangePassword, IChangePasswordContainerDispatch } from "../../interfaces/auth.interface";
import ChangePasswordForm, { ChangePasswordProps } from "./changePassword";
import { RootState } from "store/root/root.reducer";
import { getUserSelector } from "store/auth/selector";

const mapDispatchToProps: MapDispatchToProps<IChangePasswordContainerDispatch, IChangePassword> =
  {
    changePasswordRequest
  };
const mapStateToProps = (state:RootState) => {
  return {
    user: getUserSelector(state),
  };  
}
const connector = connect(mapStateToProps, mapDispatchToProps); 

const ChangePassword: React.FC<ChangePasswordProps> = (props) => {
  return <ChangePasswordForm {...props} />;
};

export default connector(ChangePassword);