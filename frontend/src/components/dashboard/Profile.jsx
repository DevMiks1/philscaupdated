/** @format */

import React, { useEffect, useState } from "react";
import { useAuth } from "../context/Auth";
import { useNavigate } from "react-router-dom";
import { Avatar, Flex, Text, Wrap, WrapItem } from "@chakra-ui/react";
import ProfileModal from "./ProfileModal";
const Profile = () => {
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
      <ProfileModal handleLogout={handleLogout} setProfile={setProfile}/>
    )}
    <Flex gap={2} align="center">
    <Wrap>
      <WrapItem>
        <Avatar name={auth.user.firstname} src={auth.user.picture} onClick={handleProfileModal} _hover={{cursor: "pointer"}}>

        </Avatar>
      </WrapItem>
    </Wrap>
    <Text>{auth.user.firstname}</Text>
    </Flex>

    
    
      {/* <div className="w-[50%]">Welcome {auth.user.firstname}</div> */}
    </>
  );
};

export default Profile;
