/** @format */

import React, { useEffect, useState } from "react";
import { EditIcon, InfoIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  Heading,
  Input,
  List,
  ListIcon,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Text,
  useDisclosure,
  useToast,
  WrapItem,
} from "@chakra-ui/react";
import { fetchAccountAPI } from "../../api/AccountsApi";
import { useAuth } from "../../context/Auth";

export default function Settings() {
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const auth = useAuth();
  const authId = auth.user._id;

  const fetchAllUsers = async () => {
    try {
      const data = await fetchAccountAPI();
      setAllUsers(data.filter((el) => el._id === authId));
    } catch (error) {
      console.error("Error fetching all users:", error);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const handleSubmit = async () => {
    if ((formData.email || formData.password) !== "") {
      toast({
        title: "Please Fill All the Fields",
        status: "warning",
        duration: 2000,
        isClosable: true,
        position: "bottom",
      });
    } else {
      setTimeout(() => {
        window.location.reload(false);
      }, 2000);
      toast({
        title: "Updated Successfully",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "bottom",
      });

      onClose(); // Move the modal close outside the if-else block
    }
  };

  return (
    <>
      {allUsers.map((user) => {
        return (
          <>
            <SimpleGrid>
              <Card borderTop="8px" borderColor="purple.400" bg="white">
                <CardHeader bg="purple.100">
                  <Flex gap={2}>
                    <Box w="120px" h="100px">
                      <WrapItem>
                        <Avatar
                          size="xl"
                          name={user.firstname}
                          src={user.picture}
                        />
                      </WrapItem>
                    </Box>
                    <Box>
                      <Heading as="h3" size="sm">
                        {user.firstname}
                      </Heading>
                      <Text>{user.email}</Text>
                    </Box>
                  </Flex>
                </CardHeader>

                <Divider borderColor="gray.400" />

                <CardBody bg="purple.50">
                  <List spacing={3}>
                    <ListItem>
                      <ListIcon as={InfoIcon} color="green.500" />
                      Name:{" "}
                      {`${user.firstname} ${user.suffix} ${user.lastname}`}
                    </ListItem>
                    <ListItem>
                      <ListIcon as={InfoIcon} color="green.500" />
                      Email: {user.email}
                    </ListItem>
                    <ListItem>
                      <ListIcon as={InfoIcon} color="green.500" />
                      Password: {user.password}
                    </ListItem>
                  </List>
                </CardBody>

                <Divider borderColor="gray.400" />

                <CardFooter borderBottom="8px" borderColor="purple.400">
                  <HStack>
                    <Button
                      onClick={onOpen}
                      variant="ghost"
                      leftIcon={<EditIcon />}
                    >
                      Edit Personal Details
                    </Button>
                  </HStack>
                </CardFooter>
              </Card>
            </SimpleGrid>{" "}
          </>
        );
      })}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Personal Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody maxW="480px">
            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                type="text"
                name="email"
                placeholder="user@example.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
              <FormHelperText>Input a valid email</FormHelperText>
            </FormControl>

            <FormControl isRequired>
              <FormLabel>New Password</FormLabel>
              <Input
                type="text"
                name="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="green" variant="ghost" onClick={handleSubmit}>
              Update
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
