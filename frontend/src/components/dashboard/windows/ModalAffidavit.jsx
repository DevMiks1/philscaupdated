/** @format */

// ReusableModal.jsx
import React from "react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,

    ModalBody,
    ModalCloseButton,

    Text,
    Flex,
    Box,
    Wrap,
    WrapItem,
    Avatar,
    Image,
    Link,
} from "@chakra-ui/react";

const ModalAffidavit = ({ isOpen, onClose, account }) => {
    if (!account) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="xl">
            <ModalOverlay />
            <ModalContent>
                <Flex w="100%">
                    <Wrap pl={5} pt={3}>
                        <WrapItem>
                            <Avatar name={`${account.firstname}`} src={account.picture} />
                        </WrapItem>
                    </Wrap>
                    <Box w="100%">
                        <ModalHeader>{account.userId}</ModalHeader>
                    </Box>
                </Flex>
                <ModalCloseButton />

                <ModalBody>
                    <Flex gap={3}>
                        <Box
                            bg="gray.600"
                            color="white"
                            w="100%"
                            py={2}
                            px={3}
                            borderRadius={10}
                            h={account.name ? "80px" : "80px"}
                        >
                            <Text fontWeight="bold">Name:</Text>
                            {`${account.firstname} ${account.suffix} ${account.lastname}`}
                        </Box>
                        <Box
                            bg="gray.600"
                            color="white"
                            w="100%"
                            py={2}
                            px={3}
                            borderRadius={10}
                        >
                            <Text fontWeight="bold">Contact No:</Text>
                            {account.contactnumber}
                        </Box>

                    </Flex>
                </ModalBody>




                <ModalBody>
                    <Flex gap={3}>
                        <Box
                            bg="gray.600"
                            color="white"
                            w="100%"
                            py={2}
                            px={3}
                            borderRadius={10}
                        >
                            <Text fontWeight="bold">Message:</Text>
                            {account.message}
                        </Box>

                    </Flex>
                </ModalBody>
                <ModalBody>
                    <Box gap={3}>
                        <Link href={account.affidavit} download={true} isExternal rel="noopener noreferrer">
                            <Image
                                w="100%"
                                src={account.affidavit}
                                alt="Affidavit"
                                borderRadius={10}
                                maxW="100%"
                                maxH="200px"
                                objectFit="contain"
                            />
                        </Link>
                    </Box>
                </ModalBody>;



            </ModalContent>
        </Modal>
    );
};

export default ModalAffidavit;
