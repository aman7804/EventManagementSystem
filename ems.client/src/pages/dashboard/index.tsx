import { Typography } from "@mui/material";
import { Box } from "@mui/system";

const Dashboard: React.FC = () => {
  return (
    <div>
      <Box className="content-header">
        <Typography variant="h2" className="heading">
          Dashboard
        </Typography>
      </Box>
    </div>
  );
};

export default Dashboard;