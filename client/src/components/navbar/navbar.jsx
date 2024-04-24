import React, { useContext, useEffect, useState } from "react";
import "./style.css";
import {
  AppBar,
  Avatar,
  Badge,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Menu,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  AccountCircleOutlined,
  DensityMedium,
  Logout,
  Message,
  MoreHorizOutlined,
  MoreVert,
  Notifications,
} from "@mui/icons-material";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { updateDetails } from "../../redux/user";
import { hideLoading, setLoading } from "../../redux/loading";
import logo from "../../assets/logo2.png";
import { userMenu } from "../drawer/menuItems";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import NotificationModal from "./notificationModal";
import LogoutDialog from "./logoutDialog";
import MenuModal from "./Menu";
import { purgeContext } from "../../context/purge";

const Navbar = () => {
  const { viewportWidth } = useContext(purgeContext);
  const location = useLocation();
  axios.defaults.withCredentials = true;
  const details = useSelector((state) => state.user.details);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [message, setMessage] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null); // submenu(avatar button)
  const open = Boolean(anchorEl);

  const [dialogOpen, setDialogOpen] = useState(false);

  const handlepreLogout = () => {
    setDialogOpen(true);
  };

  const dropDownItems = [
    {
      name: "Profile",
      icon: <AccountCircleOutlined />,
      path: "profile",
    },
    {
      name: "Logout",
      icon: <Logout />,
      path: "login",
    },
  ];

  const fetchUser = async () => {
    try {
      dispatch(setLoading());
      const response = await axios.get(
        `${import.meta.env.VITE_API_GETUSER}/${details._id}`
      );

      const { success, detailss } = response.data;

      success ? dispatch(updateDetails(detailss)) : null;

      dispatch(hideLoading());
    } catch (err) {
      dispatch(hideLoading());
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleProfileMenu = (to) => {
    setAnchorEl(null);
    navigate(`/${to}`);
  };

  const handleAlerts = (type) => {
    switch (type) {
      case "notifications":
        return (() => {
          setNotificationOpen(true);
          setMessage(false);
        })();
      case "messages":
        return (() => {
          setNotificationOpen(true);
          setMessage(true);
        })();
    }
  };

  return (
    <>
      <AppBar
        component="nav"
        position="fixed"
        elevation={0}
        sx={{
          backgroundColor: "honeydew",
        }}
      >
        <Toolbar>
          {viewportWidth > 767 && (
            <>
              <Avatar sx={{ backgroundSize: "cover" }} alt="logo" src={logo} />
              <Typography sx={{ flexGrow: 1 }} variant="h5" color="primary">
                rastaTech
              </Typography>

              <Stack
                direction={"row"}
                flexGrow={1}
                justifyContent="space-around"
              >
                {userMenu?.map((menu, idx) => {
                  if (menu.title !== "Profile") {
                    return (
                      <NavLink
                        key={idx}
                        style={{
                          textDecoration: "none",
                          color: "blue",
                          fontSize: 18,
                          paddingTop: "2px",
                          borderTop:
                            location.pathname === `/${menu.path}`
                              ? "1px solid blue"
                              : null,
                        }}
                        to={`/${menu.path}`}
                      >
                        {menu.title}
                      </NavLink>
                    );
                  }
                })}
              </Stack>
              <Toolbar sx={{ flexGrow: 1 }} />
            </>
          )}

          {viewportWidth <= 767 && (
            <>
              <IconButton onClick={() => setMenuOpen(true)}>
                <DensityMedium />
              </IconButton>

              <Toolbar sx={{ flexGrow: 1 }} />
              <Typography color="primary">Rasta & Friends</Typography>
              <Toolbar sx={{ flexGrow: 1 }} />
            </>
          )}

          <Tooltip title="notifications">
            <IconButton onClick={() => handleAlerts("notifications")}>
              <Badge
                badgeContent={details?.unreadNotifications?.length}
                color="error"
              >
                <Notifications color="primary" />
              </Badge>
            </IconButton>
          </Tooltip>

          <Tooltip title="messages">
            <IconButton onClick={() => handleAlerts("messages")}>
              <Badge
                badgeContent={details?.unreadMessages?.length}
                color="error"
              >
                <Message color="primary" />
              </Badge>
            </IconButton>
          </Tooltip>

          <IconButton
            size="small"
            sx={{ marginLeft: "1rem" }}
            onClick={(e) => setAnchorEl(e.currentTarget)}
          >
            <Avatar sx={{ background: "coral" }} sizes="small">
              {details?.username[0].toUpperCase()}
            </Avatar>
          </IconButton>

          <Menu
            sx={{ marginTop: "3rem" }}
            anchorEl={anchorEl}
            open={open}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            onClose={() => setAnchorEl(null)}
          >
            <List>
              {dropDownItems?.map((item, idx) => {
                return (
                  <ListItem key={idx}>
                    <ListItemButton
                      onClick={
                        item.name == "Logout"
                          ? () => handlepreLogout()
                          : () => handleProfileMenu(item.path)
                      }
                    >
                      <ListItemText>{item.name}</ListItemText>
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Menu>
          <LogoutDialog
            dialogOpen={dialogOpen}
            setDialogOpen={setDialogOpen}
            setAnchorEl={setAnchorEl}
          />
        </Toolbar>

        <Divider />
        {/* ALERTS MODAL */}
        <NotificationModal
          notificationOpen={notificationOpen}
          setNotificationOpen={setNotificationOpen}
          details={details}
          message={message}
          viewportWidth={viewportWidth}
        />
        {/* Menu for small screens MODAL */}
        <MenuModal
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
          viewportWidth={viewportWidth}
        />
      </AppBar>
    </>
  );
};

export default Navbar;
