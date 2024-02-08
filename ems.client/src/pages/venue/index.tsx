import { connect, MapDispatchToProps } from "react-redux";
import VenueComponent, { VenueProps } from "pages/venue/venue";
import {
  saveRequest,
  deleteRequest,
  getByIdRequest,
  listRequest,
} from "store/venue/actions";
import {dropDownListRequest as cityDropDownListRequest} from "store/city/actions"
import {
  IVenueContainerDispatch,
  IVenue,
} from "interfaces/venue.interface";
import { RootState } from "store/root/root.reducer";
import { getCurrentVenueSelector, getVenueListSelector } from "store/venue/selectors";

const mapDispatchToProps: MapDispatchToProps<
  IVenueContainerDispatch,
  IVenue
> = {
  listRequest: listRequest,
  saveRequest: saveRequest,
  getRequest: getByIdRequest,
  deleteRequest: deleteRequest,
  cityDropDownListRequest: cityDropDownListRequest
};

const mapStateToProps = (state:RootState) => {
  return {
    list: getVenueListSelector(state),
    current: getCurrentVenueSelector(state),
  };  
}

const connector = connect(mapStateToProps, mapDispatchToProps);

const Venue: React.FC<VenueProps> = (props) => {
  return <VenueComponent {...props} />;
};

export default connector(Venue);
