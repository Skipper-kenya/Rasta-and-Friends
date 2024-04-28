import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  Modal,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import EditProfile from "./EditProfile";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { updateProfile } from "../../redux/user";
import { hideLoading, setLoading } from "../../redux/loading";
import { breakpoints } from "../../components/breakpoints";
import Masonry from "react-masonry-css";

const Uploaded = ({ _id, img, userProfile }) => {
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const handleEdit = async (title) => {
    try {
      setEditContent(userProfile[title]);
      setTitle(title);
      setModalOpen(true);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeleteProfile = async () => {
    setDialogOpen(false);
    try {
      dispatch(setLoading());
      const response = await axios.post(
        import.meta.env.VITE_API_DELETEPROFILE,
        { id: _id }
      );
      const { success, message, profile } = response.data;
      dispatch(hideLoading());
      success
        ? (() => {
            toast.success(message);
            dispatch(updateProfile(profile));
          })()
        : toast.error("something went wrong");
    } catch (error) {
      console.log(error.message);
      dispatch(hideLoading());
    }
  };

  return (
    <Box>
      <Typography variant="h6" color="secondary">
        Your Profile Details
      </Typography>

      <Dialog
        open={dialogOpen}
        onClose={() => {
          setDialogOpen(false);
        }}
      >
        <DialogTitle>Delete Profile? </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Do you want to delete your profile? All details will be lost.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>No</Button>
          <Button onClick={handleDeleteProfile}>Yes</Button>
        </DialogActions>
      </Dialog>

      <Divider />
      <Toolbar>
        <Tooltip title="Delete your profile" color="error">
          <IconButton onClick={() => setDialogOpen(true)}>
            <Typography>Delete your profile</Typography>
            <Delete color="error" />
          </IconButton>
        </Tooltip>
      </Toolbar>
      <Box>
        <EditProfile
          editContent={editContent}
          setEditContent={setEditContent}
          title={title}
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
        />

        <Masonry
          breakpointCols={breakpoints}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          <CreateCard
            title="image"
            subheader="Your profile image"
            content={userProfile.name}
            image={img}
            handleEdit={handleEdit}
          />
          <CreateCard
            title="name"
            subheader="Developer's full name"
            content={userProfile.name}
            handleEdit={handleEdit}
          />
          <CreateCard
            title="githubLink"
            subheader="Link to Github page"
            content={userProfile.githubLink}
            handleEdit={handleEdit}
          />
          <CreateCard
            title="description"
            subheader="More about the you"
            content={userProfile.description}
            handleEdit={handleEdit}
          />
          <CreateCard
            title="skills"
            subheader="The skills you posess"
            content={userProfile.skills}
            handleEdit={handleEdit}
          />
        </Masonry>
      </Box>
    </Box>
  );
};

const CreateCard = ({ title, subheader, content, image, handleEdit }) => {
  return (
    <div>
      <Card>
        <CardHeader
          avatar={
            <Avatar sx={{ backgroundColor: "coral" }}>
              {title[0].toUpperCase()}
            </Avatar>
          }
          title={title[0].toUpperCase() + title.substring(1)}
          subheader={subheader}
          action={
            title === "image" ? null : (
              <Tooltip title="edit">
                <IconButton onClick={() => handleEdit(title)}>
                  <Edit />
                </IconButton>
              </Tooltip>
            )
          }
        />
        {title === "image" ? (
          <Grid
            container
            style={{
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Grid item>
              <Avatar sx={{ height: 100, width: 100, backgroundSize: "cover" }}>
                <img
                  crossOrigin="anonymous"
                  src={`${
                    import.meta.env.VITE_API_SERVER
                  }/profileimages/${image}`}
                />
              </Avatar>
            </Grid>
          </Grid>
        ) : (
          <CardContent>
            {title === "skills" ? (
              content?.map((skill, idx) => (
                <Typography key={idx}>{skill}</Typography>
              ))
            ) : (
              <Typography>{content}</Typography>
            )}
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export default Uploaded;
