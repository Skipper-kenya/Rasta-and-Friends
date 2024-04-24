import { Cancel, X } from "@mui/icons-material";
import {
  Modal,
  Box,
  Typography,
  Tooltip,
  Stack,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, setLoading } from "../../redux/loading";
import { toast } from "sonner";
import { updateProfile } from "../../redux/user";

const EditProfile = ({
  editContent,
  setEditContent,
  title,
  modalOpen,
  setModalOpen,
}) => {

  const dispatch = useDispatch();
  const _id = useSelector((state) => state.user.details?._id);
  const handleSubmitEdit = async () => {
    try {
      dispatch(setLoading());
      const response = await axios.post(
        import.meta.env.VITE_API_UPDATEPROFILE,
        {
          _id,
          editContent,
          title,
        }
      );
      const { success, message, profile } = response.data;
      dispatch(hideLoading());

      !success
        ? toast.error("something went wrong")
        : (() => {
            dispatch(updateProfile(profile));
            toast.success(message);
            setModalOpen(false);
          })();
    } catch (error) {
      dispatch(hideLoading());
      console.log(error.message);
    }
  };
  return (
    <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
      <Box
        sx={{
          width: 400,
          position: "absolute",
          top: "30%",
          left: "30%",
          background: "white",
          padding: 2,
          outline: 0,
        }}
      >
        <Stack direction="row">
          <Typography
            sx={{ flexGrow: 1 }}
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            Edit {title}
          </Typography>

          <IconButton onClick={() => setModalOpen(false)}>
            <Cancel />
          </IconButton>
        </Stack>

        <Stack direction="column" spacing={2}>
          <TextField
            label={title}
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
          />
          <Button
            color="primary"
            variant="contained"
            onClick={handleSubmitEdit}
          >
            Submit Edit
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default EditProfile;
