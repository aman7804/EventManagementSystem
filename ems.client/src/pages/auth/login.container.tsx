import { connect, MapDispatchToProps } from "react-redux";
import LoginForm, { LoginProps } from "./login";
import { loginRequest } from "store/auth/actions";
import { ILogin, ILoginContainerDispatch } from "../../interfaces/auth.interface";

const mapDispatchToProps: MapDispatchToProps<ILoginContainerDispatch, ILogin> =
  {
    loginRequest,
  };

const connector = connect(null, mapDispatchToProps);

const Login: React.FC<LoginProps> = (props) => {
  return <LoginForm {...props} />;
};

export default connector(Login);