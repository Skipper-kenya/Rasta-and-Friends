import axios from "axios";
import { Button, Card, Input, Space } from "antd";
import React, { useContext, useEffect, useState } from "react";
import "./auth.css";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser, updateDetails } from "../../redux/user";
import loading, { setLoading, hideLoading } from "../../redux/loading";
import {
  Box,
  Container,
  Divider,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { purgeContext } from "../../context/purge";
import Footer from "../../components/Footer";

const Auth = ({ name, setStorage }) => {
  axios.defaults.withCredentials = true;
  const { viewportWidth } = useContext(purgeContext);
  axios.defaults.withCredentials = true;
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const loading = useSelector((state) => state.loading.loading);

  const isLoginRequest = () => name === "login";
  const isRegisterRequest = () => name === "register";

  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      dispatch(setLoading());
      const response = await axios.post(import.meta.env.VITE_API_REGISTER, {
        username,
        password,
      });
      dispatch(hideLoading());

      const { success, message } = response.data;
      success ? toast.success(message) : toast.error(message);
      success ? navigate("/login") : null;
    } catch (err) {
      dispatch(hideLoading());
      console.log(err);
    }
  };

  const handleLogin = async () => {
    try {
      dispatch(setLoading());
      const response = await axios.post(import.meta.env.VITE_API_LOGIN, {
        username,
        password,
      });

      const { message, user, success, isAuthenticated } = response.data;
      dispatch(getUser(isAuthenticated));
      dispatch(updateDetails(user));

      dispatch(hideLoading());

      !success ? toast.error(message) : null;
      success ? navigate("/", { replace: true }) : null;
      success
        ? (() => {
            setStorage();
          })()
        : null;
    } catch (error) {
      dispatch(hideLoading());
      console.log(error.message);
    }
  };

  const handleSubmit = () => {
    if (username !== "" && password !== "") {
      if (isLoginRequest()) {
        return handleLogin();
      } else if (isRegisterRequest()) {
        handleRegister();
      }
    } else {
      toast.error("username and password required");
    }
  };

  return (
    <div
      className="auth_holder"
      sx={{
        display: "flex",
        flexDirection: viewportWidth <= 767 ? "column" : "row",
      }}
    >
      {viewportWidth <= 767 && <div className="left_wrapper"></div>}

      {viewportWidth > 767 && (
        <Box
          backgroundColor="blue"
          height="100vh"
          zIndex={1000}
          width="50%"
          color="white"
          display="flex"
          alignItems="center"
          flexDirection="column"
        >
          <Container>
            <Typography variant="h2">
              Rasta & Friends Hub: Everything you need to progress as a
              developer.
            </Typography>
            <Stack direction="column" spacing={1}>
              <Divider />
              <Typography>
                This is a Developer's community. at rastaTech we believe in
                collaboration and our website gives you room to engage with
                like-minded developers like you.
              </Typography>
              <Typography>
                You can showcase your projects and learn from other's projects.
                Additionally, the contributions page will allow you to raise any
                issue, concern or ask for help from your peers
              </Typography>
            </Stack>
          </Container>
        </Box>
      )}

      <Stack direction={viewportWidth <= 767 ? "column" : "row"}>
        {viewportWidth <= 767 && (
          <Toolbar>
            <Stack
              direction="column"
              alignItems="center"
              spacing={1}
              sx={{ justifyContent: "center", width: "100%" }}
            >
              <Typography
                variant="h6"
                sx={{ color: "white", textAlign: "center" }}
              >
                Welcome to Rasta & Friends
              </Typography>
              <Typography
                sx={{
                  color: "white",
                  textAlign: "center",
                  fontStyle: "italic",
                }}
              >
                join this transformative developer's community today
              </Typography>
            </Stack>
          </Toolbar>
        )}

        <Box>
          <div
            className="cardHolder"
            style={{
              minHeight: viewportWidth <= 767 ? "50vh" : " 500px",
              paddingTop: viewportWidth <= 767 ? "2rem" : "4rem",
              marginRight: viewportWidth <= 767 ? "8rem" : "4rem",
            }}
          >
            <Card
              className="card"
              title={name.toUpperCase()}
              style={{ width: "300px" }}
              bordered
            >
              <Space direction="vertical">
                <section>
                  <label htmlFor="username">Username</label>
                  <Input
                    allowClear
                    type="text"
                    placeholder="username"
                    size="large"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </section>
                <section>
                  <label htmlFor="username">Password</label>
                  <Input.Password
                    type="password"
                    placeholder="password"
                    size="large"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </section>
                <section>
                  <Button
                    className="btn"
                    type="primary"
                    block
                    size="large"
                    onClick={handleSubmit}
                    loading={loading}
                  >
                    {isRegisterRequest()
                      ? "Sign up"
                      : isLoginRequest()
                      ? "Sign in"
                      : ""}
                  </Button>
                </section>
                <section>
                  {isLoginRequest() ? (
                    <>
                      <span>
                        Don't have an account?
                        <a onClick={() => navigate("/register")}>Register</a>
                      </span>
                    </>
                  ) : isRegisterRequest() ? (
                    <>
                      <span>
                        have an account?{" "}
                        <a onClick={() => navigate("/login")}>Login</a>
                      </span>
                    </>
                  ) : (
                    ""
                  )}
                </section>
              </Space>
            </Card>
          </div>
        </Box>
      </Stack>
    </div>
  );
};
export default Auth;
