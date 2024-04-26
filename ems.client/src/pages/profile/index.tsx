import { connect, MapDispatchToProps } from "react-redux";
import ProfileComponent, { ProfileProps } from "pages/profile/profile";
import {
  getRequest,
  updateRequest,
} from "store/profile/actions";
import {
  IProfile,
  IProfileContainerDispatch,
} from "interfaces/profile.interface";
import { RootState } from "store/root/root.reducer";
import {
  getPendingSelector,
  getProfileSelector
} from "store/profile/selector";

const mapDispatchToProps: MapDispatchToProps<
  IProfileContainerDispatch,
  IProfile
> = {
  getRequest,
  updateRequest
}

const mapStateToProps = (state: RootState) => {
  return {
    profile: getProfileSelector(state),
    pending: getPendingSelector(state)
  };  
}

const connector = connect(mapStateToProps, mapDispatchToProps);

const Profile: React.FC<ProfileProps> = (props) => 
  <ProfileComponent {...props} />;

export default connector(Profile);
