/** @format */

import React, { useState, useEffect } from "react";
import { ThreeDots } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Text,
  VStack,
  Input,
  FormControl,
  FormLabel,
  Button,
  useToast,
  InputRightElement,
  InputGroup,
  Stack,
  FormHelperText,
  Select,
  Image,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useAuth } from "../components/context/Auth";
import bgImage from "../assets/bg2-1024x574.jpg"
import logo from "../assets/philscalogo.png"

// import { m } from "framer-motion";

const LogIn = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [loading, setLoading] = useState(true);
  const globalUrl = process.env.REACT_APP_GLOBAL_URL;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("");
  const [allUser, setAllUser] = useState([]);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errors, setErrors] = useState({});
  const auth = useAuth();

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      signIn();
    } else {
      setErrors(validationErrors);
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!email) {
      errors.email = "Email is required";
    }
    if (!password) {
      errors.password = "Password is required";
    }
    if (!role) {
      errors.role = "Role is required";
    }
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "role":
        setRole(value);
        break;
      default:
        break;
    }
  };

  const signIn = async () => {
    const userToSignIn = allUser.find((user) => user.email === email);
    if (userToSignIn) {
      const stored = {
        _id: userToSignIn._id,
        firstname: userToSignIn.firstname,
        suffix: userToSignIn.suffix,
        lastname: userToSignIn.lastname,
        role: userToSignIn.role,
        picture: userToSignIn.picture,
      };

      if (
        userToSignIn.password === password &&
        userToSignIn.role === role.toLowerCase()
      ) {
        try {
          auth.login(stored);
          // localStorage.setItem("user", userToSignIn._id);
          toast({
            title: "Successfully Logged In",
            status: "success",
            duration: 2000,
            isClosable: true,
            position: "bottom",
          });
          navigate("/dashboard", { replace: true });
        } catch (error) {
          console.error("Authentication error:", error);
          toast({
            title: "Error during authentication",
            status: "error",
            duration: 2000,
            isClosable: true,
            position: "bottom",
          });
        }
      } else {
        toast({
          title: "Password does not match or check the role",
          status: "warning",
          duration: 4000,
          isClosable: true,
          position: "bottom",
        });
      }
    } else {
      toast({
        title: "User not Found",
        status: "warning",
        duration: 2000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const header = {
          "Content-Type": "application/json",
          "x-auth-token": process.env.REACT_APP_X_AUTH_TOKEN,
        };

        const response = await axios.get(`${globalUrl}/accounts/retrieveAll`, {
          headers: header,
        });

        setAllUser(response.data);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="fixed flex justify-center items-center text-center h-[100vh] w-screen z-40 bg-white dark:bg-black">
        <ThreeDots
          height={200}
          width={200}
          color="#4fa94d"
          ariaLabel="three-dots-loading"
        />
      </div>
    );
  }

  return (
    <Box
      height="100vh"
      position="relative"
      // bg="purple.400"
      _before={{
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        filter: "blur(10px)",
        zIndex: -1,
      }}
    >
      
      <Box
        position="absolute"
        inset="0"
        bgGradient="linear(to-r, whiteAlpha.75, whiteAlpha.25)"
        sm={{ bg: "transparent" }}
        zIndex={0}
      ></Box>
      <Text
        fontSize="4xl"
        fontWeight="bold"
        position="absolute"
        top="20px"
        left="20px"
        color="white"
      >
        Philsca
      </Text>
      <Image
        src={logo}
        alt="Philsca Logo"
        boxSize="100px"
        objectFit="contain"
        position="absolute"
        top="20px"
        right="20px"
      />
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        bg="white"
        p="30px"
        rounded="20px"
        width="350px"
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        shadow="4xl"
        zIndex={1}
      >
        <Text fontSize="2xl" fontWeight="bold" mb="4" color="purple.500">
          Login
        </Text>
        <form onSubmit={handleSubmit}>
          <Stack spacing={4}>
            <FormControl isInvalid={errors.role}>
              <Select
                name="role"
                placeholder="Select role"
                onChange={handleChange}
                value={role}
              >
                <option value="student">Student</option>
                <option value="faculty">Faculty</option>
                <option value="staff">Staff</option>
                <option value="admin">Admin</option>
              </Select>
              {errors.role && (
                <FormHelperText color="red.500">{errors.role}</FormHelperText>
              )}
            </FormControl>

            <FormControl isRequired isInvalid={errors.email}>
              <FormLabel color="purple.500">Email</FormLabel>
              <Input
                type="text"
                name="email"
                placeholder="admincocomartin@gmail.com"
                onChange={handleChange}
                value={email}
              />
              {errors.email ? (
                <FormHelperText color="red.500">{errors.email}</FormHelperText>
              ) : (
                <FormHelperText>Input a valid email</FormHelperText>
              )}
            </FormControl>

            <FormControl isRequired>
              <FormLabel color="purple.500">Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  onChange={handleChange}
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

            <FormControl>
              <Button
                width="100%"
                bg="purple.400"
                textColor="white"
                mt="30px"
                isLoading={isSigningIn}
                type="submit"
              >
                Login
              </Button>
            </FormControl>
          </Stack>
        </form>
      </Box>
    </Box>
  );
};

export default LogIn;
