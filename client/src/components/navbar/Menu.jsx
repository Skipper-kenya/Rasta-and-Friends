import { Cancel } from "@mui/icons-material";
import {
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Modal,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import { userMenu } from "../drawer/menuItems";
import { useNavigate } from "react-router-dom";

const MenuModal = ({ menuOpen, setMenuOpen }) => {
  const navigate = useNavigate();
  return (
    <Modal open={menuOpen} onClose={() => setMenuOpen(false)}>
      <Box
        sx={{
          background: "white",
          width: "60%",
          height: "auto",
          minHeight: "100vh",
          position: "absolute",
          outline: "0",
          left: 0,
          top: 0,
        }}
      >
        <Toolbar>
          <Typography sx={{ flexGrow: 1 }} color="primary">
            Rasta & Friends
          </Typography>
          <IconButton onClick={() => setMenuOpen(false)}>
            <Cancel />
          </IconButton>
        </Toolbar>
        <Divider />
        <List>
          {userMenu?.map((menu, idx) => {
            return (
              <div key={idx}>
                <ListItem key={idx}>
                  <ListItemButton
                    selected={location.pathname === `/${menu.path}`}
                    onClick={
                      menu.title === "Logout"
                        ? handlepreLogout
                        : () => {
                            navigate(`/${menu.path}`);
                            setMenuOpen(false);
                          }
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
      </Box>
    </Modal>
  );
};

export default MenuModal;
