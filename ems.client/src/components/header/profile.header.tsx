import { arrowProfileIcon, accountIcon} from "assets/images";
import { Avatar, Box, Button, Typography } from "@mui/material";
import { ILoginResponse } from "../../interfaces/auth.interface";

export type CustomProps = {
  profileOpen: boolean;
  handleProfileClick: any;
};

export type UserProfileSectionProps = {
  user: ILoginResponse | null;
} & CustomProps;

const UserProfileSection = ({ user, ...props }: UserProfileSectionProps) => {
  console.log(user)
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
        <Avatar src={accountIcon} alt="profile" />
        <Box className="profile-info">
          <Box>
            <Typography variant="h5" ml={1}>
              {user?.firstName} {user?.lastName}
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