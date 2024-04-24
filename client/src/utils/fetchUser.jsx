import React, { useEffect } from "react";
import { getUser } from "../../redux/user";
import axios from "axios";
import { hideLoading, setLoading } from "../../redux/loading";

const fetchUser = () => {
  axios.defaults.withCredentials = true;
  const fetch = async () => {
    try {
      dispatch(setLoading());
      const response = await axios.get(import.meta.env.VITE_API_GETUSER);
      dispatch(getUser(response.data.isAuthenticated));
      dispatch(hideLoading());
    } catch (error) {
      dispatch(hideLoading());
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetch();
  }, []);
};

export default fetchUser;
