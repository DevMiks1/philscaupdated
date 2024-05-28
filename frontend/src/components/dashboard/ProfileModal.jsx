import { Box, Button, Flex, Icon, IconButton, Text } from "@chakra-ui/react";
import { CloseIcon, EditIcon, TimeIcon } from "@chakra-ui/icons";
import React from "react";

const ProfileModal = ({ setProfile, handleLogout }) => {
  return (
    <Box
      bg="white"
      color="black"
      borderRadius={8}
      boxShadow="md"
      
      py={4}
      position="relative"
      h="150px"
      w="210px"
      mb={5}
      ml="3rem"

      zIndex={9999}
    >
      <IconButton
        aria-label="Close"
        icon={<CloseIcon />}
        size="xs"
        variant="ghost"
        colorScheme="blackAlpha"
        position="absolute"
        top="5px"
        right="5px"
        onClick={() => setProfile(false)}
      />

      <Box textAlign="center" mt="1.3rem">
        
        <Flex color="black" _hover={{ bg: "purple.300", cursor: "pointer" }} onClick={handleLogout} align="center" mb={3} px={3} py={2}>
          <Icon mr={5}>
            <EditIcon />
          </Icon>
          Change Password
        </Flex>
        <Flex color="black" _hover={{ bg: "purple.300", cursor: "pointer" }} onClick={handleLogout} align="center" px={3} py={2}>
          <Icon mr={5}>
            <TimeIcon />
          </Icon>
          Logout
        </Flex>


      </Box>
    </Box>
  );
};

export default ProfileModal;
