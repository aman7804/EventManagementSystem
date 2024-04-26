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

const mapDispatchToProps: MapDispatchToProps<
  IPackageContainerDispatch,
  IPackage
> = {
  listRequest: listRequest,
  saveRequest: saveRequest,
  getRequest: getByIdRequest,
  deleteRequest: deleteRequest,
};

const mapStateToProps = (state:RootState) => {
  return {
    list: getPackageListSelector(state),
    current: getCurrentPackageSelector(state),
  };  
}

const connector = connect(mapStateToProps, mapDispatchToProps);

const Package: React.FC<PackageProps> = (props) => {
  return <PackageComponent {...props} />;
};

export default connector(Package);
