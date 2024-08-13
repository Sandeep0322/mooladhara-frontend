import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Login from "./pages/login/Login";
import { typo } from "./resources/typography/typography";
import Details from "./pages/Details/Details";
import Verify from "./pages/Verify/Verify";
import BirthChart from "./pages/birth_chart/BirthChart";
import Chat from "./pages/chat/Chat";

function PrivateRoute({ element }) {
  const authToken = localStorage.getItem("authToken");
  const userDetails = localStorage.getItem("userDetails");

  if (authToken && userDetails) {
    return <Navigate to="/chat" replace />;
  }

  return authToken ? element : <Navigate to="/login" replace />;
}

function App() {
  return (
    <ThemeProvider theme={typo}>
      <Router>
        <CssBaseline />
        <Box className="App">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/update-details" element={<Details />} />
            <Route path="/verify" element={<Verify />} />
            <Route path="/birth-chart" element={<BirthChart />} />
            <Route
              path="/"
              element={
                <PrivateRoute element={<Navigate to="/chat" replace />} />
              }
            />
            <Route path="/chat" element={<Chat />} />
          </Routes>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
