import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import comment from "../../resources/svg/comment.svg";
import CustomIcon from "../../custom_components/CustomIcon";
import axios from "axios";
import dayjs from "dayjs";

const styles = {
  container: {
    padding: "20px",
    backgroundColor: "#1e1e1e",
    borderRadius: "18px",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    overflowY: "auto",
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
  paper: {
    padding: "20px",
    backgroundColor: "#222222",
    color: "#fff",
    borderRadius: "10px",
    marginBottom: "10px",
  },
  dateBox: {
    textAlign: "left",
    pb: "24px",
    mt: "10px",
    mb: "24px",
  },
  dateText: {
    textAlign: "left",
    marginBottom: "20px",
  },
};

const History = () => {
  const [histories, setHistories] = useState([]);
  const [detailedAnswers, setDetailedAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [groupedHistories, setGroupedHistories] = useState({});
  const [expanded, setExpanded] = useState(null); // Track the expanded accordion

  useEffect(() => {
    const fetchHistories = async () => {
      try {
        const authToken = localStorage.getItem("authToken");
        const response = await axios.get(
          "https://mooladhara-backend.adaptable.app/api/chat/all-histories",
          {
            headers: {
              Authorization: authToken,
              "Content-Type": "application/json",
            },
          }
        );
        const historiesData = response.data;
        setHistories(historiesData);

        // Group histories by date
        const grouped = historiesData.reduce((acc, item) => {
          const dateKey = dayjs(item.createdAt).format("DD MMM YYYY");
          if (!acc[dateKey]) {
            acc[dateKey] = [];
          }
          acc[dateKey].push(item);
          return acc;
        }, {});

        setGroupedHistories(grouped);
      } catch (error) {
        console.error("Failed to fetch histories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistories();
  }, []);

  const handleChange = async (panel) => {
    if (expanded === panel) {
      setExpanded(null); // Close the accordion if it's already expanded
      return;
    }

    setExpanded(panel);

    if (!detailedAnswers[panel]) {
      try {
        const authToken = localStorage.getItem("authToken");
        const response = await axios.get(
          `https://mooladhara-backend.adaptable.app/api/chat/history/${panel}`,
          {
            headers: {
              Authorization: authToken,
              "Content-Type": "application/json",
            },
          }
        );
        setDetailedAnswers((prev) => ({
          ...prev,
          [panel]: response.data,
        }));
      } catch (error) {
        console.error("Failed to fetch detailed answer:", error);
      }
    }
  };

  return (
    <Box sx={styles.container}>
      {loading ? (
        <Typography variant="body1" sx={{ color: "#FFFFFF" }}>
          Loading...
        </Typography>
      ) : (
        Object.keys(groupedHistories).map((dateKey) => (
          <Box key={dateKey} sx={styles.dateBox}>
            <Box sx={{ mb: "20px" }}>
              <Typography variant="body12" sx={styles.dateText}>
                {dateKey}
              </Typography>
            </Box>
            {groupedHistories[dateKey].map((item) => (
              <Paper key={item._id} sx={styles.paper}>
                <Accordion
                  sx={{ backgroundColor: "#222222" }}
                  expanded={expanded === item._id}
                  onChange={() => handleChange(item._id)}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{ color: "#FFFFFF" }} />}
                    aria-controls={`panel${item._id}-content`}
                    id={`panel${item._id}-header`}
                  >
                    <Box
                      sx={{
                        width: "100%",
                        display: "flex",
                      }}
                    >
                      <CustomIcon src={comment} width={22} height={22} />
                      <Typography
                        variant="body1"
                        sx={{ textAlign: "left", color: "#FFFFFF", ml: "16px" }}
                      >
                        {item.history.question}
                      </Typography>
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails>
                    <>
                      <Typography
                        variant="body1"
                        sx={{ textAlign: "left", color: "#FFFFFF" }}
                      >
                        Answer :
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ mt: "16px", textAlign: "left", color: "#FFFFFF" }}
                      >
                        {detailedAnswers[item._id]?.historyData}
                      </Typography>
                    </>
                  </AccordionDetails>
                </Accordion>
              </Paper>
            ))}
          </Box>
        ))
      )}
    </Box>
  );
};

export default History;
