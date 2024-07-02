import { connect, MapDispatchToProps } from "react-redux";
import PackageComponent, { PackageProps } from "pages/package/package";
import {
  saveRequest,
  deleteRequest,
  getByIdRequest,
  listRequest,
} from "store/package/actions";
import {
  IPackageContainerDispatch, 
  IPackage,
} from "interfaces/package.interface";
import { RootState } from "store/root/root.reducer";
import { getCurrentPackageSelector, getPackageListSelector } from "store/package/selector";
import { getDropDownSelector as getVenueDropDownSelector } from "store/venue/selector";
import { getDropDownSelector as getCateringDropDownSelector } from "store/catering/selector";
import { getDropDownSelector as getDecorationDropDownSelector } from "store/decoration/selector";
import { getDropDownSelector as getPhotographyDropDownSelector } from "store/photography/selector";
import { dropDownListRequest as cateringDropDownListRequest } from "store/catering/actions";
import { dropDownListRequest as venueDropDownListRequest } from "store/venue/actions";
import { dropDownListRequest as decorationDropDownListRequest } from "store/decoration/actions";
import { dropDownListRequest as photographyDropDownListRequest } from "store/photography/actions";

const mapDispatchToProps: MapDispatchToProps<
  IPackageContainerDispatch,
  IPackage
> = {
  listRequest: listRequest,
  saveRequest: saveRequest,
  getRequest: getByIdRequest,
  deleteRequest: deleteRequest,
  getCateringDropDownRequest: cateringDropDownListRequest,
  getVenueDropDownRequest: venueDropDownListRequest,
  getPhotographyDropDownRequest: photographyDropDownListRequest,
  getDecorationDropDownRequest: decorationDropDownListRequest,
};

const mapStateToProps = (state:RootState) => {
  return {
    list: getPackageListSelector(state),
    current: getCurrentPackageSelector(state),
    venueDropDownList: getVenueDropDownSelector(state),
    photographyDropDownList: getPhotographyDropDownSelector(state),
    decorationDropDownList: getDecorationDropDownSelector(state),
    cateringDropDownList: getCateringDropDownSelector(state),
  };  
}

const connector = connect(mapStateToProps, mapDispatchToProps);

const Package: React.FC<PackageProps> = (props) => {
  return <PackageComponent {...props} />;
};

export default connector(Package);
