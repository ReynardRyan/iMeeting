import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import MeetingList from "./pages/booking/Index";
import MeetingForm from "./pages/booking/Add";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/meeting-room" element={<MeetingList />} />
        <Route
          path="/meeting-room/booking-meeting-room"
          element={<MeetingForm />}
        />
      </Routes>
    </Router>
  );
};

export default App;
