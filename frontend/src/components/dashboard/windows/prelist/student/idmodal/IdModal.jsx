import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Card,
  CardBody,
  Divider,
  CardFooter,
  Image,
  Stack,
  Heading,
  Text,
  ButtonGroup,
  useToast,
} from '@chakra-ui/react';

export default function IdModal({ isOpen, onClose, studentName }) {
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handlePrintID = () => {
    // Set loading state to true
    setIsLoading(true);

    // Simulate printing ID by adding a delay
    setTimeout(() => {
      // Set loading state to false after delay
      setIsLoading(false);

      // Show toast notification
      toast({
        title: 'ID Printed',
        description: `ID for ${studentName} has been printed successfully.`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });

      // Close the modal
      onClose();
    }, 2000);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{studentName}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {/* Student details to print */}
          <Card maxW='sm' bg="gold" border="2px">
            <CardBody>
              <Image
                src='https://bit.ly/code-beast'
                alt='Green double couch with wooden legs'
                borderRadius='lg'
                rounded="full"
                p="20px"
              />
              <Stack mt='2' spacing='1' align='center' justify='center' bg="purple.800" p="10px" rounded="lg">
                <Heading size='md' color="white">John Deo Dela Cruz</Heading>
                <Text fontSize='xs' color="white">Edsa Cor. Timog Brgy. Pinyahan Quezon City</Text>
                <Text textAlign='center' color="white">
                  ID No. -
                </Text>
                <Text fontWeight="50px" fontSize='2xl' textAlign='center' color="white">
                  BSIT
                </Text>
                <Text fontSize='xs' color="white">Bachelor of Science in Information and Technology</Text>
              </Stack>
            </CardBody>
            <Divider />
            <CardFooter bg="purple.800" align='center' justify='center' p="10px">
              <Text fontSize='xs' color="white">Contact No. : 09123456789</Text>
            </CardFooter>
          </Card>
          {/* Student details to print */}
        </ModalBody>
        <ModalFooter>
          <ButtonGroup spacing='2'>
            <Button
              variant='solid'
              colorScheme='blue'
              onClick={handlePrintID}
              isLoading={isLoading}
              loadingText='Printing...'
            >
              Print ID
            </Button>
            <Button variant='ghost' colorScheme='blue' onClick={onClose}>
              Cancel
            </Button>
          </ButtonGroup>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
