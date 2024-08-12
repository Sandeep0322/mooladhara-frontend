import React from "react";
import logo from "../../resources/svg/logo.svg";
import beta from "../../resources/svg/beta.svg";
import CustomIcon from "../../custom_components/CustomIcon";
import { Box, Typography } from "@mui/material";
import { localeKeys } from "../../resources/typography/localeKeys";
import { flexStyles } from "../../resources/typography/flexStyles";
import { themeColors } from "../../resources/typography/colors";

const LogoTitle = () => {
  return (
    <Box
      sx={{
        width: "146px",
        height: "5%",
        ...flexStyles.flexCenterSpaceBetween,
      }}
    >
      <CustomIcon src={logo} width={40} height={40} />
      <Box sx={{ textAlign: "left" }}>
        <Typography
          variant="h6"
          sx={{ color: themeColors.palette.customColor.main }}
        >
          {localeKeys.mooladhara}
        </Typography>
        {/* <Typography
          variant='h6'
          sx={{ color: themeColors.palette.customColor.main }}
        >
          {localeKeys.astroGpt}
        </Typography> */}
      </Box>
      <CustomIcon src={beta} width={28} height={14} />
    </Box>
  );
};

export default LogoTitle;
