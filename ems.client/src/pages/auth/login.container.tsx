import { connect, MapDispatchToProps } from "react-redux";
import LoginForm, { LoginProps } from "./login";
import { loginRequest } from "store/auth/actions";
import { ILogin, ILoginContainerDispatch } from "../../interfaces/auth.interface";
import { RootState } from "store/root/root.reducer";
import { checkIsAdmin, checkIsAuthenticated } from "store/auth/selector";

const mapDispatchToProps: MapDispatchToProps<ILoginContainerDispatch, ILogin> =
  {
    loginRequest,
  };
const mapStateToProps = (state:RootState) => {
  return {
    isAdmin: checkIsAdmin(state),
    isAuthenticated: checkIsAuthenticated(state),
  };  
}

const connector = connect(mapStateToProps, mapDispatchToProps);

const Login: React.FC<LoginProps> = (props) => {
  return <LoginForm {...props} />;
};

export default connector(Login);