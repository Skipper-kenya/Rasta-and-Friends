import React, { createContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { persistor } from "../main";
export const purgeContext = createContext(null);

export const PurgeProvider = ({ children }) => {
  const [cookie, setCookie, removeCookie] = useCookies(["purge"]);
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

  const purgeStorage = () => {
    removeCookie("purge", { path: "/" });
    persistor.purge();
  };

  const setStorage = () => {
    setCookie("purge", "sessionActive", { maxAge: 3600, path: "/" });
  };

  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);



  const values = { cookie, setStorage, purgeStorage, viewportWidth };
  return (
    <purgeContext.Provider value={values}>{children}</purgeContext.Provider>
  );
};

export default PurgeProvider;
