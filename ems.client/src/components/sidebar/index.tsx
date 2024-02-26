import {
    dashboardIcon
  } from "assets/images";
  import { Box, List, ListItemButton, Typography } from "@mui/material";
  import React from "react";
  import { NavLink } from "react-router-dom";
  import { useSelector } from "react-redux";
  import { checkIsAdmin, checkIsAuthenticated } from "store/auth/selector";
  import { adminMenu, publicMenu } from "./menu";
  
  const Sidebar: React.FC = () => {
    const isAuthenticated = useSelector(checkIsAuthenticated);
    const isAdmin = useSelector(checkIsAdmin);
    const menuList = isAdmin ? adminMenu : publicMenu;
    return (
      <Box component="nav" className="sidebar">
        {isAuthenticated && 
          <Typography variant="h6" className="sidebar-item">
            {isAdmin ? "Administrators" : "Customer"}
          </Typography>
        }
        <List className="sidebar-menu">
          {isAuthenticated && (
            menuList.map(item => {
              return <ListItemButton key={item.text}>
                      <NavLink to={item.route}>
                        <img src={item.icon} alt={item.text} />
                        {item.text}
                      </NavLink>
                    </ListItemButton>    
            })
                  
        )}
        </List>      
      </Box>
    );
  };
  
  export default Sidebar;