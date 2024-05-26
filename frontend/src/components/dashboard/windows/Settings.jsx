import React from 'react';
import { EditIcon, InfoIcon } from '@chakra-ui/icons';
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
  WrapItem
} from '@chakra-ui/react';

export default function Settings() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const showtoast = () => {
    toast({
      title: 'Updated',
      description: 'Updated details successfully',
      duration: 5000,
      isClosable: true,
      status: 'warning',
      position: 'top'
    });
  };

  return (
    <>
      <SimpleGrid>
        <Card borderTop="8px" borderColor="purple.400" bg="white">
          <CardHeader bg="purple.100">
            <Flex gap={2}>
              <Box w="120px" h="100px">
                <WrapItem>
                  <Avatar size='xl' name='User Name' src='https://bit.ly/code-beast' />
                </WrapItem>
              </Box>
              <Box>
                <Heading as="h3" size="sm">User Name</Heading>
                <Text>User</Text>
              </Box>
            </Flex>
          </CardHeader>

          <Divider borderColor="gray.400" />

          <CardBody bg="purple.50">
            <List spacing={3}>
              <ListItem>
                <ListIcon as={InfoIcon} color='green.500' />
                User Name
              </ListItem>
              <ListItem>
                <ListIcon as={InfoIcon} color='green.500' />
                user@example.com
              </ListItem>
              <ListItem>
                <ListIcon as={InfoIcon} color='green.500' />
                Password
              </ListItem>
              <ListItem>
                <ListIcon as={InfoIcon} color='green.500' />
                New Password
              </ListItem>
            </List>
          </CardBody>

          <Divider borderColor="gray.400" />

          <CardFooter borderBottom="8px" borderColor="purple.400">
            <HStack>
              <Button onClick={onOpen} variant="ghost" leftIcon={<EditIcon />}>Edit Personal Details</Button>
            </HStack>
          </CardFooter>
        </Card>
      </SimpleGrid>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Personal Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody maxW="480px">
            <FormControl isRequired>
              <FormLabel>Name:</FormLabel>
              <Input type="text" name="name" placeholder="User Name" />
              <FormHelperText>Input a valid name</FormHelperText>
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input type="text" name="email" placeholder="user@example.com" />
              <FormHelperText>Input a valid email</FormHelperText>
            </FormControl>

            <FormControl isRequired>
              <FormLabel>New Password</FormLabel>
              <Input type="text" name="password" />
              <FormHelperText>Use 8 characters or more for your password</FormHelperText>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="green" variant='ghost' onClick={showtoast}>Update</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
