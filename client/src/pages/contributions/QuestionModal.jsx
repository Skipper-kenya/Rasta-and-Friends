import {
  Avatar,
  Badge,
  Box,
  Button,
  FormControl,
  FormControlLabel,
  IconButton,
  Modal,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { Cancel, PhotoCamera } from "@mui/icons-material";
import { useRef } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";

import { setLoading, hideLoading } from "../../redux/loading";
import { updatePosts } from "../../redux/posts";
import { purgeContext } from "../../context/purge";

const QuestionModal = ({ modalOpen, setModalOpen }) => {
  const { viewportWidth } = useContext(purgeContext);
  const details = useSelector((state) => state.user.details);
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const [sImg, setSimg] = useState(null);
  const [trackSkills, setTrackSkills] = useState("");
  const [image, setImage] = useState(null);

  const [post, setPost] = useState({
    privacy: "",
    question: "",
    title: "",
    skills: [],
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSimg(file.name);
    setImage(file);
  };

  const handleChanges = (e) => {
    const { name, value } = e.target;
    setPost((prev) => ({ ...prev, [name]: value }));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      if (trackSkills.trim() !== "") {
        setPost((prev) => ({
          ...prev,
          skills: [...post.skills, trackSkills.trim()],
        }));
        setTrackSkills("");
      }
    }
  };

  const cleanupInputs = async () => {
    setPost({ question: "", privacy: "", title: "" });
    setImage(null);
  };

  const handlePostQuestion = async () => {
    const { question, privacy, title, skills } = post;

    if (title && question) {
      try {
        dispatch(setLoading());
        const response = await axios.post(
          import.meta.env.VITE_API_ADDPOST,
          {
            postDetails: { question, privacy, title, skills },
            image,
            postOwner: details._id,
            postUsername: details.username,
          },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        const { message, success, posts } = response.data;
        dispatch(updatePosts(posts));
        dispatch(hideLoading());

        success
          ? (() => {
              cleanupInputs();
              toast.success(message);
              setModalOpen(false);
            })()
          : null;
      } catch (error) {
        dispatch(hideLoading());
        console.log(error.message);
      }
    } else {
      toast.error("title and question fields required");
    }
  };
  return (
    <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
      <Box
        sx={{
          position: "absolute",
          top: viewportWidth <= 767 ? "0%" : "10%",
          left: viewportWidth <= 767 ? "5%" : "35%",
          background: "white",
          width: viewportWidth <= 767 ? "90%" : " 500px",
          height: 450,
          overflow: "scroll",
          padding: "10px",
        }}
      >
        <Stack direction="row" spacing={1}>
          <Badge sx={{ flexGrow: 1 }} title="close page" color="error">
            <IconButton onClick={() => setModalOpen(false)}>
              <Cancel />
            </IconButton>
          </Badge>
          <Button
            onClick={handlePostQuestion}
            variant="contained"
            color="secondary"
            sx={{
              borderRadius: 7,
              width: 100,
            }}
          >
            Post
          </Button>
        </Stack>
        <Stack direction="column" spacing={1}>
          <Typography>Question title</Typography>
          <TextField
            label="The title of your question"
            name="title"
            size="small"
            value={post.title}
            onChange={handleChanges}
          />

          <Typography>Raise your question</Typography>
          <TextField
            label="Ask a coding question,bug or anthing here..."
            multiline
            name="question"
            rows={3}
            value={post.question}
            onChange={handleChanges}
          />
          <Typography>Languages(s)/skills involved</Typography>
          <Stack direction="row" spacing={1}>
            {post?.skills?.map((skill, idx) => (
              <span style={{ background: "lightgrey" }} key={idx}>
                {skill}
              </span>
            ))}
          </Stack>
          <TextField
            size="small"
            value={trackSkills}
            onChange={(e) => setTrackSkills(e.target.value)}
            onKeyDown={handleKeyPress}
            helperText="hit 'Enter' key  to enter next skill"
          />

          <Typography>Attach media to the post</Typography>

          <Stack direction="row">
            <Badge title="upload supporting image">
              <IconButton
                sx={{ width: 40 }}
                onClick={() => {
                  fileInputRef.current.click();
                }}
              >
                <Avatar sx={{ background: "coral" }}>
                  <PhotoCamera />
                </Avatar>
              </IconButton>
            </Badge>

            <input
              type="file"
              name="image"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: sImg ? "block" : "none" }}
            />
          </Stack>

          <Typography>Who can see your post? </Typography>
          <FormControl>
            <RadioGroup
              name="privacy"
              value={post.privacy}
              onChange={handleChanges}
            >
              <Stack direction="row" spacing={2}>
                <FormControlLabel
                  control={<Radio value="public" />}
                  label="Public"
                />
                <FormControlLabel
                  control={<Radio value="you" />}
                  label="Only you"
                />
              </Stack>
            </RadioGroup>
          </FormControl>
        </Stack>
      </Box>
    </Modal>
  );
};

export default QuestionModal;
