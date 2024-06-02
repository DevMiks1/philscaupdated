/** @format */

import { CheckCircleIcon, EditIcon, Icon, StarIcon, ViewIcon } from "@chakra-ui/icons";
import { Avatar, Box, Button, Card, CardBody, CardFooter, CardHeader, Divider, Flex, HStack, Heading, SimpleGrid, Text } from "@chakra-ui/react";


const ActiveId = ({filteredIssuedId, filteredNonIssuedId}) => {
  return (
    <Flex gap={5} justify="center">
      <Card borderTopWidth="8px" borderTopColor="red.400" bg="white" shadow="lg">
          <CardHeader color="gray.700">
            <Flex gap={5}>
              <Box w="50px" h="50px">
                <CheckCircleIcon boxSize={50} color="red.400" />
              </Box>
              <Box>
                <Heading as="h2" size="lg">ID Issued</Heading>
                <Text fontSize="6xl" color="red.400">{filteredIssuedId.length}</Text>
              </Box>
            </Flex>
          </CardHeader>

          <Divider borderColor="gray.200" />

          <CardFooter>
            <Text>List of all accounts who have issued IDs.</Text>
          </CardFooter>
        </Card>

        <Card borderTopWidth="8px" borderTopColor="red.400" bg="white" shadow="lg">
          <CardHeader color="gray.700">
            <Flex gap={5}>
              <Box w="50px" h="50px">
                <CheckCircleIcon boxSize={50} color="red.400" />
              </Box>
              <Box>
                <Heading as="h2" size="lg">Non-Issued ID</Heading>
                <Text fontSize="6xl" color="red.400">{filteredNonIssuedId.length}</Text>
              </Box>
            </Flex>
          </CardHeader>


          {/* <CardBody color="gray.500">
    <Text>{detail.description}</Text>
  </CardBody> */}

          <Divider borderColor="gray.200" />

          <CardFooter>
            <Text>List of all accounts who do not have issued IDs.</Text>
          </CardFooter>
        </Card>
    </Flex>
  );
};

export default ActiveId;
