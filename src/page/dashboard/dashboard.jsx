import React from "react";
import Row1 from "./Row1";
import Row2 from "./Row2";
import Row3 from "./Row3";
import { Box, Button } from "@mui/material";
// @ts-ignore
import { DownloadOutlined } from "@mui/icons-material";

const Dashboard = () => {
  return (
    <div>
      <Box sx={{ textAlign: "right", mb: 3 }}>
        {" "}
        {/* mb = margin-bottom */}
        {/* <Button
          sx={{ padding: "6px 8px", textTransform: "capitalize" }}
          variant="contained"
          color="primary"
        >
          <DownloadOutlined />
          Download Reports
        </Button> */}
      </Box>

      <Box sx={{ mb: 3 }}> {/* Espace après Row1 */}</Box>

      <Box sx={{ mb: 3 }}>
        {" "}
        {/* Espace après Row2 */}
        <Row2 />
      </Box>

      <Box>
        {" "}
        {/* Pas besoin de marge après le dernier élément */}
        <Row3 />
      </Box>
    </div>
  );
};

export default Dashboard;
