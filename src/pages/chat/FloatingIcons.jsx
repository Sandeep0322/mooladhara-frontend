import React from "react";
import { Box, IconButton } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import HistoryIcon from "@mui/icons-material/History";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";

const FloatingIcons = ({ selectedIndex, setSelectedIndex }) => {
  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "#111111",
        display: "flex",
        justifyContent: "space-around",
        p: "10px",
        boxShadow: "0px -2px 10px rgba(0, 0, 0, 0.2)",
        zIndex: 1000,
        m: "40px",
        borderRadius: "17px",
      }}
    >
      <IconButton
        onClick={() => setSelectedIndex(0)}
        color={selectedIndex === 0 ? "primary" : "default"}
      >
        <HomeIcon sx={{ color: selectedIndex === 0 ? "#E3418B" : "#FFFFFF" }} />
      </IconButton>
      <IconButton
        onClick={() => setSelectedIndex(1)}
        color={selectedIndex === 1 ? "primary" : "default"}
      >
        <HistoryIcon
          sx={{ color: selectedIndex === 1 ? "#E3418B" : "#FFFFFF" }}
        />
      </IconButton>
      <IconButton
        onClick={() => setSelectedIndex(2)}
        color={selectedIndex === 2 ? "primary" : "default"}
      >
        <PersonIcon
          sx={{ color: selectedIndex === 2 ? "#E3418B" : "#FFFFFF" }}
        />
      </IconButton>
      <IconButton
        onClick={() => setSelectedIndex(3)}
        color={selectedIndex === 3 ? "primary" : "default"}
      >
        <SettingsIcon
          sx={{ color: selectedIndex === 3 ? "#E3418B" : "#FFFFFF" }}
        />
      </IconButton>
    </Box>
  );
};

export default FloatingIcons;
