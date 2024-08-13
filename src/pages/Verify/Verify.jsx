import React, { useEffect, useState } from "react";
import HeaderBox from "../login/HeaderBox";
import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import { themeColors } from "../../resources/typography/colors";
import { flexStyles } from "../../resources/typography/flexStyles";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { localeKeys } from "../../resources/typography/localeKeys";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { formatDate, getDayOfWeek } from "../utils";

const Verify = () => {
  const mobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState(null);

  console.log(userDetails, "kskajndckjs");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const authToken = localStorage.getItem("authToken");
        const response = await axios.get(
          "https://mooladhara-backend.adaptable.app/api/users/getUser",
          {
            headers: {
              Authorization: authToken,
              "Content-Type": "application/json",
            },
          }
        );
        localStorage.setItem("userDetails", JSON.stringify(response.data));
        setUserDetails(response.data);
      } catch (error) {
        console.error("Failed to fetch user details:", error);
      }
    };
    fetchData();
  }, []);

  const lines = [
    {
      text: userDetails?.user?.name || "",
      variant: mobile ? "body9" : "h3",
      color: themeColors.palette.customColor.main,
    },
    {
      text: "Please verify your details",
      variant: mobile ? "body9" : "h3",
      color: themeColors.palette.customColor.main,
    },
    {
      text: "Date",
      variant: mobile ? "body1" : "h4",
      color: themeColors.palette.customColor.canvas,
    },
    {
      text: formatDate(userDetails?.user?.dateOfBirth) || "",
      variant: mobile ? "body9" : "h3",
      color: themeColors.palette.customColor.white,
    },
    {
      text: "Time",
      variant: mobile ? "body1" : "h4",
      color: themeColors.palette.customColor.canvas,
    },
    {
      text: `${userDetails?.user?.timeOfBirth}:00` || "",
      variant: mobile ? "body9" : "h3",
      color: themeColors.palette.customColor.white,
    },
    {
      text: "Weekday",
      variant: mobile ? "body1" : "h4",
      color: themeColors.palette.customColor.canvas,
    },
    {
      text: getDayOfWeek(userDetails?.user?.dateOfBirth) || "",
      variant: mobile ? "body9" : "h3",
      color: themeColors.palette.customColor.white,
    },
    {
      text: "Birth location",
      variant: mobile ? "body1" : "h4",
      color: themeColors.palette.customColor.canvas,
    },
    {
      text: userDetails?.user?.birthPlace || "",
      variant: mobile ? "body9" : "h3",
      color: themeColors.palette.customColor.white,
    },
  ];

  // Function to create pairs of lines
  const createPairs = (lines) => {
    const pairs = [];
    for (let i = 0; i < lines.length; i += 2) {
      pairs.push([lines[i], lines[i + 1]]);
    }
    return pairs;
  };

  const linePairs = createPairs(lines);

  return (
    <HeaderBox>
      <Box sx={{ ...flexStyles.flexColumnCenter }}>
        {linePairs.map((pair, pairIndex) => (
          <Box
            key={pairIndex}
            sx={{
              ...flexStyles.flexColumnCenter,
              mt: "40px",
              width: mobile ? "100%" : "30%",
            }}
          >
            {pair.map((line, lineIndex) => (
              <Typography
                key={lineIndex}
                variant={line.variant}
                sx={{
                  color: line.color,
                  textAlign: "left",
                  mt: lineIndex === 0 ? 0 : "12px",
                }}
              >
                {line.text}
              </Typography>
            ))}
          </Box>
        ))}
      </Box>
      <Box sx={{ ...flexStyles.flexRowSpaceBetween }}>
        <Box>
          <Button
            variant="contained"
            sx={{
              backgroundColor: themeColors.palette.customColor.black,
              color: "white",
              "&:hover": {
                backgroundColor: themeColors.palette.customColor.main,
              },
              "& .MuiButton-endIcon": {
                color: "white",
              },
              height: "44px",
              minWidth: "87px",
              borderRadius: "41px",
              mt: "80px",
              textTransform: "none",
              fontSize: mobile ? "12px" : "15px",
              border: "1px solid",
              borderColor: themeColors.palette.customColor.main,
            }}
            startIcon={
              <ArrowBack
                sx={{
                  width: mobile ? "18px" : "24px",
                  height: mobile ? "18px" : "24px",
                }}
              />
            }
            onClick={() => navigate("/update-details")}
          >
            {localeKeys.back}
          </Button>
        </Box>
        <Box>
          <Button
            variant="contained"
            sx={{
              backgroundColor: themeColors.palette.customColor.main,
              color: "white",
              "&:hover": {
                backgroundColor: themeColors.palette.customColor.main,
              },
              "& .MuiButton-endIcon": {
                color: "white",
              },
              height: "44px",
              minWidth: "164px",
              borderRadius: "41px",
              mt: "80px",
              textTransform: "none",
              fontSize: mobile ? "12px" : "15px",
            }}
            endIcon={
              <ArrowForwardIcon
                sx={{
                  width: mobile ? "18px" : "24px",
                  height: mobile ? "18px" : "24px",
                }}
              />
            }
            onClick={() => navigate("/birth-chart")}
          >
            {localeKeys.saveAndContinue}
          </Button>
        </Box>
      </Box>
    </HeaderBox>
  );
};

export default Verify;
