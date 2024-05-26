import { Box, Button, IconButton, Text } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import React from "react";

const ProfileModal = ({ setProfile, handleLogout }) => {
  return (
    <Box
      bg="white"
      color="black"
      borderRadius={8}
      boxShadow="md"
      p={4}
      position="relative"
      h="130px"
      w="120px"
      mb={2}
      ml={5}
      
      zIndex={9999}
    >
      <IconButton
        aria-label="Close"
        icon={<CloseIcon />}
        size="sm"
        variant="ghost"
        colorScheme="blackAlpha"
        position="absolute"
        top="5px"
        right="5px"
        onClick={()=>setProfile(false)}
      />
      
      <Box textAlign="center" mt={6}>
        <Button bg="#9F7AEA" color="white" _hover={{bg: "purple.300"}} onClick={handleLogout}>
          Logout
        </Button>
      </Box>
    </Box>
  );
};

export default ProfileModal;
