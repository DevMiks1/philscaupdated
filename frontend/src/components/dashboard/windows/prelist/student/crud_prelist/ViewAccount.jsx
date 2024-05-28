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

  const students = account.role === "student";
  const employee = ["faculty", "staff"].includes(account.role);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
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
              h={account.name ? "80px" : "80px"}
            >
              <Text fontWeight="bold">Name:</Text>
              {`${account.firstname} ${account.suffix} ${account.lastname}`}
            </Box>
            {students && (
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
            )}
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
            {employee && (
              <Box
                bg="gray.600"
                color="white"
                w="100%"
                py={2}
                px={3}
                borderRadius={10}
              >
                <Text fontWeight="bold">Position:</Text>
                {account.position}
              </Box>
            )}
          </Flex>
        </ModalBody>

        <ModalBody>
          <Flex gap={3}>
            {students && (
              <>
                <Box
                  bg="gray.600"
                  color="white"
                  w="100%"
                  py={2}
                  px={3}
                  borderRadius={10}
                  h={account.year ? "80px" : "80px"}
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
                  <Text fontWeight="bold">Contact Person:</Text>
                  {account.contactperson}
                </Box>
              </>
            )}
            {employee && (
              <>
                <Box
                  bg="gray.600"
                  color="white"
                  w="100%"
                  py={2}
                  px={3}
                  borderRadius={10}
                  h={account.designation ? "80px" : "80px"}
                >
                  <Text fontWeight="bold">Designation:</Text>
                  {account.designation}
                </Box>
                <Box
                  bg="gray.600"
                  color="white"
                  w="100%"
                  py={2}
                  px={3}
                  borderRadius={10}
                >
                  <Text fontWeight="bold">HGT:</Text>
                  {account.hgt}
                </Box>
                <Box
                  bg="gray.600"
                  color="white"
                  w="100%"
                  py={2}
                  px={3}
                  borderRadius={10}
                >
                  <Text fontWeight="bold">WGT:</Text>
                  {account.wgt}
                </Box>
              </>
            )}
          </Flex>
        </ModalBody>

        {employee && (
          <ModalBody>
            <Flex gap={3}>
              <>
                <Box
                  bg="gray.600"
                  color="white"
                  w="100%"
                  py={2}
                  px={3}
                  borderRadius={10}
                  h="70px"
                >
                  <Text fontWeight="bold">SSS:</Text>
                  {account.sss}
                </Box>
                <Box
                  bg="gray.600"
                  color="white"
                  w="100%"
                  py={2}
                  px={3}
                  borderRadius={10}
                >
                  <Text fontWeight="bold">TIN:</Text>
                  {account.tin}
                </Box>
              </>
            </Flex>
          </ModalBody>
        )}
        <ModalBody>
          <Flex gap={3}>
            <Box
              bg="gray.600"
              color="white"
              w="100%"
              py={2}
              px={3}
              borderRadius={10}
              h="70px"
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
              <Text fontWeight="bold">Contact No:</Text>
              {account.contactnumber}
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
              h="70px"
            >
              <Text fontWeight="bold">Email:</Text>
              {account.email}
            </Box>
            <Box
              bg="gray.600"
              color="white"
              w="100%"
              py={2}
              px={3}
              borderRadius={10}
            >
              <Text fontWeight="bold">Password:</Text>
              {account.password}
            </Box>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ViewAccount;
