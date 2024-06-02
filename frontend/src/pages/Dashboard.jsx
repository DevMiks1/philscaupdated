import React, { useEffect, useState, lazy, Suspense } from "react";
import { Box } from "@chakra-ui/react";
import { SideBar } from "../components/dashboard/Sidebar";
import {WindowDisplay} from "../components/dashboard/WindowDisplay"
import { useData } from "../components/context/FetchAccountContext";
import { useAuth } from "../components/context/Auth";


// Lazy load WindowDisplay component
// const WindowDisplay = lazy(() =>
//   import("../components/dashboard/WindowDisplay")
// );

const DashBoard = () => {
  const { data, loading, setData } = useData();
  const [tab, setTab] = useState("");
  const auth = useAuth();
  console.log(tab)

  const authId = auth.user._id;

  const accountLogin = () => {
    return data.find((d) => d._id === authId);
  };
  const user = accountLogin();
  console.log(user)
  useEffect(() => {
    

    if (user && user.role) {
      const role = user.role;
      console.log(role)
      if (["faculty", "instructor", "student"].includes(role)) {
        setTab("profile");
      } else {
        setTab("prelist");
      }
    } else {
      setTab("prelist");
    }
  }, [user]);

  return (
    <>
      <Box
        w="100vw"
        h="100vh"
        className="flex inset-0 fixed  overflow-auto"
        style={{ zIndex: 214 }}
      >
        {/* SIDEBAR */}
        <Box
          w={{ md: "8%", lg: "20%", xl: "20%" }}
          bg="red.500"
          color="white"
          h="100%"
        >
          <SideBar
            tab={tab}
            setTab={setTab}
            
          />
        </Box>
        {/* RIGHT PANEL */}
        <Box w={{ md: "92%", lg: "80%", xl: "80%" }} bg="gray.50">
          {/* <Suspense fallback={<div>Loading...</div>}> */}
            <WindowDisplay
              tab={tab}
              accountLogin={accountLogin}
              
            />
          {/* </Suspense> */}
        </Box>
      </Box>
    </>
  );
};

export default DashBoard;
