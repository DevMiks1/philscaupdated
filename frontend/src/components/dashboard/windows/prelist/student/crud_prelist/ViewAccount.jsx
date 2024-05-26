/** @format */

// ReusableModal.jsx
import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  Flex,
  Box,
  Wrap,
  WrapItem,
  Avatar,
} from "@chakra-ui/react";

const ViewAccount = ({ isOpen, onClose, account }) => {
  if (!account) return null;

  const birthdate = account.birthdate;
const date = birthdate ? new Date(birthdate) : null;
const formattedDate = date ? date.toISOString().split("T")[0] : "";


  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <Flex w="100%">
          <Wrap pl={5} pt={3}>
            <WrapItem>
              <Avatar name={`${account.firstname}`} src={account.picture} />
            </WrapItem>
          </Wrap>
          <Box w="100%">
            <ModalHeader>{account.userId}</ModalHeader>
          </Box>
        </Flex>
        <ModalCloseButton />

        <ModalBody>
          <Flex gap={3}>
            <Box
              bg="gray.600"
              color="white"
              w="100%"
              py={2}
              px={3}
              borderRadius={10}
            >
              <Text fontWeight="bold">Name:</Text>
              {`${account.firstname} ${account.suffix} ${account.lastname}`}
            </Box>
            <Box
              bg="gray.600"
              color="white"
              w="100%"
              py={2}
              px={3}
              borderRadius={10}
            >
              <Text fontWeight="bold">Course:</Text>
              {account.course}
            </Box>
          </Flex>
        </ModalBody>

        <ModalBody>
          <Flex gap={3}>
            <Box
              bg="gray.600"
              color="white"
              w="100%"
              py={2}
              px={3}
              borderRadius={10}
            >
              <Text fontWeight="bold">Year:</Text>
              {account.year}
            </Box>
            <Box
              bg="gray.600"
              color="white"
              w="100%"
              py={2}
              px={3}
              borderRadius={10}
            >
              <Text fontWeight="bold">Address:</Text>
              {account.address}
            </Box>
          </Flex>
        </ModalBody>

        <ModalBody>
          <Flex gap={3}>
            <Box
              bg="gray.600"
              color="white"
              w="100%"
              py={2}
              px={3}
              borderRadius={10}
            >
              <Text fontWeight="bold">Birthdate:</Text>
              {formattedDate}
            </Box>
            <Box
              bg="gray.600"
              color="white"
              w="100%"
              py={2}
              px={3}
              borderRadius={10}
            >
              <Text fontWeight="bold">Gender:</Text>
              {account.gender}
            </Box>
          </Flex>
        </ModalBody>
        <ModalBody>
          <Flex gap={3}>
            <Box
              bg="gray.600"
              color="white"
              w="100%"
              py={2}
              px={3}
              borderRadius={10}
            >
              <Text fontWeight="bold">Email:</Text>
              {account.email}
            </Box>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ViewAccount;
