import { Grid, Box } from "@mui/material";
import DashboardCard from "components/cards/DashboardCard";
import BarChart from "components/charts/BarChart";

const Dashboard: React.FC = () => {

  const startDate = new Date('2024-02-26');
  const endDate = new Date('2024-03-05');
  
  const formattedStartDate = startDate.toLocaleDateString('en-US',
    {month: 'long', day: 'numeric'});
  
  const formattedEndDate = endDate.toLocaleDateString('en-US',
    { month: 'long', day: 'numeric' });
    
  return (
    <Grid container spacing={2}>
      {/* 60% Column */}
      <Grid item xs={8}>
        <Grid container spacing={2}>
          {/* First Row */}
          <Grid item xs={6}>
            <DashboardCard
              title="Bookings"
              startDate={formattedStartDate}
              endDate={formattedEndDate}
              number={10000}
              percentage={69}
              seeMore="click here to see more info."
            />
          </Grid>
          <Grid item xs={6}>
            <DashboardCard
              title="Bookings"
              startDate={formattedStartDate}
              endDate={formattedEndDate}
              number={10000}
              percentage={69}
              seeMore="click here to see more info."
            />
          </Grid>
          {/* Second Row */}
          <Grid item xs={12}>
            <BarChart />
          </Grid>
        </Grid>
      </Grid>
      {/* 40% Column */}
      <Grid item xs={4}>
        {/* Add content for the 40% column if needed */}
      </Grid>
    </Grid>
  );
};

export default Dashboard;
