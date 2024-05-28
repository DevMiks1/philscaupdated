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
  Select,
} from "@chakra-ui/react";
import { fetchAccountAPI } from "../../api/AccountsApi";
import { useAuth } from "../../context/Auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const StudentProfile = ({
  userName,

  userContactNo,
  onUpdate,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [allUsers, setAllUsers] = useState([]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [firstname, setFirstname] = useState("");
  const [suffix, setSuffix] = useState("");
  const [lastname, setLastname] = useState("");
  const [course, setCourse] = useState("");
  const [position, setPosition] = useState("");
  const [designation, setDesignation] = useState("");
  const [hgt, setHgt] = useState("");
  const [wgt, setWgt] = useState("");
  const [sss, setSSS] = useState("");
  const [tin, setTin] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [year, setYear] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [contactnumber, setContactNumber] = useState("");
  const navigate = useNavigate();
  const globalUrl = process.env.REACT_APP_GLOBAL_URL;
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


  const uploadFiles = async () => {
    setLoading(true);

    try {
      let cloudName = "dijhxviqe";
      for (const image of images) {
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "uploadNews");
        const api = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

        const res = await axios.post(api, data);
        const secure_url = res.data.secure_url;
        auth.user.picture = secure_url;
        await fetchUploadImage(secure_url);
      }

      setLoading(false);

      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);

      console.log("Files upload success");
    } catch (error) {
      console.error("Upload failed:", error);
      setLoading(false);
    }
  };

  const fetchUploadImage = async (imageSecureUrl) => {
    const body = {
      picture: imageSecureUrl,
      firstname: firstname,
      lastname: lastname,
      suffix: suffix,
      course: course,
      year: year,
      birthdate: birthdate,
      contactnumber: contactnumber
    };

    const userSignin = auth.user._id;

    try {
      let url = `${globalUrl}/accounts/update/${userSignin}`;
      let method = "PATCH";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": process.env.REACT_APP_X_AUTH_TOKEN,
        },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        auth.user.firstname = firstname;
        auth.user.lastname = lastname;
        auth.user.suffix = suffix;
        console.log("Data saved successfully");
      } else {
        console.log("Error saving data");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleSubmit = async () => {
    if (images.length < 1) {
      toast({
        title: "Please Fill All the Fields",
        status: "warning",
        duration: 2000,
        isClosable: true,
        position: "bottom",
      });
    } else {
      await uploadFiles();
      setTimeout(() => {
        window.location.reload(false)
      }, 2000)
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

  const handleFileChange = (e) => {
    const selectedFiles = e.target.files[0];
    setImages([selectedFiles]);
  };

  return (
    <>
      {allUsers.map((user) => {
        const birthdate = user.birthdate;
        const date = birthdate ? new Date(birthdate) : null;
        const formattedDate = date ? date.toISOString().split("T")[0] : "";
        console.log(formattedDate);
        return (
          <Box key={user._id}>
            <SimpleGrid>
              <Card borderTop="8px" borderColor="purple.400" bg="white">
                <CardHeader bg="purple.100">
                  <Flex gap={2}>
                    <Box w="120px" h="100px">
                      <WrapItem>
                        <Avatar size="xl" name={user.firstname} src={user.picture} />
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
                    {["faculty", "staff"].includes(user.role) && (
                      <ListItem>
                        <ListIcon as={InfoIcon} color="green.500" />
                        Position: {user.position}
                      </ListItem>
                    )}
                    {["faculty", "staff"].includes(user.role) && (
                      <ListItem>
                        <ListIcon as={InfoIcon} color="green.500" />
                        Designation: {user.designation}
                      </ListItem>
                    )}
                    {["faculty", "staff"].includes(user.role) && (
                      <ListItem>
                        <ListIcon as={InfoIcon} color="green.500" />
                        HGT: {user.hgt}
                      </ListItem>
                    )}
                    {["faculty", "staff"].includes(user.role) && (
                      <ListItem>
                        <ListIcon as={InfoIcon} color="green.500" />
                        WGT: {user.wgt}
                      </ListItem>
                    )}
                    {["faculty", "staff"].includes(user.role) && (
                      <ListItem>
                        <ListIcon as={InfoIcon} color="green.500" />
                        SSS: {user.sss}
                      </ListItem>
                    )}
                    {["faculty", "staff"].includes(user.role) && (
                      <ListItem>
                        <ListIcon as={InfoIcon} color="green.500" />
                        TIN: {user.tin}
                      </ListItem>
                    )}
                    {user.role === "student" && (
                      <ListItem>
                        <ListIcon as={InfoIcon} color="green.500" />
                        Course: {user.course}
                      </ListItem>
                    )}
                    {
                      <ListItem>
                        <ListIcon as={InfoIcon} color="green.500" />
                        Contact Person: {user.contactperson}
                      </ListItem>
                    }
                    {
                      <ListItem>
                        <ListIcon as={InfoIcon} color="green.500" />
                        Address: {user.address}
                      </ListItem>
                    }

                    <ListItem>
                      <ListIcon as={InfoIcon} color="green.500" />
                      Date of Birth: {formattedDate}
                    </ListItem>
                    {user.role === "students" && (
                      <ListItem>
                        <ListIcon as={InfoIcon} color="green.500" />
                        Year: {user.year}
                      </ListItem>
                    )}

                    <ListItem>
                      <ListIcon as={InfoIcon} color="green.500" />
                      Contact No: {user.contactnumber}
                    </ListItem>
                    {/* Add more ListItem components for additional details */}
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
            </SimpleGrid>

            <Modal isOpen={isOpen} onClose={onClose} size="xl">
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Personal Details</ModalHeader>
                <ModalCloseButton />
                <ModalBody maxW="600px">
                  <Flex gap={3} pb={5}>
                    <FormControl isRequired>
                      <FormLabel>Firstname:</FormLabel>
                      <Input
                        type="text"
                        name="firstname"
                        value={firstname}
                        onChange={(e) => setFirstname(e.target.value)}
                        placeholder="Firstname"
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Suffx:</FormLabel>
                      <Input
                        type="text"
                        name="suffix"
                        value={suffix}
                        onChange={(e) => setSuffix(e.target.value)}
                        placeholder="Suffix"
                      />
                    </FormControl>
                    <FormControl isRequired>
                      <FormLabel>Lastname:</FormLabel>
                      <Input
                        type="text"
                        name="name"
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}
                        placeholder="Lastname"
                      />
                    </FormControl>
                  </Flex>

                  <Flex gap={5} pb={5}>
                    {["faculty", "staff"].includes(user.role) && (
                      <FormControl isRequired>
                        <FormLabel>Position:</FormLabel>
                        <Input
                          type="text"
                          name="course"
                          value={position}
                          onChange={(e) => setPosition(e.target.value)}
                          placeholder="Position"
                        />
                      </FormControl>
                    )}
                    {["faculty", "staff"].includes(user.role) && (
                      <FormControl isRequired>
                        <FormLabel>Designation:</FormLabel>
                        <Input
                          type="text"
                          name="course"
                          value={designation}
                          onChange={(e) => setDesignation(e.target.value)}
                          placeholder="Designation"
                        />
                      </FormControl>
                    )}
                    {["faculty", "staff"].includes(user.role) && (
                      <FormControl isRequired>
                        <FormLabel>HGT:</FormLabel>
                        <Input
                          type="text"
                          name="course"
                          value={hgt}
                          onChange={(e) => setHgt(e.target.value)}
                          placeholder="Height"
                        />
                      </FormControl>
                    )}
                    {user.role === "student" && (
                      <FormControl isRequired>
                        <FormLabel>Course:</FormLabel>
                        <Input
                          type="text"
                          name="course"
                          value={course}
                          onChange={(e) => setCourse(e.target.value)}
                          placeholder="Course"
                        />
                      </FormControl>
                    )}


                  </Flex>

                  <Flex gap={5} pb={5}>


                    {["faculty", "staff"].includes(user.role) && (
                      <FormControl isRequired>
                        <FormLabel>WGT:</FormLabel>
                        <Input
                          type="text"
                          name="course"
                          value={wgt}
                          onChange={(e) => setWgt(e.target.value)}
                          placeholder="Weight"
                        />
                      </FormControl>
                    )}
                    {["faculty", "staff"].includes(user.role) && (
                      <FormControl isRequired>
                        <FormLabel>SSS:</FormLabel>
                        <Input
                          type="text"
                          name="course"
                          value={sss}
                          onChange={(e) => setSSS(e.target.value)}
                          placeholder="SSS"
                        />
                      </FormControl>
                    )}
                    {["faculty", "staff"].includes(user.role) && (
                      <FormControl isRequired>
                        <FormLabel>TIN:</FormLabel>
                        <Input
                          type="text"
                          name="course"
                          value={tin}
                          onChange={(e) => setTin(e.target.value)}
                          placeholder="TIN"
                        />
                      </FormControl>
                    )}

                  </Flex>

                  <Flex gap={5} pb={5}>
                    {["faculty", "staff"].includes(user.role) && (
                      <FormControl isRequired>
                        <FormLabel>Contact Person:</FormLabel>
                        <Input
                          type="text"
                          name="course"
                          value={contactPerson}
                          onChange={(e) => setContactPerson(e.target.value)}
                          placeholder="Contact Person"
                        />
                      </FormControl>
                    )}
                    <FormControl>
                      <FormLabel>Date of Birth:</FormLabel>
                      <Input
                        type="date"
                        name="birthdate"
                        defaultValue={birthdate}
                        onChange={(e) => setBirthdate(e.target.value)}
                      />
                    </FormControl>
                    {user.role === "student" && (


                      <FormControl isRequired>
                        <FormLabel>Year:</FormLabel>
                        <Select
                          name="year"
                          value={year}
                          placeholder="Select Year"
                          onChange={(e) => setYear(e.target.value)}
                        >
                          <option value="1st">1st</option>
                          <option value="2nd">2nd</option>
                          <option value="3rd">3rd</option>
                          <option value="4th">4th</option>
                        </Select>
                      </FormControl>
                    )
                    }
                    <FormControl isRequired>
                      <FormLabel>Contact No.:</FormLabel>
                      <Input
                        type="tel"
                        name="contactNo"
                        value={contactnumber}
                        onChange={(e) => setContactNumber(e.target.value)}
                        placeholder="Contact Number"
                      />
                    </FormControl>

                  </Flex>


                  <div className="container mx-auto pt-10">
                    <form className="">
                      <div className="flex flex-col justify-center">
                        <div className="md:col-span-4 h-full">
                          <div className="flex flex-col justify-center items-center gap-3 p-5 border border-dashed border-black h-full w-[100%] dark:bg-white">
                            {images.length > 0 ? (
                              <div
                                className="flex flex-col justify-center items-center gap-3 text-center h-[170px]"
                                style={{
                                  wordWrap: "break-word",
                                  wordBreak: "break-word",
                                }}
                              >
                                <img
                                  className="mx-auto max-h-[150px]"
                                  src={URL.createObjectURL(images[0])}
                                  alt={images[0].name}
                                />
                                {images.map((image) => {
                                  return <p key={image.name}>{image.name}</p>;
                                })}
                              </div>
                            ) : (
                              <div className="flex flex-col justify-center items-center">
                                <span className="text-[4rem]">
                                  <i className="fa-solid fa-folder-open"></i>
                                </span>
                                <p className="font-semibold text-center">
                                  Upload your image here
                                </p>
                              </div>
                            )}

                            <label
                              htmlFor="actual-btn"
                              className="custom-file-upload"
                            >
                              Choose Files
                              <input
                                type="file"
                                accept="image/*"
                                id="actual-btn"
                                onChange={handleFileChange}
                              />
                            </label>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </ModalBody>

                <ModalFooter>
                  <Button colorScheme="blue" mr={3} onClick={onClose}>
                    Close
                  </Button>

                  <Button
                    colorScheme="green"
                    onClick={handleSubmit}
                    isLoading={loading}
                  >
                    Update
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </Box>
        );
      })}
    </>
  );
};

export default StudentProfile;
