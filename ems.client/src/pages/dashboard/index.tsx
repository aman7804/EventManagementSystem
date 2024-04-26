import { connect, MapDispatchToProps } from "react-redux";
import DashboardComponent, { DashboardProps } from "pages/dashboard/dashboard";
import { getReportRequest } from "store/booking/actions";
import {
  IDashboardContainerDispatch,
  IDashboardContainerState
} from "interfaces/dashboard.interface";
import { RootState } from "store/root/root.reducer";
import { getBookingReportSelector } from "store/booking/selector";

const mapDispatchToProps: MapDispatchToProps<
    IDashboardContainerDispatch,
    IDashboardContainerState
> = {
  getBookingReport: getReportRequest,
};

const mapStateToProps = (state:RootState) => {
  return {
    bookingReport: getBookingReportSelector(state),
  };  
}

const connector = connect(mapStateToProps, mapDispatchToProps);

const Dashboard: React.FC<DashboardProps> = (props) => {
  return <DashboardComponent {...props} />;
};

export default connector(Dashboard);
