import { Grid, Box } from "@mui/material";
import DashboardCard from "components/cards/DashboardCard";
import BookingReport from "components/charts/BookingReport";
import LatestQueries from "./LatestQueries";

const Dashboard: React.FC = () => {

  const startDate = new Date('2024-02-26');
  const endDate = new Date('2024-03-05');
  
  const formattedStartDate = startDate.toLocaleDateString('en-US',
    {month: 'long', day: 'numeric'});
  
  const formattedEndDate = endDate.toLocaleDateString('en-US',
    { month: 'long', day: 'numeric' });
    
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
                <BookingReport />
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
