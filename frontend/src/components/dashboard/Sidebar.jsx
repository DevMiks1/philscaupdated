/** @format */

import {
  Avatar,
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Icon,
  Spacer,
  Text,
  VStack,
  Wrap,
  WrapItem,
  useDisclosure,
} from "@chakra-ui/react";
import {
  FaUser,
  FaChartBar,
  FaBox,
  FaUsers,
  FaHeadset,
  FaShoppingCart,
  FaUserFriends,
} from "react-icons/fa";
import { FiMenu, FiMessageSquare } from "react-icons/fi";
import { Link } from "react-router-dom";
import Profile from "./Profile";
import React, { useEffect, useState } from "react";
import { fetchAccountAPI, retrieveUserDB } from "../api/AccountsApi";
import { useAuth } from "../context/Auth";

export const SideBar = ({ setTab, tab, allUsers, setAllUsers }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

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

  const sideBarClose = () => {
    onClose();
  };

  // SIDE BAR
  return (
    <div className="px-3 sticky top-0 h-[100vh]  ">
      {/* DRAWER BUTTON */}
      <Box
        cursor="pointer"
        display={{ base: "block", md: "block", lg: "none" }}
        onClick={onOpen}
        mt={5}
        p={2}
      >
        <Icon as={FiMenu} boxSize={6} />
      </Box>
      <Flex flexDir="column" justify="space-between" h="100%" py={5}>
        <VStack display={{ base: "none", md: "none", lg: "block" }} spacing={2}>
          {allUsers.map((user) => {
            if (user.role === "admin" && user._id === authId) {
              return (
                <React.Fragment key={user._id}>
                  <Link
                    onClick={(e) => {
                      setTab("prelist");
                      onClose();
                    }}
                  >
                    <Flex
                      align="center"
                      gap={2}
                      backgroundColor={tab === "prelist" ? "gray.600" : ""}
                      borderRadius={5}
                      px={2}
                      py={2}
                      mb={2}
                      _hover={{
                        bg: "gray.600",
                        borderRadius: "5",
                      }}
                    >
                      <Icon as={FaUser} />
                      <Text as="p">Pre List</Text>
                    </Flex>
                  </Link>
                  <Link
                    onClick={(e) => {
                      setTab("studlistid");
                      onClose();
                    }}
                  >
                    <Flex
                      align="center"
                      gap={2}
                      backgroundColor={tab === "studlistid" ? "gray.600" : ""}
                      borderRadius={5}
                      px={2}
                      py={2}
                      mb={2}
                      _hover={{
                        bg: "gray.600",
                        borderRadius: "5",
                      }}
                    >
                      <Icon as={FaChartBar} />
                      <Text as="p">Student ID List</Text>
                    </Flex>
                  </Link>
                  <Link
                    onClick={(e) => {
                      setTab("graphsandanalytics");
                      onClose();
                    }}
                  >
                    <Flex
                      align="center"
                      gap={2}
                      backgroundColor={
                        tab === "graphsandanalytics" ? "gray.600" : ""
                      }
                      borderRadius={5}
                      px={2}
                      py={2}
                      mb={2}
                      _hover={{
                        bg: "gray.600",
                        borderRadius: "5",
                      }}
                    >
                      <Icon as={FaBox} />
                      <Text>Graphs&Analytics</Text>
                    </Flex>
                  </Link>
                  <Link
                    onClick={(e) => {
                      setTab("reports");
                      onClose();
                    }}
                  >
                    <Flex
                      align="center"
                      gap={2}
                      backgroundColor={tab === "reports" ? "gray.600" : ""}
                      borderRadius={5}
                      px={2}
                      py={2}
                      mb={2}
                      _hover={{
                        bg: "gray.600",
                        borderRadius: "5",
                      }}
                    >
                      <Icon as={FaBox} />
                      <Text>Reports</Text>
                    </Flex>
                  </Link>
                  <Link
                    onClick={(e) => {
                      setTab("settings");
                      onClose();
                    }}
                  >
                    <Flex
                      align="center"
                      gap={2}
                      backgroundColor={tab === "settings" ? "gray.600" : ""}
                      borderRadius={5}
                      px={2}
                      py={2}
                      mb={2}
                      _hover={{
                        bg: "gray.600",
                        borderRadius: "5",
                      }}
                    >
                      <Icon as={FaUsers} />
                      <Text>Settings</Text>
                    </Flex>
                  </Link>
                </React.Fragment>
              );
            } else {
              return null; // Return null if the user is not an admin or does not match the authId
            }
          })}

          {allUsers
            .filter(
              (user) =>
                ["student", "faculty", "staff"].includes(user.role) &&
                user._id === authId
            )

            .map((user) => (
              <Box key={user._id}>
                <Link
                  onClick={(e) => {
                    setTab("profile");
                    onClose();
                  }}
                >
                  <Flex
                    align="center"
                    gap={2}
                    backgroundColor={tab === "profile" ? "gray.600" : ""}
                    borderRadius={5}
                    px={2}
                    py={2}
                    mb={2}
                    _hover={{
                      bg: "gray.600",
                      borderRadius: "5",
                    }}
                  >
                    <Icon as={FaUsers} />
                    <Text>Profile</Text>
                  </Flex>
                </Link>
                <Link
                  onClick={(e) => {
                    setTab("reportid");
                    onClose();
                  }}
                >
                  <Flex
                    align="center"
                    gap={2}
                    backgroundColor={tab === "reportid" ? "gray.600" : ""}
                    borderRadius={5}
                    px={2}
                    py={2}
                    mb={2}
                    _hover={{
                      bg: "gray.600",
                      borderRadius: "5",
                    }}
                  >
                    <Icon as={FaBox} />
                    <Text>Report ID</Text>
                  </Flex>
                </Link>
              </Box>
              
            ))}
        </VStack>
        <Box display={{ base: "none", md: "none", lg: "block" }}>
          <Profile allUsers={allUsers} authId={authId} />
        </Box>
      </Flex>

      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton color="white" />

            <DrawerBody p={0} className="bg-gray-800 text-white">
              <Flex flexDir="column" justify="space-between" h="100%" py={5}>
                <Flex flexDir="column" mt={5} px={3}>
                  {allUsers.map((user) => {
                    if (user.role === "admin" && user._id === authId) {
                      return (
                        <React.Fragment key={user._id}>
                          <Link
                            onClick={(e) => {
                              setTab("prelist");
                              onClose();
                            }}
                          >
                            <Flex
                              align="center"
                              gap={2}
                              backgroundColor={
                                tab === "prelist" ? "gray.600" : ""
                              }
                              borderRadius={5}
                              px={2}
                              py={2}
                              mb={2}
                              _hover={{
                                bg: "gray.600",
                                borderRadius: "5",
                              }}
                            >
                              <Icon as={FaUser} />
                              <Text as="p">Pre List</Text>
                            </Flex>
                          </Link>
                          <Link
                            onClick={(e) => {
                              setTab("studlistid");
                              onClose();
                            }}
                          >
                            <Flex
                              align="center"
                              gap={2}
                              backgroundColor={
                                tab === "studlistid" ? "gray.600" : ""
                              }
                              borderRadius={5}
                              px={2}
                              py={2}
                              mb={2}
                              _hover={{
                                bg: "gray.600",
                                borderRadius: "5",
                              }}
                            >
                              <Icon as={FaChartBar} />
                              <Text as="p">Student ID List</Text>
                            </Flex>
                          </Link>
                          <Link
                            onClick={(e) => {
                              setTab("graphsandanalytics");
                              onClose();
                            }}
                          >
                            <Flex
                              align="center"
                              gap={2}
                              backgroundColor={
                                tab === "graphsandanalytics" ? "gray.600" : ""
                              }
                              borderRadius={5}
                              px={2}
                              py={2}
                              mb={2}
                              _hover={{
                                bg: "gray.600",
                                borderRadius: "5",
                              }}
                            >
                              <Icon as={FaBox} />
                              <Text>Graphs&Analytics</Text>
                            </Flex>
                          </Link>
                          <Link
                            onClick={(e) => {
                              setTab("reports");
                              onClose();
                            }}
                          >
                            <Flex
                              align="center"
                              gap={2}
                              backgroundColor={
                                tab === "reports" ? "gray.600" : ""
                              }
                              borderRadius={5}
                              px={2}
                              py={2}
                              mb={2}
                              _hover={{
                                bg: "gray.600",
                                borderRadius: "5",
                              }}
                            >
                              <Icon as={FaBox} />
                              <Text>Reports</Text>
                            </Flex>
                          </Link>
                          <Link
                            onClick={(e) => {
                              setTab("settings");
                              onClose();
                            }}
                          >
                            <Flex
                              align="center"
                              gap={2}
                              backgroundColor={
                                tab === "settings" ? "gray.600" : ""
                              }
                              borderRadius={5}
                              px={2}
                              py={2}
                              mb={2}
                              _hover={{
                                bg: "gray.600",
                                borderRadius: "5",
                              }}
                            >
                              <Icon as={FaUsers} />
                              <Text>Settings</Text>
                            </Flex>
                          </Link>
                          {/* Add other admin links here */}
                        </React.Fragment>
                      );
                    } else {
                      return null; // Return null if the user is not an admin or does not match the authId
                    }
                  })}

                  {allUsers
                    .filter(
                      (user) =>
                        ["student", "faculty", "staff"].includes(user.role) &&
                        user._id === authId
                    )

                    .map((user) => (
                      <Box key={user._id}>
                        <Link
                          onClick={(e) => {
                            setTab("profile");
                            onClose();
                          }}
                        >
                          <Flex
                            align="center"
                            gap={2}
                            backgroundColor={
                              tab === "profile" ? "gray.600" : ""
                            }
                            borderRadius={5}
                            px={2}
                            py={2}
                            mb={2}
                            _hover={{
                              bg: "gray.600",
                              borderRadius: "5",
                            }}
                          >
                            <Icon as={FaUsers} />
                            <Text>Profile</Text>
                          </Flex>
                        </Link>
                        <Link
                          onClick={(e) => {
                            setTab("reportid");
                            onClose();
                          }}
                        >
                          <Flex
                            align="center"
                            gap={2}
                            backgroundColor={
                              tab === "reportid" ? "gray.600" : ""
                            }
                            borderRadius={5}
                            px={2}
                            py={2}
                            mb={2}
                            _hover={{
                              bg: "gray.600",
                              borderRadius: "5",
                            }}
                          >
                            <Icon as={FaBox} />
                            <Text>Report ID</Text>
                          </Flex>
                        </Link>
                      </Box>
                    ))}
                  {/* Render other user links here */}
                </Flex>
                <Box>
                  <Profile allUsers={allUsers} authId={authId} />
                </Box>
              </Flex>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </div>
  );
};
