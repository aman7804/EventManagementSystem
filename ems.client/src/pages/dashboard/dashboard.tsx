import { Grid, Box } from "@mui/material";
import DashboardCard from "components/cards/DashboardCard";
import BookingReport from "components/charts/BookingReport";
import LatestQueries from "./LatestQueries";
import { IDashboardContainerDispatch, IDashboardContainerState } from "interfaces/dashboard.interface";
import { EnumBookingReportType } from "utils/enums";
import { useEffect, useState } from "react";
import * as GENERIC from "interfaces/generic.interface";
import { IBookingReport } from "interfaces/booking.interface";


export type DashboardProps = IDashboardContainerState &
  IDashboardContainerDispatch;


const Dashboard: React.FC<DashboardProps> = (props) => {
  const [reportData, setReportData] = useState<number[] | undefined>([]);

  useEffect(() => {
    onReportTypeChange(EnumBookingReportType.monthly);
  },[])

  const startDate = new Date('2024-02-26');
  const endDate = new Date('2024-03-05');
  
  const formattedStartDate = startDate.toLocaleDateString('en-US',
    {month: 'long', day: 'numeric'});
  
  const formattedEndDate = endDate.toLocaleDateString('en-US',
    { month: 'long', day: 'numeric' });


  const onReportTypeChange = (enumBookingReportType: EnumBookingReportType) => {
    const { getBookingReport } = props;

    const payload = {
      enumBookingReportType: enumBookingReportType,
      callback: onBookingReportSuccess,
    };
    getBookingReport(payload);
  }

  const onBookingReportSuccess = (response: GENERIC.IApiSuccessResponse<IBookingReport>) => {
    setReportData(response.data?.noOfBookings);
  };

  
  return (
    <>
    <Grid container spacing={2}>
      <Grid item xs={12} xl={12} md={12}>
        <Grid container spacing={2}>
          <Grid item xl={8} xs={12} md={12}>
            <Grid container spacing={2}>
              <Grid item xl={6} xs={12} md={6}>
                <DashboardCard
                  title="Bookings"
                  startDate={formattedStartDate}
                  endDate={formattedEndDate}
                  number={10000}
                  percentage={69}
                  seeMore="click here to see more info."
                />
              </Grid>
              <Grid item xl={6} xs={12} md={6}>
                <DashboardCard
                  title="Bookings"
                  startDate={formattedStartDate}
                  endDate={formattedEndDate}
                  number={10000}
                  percentage={69}
                  seeMore="click here to see more info."
                />
              </Grid>
              <Grid item xl={12} xs={12} md={12}>
                <BookingReport onReportTypeChange={onReportTypeChange} data={reportData}/>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xl={4} xs={12} md={12}>
            <LatestQueries/>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
    </>

  );
};

export default Dashboard;
