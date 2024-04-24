import React, { useContext, useEffect } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Toolbar,
  Typography,
} from "@mui/material";
import { purgeContext } from "../../context/purge";
import { persistor } from "../../main";
import { useNavigate } from "react-router-dom";
import { BuildCircle } from "@mui/icons-material";

const Dashboard = () => {
  const navigate = useNavigate();
  const { cookie, viewportWidth } = useContext(purgeContext);
  const purgeSto = async () => {
    return persistor.purge();
  };

  useEffect(() => {
    if (!cookie.purge) {
      purgeSto();
      window.location.reload();
    }
  }, [cookie.purge]);

  return (
    <Box
      component="main"
      sx={{ flexGrow: 1, p: viewportWidth <= 767 ? 1 : 3, width: "90%" }}
    >
      <Toolbar />
      <Box className="hero">
        <Typography variant="h6">
          A powerful solution to grow your development. Instant!
        </Typography>
        <Typography sx={{ width: viewportWidth <= 767 ? "100%" : "50%" }}>
          View, collaborate, and Contribute to your peer projects. Rasta and
          Friends is your software development ally.
        </Typography>
        <Box className="hero-buttons">
          <ButtonGroup
            variant="contained"
            color="primary"
            size="large"
            sx={{
              marginTop: 2,
              marginBottom: viewportWidth <= 767 ? "1rem" : "0rem",
            }}
          >
            <Button
              sx={{ marginRight: 1 }}
              onClick={() => navigate("/projects")}
            >
              Get Started
            </Button>
            <Button onClick={() => navigate("/profile")}>
              Build your profile <BuildCircle />
            </Button>
          </ButtonGroup>
        </Box>
      </Box>

      <Box
        sx={{
          width: "100%",
          height: "auto",
          p: viewportWidth <= 767 ? 2 : 5,
          background: "#E3DAC9",
          borderRadius: "12px",
        }}
      >
        <Typography variant="h6" sx={{ color: "black" }}>
          Don't just take our word for it, see the success stories from
          developers like you.
        </Typography>
        <Grid container spacing={1}>
          <ReviewCard
            review="My development has seen a significant increase in productivity
                  since i started using Rasta and Friends"
            name="Andrew Kimwetich"
            stack="Mern Stack Developer"
          />
          <ReviewCard
            review="Projects shared by peers has helped me brainstorm new ideas that i couldn't before joining Rasta and Friends"
            name="Elvis Wanyonyi"
            stack="Java developer"
          />
        </Grid>
      </Box>
    </Box>
  );
};

export const ReviewCard = ({ name, stack, review }) => {
  return (
    <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
      <Card sx={{ border: "1px solid rgb(66,63,83)", boxShadow: "0 2px 3px" }}>
        <CardHeader title={name} subheader={stack} />
        <Divider />
        <CardContent>
          <Typography> {`“${review}.”`}</Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default Dashboard;
