import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import React, { useState } from "react";
import HeaderBox from "../login/HeaderBox";
import { flexStyles } from "../../resources/typography/flexStyles";
import { themeColors } from "../../resources/typography/colors";
import { localeKeys } from "../../resources/typography/localeKeys";
import DownloadIcon from "@mui/icons-material/Download";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import astroIcon from "../../resources/svg/astroIcon.svg";
import scorpio from "../../resources/svg/scorpio.svg";
import sun from "../../resources/svg/sun.svg";
import kundli from "../../resources/svg/kundli.svg";
import CustomIcon from "../../custom_components/CustomIcon";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../utils";

const BirthChart = () => {
  const mobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const navigate = useNavigate();

  const storedUserDetails = localStorage.getItem("userDetails");
  const userDetails = storedUserDetails ? JSON.parse(storedUserDetails) : null;

  // console.log(
  //   decryptDecompress(userDetails?.user?.encryptedSVG),
  //   'aakdjnckasjdb'
  // )
  console.log("kjbsjhg", userDetails.svg.replace(/\\"/g, '"'));
  const svgImage = userDetails.svg.replace(/\\"/g, '"');
  const dataUrl = `data:image/svg+xml;charset=UTF-8,${svgImage}`;

  console.log(svgImage, "svg");
  const leftSectionContent = {
    title: "Scorpio (Vrishchik)",
    dateTime: `${formatDate(userDetails.user.dateOfBirth)} - ${
      userDetails?.user?.timeOfBirth
    }`,
    sunSign: "Cancer (karkat)",
  };

  return (
    <HeaderBox>
      <Box
        sx={{
          ...flexStyles.flexColumn,
          alignItems: "center",
          textAlign: "center",
          mt: "20px",
        }}
      >
        <Typography
          variant={mobile ? "body8" : "h3"}
          sx={{ color: themeColors.palette.customColor.main }}
        >
          {userDetails?.user?.name}, Here's your birth chart
        </Typography>
      </Box>
      <Box
        sx={{
          ...flexStyles.flexRowSpaceBetween,
          flexDirection: mobile ? "column" : "row",
          mt: "20px",
          flexGrow: 1,
          width: "100%",
          overflow: mobile ? "" : "hidden",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            p: "15px",
            border: "1px solid white",
            width: mobile ? "100%" : "39%",
            borderRadius: "17px",
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "100%",
              borderRadius: "17px",
              backgroundColor: "#111111",
              p: "30px",
              ...flexStyles.flexColumnCenter,
              overflowY: "auto",
              // Hide scrollbar for Chrome, Safari and Opera
              "&::-webkit-scrollbar": {
                width: "0px",
                height: "0px",
              },
              // Hide scrollbar for IE, Edge
              "-ms-overflow-style": "none",
              // Hide scrollbar for Firefox
              "scrollbar-width": "none",
            }}
          >
            <Box sx={{ width: "100%", ...flexStyles.flexColumnCenter }}>
              <CustomIcon src={scorpio} width={48} height={48} />{" "}
              <Typography
                variant={"body9"}
                sx={{
                  color: themeColors.palette.customColor.white,
                  mt: "12px",
                }}
              >
                {leftSectionContent.title}
              </Typography>
              <Typography
                variant={"body5"}
                sx={{
                  color: themeColors.palette.customColor.grey4,
                  mt: "12px",
                }}
              >
                {leftSectionContent.dateTime}
              </Typography>
              <Box
                sx={{
                  mt: "12px",
                  borderRadius: "23px",
                  border: "1px solid",
                  borderColor: themeColors.palette.customColor.grey5,
                  ...flexStyles.flexRowCenterSpaceEvenly,
                  p: "4px 8px",
                  gap: "5px",
                }}
              >
                <CustomIcon src={sun} width={20} height={20} />{" "}
                <Typography
                  variant={"body5"}
                  sx={{
                    color: themeColors.palette.customColor.white,
                  }}
                >
                  Sun Sign
                </Typography>
                <Typography
                  variant={"body5"}
                  sx={{
                    color: themeColors.palette.customColor.grey4,
                  }}
                >
                  {leftSectionContent.sunSign}
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                mt: "50px",
                width: "80%",
                height: "80%",
                backgroundColor: "white",
              }}
            >
              {/* <CustomIcon src={kundli} width={'100px'} height={'100px'} /> */}
              <img src={dataUrl} width="100%" height="100%" alt="kundli" />
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            p: "15px",
            width: mobile ? "100%" : "59%",
            height: "100%",
            border: "1px solid white",
            borderRadius: "17px",
            mt: mobile ? "24px" : "",
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "100%",
              borderRadius: "17px",
              ...(mobile
                ? flexStyles.flexColumn
                : flexStyles.flexRowSpaceBetween),
              flexWrap: "wrap",
              overflowY: "scroll",
              backgroundColor: "#111111",
              p: "25px",
              // Hide scrollbar for Chrome, Safari and Opera
              "&::-webkit-scrollbar": {
                width: "0px",
                height: "0px",
              },
              // Hide scrollbar for IE, Edge
              "-ms-overflow-style": "none",
              // Hide scrollbar for Firefox
              "scrollbar-width": "none",
            }}
          >
            {userDetails?.astroData?.map((section, index) => (
              <Box
                key={index}
                sx={{
                  width: mobile ? "100%" : "48%",
                  mb: "20px",
                  border: "1px solid",
                  borderColor: themeColors.palette.customColor.grey5,
                  borderRadius: "10px",
                  p: "15px",
                  ...flexStyles.flexColumnAlignStart,
                }}
              >
                <Box sx={{ ...flexStyles.flexAlignCenter, mb: "12px" }}>
                  <CustomIcon
                    src={astroIcon}
                    width={mobile ? 18 : 24}
                    height={mobile ? 18 : 24}
                  />
                  <Typography
                    variant={"body11"}
                    sx={{
                      color: themeColors.palette.customColor.white,
                      ml: "8px",
                    }}
                  >
                    {section?.attribute}
                  </Typography>
                </Box>
                <Typography
                  variant={"body5"}
                  sx={{
                    color: themeColors.palette.customColor.grey6,
                    textAlign: "left",
                  }}
                >
                  {section?.summary}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          ...flexStyles.flexRowFlexEnd,
          width: "100%",
          mt: "50px",
          gap: "33px",
        }}
      >
        {/* <Button
          variant='contained'
          sx={{
            backgroundColor: themeColors.palette.customColor.grey3,
            color: 'white',
            '&:hover': {
              backgroundColor: themeColors.palette.customColor.grey3,
            },
            '& .MuiButton-endIcon': {
              color: 'white',
            },
            height: '44px',
            minWidth: '164px',
            borderRadius: '41px',
            textTransform: 'none',
            fontSize: mobile ? '12px' : '15px',
          }}
          startIcon={
            <DownloadIcon
              sx={{
                width: mobile ? '18px' : '24px',
                height: mobile ? '18px' : '24px',
              }}
            />
          }
          //   onClick={() => navigate('/verify')}
        >
          {localeKeys.download}
        </Button> */}
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
          onClick={() => navigate("/chat")}
        >
          {localeKeys.letsGetStarted}
        </Button>
      </Box>
    </HeaderBox>
  );
};

export default BirthChart;
