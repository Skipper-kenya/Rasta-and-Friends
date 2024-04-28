import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";

const NotFound = () => {
  return (
    <Box
      justifyContent="center"
      alignItems="center"
      width="100%"
      minHeight="50vh"
    >
      <Stack direction="column" spacing={1}>
        <Button variant="contained" onClick={() => navigate("/")}>
          Back to Homepage
        </Button>
        <Typography>404 | Page not found</Typography>
      </Stack>
    </Box>
  );
};

export default NotFound;
