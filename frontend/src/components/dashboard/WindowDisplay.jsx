import React, { useState, useEffect } from "react";
import PreList from "./windows/PreList";
import StudIDList from "./windows/StudIDList";
import GraphsAndAnalytics from "./windows/GraphsAndAnalytics";
import Settings from "./windows/Settings";
import StudentProfile from "./windows/StudentProfile";
import Reports from "./windows/Reports";
import ReportId from "./windows/ReportId";

export const WindowDisplay = ({ tab, allUsers }) => {
  const [display, setDisplay] = useState(null);

  useEffect(() => {
    if (!allUsers || !allUsers.length) {
      setDisplay(null);
      return;
    }

    const role = allUsers[0].role;

    if (role === "admin") {
      const components = {
        prelist: <PreList />,
        studlistid: <StudIDList />,
        graphsandanalytics: <GraphsAndAnalytics />,
        reports: <Reports />,
        settings: <Settings />,
      };
      setDisplay(components[tab] || null);
    } else if (["student", "faculty", "staff"].includes(role)) {
      const employee = {
        profile: <StudentProfile />,
        reportid: <ReportId />,
      }
      setDisplay(employee[tab] || null);
    } else {
      setDisplay(null);
    }
  }, [tab, allUsers]);

  return <div className="h-full">{display}</div>;
};
