import React, { useContext } from "react";
import Auth from "./auth";
import { purgeContext } from "../../context/purge";

const Login = () => {
  const { setStorage, cookie } = useContext(purgeContext);
  return <Auth name="login" setStorage={setStorage} />;
};

export default Login;
