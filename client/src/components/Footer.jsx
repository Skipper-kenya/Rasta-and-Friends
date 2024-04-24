import {
  Box,
  Button,
  Divider,
  List,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import { userMenu } from "./drawer/menuItems";
import {
  Copyright,
  Email,
  FavoriteBorderOutlined,
  GitHub,
  LinkedIn,
  Twitter,
  X,
} from "@mui/icons-material";

const Footer = () => {
  return (
    <Box
      sx={{
        background: "rgb(66,63,83)",
        width: "100%",
        height: "auto",
        display: "flex",
        justifyContent: "center",
        color: "white",
      }}
    >
      <Toolbar>
        <Stack direction="column" spacing={1} sx={{ paddingTop: 3 }}>
          <Stack direction="row" spacing={1}>
            <Button target="_blank" href="mailTo:kimwetichandrew@gmail.com">
              <Email />
              Email
            </Button>
            <Button target="_blank" href="https://github.com/Skipper-kenya">
              <GitHub />
              Github
            </Button>
            <Button
              target="_blank"
              href="https://www.linkedin.com/in/andrew-kimwetich-84070a263/"
            >
              <LinkedIn />
              LinkedIn
            </Button>
            <Button target="_blank" href="https://twitter.com/Skipper_Ke">
              <X />
              Twitter
            </Button>
          </Stack>
          <Stack
            direction="column"
            textAlign="center"
            spacing={1}
            sx={{ paddingBottom: 3 }}
          >
            <Typography>
              with <FavoriteBorderOutlined /> by Andrew Kimwetich
            </Typography>
            <Typography>
              <Copyright fontSize="small" />
              rastaTech 2024
            </Typography>
          </Stack>
        </Stack>
      </Toolbar>
    </Box>
  );
};

export default Footer;
