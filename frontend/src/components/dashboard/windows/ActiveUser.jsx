/** @format */

import { CheckCircleIcon, EditIcon, Icon, StarIcon, ViewIcon } from "@chakra-ui/icons";
import { Avatar, Box, Button, Card, CardBody, CardFooter, CardHeader, Divider, Flex, HStack, Heading, SimpleGrid, Text } from "@chakra-ui/react";


const ActiveUser = ({filteredStudents, filteredFaculty, filteredStaff}) => {
  return (
    <Flex gap={2}>
      <Card
        borderTopWidth="8px"
        borderTopColor="red.400"
        bg="white"
        shadow="lg"
      >
        <CardHeader color="gray.700">
          <Flex gap={5}>
            <Box w="50px" h="50px">
              <CheckCircleIcon boxSize={50} color="red.400" />
            </Box>
            <Box>
              <Heading as="h2" size="lg">
                Students
              </Heading>
              <Text fontSize="6xl" color="red.400">
                {filteredStudents.length}
              </Text>
            </Box>
          </Flex>
        </CardHeader>

        {/* <CardBody color="gray.500">
    <Text>{detail.description}</Text>
  </CardBody> */}

        <Divider borderColor="gray.200" />

        <CardFooter>
          <Text>List of all students register in the system</Text>
        </CardFooter>
      </Card>

      <Card
        borderTopWidth="8px"
        borderTopColor="red.400"
        bg="white"
        shadow="lg"
      >
        <CardHeader color="gray.700">
          <Flex gap={5}>
            <Box w="50px" h="50px">
              <CheckCircleIcon boxSize={50} color="red.400" />
            </Box>
            <Box>
              <Heading as="h2" size="lg">
                Faculty
              </Heading>
              <Text fontSize="6xl" color="red.400">
                {filteredFaculty.length}
              </Text>
            </Box>
          </Flex>
        </CardHeader>

        <Divider borderColor="gray.200" />

        <CardFooter>
          <HStack>
            <Text>List of all faculty register in the system</Text>
          </HStack>
        </CardFooter>
      </Card>

      <Card
        borderTopWidth="8px"
        borderTopColor="red.400"
        bg="white"
        shadow="lg"
      >
        <CardHeader color="gray.700">
          <Flex gap={5}>
            <Box w="50px" h="50px">
              <CheckCircleIcon boxSize={50} color="red.400" />
            </Box>
            <Box>
              <Heading as="h2" size="lg">
                Staff
              </Heading>
              <Text fontSize="6xl" color="red.400">
                {filteredStaff.length}
              </Text>
            </Box>
          </Flex>
        </CardHeader>


        <Divider borderColor="gray.200" />

        <CardFooter>
          <HStack>
            <Text>List of all staff register in the system</Text>
          </HStack>
        </CardFooter>
      </Card>
    </Flex>
  );
};

export default ActiveUser;
