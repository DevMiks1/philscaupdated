/** @format */

// EditAccount.js
import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
  WrapItem,
  Avatar,
  Wrap,
} from "@chakra-ui/react";
import { updateAccountAPI } from "../../../../../api/AccountsApi";

const EditAccount = ({ isOpen, onClose, account }) => {
  const toast = useToast();

  const [formData, setFormData] = useState(
    account || { userId: "", name: "", course: "", year: "" }
  );

  useEffect(() => {
    if (account) {
      setFormData(account);
    }
    console.log(account);
  }, [account]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      toast({
        title: "Update Successfully",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top",
        zIndex: 9999,
      });
      // Make sure formData has the _id field for identifying the account
      const updatedAccount = { body: formData, _id: account._id };

      await updateAccountAPI(updatedAccount);
      onClose(); // Close the modal after successful update
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Account</ModalHeader>
        <ModalCloseButton />
        
        <ModalBody>
          <FormControl>
            <FormLabel>Student ID</FormLabel>
            <Input
              name="userId"
              disabled
              value={formData.userId}
              onChange={handleChange}
            />
          </FormControl>
          
          <FormControl>
            <FormLabel>Firstname</FormLabel>
            <Input name="firstname" value={formData.firstname} onChange={handleChange} />
          </FormControl>
          <FormControl>
            <FormLabel>Suffix</FormLabel>
            <Input name="suffix" value={formData.suffix} onChange={handleChange} />
          </FormControl>
          <FormControl>
            <FormLabel>Lastname</FormLabel>
            <Input name="lastname" value={formData.lastname} onChange={handleChange} />
          </FormControl>
          <FormControl>
            <FormLabel>Course</FormLabel>
            <Input
              name="course"
              value={formData.course}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Year</FormLabel>
            <Input name="year" value={formData.year} onChange={handleChange} />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
            Save
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditAccount;
