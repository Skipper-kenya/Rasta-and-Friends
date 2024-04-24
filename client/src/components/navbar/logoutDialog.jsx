import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React from "react";
import { persistor } from "../../main";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LogoutDialog = ({ dialogOpen, setDialogOpen, setAnchorEl }) => {
  const navigate = useNavigate();

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
    <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
      <DialogTitle>Logout?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to log out? you won't access this website unless
          you're logged in.
        </DialogContentText>
        <DialogActions>
          <Button
            onClick={() => {
              setDialogOpen(false);
              setAnchorEl(null);
            }}
          >
            No
          </Button>
          <Button onClick={handleLogout}>Yes</Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default LogoutDialog;
