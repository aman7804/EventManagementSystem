import {
    closeIcon,
    eyeClose,
    eyeOpen,
    headerLogo,
    lockIcon,
    logoutIcon,
    MenuIcon,
    mobileLogo,
    profileIcon,
    saveIcon,
  } from "assets/images";
  import {
    AppBar,
    Box,
    Button,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    Menu,
    MenuItem,
    Modal,
    OutlinedInput,
    TextField,
    Toolbar,
    Typography,
  } from "@mui/material";
  import React from "react";
  import authService from "services/auth.service";
  import { useNavigate } from "react-router-dom";
  import UserProfileSection from "./profile.header";
  
  const Header: React.FC = () => {
    const navigate = useNavigate();
    const [profileMenu, setProfileMenu] = React.useState<null | HTMLElement>(
      null,
    );
    const profileOpen = Boolean(profileMenu);
    const handleProfileClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setProfileMenu(event.currentTarget);
    };
    const handleProfileClose = () => {
      setProfileMenu(null);
    };
  
    const [reset, setReset] = React.useState(false);
    const handleReset = () => setReset(true);
    const handleResetClose = () => setReset(false);
  
    const [showPassword, setShowPassword] = React.useState(true);
  
    const handleClickShowPassword = () => setShowPassword((show) => !show);
  
    const handleMouseDownPassword = (event: { preventDefault: () => void }) => {
      event.preventDefault();
    };
  
    const logOutClick = () => {
      authService.signOut();
      navigate("/login");
    };
  
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
            <a
              href="/dashboard"
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
            </a>
          </Box>
          <UserProfileSection
            profileOpen={profileOpen}
            handleProfileClick={handleProfileClick}
          />
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
              <Typography variant="h5">James Henry</Typography>
              <Typography variant="h6">Admin</Typography>
            </MenuItem>
            <MenuItem onClick={handleProfileClose} title="Profile">
              <Button>
                <img src={profileIcon} alt="Profile" />
                <span>Profile</span>
              </Button>
            </MenuItem>
            <MenuItem onClick={handleProfileClose} title="Profile">
              <Button onClick={handleReset}>
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
  
        <Modal open={reset} onClose={handleResetClose}>
          <Box className="common-modal reset-modal">
            <Box className="modal-header">
              <Typography variant="h4">Change Password</Typography>
              <IconButton onClick={handleResetClose}>
                <img src={closeIcon} alt="close" />
              </IconButton>
            </Box>
            <Box className="modal-body">
              <TextField
                id="current-pwd"
                type="password"
                label="Current Password"
                fullWidth
                variant="outlined"
              />
              <TextField
                id="new-pwd"
                type="password"
                label="New Password"
                fullWidth
                variant="outlined"
              />
              <FormControl variant="outlined" fullWidth>
                <InputLabel htmlFor="password">Confirm Password</InputLabel>
                <OutlinedInput
                  id="confirm-pwd"
                  className="with-icon"
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                        disableFocusRipple
                        disableRipple
                      >
                        {showPassword ? (
                          <img src={eyeOpen} alt="show" />
                        ) : (
                          <img src={eyeClose} alt="hide" />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
            </Box>
            <Box className="modal-footer">
              <Button
                variant="contained"
                className="btn-save"
                onClick={handleResetClose}
              >
                <img src={saveIcon} alt="save" />
                Save
              </Button>
              <Button
                variant="outlined"
                className="btn-cancel"
                onClick={handleResetClose}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </Modal>
      </AppBar>
    );
  };
  
  export default Header;