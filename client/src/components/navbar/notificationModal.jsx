import { Cancel, NoteAlt, ReadMoreSharp } from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Modal,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { updateDetails } from "../../redux/user";

import empty from "../../assets/empty.png";

const NotificationModal = ({
  notificationOpen,
  setNotificationOpen,
  details,
  message,
  viewportWidth,
}) => {
  const dispatch = useDispatch();

  const [isRead, setIsRead] = useState(false);

  //mark one read
  const handleMarkRead = async (idx) => {
    try {
      const response = await axios.post(import.meta.env.VITE_API_MARKREAD, {
        idx,
        _id: details._id,
        message,
      });
      const { dets, success } = response.data;
      success ? dispatch(updateDetails(dets)) : null;
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleMarkAllRead = async () => {
    try {
      const response = await axios.post(import.meta.env.VITE_API_MARKALLREAD, {
        _id: details._id,
        message,
      });
      const { dets, success } = response.data;
      success ? dispatch(updateDetails(dets)) : null;
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeleteAllRead = async () => {
    try {
      const response = await axios.post(
        import.meta.env.VITE_API_DELETEALLREAD,
        {
          _id: details._id,
          message,
        }
      );
      const { dets, success } = response.data;
      success ? dispatch(updateDetails(dets)) : null;
    } catch (error) {
      console.log(error.message);
    }
  };

  const pageToBeRendered = () => {
    return !message
      ? isRead
        ? details?.readNotifications
        : details?.unreadNotifications
      : isRead
      ? details?.readMessages
      : details?.unreadMessages;
  };

  return (
    <Modal open={notificationOpen} onClose={() => setNotificationOpen(false)}>
      <Box
        sx={{
          background: "white",
          width: viewportWidth <= 767 ? "90%" : "60%",
          height: "auto",
          minHeight: "50vh",
          position: "absolute",
          outline: "0",
          left: viewportWidth <= 767 ? "5%" : "25%",
          top: "15%",
          textAlign: "center",
        }}
      >
        <Stack direction="row">
          <Toolbar sx={{ flexGrow: 1 }} />

          <Tooltip title={`close ${message ? "messages" : "notifications"}`}>
            <IconButton
              color="error"
              onClick={() => setNotificationOpen(false)}
            >
              <Cancel />
            </IconButton>
          </Tooltip>
        </Stack>

        <Divider />
        <Stack
          sx={{
            marginTop: "0.5rem",
            marginBottom: "0.5rem",
          }}
          direction="column"
        >
          <Stack
            direction="row"
            sx={{
              display: "flex",
              width: "100%",
              marginBottom: "0.5rem",
              justifyContent: "space-around",
            }}
          >
            <Button
              variant={!isRead ? "contained" : "outlined"}
              onClick={() => setIsRead(false)}
            >
              <NoteAlt />
              Unread {message ? "Messages" : "Notifications"}
            </Button>
            <Button
              variant={isRead ? "contained" : "outlined"}
              onClick={() => setIsRead(true)}
            >
              <ReadMoreSharp />
              Read {message ? "Messages" : "Notifications"}
            </Button>
          </Stack>

          {pageToBeRendered().length > 0 && (
            <Stack direction="row">
              <Typography flexGrow={1} />

              <Button
                onClick={isRead ? handleDeleteAllRead : handleMarkAllRead}
                variant="outlined"
                size="small"
                color={isRead ? "error" : "info"}
              >
                {isRead ? "Delete all Read" : "Mark all Read"}
              </Button>
            </Stack>
          )}
        </Stack>

        <List>
          {pageToBeRendered().length > 0 &&
            pageToBeRendered()?.map((mess, idx) => (
              <ListItem
                sx={{
                  padding: 1,
                  margin: 0.4,
                  borderRadius: "6px",
                  cursor: "pointer",
                  width: "97%",
                  background: "#DBD7D2",
                  border: "1px solid honeydew",
                }}
                key={idx}
              >
                <ListItemText
                  sx={{ flexGrow: 1 }}
                  primary={!message ? mess.message : mess.answer}
                />
                {!isRead && (
                  <ListItemButton
                    onClick={() => handleMarkRead(idx)}
                    color="secondary"
                  >
                    Mark as read
                  </ListItemButton>
                )}

                <Divider />
              </ListItem>
            ))}

          {pageToBeRendered().length < 1 && (
            <>
              <Typography>The Inbox is empty</Typography>
              <img
                style={{ width: 150, height: 150 }}
                src={empty}
                alt="nothing here"
              />
            </>
          )}
        </List>
      </Box>
    </Modal>
  );
};

export default NotificationModal;
