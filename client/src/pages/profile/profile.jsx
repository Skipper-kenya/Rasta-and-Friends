import {
  Box,
  Button,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
//
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../redux/user";
import Uploaded from "./Uploaded";
import { hideLoading, setLoading } from "../../redux/loading";
const Profile = () => {
  const [img, setImg] = useState("");
  const dispatch = useDispatch();
  const _id = useSelector((state) => state.user.details?._id);
  const userProfile = useSelector((state) => state.user.profile);

  const fetchProfile = async () => {
    try {
      dispatch(setLoading());
      const response = await axios.get(
        `${import.meta.env.VITE_API_GETPROFILE}/${_id}`
      );
      const { profile } = response.data;
      dispatch(updateProfile(profile));
      // setImg(userProfile.image[0].name);

      dispatch(hideLoading());
    } catch (error) {
      console.log(error.message);
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const [image, setImage] = useState(null);
  const [profileDetails, setProfileDetails] = useState({
    firstName: "",
    secondName: "",
    githubLink: "",
    description: "",
    skills: [],
  });

  const { firstName, secondName, githubLink, description, skills } =
    profileDetails;

  const handleSkillChange = (e, idx) => {
    const skillCopy = [...profileDetails.skills];
    skillCopy[idx] = e.target.value;

    setProfileDetails((prev) => ({ ...prev, skills: skillCopy }));
  };

  const handleAddSkillField = () => {
    setProfileDetails((prev) => ({
      ...prev,
      skills: [...profileDetails.skills, ""],
    }));
  };

  //description ,fname,sname and github changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileDetails((prev) => ({ ...prev, [name]: value }));
  };
  //handle image change
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  //is there an empty TextField?
  const isInputFilled = () => {
    return (
      firstName &&
      secondName &&
      githubLink &&
      description &&
      skills.length > 0 &&
      image
    );
  };

  const emptyFields = () => {
    return setProfileDetails({
      firstName: "",
      secondName: "",
      githubLink: "",
      description: "",
      skills: [],
    });
  };

  const handleSubmit = () => {
    !isInputFilled()
      ? toast.error("All fields are required")
      : (async () => {
          try {
            const response = await axios.post(
              import.meta.env.VITE_API_UPLOADPROFILE,
              {
                details: { ...profileDetails, _id },
                image,
              },
              {
                headers: { "Content-Type": "multipart/form-data" },
              }
            );
            const { message, success, profile } = await response.data;
            success;
            success
              ? (() => {
                  dispatch(updateProfile(profile));
                  emptyFields();
                  toast.success(message);
                })()
              : null;
          } catch (error) {
            console.log(console.log(error.message));
          }
        })();
  };

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        p: 3,
        width: "100%",
      }}
    >
      <Toolbar />
      {!userProfile?.uploaded ? (
        <>
          <Typography variant="h5" color="secondary">
            Complete your developer's profile today
          </Typography>

          <Stack direction="column" spacing={2}>
            <Stack direction="row" spacing={2}>
              <TextField
                name="firstName"
                value={profileDetails.firstName}
                onChange={handleInputChange}
                label="First Name"
                size="small"
                variant="standard"
              />
              <TextField
                name="secondName"
                value={profileDetails.secondName}
                onChange={handleInputChange}
                label="Second Name"
                size="small"
                variant="standard"
              />
            </Stack>
            <TextField
              name="githubLink"
              onChange={handleInputChange}
              value={profileDetails.githubLink}
              label="Github Link"
              type="text"
              size="small"
            />
            <TextField
              name="description"
              onChange={handleInputChange}
              value={profileDetails.description}
              label="Description about you "
              helperText="what are you interested in? what do you do in this tech world?"
              type="text"
              size="small"
              multiline
              rows={4}
            />

            <Stack direction="column" spacing={2}>
              <Typography>Add your Skills</Typography>
              {profileDetails.skills?.map((skill, idx) => {
                return (
                  <TextField
                    key={idx}
                    type="text"
                    variant="standard"
                    size="small"
                    value={skill}
                    onChange={(e) => handleSkillChange(e, idx)}
                  />
                );
              })}
              <Button
                color="secondary"
                variant="contained"
                size="small"
                onClick={handleAddSkillField}
              >
                Add another skill
              </Button>
            </Stack>

            <Stack direction="column" spacing={1}>
              <Typography>Upload your profile image</Typography>
              <TextField
                onChange={handleImageChange}
                type="file"
                name="image"
                inputProps={{ accept: "image/*" }}
              />
            </Stack>
            <Button variant="contained" onClick={handleSubmit}>
              Submit
            </Button>
          </Stack>
        </>
      ) : (
        <Uploaded _id={_id} img={img} userProfile={userProfile} />
      )}
    </Box>
    // </Box>
  );
};

export default Profile;
