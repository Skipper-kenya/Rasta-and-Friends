import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";

import Navbar from "../navbar/navbar";
import Drawerr from "../drawer/drawer";
import { Toolbar } from "@mui/material";
import Footer from "../Footer";

export default function Layout({ children }) {
  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor: "honeydew",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <CssBaseline />
      <Navbar />
      <Toolbar />
      {/* <Drawerr /> */}
      {/**Body contents */}
      {children}
      <Footer />
    </Box>
  );
}
