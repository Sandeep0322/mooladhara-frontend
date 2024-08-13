import React from "react";
import { Box, Typography, Avatar, Button } from "@mui/material";
import CustomIcon from "../../custom_components/CustomIcon";
import zap from "../../resources/svg/zap.svg";
import kundli from "../../resources/svg/kundli.svg";
import scorpio from "../../resources/svg/scorpio.svg";
import sun from "../../resources/svg/sun.svg";

import { flexStyles } from "../../resources/typography/flexStyles";
import { themeColors } from "../../resources/typography/colors";
import { formatDate } from "../utils";
import { useNavigate } from "react-router-dom";

const styles = {
  container: {
    borderRadius: "18px",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    position: "relative",
  },
  profileInfo: {
    display: "flex",
    flexDirection: "column",
  },
  avatar: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
  },
  creditsContainer: {
    backgroundColor: "#1C1C1C",
    borderRadius: "34px",
    display: "flex",
    alignItems: "center",
    marginTop: "32px",
    justifyContent: "center",
    p: "8px 12px",
    gap: "8px",
  },
  creditsText: { color: "#FFFFFF" },
  sectionContainer: {
    display: "flex",
    flexDirection: "column",
    mt: "20px",
  },
  section: {
    display: "flex",
    alignItems: "center",
    marginBottom: "20px",
  },
  sectionIcon: {
    marginRight: "10px",
  },
  noData: {
    marginLeft: "30px",
  },
  topRightIcon: {
    position: "absolute",
    top: "-10px", // Adjust as needed
    right: "-10px", // Adjust as needed
  },
};

const leftSectionContent = {
  title: "Scorpio (Vrishchik)",
  dateTime: "Thu Jun 15 2000, 12:30:00 PM",
  sunSign: "Cancer (karkat)",
  image: kundli, // Replace with the actual path to your sample image
};

const HistorySection = ({ title, noDataMessage }) => (
  <Box sx={styles.section}>
    <CustomIcon src={zap} width={20} height={20} sx={styles.sectionIcon} />
    <Typography variant="h6">{title}</Typography>
    <Typography variant="body1" sx={styles.noData}>
      {noDataMessage}
    </Typography>
  </Box>
);

const ProfileDetails = () => {
  const navigate = useNavigate();
  const storedUserDetails = localStorage.getItem("userDetails");
  const userDetails = storedUserDetails ? JSON.parse(storedUserDetails) : null;

  const svgImage = userDetails.svg.replace(/\\"/g, '"');
  const dataUrl = `data:image/svg+xml;charset=UTF-8,${svgImage}`;
  const paymentHistory = []; // Add your payment history data here
  const subscriptionHistory = []; // Add your subscription history data here

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userDetails");

    navigate("/login");
  };

  return (
    <>
      <Box sx={styles.container}>
        <Box sx={styles.profileInfo}>
          <Typography variant="h5" sx={{ textAlign: "left" }}>
            {userDetails?.user?.name}
          </Typography>
          <Typography
            variant="body1"
            sx={{ textAlign: "left", color: "#9A9A9A" }}
          >
            {userDetails?.user?.email}
          </Typography>
          {/* <Typography
            variant='body1'
            sx={{ textAlign: 'left', color: '#9A9A9A' }}
          >
            Born on 10/23/2003, 2:00:00 AM
          </Typography> */}
        </Box>
        <Avatar
          sx={styles.avatar}
          src="https://www.example.com/path-to-image.jpg" // Replace with the actual path to the image
          alt="Profile Picture"
        />
      </Box>
      <Box sx={styles.creditsContainer}>
        <CustomIcon src={zap} width={20} height={20} />
        <Typography variant="body2" sx={styles.creditsText}>
          0
        </Typography>
        <Typography variant="body2" sx={styles.creditsText}>
          Question credits
        </Typography>
      </Box>

      <Box
        sx={{
          flexGrow: 1,
          overflowY: "auto",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box sx={{ width: "100%", ...flexStyles.flexColumnCenter, mt: "48px" }}>
          <CustomIcon src={scorpio} width={48} height={48} />
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
            {`${formatDate(userDetails.user.dateOfBirth)} - ${
              userDetails?.user?.timeOfBirth
            }`}
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
            <CustomIcon src={sun} width={20} height={20} />
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
            width: "100%",
            backgroundColor: "white",
          }}
        >
          <img src={dataUrl} width="350px" height="350px" alt="kundli" />
        </Box>

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
            height: "38px",
            width: "98px",
            borderRadius: "41px",
            mt: "40px",
            textTransform: "none",
            fontSize: "15px",
          }}
          onClick={logout}
        >
          Logout
        </Button>
      </Box>
    </>
  );
};

export default ProfileDetails;
