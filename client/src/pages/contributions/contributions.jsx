import { Help } from "@mui/icons-material";
import { Box, Button, Stack, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import QuestionModal from "./QuestionModal";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, setLoading } from "../../redux/loading";
import { updatePosts } from "../../redux/posts";
import Posts from "./Posts";
import { persistor } from "../../main";
import { purgeContext } from "../../context/purge";

const Contributions = () => {
  const dispatch = useDispatch();
  const _id = useSelector((state) => state.user?.details._id);
  const { cookie } = useContext(purgeContext);
  const [modalOpen, setModalOpen] = useState(false);

  const purgeSto = async () => {
    return persistor.purge();
  };

  useEffect(() => {
    if (!cookie.purge) {
      purgeSto();
      window.location.reload();
    }
  }, [cookie.purge]);

  const getPosts = async () => {
    try {
      dispatch(setLoading());
      const response = await axios.get(
        `${import.meta.env.VITE_API_GETPOSTS}/${_id}`
      );
      const { posts } = response.data;
      dispatch(updatePosts(posts));
      dispatch(hideLoading());
    } catch (error) {
      dispatch(hideLoading());
      console.log(error.message);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        p: 3,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Stack direction="column" spacing={2} sx={{ p: 3, alignItems: "center" }}>
        <Typography variant="h6" color="secondary">
          Ask your Questions here. Your peers will be willing to help
        </Typography>
        <Button
          onClick={() => setModalOpen(true)}
          sx={{ width: "300px" }}
          size="large"
          variant="contained"
          color="primary"
        >
          Ask Question
          <Help />
        </Button>
      </Stack>

      {/* MODAL FOR QUESTIONS */}
      <QuestionModal modalOpen={modalOpen} setModalOpen={setModalOpen} />

      {/* POSTS  */}
      <Posts modalOpen={modalOpen} setModalOpen={setModalOpen} />
    </Box>
  );
};

export default Contributions;
