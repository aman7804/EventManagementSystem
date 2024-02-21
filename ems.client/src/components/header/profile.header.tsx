import { arrowProfileIcon, profile } from "assets/images";
import { Avatar, Box, Button, Typography } from "@mui/material";
import { IRegistrationResponse } from "../../interfaces/auth.interface";

export type CustomProps = {
  profileOpen: boolean;
  handleProfileClick: any;
};

export type UserProfileSectionProps = {
  user: IRegistrationResponse | null;
} & CustomProps;

const UserProfileSection = ({ user, ...props }: UserProfileSectionProps) => {
  return (
    <>
      <Button
        id="profile-button"
        aria-controls={props.profileOpen ? "profile-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={props.profileOpen ? "true" : undefined}
        onClick={props.handleProfileClick}
        className="btn-profile"
        disableElevation
      >
        <Avatar src={profile} alt="profile" />
        <Box className="profile-info">
          <Box>
            <Typography variant="h5" ml={1}> 
              {user?.fullName}
            </Typography>
            {/* <Typography variant="h6">{user?.roleName}</Typography> */}
          </Box>
          <img src={arrowProfileIcon} alt="arrow" />
        </Box>
      </Button>
    </>
  );
};

export default UserProfileSection;