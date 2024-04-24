import React, { useContext, useState } from "react";
import "./styles.css";
import {
  Drawer,
  Toolbar,
  Divider,
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import logo from "../../assets/logo2.png";
import axios from "axios";
import { userMenu } from "./menuItems";
import { useLocation, useNavigate } from "react-router-dom";
import { persistor } from "../../main";

const Drawerr = () => {
  const navigate = useNavigate();
  const drawerWidth = 240;
  const location = useLocation();

  const [dialogOpen, setDialogOpen] = useState(false);

  const handlepreLogout = async () => {
    setDialogOpen(true);
  };
  const handleLogout = async () => {
    setDialogOpen(false);
    try {
      persistor.purge();
      await axios.delete(import.meta.env.VITE_API_LOGOUT);
      navigate("/login");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar sx={{ background: "rgb(66,63,83)" }}>
        <Avatar sx={{ backgroundSize: "cover" }} alt="logo" src={logo} />
        <Typography variant="h5" sx={{ color: "white" }}>
          rastaTech
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {userMenu?.map((menu, idx) => {
          return (
            <div key={idx}>
              <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
                <DialogTitle>Logout?</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Are you sure you want to log out? you won't access this
                    website unless you're logged in.
                  </DialogContentText>
                  <DialogActions>
                    <Button onClick={() => setDialogOpen(false)}>No</Button>
                    <Button onClick={handleLogout}>Yes</Button>
                  </DialogActions>
                </DialogContent>
              </Dialog>
              <ListItem key={idx}>
                <ListItemButton
                  selected={location.pathname === `/${menu.path}`}
                  onClick={ 
                    menu.title === "Logout"
                      ? handlepreLogout
                      : () => navigate(`/${menu.path}`)
                  }
                >
                  <ListItemIcon>{menu.icon}</ListItemIcon>
                  <ListItemText primary={menu.title} />
                </ListItemButton>
              </ListItem>
            </div>
          );
        })}
      </List>
    </Drawer>
  );
};

export default Drawerr;
