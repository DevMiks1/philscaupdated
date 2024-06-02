/** @format */

import React, { useEffect, useState } from "react";
import { useAuth } from "../context/Auth";
import { useNavigate } from "react-router-dom";
import { Avatar, Box, Flex, Icon, IconButton, Spacer, Text, Wrap, WrapItem } from "@chakra-ui/react";
import ProfileModal from "./ProfileModal";
import { ArrowUpIcon } from "@chakra-ui/icons";
const Profile = ({ allUsers, authId }) => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(false)


  const handleLogout = () => {
    auth.logout();
    navigate("/");
  };
  useEffect(() => {
    console.log(auth.user);
  }, []);

  const handleProfileModal = () => {
    setProfile(true)
  }
  return (
    <>
      {profile && (
        <ProfileModal handleLogout={handleLogout} setProfile={setProfile} />
      )}

      {allUsers
        .filter((user) => ["admin", "faculty", "staff","student"].includes(user.role) && user._id === authId)
        .map((user) => (
          <Box border="2px solid #CDCACA" w="100%" key={user._id}>

            <Flex gap={2} align="center" py={2} px={3}>

              <Wrap>
                <WrapItem>
                  <Avatar name={user.firstname} src={user.picture}>

                  </Avatar>
                </WrapItem>
              </Wrap>
              <Text>{user.firstname}</Text>
              <Spacer />
              <Icon textAlign="end"  fontSize="2rem" onClick={handleProfileModal}  _hover={{ cursor: "pointer" }}>
                <ArrowUpIcon />
              </Icon>


            </Flex>
          </Box>
        ))}




      {/* <div className="w-[50%]">Welcome {auth.user.firstname}</div> */}
    </>
  );
};

export default Profile;
