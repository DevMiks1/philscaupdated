// Inside GenerateAccount component
import React, { useContext, useState } from "react";
import {
  useToast,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Select,
  Box,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

import { createAccountAPI } from "../../../api/AccountsApi";
import { useData } from "../../../context/FetchAccountContext";

const GenerateAccount = React.memo(({ isOpen, onClose }) => {
  const { data, setData } = useData();

  const [email, setEmail] = useState("");
  const [schoolid, setSchoolid] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("student"); // Default role is student
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast(); // Initialize useToast hook

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const body = {
      firstname: "",
      suffix: "",
      lastname: "",
      email,
      password,
      isIdIssued: false,
      picture: "",
      semestertype: "",
      schoolyear: "",
      role,
      contactnumber: "",
      birthdate: "",
      position: "",
      designation: "",
      hgt: "",
      wgt: "",
      sss: "",
      tin: "",
      contactperson: "",
      affidavit: "",
      message: "",
      schoolid: schoolid,
    };

    try {
      const existingEmail = data.some((account) => account.email === email);

      if (existingEmail) {
        toast({
          title: "Email is already taken!",
          status: "error",
          duration: 5000, // Optional: Set duration for how long the toast will be displayed (in milliseconds)
          isClosable: true, // Optional: Allow the user to close the toast manually
        });
      } else {
        // Call the createAccountAPI function with email, password, and role
        const response = await createAccountAPI({ body });
        const newAccount = { ...body, _id: response.data._id };
        const newData = [...data, newAccount];
        setData(newData);
        toast({
          title: "Account created successfully!",
          status: "success",
          duration: 5000, // Optional: Set duration for how long the toast will be displayed (in milliseconds)
          isClosable: true, // Optional: Allow the user to close the toast manually
        });
        // Reset form fields
        setEmail("");
        setPassword("");
        setSchoolid("")
        setRole("student"); // Reset the role to default
        // Close the modal after successful account creation
        onClose();
      }
    } catch (error) {
      console.error("Error creating account:", error);
      // Show error toast notification
      toast({
        title: "Error",
        description: "An error occurred. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        {/* Modal Header */}
        <ModalHeader>Create Account</ModalHeader>
        <ModalCloseButton />
        {/* Modal Body containing the form */}
        <ModalBody>
          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
            <FormControl id="email">
                <FormLabel>ID Number</FormLabel>
                <Input
                  type="text"
                  value={schoolid}
                  onChange={(e) => setSchoolid(e.target.value)}
                  required
                />
              </FormControl>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel color="purple.500">Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                  />
                  <InputRightElement w="4.5rem">
                    <Box
                      onClick={handleShowPassword}
                      _hover={{ cursor: "pointer", color: "#3182CE" }}
                      fontSize="2xl"
                      mb={2}
                    >
                      {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                    </Box>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <FormControl id="role">
                <FormLabel>Role</FormLabel>
                <Select value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="student">Student</option>
                  <option value="faculty">Faculty</option>
                  <option value="staff">Staff</option>
                </Select>
              </FormControl>
              <Button type="submit" isLoading={isLoading}>
                Create Account
              </Button>
            </Stack>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
});

export default GenerateAccount;
