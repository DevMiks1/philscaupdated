/** @format */

import React, { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import { SideBar } from "../components/dashboard/Sidebar";
import { WindowDisplay } from "../components/dashboard/WindowDisplay";

const DashBoard = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [tab, setTab] = useState("");
  console.log(allUsers);

  useEffect(() => {
    if (allUsers && allUsers[0]?.role) {
      const role = allUsers[0].role;
      if (role === "student") {
        setTab("studentprofile");
      } else if(["faculty", "instructor"].includes(role)){
        setTab("profile"); // Set a default tab if user is not a student
      }
    } else {
      setTab("prelist"); // Set a default tab if no user or role is undefined
    }
  }, [allUsers]);


  

  return (
    <>
      <Box
        w="100vw"
        minH="100vh"
        className="flex inset-0 fixed  overflow-auto"
        style={{ zIndex: 214 }}
      >
        {/* SIDEBAR */}
        <Box
          w={{ md: "8%", lg: "20%", xl: "20%" }}
          bg="purple.400"
          color="white"
          
        >
          <SideBar
            tab={tab}
            setTab={setTab}
            allUsers={allUsers}
            setAllUsers={setAllUsers}
          />
        </Box>
        {/* RIGHT PANEL */}
        <Box w={{ md: "92%", lg: "80%", xl: "80%" }} bg="gray.50">
          <WindowDisplay tab={tab} allUsers={allUsers} />
        </Box>
      </Box>
      ;
    </>
  );
};

export default DashBoard;
