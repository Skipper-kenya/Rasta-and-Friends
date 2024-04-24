import {
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  Grid,
  IconButton,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useCallback, useContext, useEffect, useState } from "react";
import Addnew from "./Addnew";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  FavoriteBorderRounded,
  GitHub,
  LinkOutlined,
  MoreVert,
  ShareOutlined,
} from "@mui/icons-material";
import { updateProjects } from "../../redux/projects";
import { hideLoading, setLoading } from "../../redux/loading";
import { updateDetails } from "../../redux/user";
import { toast } from "sonner";
import { breakpoints } from "../../components/breakpoints";
import Masonry from "react-masonry-css";
import { purgeContext } from "../../context/purge";
import { persistor } from "../../main";

const Projects = () => {
  axios.defaults.withCredentials = true;
  const { viewportWidth, cookie } = useContext(purgeContext);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const _id = useSelector((state) => state.user.details._id);
  const projects = useSelector((state) => state.projects.projects);
  const details = useSelector((state) => state.user.details);

  const purgeSto = async () => {
    return persistor.purge();
  };

  useEffect(() => {
    if (!cookie.purge) {
      purgeSto();
      window.location.reload();
    }
  }, [cookie.purge]);

  const fetchProjects = useCallback(async () => {
    try {
      dispatch(setLoading());
      const response = await axios.get(
        `${import.meta.env.VITE_API_GETPROJECTS}/${_id}`
      );
      const { projects, message } = response.data;
      dispatch(updateProjects(projects));
      dispatch(hideLoading());
    } catch (error) {
      dispatch(hideLoading());
      console.log(error.message);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  //add a like to a project
  const handleAddLike = async (project, projectId) => {
    const hasUserLiked = () => {
      return project.projectLikeOwners?.includes(_id);
    };

    try {
      const response = await axios.post(import.meta.env.VITE_API_ADDLIKE, {
        owner_id: _id,
        project_id: projectId,
        liked: hasUserLiked() ? true : false,
      });

      const { success, projects, details } = response.data;
      success
        ? (async () => {
            dispatch(updateProjects(projects));
            dispatch(updateDetails(details));
          })()
        : null;
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 2 }}>
      {/* Add new project */}
      <Addnew open={open} setOpen={setOpen} />
      {viewportWidth <= 767 && <Toolbar sx={{ flexGrow: 1 }} />}
      {/* All Projects */}
      <Masonry
        breakpointCols={breakpoints}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {projects?.map((project) => {
          return (
            <div item key={project._id}>
              <Card>
                <CardHeader
                  avatar={
                    <Avatar>{project.projectName[0].toUpperCase()}</Avatar>
                  }
                  title={project.projectName}
                  subheader={`${project?.username} ${
                    project.username == details.username ? "(yours)" : ""
                  }`}
                  action={
                    <IconButton>
                      <MoreVert />
                    </IconButton>
                  }
                />
                <CardMedia
                  component="img"
                  height="194"
                  image={`${import.meta.env.VITE_API_SERVER}/projectImages/${
                    project.projectImage[0]?.name
                  }`}
                  alt={project.projectName}
                />
                <CardContent>
                  <Typography>{project.projectDescription}</Typography>
                  <Divider />
                  {project?.projectSkills?.length > 1 && (
                    <Stack
                      direction="row"
                      sx={{ marginTop: "1rem" }}
                      spacing={1}
                    >
                      {project.projectSkills?.map((skill, idx) => {
                        return (
                          <Typography
                            sx={{
                              p: 0.2,
                              background: "lightgrey",
                              borderRadius: "5px",
                            }}
                            key={idx}
                          >
                            {skill}
                          </Typography>
                        );
                      })}
                    </Stack>
                  )}
                </CardContent>
                <Divider />
                <CardActions>
                  <Stack
                    direction="row"
                    sx={{
                      width: "100%",
                      justifyContent: "space-around",
                    }}
                  >
                    <Tooltip title="github">
                      <Button href={project.projectGithub} target="_blank">
                        <GitHub />
                      </Button>
                    </Tooltip>
                    <Tooltip title="live demo">
                      <Button href={project.projectLink} target="_blank">
                        <LinkOutlined />
                      </Button>
                    </Tooltip>

                    <Tooltip title="Like">
                      <Button
                        onClick={() => handleAddLike(project, project._id)}
                      >
                        <Badge badgeContent={project?.projectLikes}>
                          <FavoriteBorderRounded />
                        </Badge>
                      </Button>
                    </Tooltip>
                  </Stack>
                </CardActions>
              </Card>
            </div>
          );
        })}
      </Masonry>
    </Box>
  );
};

export default Projects;
