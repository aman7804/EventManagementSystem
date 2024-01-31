import { connect, MapDispatchToProps } from "react-redux";
import { registrationRequest } from "store/auth/actions";
import { IRegistration, IRegistrationContainerDispatch } from "../../interfaces/auth.interface";
import RegistrationForm, { RegistrationProps } from "./registration";

const mapDispatchToProps: MapDispatchToProps<IRegistrationContainerDispatch, IRegistration> =
  {
    registrationRequest,
  };

const connector = connect(null, mapDispatchToProps); 

const Registration: React.FC<RegistrationProps> = (props) => {
  return <RegistrationForm {...props} />;
};

export default connector(Registration);