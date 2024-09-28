import { Box, Button, Modal, Typography, useMediaQuery } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { localeKeys } from "../../resources/typography/localeKeys";
import { themeColors } from "../../resources/typography/colors";
import { flexStyles } from "../../resources/typography/flexStyles";
import CustomIcon from "../../custom_components/CustomIcon";
import {
  LocalizationProvider,
  MobileTimePicker,
  DateCalendar,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import SearchFieldWithPopover from "./SearchFieldWithPopover";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import dayjs from "dayjs";
import calendar from "../../resources/svg/calendar.svg";
import clock from "../../resources/svg/clock.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { statesCoordinates } from "../states";
import Lottie from "react-lottie";
import animationData from "../Animation - 1727541929573.json"; // path to your lottie file

const genders = [
  { id: "male", label: "Male" },
  { id: "female", label: "Female" },
  { id: "other", label: "Other" },
];

const DetailsBox = ({ name }) => {
  const [loading, setLoading] = useState(false);
  const mobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const navigate = useNavigate();

  const location = useLocation();

  console.log(location, "lkandflkjad");

  const [selectedGender, setSelectedGender] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [selectedTime, setSelectedTime] = React.useState(null);
  const [showMobileTimePicker, setShowMobileTimePicker] = React.useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);

  console.log(selectedDate, "kajnjdffkjan");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const authToken = urlParams.get("authToken");

    if (authToken) {
      localStorage.setItem("authToken", authToken);
    }

    // Navigate to '/update-details'
    navigate("/update-details");
  }, [location.search]);

  console.log(isDatePickerOpen, "asldkfjjladfj");

  const toggleMobileTimePicker = () => {
    setShowMobileTimePicker(!showMobileTimePicker);
  };

  const handleMobileTimeChange = (newTime) => {
    setSelectedTime(newTime);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setIsDatePickerOpen(false);
  };

  const handleGenderClick = (genderId) => {
    setSelectedGender(genderId);
  };

  // const saveAndContinue = async () => {
  //   const authToken = localStorage.getItem('authToken')
  //   if (!authToken) return

  //   const userDetails = {
  //     gender: selectedGender,
  //     dateOfBirth: selectedDate
  //       ? dayjs(selectedDate).format('YYYY-MM-DD')
  //       : null,
  //     timeOfBirth: selectedTime ? dayjs(selectedTime).format('HH:mm') : null,
  //     birthPlace: selectedPlace,
  //   }

  //   try {
  //     await axios.post('/api/update-details', userDetails, {
  //       headers: { Authorization: `${authToken}` },
  //     })
  //     navigate('/verify')
  //   } catch (error) {
  //     console.error('Error updating details:', error)
  //   }
  // }

  console.log(dayjs(selectedTime).format("HH"), "aksjdbfkj");

  const saveAndContinue = async () => {
    setLoading(true);
    const authToken = localStorage.getItem("authToken");
    if (!authToken) return;

    const userDetails = {
      lat: selectedPlace.latitude,
      lon: selectedPlace.longitude,
      hour: Number(dayjs(selectedTime).format("HH")),
      min: Number(dayjs(selectedTime).format("mm")),
      day: Number(dayjs(selectedDate).format("DD")),
      month: Number(dayjs(selectedDate).format("MM")),
      year: Number(dayjs(selectedDate).format("YYYY")),
      tzone: 5.5,
    };

    console.log(userDetails, "akjndfkjab");

    // Replace USERID and APIKEY with your actual values
    const userId = "633179";
    const apiKey = "5fd633449d18e2c21b1f0e3c0fd1de0a5267be2a";

    // Create the Authorization header value
    const auth = `${btoa(`${userId}:${apiKey}`)}`;

    try {
      const response = await axios.post(
        "https://json.astrologyapi.com/v1/horo_chart_image/D1",
        userDetails,
        {
          headers: {
            Authorization: `Bearer ${auth}`,
            "Content-Type": "application/json",
            "Accept-Language": "en",
          },
        }
      );
      console.log("jhabdjhad", response.data.svg);
      const svg = response.data.svg.replace(/\\"/g, '"');
      const authToken = localStorage.getItem("authToken");
      const requestBody = {
        ...userDetails,
        svg: svg,
        gender: selectedGender,
        birthPlace: selectedPlace.state,
      };

      const response1 = await axios.put(
        "https://mooladhara-backend.adaptable.app/api/users/update",
        requestBody,
        {
          headers: {
            Authorization: authToken,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response1);
      navigate("/verify");
      setLoading(false);
    } catch (error) {
      console.error("Error updating details:", error);
    }
  };

  const isSaveAndContinueDisabled =
    !selectedGender || !selectedDate || !selectedTime || !selectedPlace;

  return (
    <Box>
      <Box sx={{ pb: "50px", pt: mobile ? "40px" : "" }}>
        <Typography
          variant={mobile ? "body7" : "h3"}
          sx={{ color: themeColors.palette.customColor.main, pt: "40px" }}
        >{`${name}, ${localeKeys.knowAboutYourLove}`}</Typography>
        <Typography
          variant={mobile ? "body7" : "h3"}
          sx={{ color: themeColors.palette.customColor.main }}
        >
          {localeKeys.healthCareer}
        </Typography>
      </Box>
      <Box
        sx={{
          flexWrap: "wrap",
          display: "flex",
          ...(mobile ? flexStyles.flexColumn : flexStyles.flexRowSpaceBetween),
        }}
      >
        {/* ---------- Gender ---------- */}
        <Box
          sx={{
            width: mobile ? "100%" : "47%",
            border: "1px solid",
            borderColor: themeColors.palette.customColor.grey2,
            borderRadius: "10px",
            p: mobile ? "16px" : "40px",
            ...flexStyles.flexColumnAlignStart,
            backgroundColor: themeColors.palette.customColor.lightGrey,
            height: mobile ? "" : "205px",
          }}
        >
          <Typography
            variant={mobile ? "body8" : "body6"}
            sx={{ color: themeColors.palette.customColor.white }}
          >
            {localeKeys.selectYourGender}
          </Typography>
          <Box display="flex">
            {genders.map((gender) => (
              <Box
                key={gender.id}
                onClick={() => handleGenderClick(gender.id)}
                sx={{
                  height: "44px",
                  borderRadius: "32px",
                  backgroundColor:
                    selectedGender === gender.id
                      ? themeColors.palette.customColor.main
                      : themeColors.palette.customColor.grey,
                  marginRight: "10px",
                  ...flexStyles.flexCenter,
                  cursor: "pointer",
                  padding: "0 16px",
                  mt: mobile ? "24px" : "40px",
                }}
              >
                <Typography
                  variant={mobile ? "body5" : "body1"}
                  sx={{ color: themeColors.palette.customColor.white }}
                >
                  {gender.label}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
        {/* ---------- DOB ---------- */}
        <Box
          sx={{
            width: mobile ? "100%" : "47%",
            border: "1px solid",
            borderColor: themeColors.palette.customColor.grey2,
            borderRadius: "10px",
            p: mobile ? "16px" : "40px",
            ...flexStyles.flexColumnAlignStart,
            backgroundColor: themeColors.palette.customColor.lightGrey,
            height: mobile ? "" : "205px",
            mt: mobile ? "24px" : "",
          }}
        >
          <Typography
            variant={mobile ? "body8" : "body6"}
            sx={{ color: themeColors.palette.customColor.white }}
          >
            {localeKeys.dateOfBirth}
            <Typography
              variant="span"
              sx={{
                fontSize: mobile ? "10px" : "15px",
                pl: "13px",
                color: themeColors.palette.customColor.grey2,
              }}
            >
              {`(${localeKeys.accurateDob})`}
            </Typography>
          </Typography>
          <Box
            sx={{
              minWidth: mobile ? "80px" : "127px",
              height: "44px",
              backgroundColor: selectedDate
                ? themeColors.palette.customColor.main
                : themeColors.palette.customColor.grey,
              borderRadius: "7px",
              p: "10px",
              ...flexStyles.flexRowSpaceBetweenAlignCenter,
              gap: "10px",
              cursor: "pointer",
              mt: mobile ? "24px" : "40px",
            }}
            onClick={() => setIsDatePickerOpen(true)}
          >
            <CustomIcon
              src={calendar}
              width={mobile ? 18 : 24}
              height={mobile ? 18 : 24}
            />
            <Typography
              sx={{
                fontSize: mobile ? "12px" : "15px",
                color: themeColors.palette.customColor.white,
              }}
            >
              {selectedDate
                ? dayjs(selectedDate).format("ddd - DD - MMM - YYYY")
                : localeKeys.selectDate}
            </Typography>
          </Box>
          <Modal
            open={isDatePickerOpen}
            onClose={() => setIsDatePickerOpen(false)}
            aria-labelledby="date-picker-modal"
            aria-describedby="date-picker-modal-description"
          >
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: mobile ? "90%" : "350px",
                bgcolor: "background.paper",
                overflowY: "auto", // Make content scrollable if it exceeds max height
              }}
            >
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar
                  value={selectedDate}
                  onChange={handleDateChange}
                  views={["year", "month", "day"]}
                  sx={{
                    mt: "16px",
                    backgroundColor: "white",
                    borderRadius: "8px",
                  }}
                />
              </LocalizationProvider>
            </Box>
          </Modal>
        </Box>
        {/* ---------- Time of Birth ---------- */}
        <Box
          sx={{
            width: mobile ? "100%" : "47%",
            border: "1px solid",
            borderColor: themeColors.palette.customColor.grey2,
            borderRadius: "10px",
            mt: mobile ? "24px" : "50px",
            p: mobile ? "16px" : "40px",
            ...flexStyles.flexColumnAlignStart,
            backgroundColor: themeColors.palette.customColor.lightGrey,
            height: mobile ? "" : "205px",
          }}
        >
          <Typography
            variant={mobile ? "body8" : "body6"}
            sx={{ color: themeColors.palette.customColor.white }}
          >
            {localeKeys.timeOfBirth}
            <Typography
              variant="span"
              sx={{
                fontSize: mobile ? "10px" : "15px",
                pl: "13px",
                color: themeColors.palette.customColor.grey2,
              }}
            >
              {`(${localeKeys.accurateTime})`}
            </Typography>
          </Typography>
          <Box sx={{ mt: mobile ? "24px" : "40px" }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <MobileTimePicker
                value={selectedTime}
                onChange={handleMobileTimeChange}
                open={showMobileTimePicker}
                onOpen={() => setShowMobileTimePicker(true)}
                onClose={() => setShowMobileTimePicker(false)}
                minutesStep={5} // Set minutesStep to allow selection of minutes
                sx={{
                  display: "none",
                }}
              />

              {/* Custom Box component to trigger mobile time picker */}
              <Box
                sx={{
                  minWidth: "100px",
                  height: "44px",
                  backgroundColor: selectedTime
                    ? themeColors.palette.customColor.main
                    : themeColors.palette.customColor.grey,
                  borderRadius: "7px",
                  p: "10px",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  cursor: "pointer",
                }}
                onClick={toggleMobileTimePicker}
              >
                <CustomIcon
                  src={clock}
                  width={mobile ? 18 : 24}
                  height={mobile ? 18 : 24}
                />{" "}
                <Typography
                  sx={{
                    fontSize: mobile ? "12px" : "15px",
                    color: "#FFFFFF",
                  }}
                >
                  {selectedTime
                    ? dayjs(selectedTime).format("hh:mm A") // Format with AM/PM
                    : "Select time"}
                </Typography>
              </Box>
            </LocalizationProvider>
          </Box>
        </Box>
        {/* ---------- Birth Place ---------- */}
        <Box
          sx={{
            width: mobile ? "100%" : "47%",
            border: "1px solid",
            borderColor: themeColors.palette.customColor.grey2,
            borderRadius: "10px",
            mt: mobile ? "24px" : "50px",
            p: mobile ? "16px" : "40px",
            ...flexStyles.flexColumnAlignStart,
            backgroundColor: themeColors.palette.customColor.lightGrey,
            height: mobile ? "" : "205px",
          }}
        >
          <Typography
            variant={mobile ? "body8" : "body6"}
            sx={{ color: themeColors.palette.customColor.white }}
          >
            {localeKeys.selectYourBirthPlace}
          </Typography>
          <Box sx={{ mt: mobile ? "24px" : "40px", width: "100%" }}>
            <SearchFieldWithPopover
              setSelectedPlace={setSelectedPlace}
              places={statesCoordinates}
            />
          </Box>
        </Box>
      </Box>
      <Box
        disabled={isSaveAndContinueDisabled}
        sx={{ ...flexStyles.flexRowFlexEnd }}
      >
        <Button
          disabled={isSaveAndContinueDisabled}
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
            mt: "40px",
            textTransform: "none",
            fontSize: mobile ? "12px" : "15px",
            "&.Mui-disabled": {
              backgroundColor: "#828282",
              color: "white",
              "& .MuiButton-endIcon": {
                color: "white",
              },
            },
          }}
          endIcon={
            <ArrowForwardIcon
              sx={{
                width: mobile ? "18px" : "24px",
                height: mobile ? "18px" : "24px",
              }}
            />
          }
          onClick={saveAndContinue}
        >
          Save & Continue
        </Button>
      </Box>

      {loading && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(83, 104, 100, 0.403)",
            zIndex: 9999,
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Lottie
              options={{
                loop: true,
                autoplay: true,
                animationData: animationData,
                rendererSettings: {
                  preserveAspectRatio: "xMidYMid slice",
                },
              }}
              height={150}
              width={150}
            />
          </div>
        </div>
      )}
    </Box>
  );
};

export default DetailsBox;
