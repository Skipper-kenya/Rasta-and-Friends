import { Add, Close, Money } from "@mui/icons-material";
import {
  Box,
  Button,
  Collapse,
  Fade,
  IconButton,
  Modal,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, hideLoading } from "../../redux/loading";
import { updateProjects } from "../../redux/projects";
const Addnew = ({ open, setOpen }) => {
  const _id = useSelector((state) => state.user.details._id);
  const username = useSelector((state) => state.user.details.username);

  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const [projectDetails, setProjectsDetails] = useState({
    projectName: "",
    projectLink: "",
    projectGithub: "",
    projectDescription: "",
    projectSkills: [],
  });

  const handleAddProject = () => {
    setProjectsDetails((prev) => ({
      ...prev,
      projectSkills: [...projectDetails.projectSkills, ""],
    }));
  };

  const handleSkillChange = (e, idx) => {
    const skillCopy = [...projectDetails.projectSkills];
    skillCopy[idx] = e.target.value;

    setProjectsDetails((prev) => ({ ...prev, projectSkills: skillCopy }));
  };

  const handleFieldChange = (e) => {
    const { value, name } = e.target;

    setProjectsDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const nonEmptyField = () => {
    const { projectName, projectGithub, projectSkills } = projectDetails;
    return projectName && projectGithub && projectSkills.length > 0 && image;
  };

  const clearInputFields = () => {
    setProjectsDetails({
      projectName: "",
      projectLink: "",
      projectGithub: "",
      projectDescription: "",
      projectSkills: [],
    });
    setImage(null);
    setOpen(false);
  };

  const handleSubmit = () => {
    !nonEmptyField()
      ? toast.error("All fields are required")
      : (async () => {
          try {
            dispatch(setLoading());
            const response = await axios.post(
              import.meta.env.VITE_API_CREATEPROJECT,
              {
                projectDetails: {
                  ...projectDetails,
                  projectOwner: _id,
                  username,
                },
                image,
              },
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              }
            );
            const { success, message, projects } = response.data;
            dispatch(hideLoading());
            success
              ? (() => {
                  toast.success(message);
                  clearInputFields();
                  dispatch(updateProjects(projects));
                })()
              : toast.error("something went wrong ");
          } catch (error) {
            console.log(error.message);
          }
        })();
  };

  return (
    <Stack direction="row" spacing={2}>
      <CreateModal
        open={open}
        setOpen={setOpen}
        handleAddProject={handleAddProject}
        projectDetails={projectDetails}
        setProjectsDetails={setProjectsDetails}
        handleSkillChange={handleSkillChange}
        handleFieldChange={handleFieldChange}
        handleSubmit={handleSubmit}
        handleImageChange={handleImageChange}
      />

      {/* Add new project project */}
      <Typography color="primary" variant="subtitle1" sx={{ flexGrow: 1 }}>
        Projects Panel
      </Typography>
      <Tooltip title="Add new project">
        <Button
          onClick={() => setOpen(true)}
          sx={{
            background: "#FFFAF0",
            boxShadow: "0 2px 7px",
          }}
        >
          <Stack direction="column">
            <Typography>Upload your Project</Typography>
            <Add style={{ color: "coral" }} />
          </Stack>
        </Button>
      </Tooltip>
    </Stack>
  );
};
//
//
export const CreateFields = ({ name, label, value, onChange }) => {
  return (
    <TextField
      required={name !== "projectLink"}
      size="small"
      fullWidth
      value={value}
      onChange={onChange}
      name={name}
      label={label}
      multiline={name === "projectDescription"}
      rows={4}
    />
  );
};

export const CreateModal = ({
  open,
  setOpen,
  handleAddProject,
  projectDetails,
  handleSkillChange,
  handleFieldChange,
  handleSubmit,
  handleImageChange,
}) => {
  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Box
        sx={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "400px",
          background: "white",
          outline: 0,
          minHeight: "100vh",
          padding: "5px",
          maxHeight: "100vh",
          overflowY: "scroll",
        }}
      >
        <Collapse in={open}>
          <>
            <Stack
              direction="column"
              spacing={1.5}
              sx={{
                display: "flex",
                width: "100%",
                justifyContent: "center",
                padding: "2px",
              }}
            >
              <Stack direction="row">
                <Typography flexGrow={1} variant="h6" color="primary">
                  Build your Project
                </Typography>
                <Tooltip title="Close this Page">
                  <IconButton onClick={() => setOpen(false)}>
                    <Close />
                  </IconButton>
                </Tooltip>
              </Stack>
              {/* normal text field */}
              <CreateFields
                name="projectName"
                label="Project's name"
                value={projectDetails.projectName}
                onChange={handleFieldChange}
              />
              <CreateFields
                name="projectLink"
                label="Project's Demo Link (Optional)"
                value={projectDetails.projectLink}
                onChange={handleFieldChange}
              />
              <CreateFields
                name="projectGithub"
                label="Project's Github Link"
                value={projectDetails.projectGithub}
                onChange={handleFieldChange}
              />
              <CreateFields
                name="projectDescription"
                label="Project's description"
                value={projectDetails.projectDescription}
                onChange={handleFieldChange}
              />
            </Stack>
            {/* Skills fields */}
            <Stack direction="column" spacing={1}>
              <Typography>Enter the skills you used</Typography>

              {projectDetails.projectSkills?.map((skill, idx) => (
                <TextField
                  key={idx}
                  label={`skill ${idx + 1}`}
                  size="small"
                  value={skill}
                  onChange={(e) => handleSkillChange(e, idx)}
                />
              ))}

              <Tooltip title="languages and skills you used">
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleAddProject}
                >
                  Add another skill
                </Button>
              </Tooltip>
            </Stack>
            {/* project image file */}
            <Stack spacing={1} direction="column">
              <Typography sx={{ paddingTop: 1 }}>
                Upload your Project Image
              </Typography>
              <TextField
                onChange={handleImageChange}
                type="file"
                required
                name="image"
                inputProps={{
                  accept: "image/*",
                }}
              />
            </Stack>
            <Stack>
              <Button
                onClick={handleSubmit}
                sx={{ marginTop: 1, marginBottom: 1 }}
                color="primary"
                variant="contained"
              >
                Submit Project
              </Button>
            </Stack>
          </>
        </Collapse>
      </Box>
    </Modal>
  );
};

export default React.memo(Addnew);
