import {
  headerLogo,
  lockIcon,
  logoutIcon,
  MenuIcon,
  mobileLogo,
  profileIcon,
} from "assets/images";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import authService from "services/auth.service";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { checkIsAuthenticated, getUserSelector } from "store/auth/selector";
import { connect, useSelector } from "react-redux";
import { RootState } from "store/root/root.reducer";
import { ILoginResponse } from "interfaces/auth.interface";
import UserProfileSection from "./profile.header";
import { IProfile } from "interfaces/profile.interface";
import { getProfileSelector } from "store/profile/selector";
  
const bc = new BroadcastChannel("change_password")
bc.onmessage=(e)=>{
  toast.success(e.data)
}  

const Header: React.FC<IGetUserProp> = ({userDetails, userProfile}) => {
  const navigate = useNavigate();
  
  const [profileMenu, setProfileMenu] = React.useState<null | HTMLElement>(null);
  const [profileOpen, setProfileOpen] = React.useState<boolean>(false);

  const handleProfileClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setProfileMenu(event.currentTarget);
    setProfileOpen(true)
  };
  
  const handleProfileClose = () => {  
    setProfileMenu(null);
    setProfileOpen(false)
  };
  
  const logOutClick = () => {
    authService.signOut();
    navigate("/login");
  };
  
  const goToChangePassword = () => 
    window.open("/change-password", "_blank")
  const goToProfile = () => 
    navigate("User/profile")
  const goToLogin = () => 
    navigate("login")
  const goToSignup = () => 
    navigate("signup")

  
  const isAuthenticated = useSelector(checkIsAuthenticated);
  return (
    <AppBar position="static" className="header">
      <Toolbar
        disableGutters
        sx={{ flexWrap: "wrap" }}
        className="header-container"
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton
            size="large"
            onClick={() => document.body.classList.toggle("sidebar-toggle")}
            sx={{ display: { xs: "flex", md: "none" } }}
            className="btn-menu"
          >
            <img src={MenuIcon} alt="menu" />
          </IconButton>
          <Link
            to="/dashboard"
            className="header-logo"
            title="Event Management System"
          >
            <img
              src={headerLogo}
              alt="Event Management System"
              className="desktop"
            />
            <img
              src={mobileLogo}
              alt="Event Management System"
              className="mobile"
            />
          </Link>
        </Box>
        {
          isAuthenticated ?
          (<UserProfileSection
            user={userProfile || userDetails}
            profileOpen={profileOpen}
            handleProfileClick={handleProfileClick}
          />)
          : 
          (<>
          <Box sx={{ display: "flex", alignItems:"center" }}>
            <Button onClick={goToLogin}>
              <span>Login</span>
            </Button>
            <Button onClick={goToSignup}>
              <span>Signup</span>
            </Button>
          </Box>
          </>)
        }
        <Menu
          id="profile-menu"
          anchorEl={profileMenu}
          open={profileOpen}
          onClose={handleProfileClose}
          MenuListProps={{
            "aria-labelledby": "profile-button",
          }}
          className="profile-menu"
        >
          <MenuItem
            onClick={handleProfileClose}
            sx={{ display: { xs: "flex", md: "none" } }}
            className="profile-info"
          >
            <Typography variant="h5">{userDetails?.firstName} {userDetails?.lastName}</Typography>
            <Typography variant="h6">Admin</Typography>
          </MenuItem>
          <MenuItem onClick={handleProfileClose} title="Profile">
            <Button onClick={goToProfile}>
              <img src={profileIcon} alt="Profile" />
              <span>Profile</span>
            </Button>
          </MenuItem>
          <MenuItem onClick={handleProfileClose} title="ChangePassword">
            <Button onClick={goToChangePassword}>
              <img src={lockIcon} alt="Change password" />
              <span>Change Password</span>
            </Button>
          </MenuItem>
          <MenuItem onClick={handleProfileClose} title="Logout">
            <Button onClick={logOutClick}>
              <img src={logoutIcon} alt="Logout" />
              <span>Logout</span>
            </Button>
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

interface IGetUserProp{
  userDetails: ILoginResponse | null;
  userProfile: IProfile | null;
}

const mapStateToProps = (state: RootState) => {
  return {
    userDetails: getUserSelector(state),
    userProfile: getProfileSelector(state)
  };
};

export default connect(mapStateToProps)(Header);