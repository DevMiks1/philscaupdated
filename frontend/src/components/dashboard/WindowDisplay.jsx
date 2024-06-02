import React, { useState, useEffect, Suspense } from "react";
import { useData } from "../context/FetchAccountContext";
import { Box, Flex, Spinner } from "@chakra-ui/react";

const PreList = React.lazy(() => import("./windows/PreList"));
const StudIDList = React.lazy(() => import("./windows/StudIDList"));
const GraphsAndAnalytics = React.lazy(() =>
  import("./windows/GraphsAndAnalytics")
);
const Settings = React.lazy(() => import("./windows/Settings"));
const StudentProfile = React.lazy(() => import("./windows/StudentProfile"));
const Reports = React.lazy(() => import("./windows/Reports"));
const ReportId = React.lazy(() => import("./windows/ReportId"));

export const WindowDisplay = ({ tab, accountLogin }) => {
  const [display, setDisplay] = useState(null);
  const { loading } = useData();
  useEffect(() => {
    const role = accountLogin()?.role;

    if (role === "admin") {
      const components = {
        prelist: PreList,
        studlistid: StudIDList,
        graphsandanalytics: GraphsAndAnalytics,
        reports: Reports,
        settings: Settings,
      };
      setDisplay(components[tab] || null);
    } else if (["student", "faculty", "staff"].includes(role)) {
      const employee = {
        profile: StudentProfile,
        reportid: ReportId,
      };
      setDisplay(employee[tab] || null);
    } else {
      setDisplay(null);
    }
  }, [tab, accountLogin]);

  return (
    <div className="h-full">
      
        <Suspense
          fallback={<Flex flexDir="column" justify="center" align="center" h="60vh">
          <Spinner size="xl" />
          <Box pt={5}>If takes too long reload the page...</Box>
        </Flex>}
        >
          {display && React.createElement(display)}
        </Suspense>
      
    </div>
  );
};
