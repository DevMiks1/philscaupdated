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
  Flex,
} from "@chakra-ui/react";
import { updateAccountAPI } from "../../../../../api/AccountsApi";
import { useData } from "../../../../../context/FetchAccountContext";


const EditAccount = ({ isOpen, onClose, account }) => {
  const { data, setData } = useData();
  const [isLoading, setIsLoading] = useState(false);


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
    setIsLoading(true);
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

      const response = await updateAccountAPI(updatedAccount)
      if (response) {
        const updatedData = data.map((el) =>
          el._id === account._id ? { ...el, ...formData } : el
        );
        setData(updatedData);
        onClose(); // Close the modal after successful update
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const students = account.role === "student"
  const employee = ["faculty", "staff"].includes(account.role)

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Account</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
    
          <FormControl pb={5}>
            <FormLabel>{employee ? "Employee ID" : "Student ID"}</FormLabel>
            <Input
              name="userId"
              disabled
              value={formData.userId}
              onChange={handleChange}
            />
          </FormControl>
          <Flex gap={3} pb={5}>
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
          </Flex>

          <Flex gap={3} pb={5}>
            {employee && (
              <>
                <FormControl>
                  <FormLabel>Position</FormLabel>
                  <Input
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Designation</FormLabel>
                  <Input
                    name="designation"
                    value={formData.designation}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>HGT</FormLabel>
                  <Input
                    name="hgt"
                    value={formData.hgt}
                    onChange={handleChange}
                  />
                </FormControl>
              </>
            )}
            {students && (
              <>
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
              </>
            )}
          </Flex>

          <Flex gap={3} pb={5}>
            {employee && (
              <>
                <FormControl>
                  <FormLabel>WGT</FormLabel>
                  <Input
                    name="wgt"
                    value={formData.wgt}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>SSS</FormLabel>
                  <Input
                    name="sss"
                    value={formData.sss}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>TIN</FormLabel>
                  <Input
                    name="tin"
                    value={formData.tin}
                    onChange={handleChange}
                  />
                </FormControl>
              </>
            )}
          </Flex>

          <Flex gap={3} pb={5}>

            <>
              <FormControl>
                <FormLabel>Contact Person</FormLabel>
                <Input
                  name="contactperson"
                  value={formData.contactperson}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Address</FormLabel>
                <Input
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                />
              </FormControl>

            </>

          </Flex>
          <Flex gap={3}>
            <>
            <FormControl>
                  <FormLabel>Birthdate</FormLabel>
                  <Input
                    type="date"
                    name="birthdate"
                    value={formData.birthdate}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Contact Number</FormLabel>
                  <Input
                    name="contactnumber"
                    value={formData.contactnumber}
                    onChange={handleChange}
                  />
                </FormControl>
            </>
          </Flex>


        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit} isLoading={isLoading}>
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
