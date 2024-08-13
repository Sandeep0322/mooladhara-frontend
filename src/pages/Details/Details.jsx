import React, { useEffect, useState } from "react";
import HeaderBox from "../login/HeaderBox";
import DetailsBox from "./DetailsBox";
import axios from "axios";

const Details = () => {
  const [userData, setUserDate] = useState("");
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
        setUserDate(response.data.user.name);
      } catch (error) {
        console.error("Failed to fetch user details:", error);
      }
    };
    fetchData();
  }, []);
  return (
    <HeaderBox>
      <DetailsBox name={userData} />
    </HeaderBox>
  );
};

export default Details;
