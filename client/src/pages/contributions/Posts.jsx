import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { purgeContext } from "../../context/purge";

const Posts = () => {
  const { viewportWidth } = useContext(purgeContext);
  const posts = useSelector((state) => state.post.posts);
  const navigate = useNavigate();

  const details = useSelector((state) => state.user.details);

  const handlePostNavigation = (post) => {
    navigate(`/post/${post._id}`);
  };

  return (
    <Box sx={{ width: viewportWidth <= 767 ? "90%" : "70%" }}>
      {posts?.map((post, idx) => {
        return (
          <Stack key={idx} direction="column" spacing={2}>
            <Divider />
            <Stack direction="row" spacing={2}>
              <span>{post?.answers?.length || 0} Answers</span>
              <span style={{ flexGrow: 1 }}>0 Views</span>
              <span>
                {post?.postUsername === details?.username
                  ? "you "
                  : post?.postUsername}{" "}
                asked
              </span>
            </Stack>
            <Stack direction="row">
              <Button
                sx={{ justifyContent: "flex-start", flexGrow: 1 }}
                onClick={() => handlePostNavigation(post)}
              >
                {post.title}
              </Button>
              {format(post?.updatedAt, "HH:mm")} hrs
            </Stack>
            <Stack direction="row">
              <Stack direction="row" spacing={2} sx={{ flexGrow: 1 }}>
                {post?.skills.map((skill, idx) => (
                  <Typography
                    sx={{
                      background: "lightgrey",
                      p: "3px",
                      borderRadius: "3px",
                    }}
                    key={idx}
                  >
                    {skill}
                  </Typography>
                ))}
              </Stack>
              <Typography>
                <Stack direction="column" spacing={0.5}>
                  {format(post?.updatedAt, "dd/MM/yyyy")}
                </Stack>
              </Typography>
            </Stack>
            <Divider />
          </Stack>
        );
      })}
    </Box>
  );
};

export default Posts;
