import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import {
  Box,
  Button,
  Flex,
  FormControl,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  Text,
  useToast,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { deleteAccountAPI } from "../../../../../api/AccountsApi";
import { useData } from "../../../../../context/FetchAccountContext";
export const DeleteAccountModal = ({ isOpen, onClose, deleteAccount, setDeleteAccount }) => {
  console.log(deleteAccount._id)
  
  const { data, setData } = useData();
  const [isLoading, setIsLoading] = useState(false);

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const toast = useToast();
  const globalUrl = process.env.REACT_APP_GLOBAL_URL;

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  //   CREATE USERACCOUNTS DATABASE
  const deleteAccountDB = async () => {
    setIsLoading(true);
    try {
      const response = await deleteAccountAPI({ _id: deleteAccount._id });
      if (response) {
        // REALTIME
        // Assuming allUsers is your state array
        let newAccounts = [...data.filter((el) => el._id !== deleteAccount._id)]; // Copying the state array
        setData([...newAccounts]);
        onClose();
        toast({
          title: "Delete Successfully",
          status: "success",
          duration: "1000",
          isClosable: true,
          position: "top",
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  const validate = () => {
    const accountToDelete = data.find((acc) => acc._id === deleteAccount._id);


    if (!accountToDelete) {
      console.log("Account not found");
      return;
    }
    if (accountToDelete.password === password) {
      
      deleteAccountDB();
    } else {
      // alert("Password is incorrect");
      console.log(accountToDelete.password);
      toast({
        title: "Password is incorrect",
        status: "warning",
        duration: "1000",
        isClosable: true,
        position: "top",
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
    <div
      className="inset-0 fixed  flex justify-center items-center overflow-auto "
      style={{ zIndex: 10000000 }}
    >
      <div className="bg-gray-800 text-white shadow-2xl min-w-[500px] min-h-[400px] h-[40vh] w-[30vw] rounded-2xl overflow-auto flex flex-col items-center justify-center">
        

        <div className="w-full h-[90%] flex justify-center">
          <Flex flexDir="column" justify="center" align="center">
            <Heading as="h2" fontSize="20px" fontWeight="semibold" mb={10}>
              Are you sure you want to delete?
            </Heading>
            <Heading as="h2" fontSize="20px" fontWeight="semibold" mb={5}>
              Please type your password to continue
            </Heading>

            <FormControl id="password" isRequired mb={10} w="80%">
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Your Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <InputRightElement w="4.5rem" pb={2}>
                  <Box
                    onClick={handleShowPassword}
                    _hover={{ cursor: "pointer", color: "#3182CE" }}
                    fontSize="2xl"
                  >
                    {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                  </Box>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Flex w="100%" justify="center" gap={4}>
              <Button
                colorScheme="lime"
                size="md"
                fontWeight="semibold"
                px={6}
                py={3}
                borderRadius="md"
                borderWidth={2}
                borderColor="green.600"
                transition="all 0.3s"
                _hover={{
                  borderColor: "green.500",
                  boxShadow: "xl",
                  color: "gray.300",
                }}
              >
                <Flex align="center" gap={2} onClick={()=> setDeleteAccount(null)}>
                  <Text>Cancel</Text>
                  <IoMdClose />
                </Flex>
              </Button>
              <Button
               
                colorScheme="lime"
                size="md"
                fontWeight="semibold"
                px={6}
                py={3}
                borderRadius="md"
                borderWidth={2}
                borderColor="red.600"
                transition="all 0.3s"
                isLoading={isLoading}
                onClick={validate}
                _hover={{
                  borderColor: "red.500",
                  boxShadow: "xl",
                  color: "gray.300",
                }}
              >
                <Flex align="center" gap={2}>
                  <Text>Delete</Text>
                  <MdDelete />
                </Flex>
              </Button>
            </Flex>
          </Flex>
        </div>
      </div>
    </div>
    </Modal>
  );
};
