import { ArrowBack } from "@mui/icons-material";
import {
  Badge,
  Box,
  Button,
  Card,
  CardHeader,
  CardMedia,
  Divider,
  IconButton,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";

import { updatePosts } from "../../redux/posts";
import { setLoading, hideLoading } from "../../redux/loading";
import { updateDetails } from "../../redux/user";
import { purgeContext } from "../../context/purge";

const Post = () => {
  const { viewportWidth } = useContext(purgeContext);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.post.posts);
  const [answer, setAnswer] = useState("");
  const params = useParams();
  const details = useSelector((state) => state.user.details);

  const [url, setUrl] = useState(null);

  const currentPost = posts?.filter((post) => post._id === params?.id);

  useEffect(() => {
    const dat = currentPost[0]?.image?.data?.data || null;
    const imageData = dat ? [...dat] : null;
    const uint8Array = new Uint8Array(imageData);
    const blob = new Blob([uint8Array], { type: "image/jpeg" });
    const imageUrl = URL.createObjectURL(blob);

    dat ? setUrl(imageUrl) : setUrl(null);
  }, []);

  const handleSubmitAnswer = async () => {
    if (answer) {
      try {
        dispatch(setLoading());
        const response = await axios.post(import.meta.env.VITE_API_ANSWERPOST, {
          answer,
          post_id: currentPost[0]._id,
          user_id: details?._id,
        });

        const { success, message, posts, dets } = response.data;

        dispatch(hideLoading());

        success
          ? (() => {
              toast.success(message);
              dispatch(updateDetails(dets));
              dispatch(updatePosts(posts));
              setAnswer("");
            })()
          : toast.error("something went wrong");
      } catch (error) {
        dispatch(hideLoading());

        console.log(error.message);
      }
    } else {
      toast.error("answers field required");
    }
  };

  return (
    <Box
      sx={{
        width: viewportWidth <= 767 ? "90%" : "70%",
        paddingBottom: "5rem",
      }}
    >
      <Stack direction="row ">
        <Toolbar />
        <Badge title="back to contributions page" sx={{ flexGrow: 1 }}>
          <IconButton onClick={() => navigate("/contributions")}>
            <ArrowBack fontSize="large" />
          </IconButton>
        </Badge>
      </Stack>
      <Divider />
      <Stack direction="column" spacing={1} sx={{ paddingBottom: "1rem" }}>
        <Typography variant="h6" color="primary" textAlign="center">
          {currentPost[0]?.title || "no title"}
          <Stack direction="row" spacing={2}>
            <span>{currentPost[0]?.answers.length || 0} Answers</span>
            <span>0 Views</span>
          </Stack>
        </Typography>

        <Typography
          sx={{ p: 5, background: "lightgrey", borderRadius: "6px" }}
          variant="h6"
        >
          {currentPost[0]?.question}?
        </Typography>

        {url && (
          <Card>
            <CardHeader subheader="Supporting image" />
            <CardMedia
              sx={{ backgroundSize: "cover", backgroundPosition: "center" }}
              component="img"
              height="350px"
              width="350px"
              image={url}
              crossOrigin="anonymous"
              alt={currentPost[0]?.filename}
            />
          </Card>
        )}

        <Stack direction="column" spacing={1} justifyContent={"flex-start"}>
          <Typography>Your Answer</Typography>
          <TextField
            sx={{
              width: viewportWidth <= 767 ? "100%" : "400px",
              background: "lightgrey",
              outline: 0,
            }}
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            name="answer"
            label="Your Answer"
            multiline
            rows={3}
          />
          <Button
            onClick={handleSubmitAnswer}
            sx={{ width: viewportWidth <= 767 ? "100%" : "400px" }}
            variant="contained"
            color="primary"
            size="large"
          >
            Post your Answer
          </Button>
        </Stack>
      </Stack>
      {/* ANSWERS */}
      <Divider />
      <Typography
        variant="h5"
        color="primary"
        textAlign="center"
        sx={{ paddingTop: "2rem" }}
      >
        Answers to the Question
      </Typography>
      <Stack
        direction="column"
        spacing={1}
        sx={{
          paddingTop: "2rem",
        }}
      >
        {currentPost[0]?.answers.map((answer, idx) => (
          <Typography
            key={idx}
            sx={{
              background: "lightgrey",
              padding: "1rem",
              marginTop: "1px",
            }}
          >
            {answer}
          </Typography>
        ))}
      </Stack>
    </Box>
  );
};

export default Post;
