import { connect, MapDispatchToProps } from "react-redux";
import { signupRequest } from "store/auth/actions";
import { ISignup, ISignupContainerDispatch } from "../../interfaces/auth.interface";
import SignupForm, { SignupProps } from "./signup";

const mapDispatchToProps: MapDispatchToProps<ISignupContainerDispatch, ISignup> =
  {
    signupRequest,
  };

const connector = connect(null, mapDispatchToProps); 

const Signup: React.FC<SignupProps> = (props) => {
  return <SignupForm {...props} />;
};

export default connector(Signup);