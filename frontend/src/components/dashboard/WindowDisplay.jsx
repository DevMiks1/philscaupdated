import React, { useState } from "react";
import { useEffect } from "react";
import PreList from "./windows/PreList";
import StudIDList from "./windows/StudIDList";
import GraphsAndAnalytics from "./windows/GraphsAndAnalytics";
import Settings from "./windows/Settings";
import StudentRegistration from "./windows/StudentRegistration";
import StudentProfile from "./windows/StudentProfile";

export const WindowDisplay = ({ tab, allUsers }) => {
  const [display, setDisplay] = useState(null);

  // DISPLAY TOGGLE
  useEffect(() => {
    if (allUsers && allUsers[0]?.role) {
      const role = allUsers[0].role;
      if (role === "admin") {
        switch (tab) {
          case "prelist":
            setDisplay(<PreList />);
            break;
          case "studlistid":
            setDisplay(<StudIDList />);
            break;
          case "graphsandanalytics":
            setDisplay(<GraphsAndAnalytics />);
            break;
          case "settings":
            setDisplay(<Settings />);
            break;
          default:
            setDisplay(null);
        }
      } else if (role === "student") {
        if (tab === "studentregistration") {
          setDisplay(<StudentRegistration />);
        } else if (tab === "studentprofile"){
          setDisplay(<StudentProfile />);

        }
      } else {
        setDisplay(null);
      }
    }
  }, [tab, allUsers]);

  return <div className="h-full">{display}</div>;
};
