import { CheckCircleIcon, EditIcon, Icon, StarIcon, ViewIcon } from "@chakra-ui/icons";
import { Avatar, Box, Button, Card, CardBody, CardFooter, CardHeader, Divider, Flex, HStack, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Spinner } from "@chakra-ui/react";
import { fetchAccountAPI } from "../../api/AccountsApi";

export default function GraphsAndAnalytics() {
  const [loading, setLoading] = useState(true);
  const [allAccounts, setAllAccounts] = useState([]);



  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const data = await fetchAccountAPI();
        setAllAccounts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false)
      }
    };

    fetchAccount();
  }, []);
  const filteredStudents = allAccounts.filter((account) => account.role === "student");
  const filteredFaculty = allAccounts.filter((account) => account.role === "faculty");
  const filteredStaff = allAccounts.filter((account) => account.role === "staff");
  // const filteredIdIssued = allAccounts.filter((account) => account.role === "student");
  
  return (
    <>
      {loading ? (<Flex justify="center" align="center" h="100vh"><Spinner size="xl" /></Flex>) : (<SimpleGrid spacing={10} minChildWidth={300} px={5} py={5}>



        <Card borderTopWidth="8px" borderTopColor="red.400" bg="white" shadow="lg">
          <CardHeader color="gray.700">
            <Flex gap={5}>
              <Box w="50px" h="50px">
                <CheckCircleIcon boxSize={50} color="red.400" />
              </Box>
              <Box>
                <Heading as="h2" size="lg">Students</Heading>
                <Text fontSize="6xl" color="red.400">{filteredStudents.length}</Text>
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

        <Card borderTopWidth="8px" borderTopColor="red.400" bg="white" shadow="lg">
          <CardHeader color="gray.700">
            <Flex gap={5}>
              <Box w="50px" h="50px">
                <CheckCircleIcon boxSize={50} color="red.400" />
              </Box>
              <Box>
                <Heading as="h2" size="lg">Faculty</Heading>
                <Text fontSize="6xl" color="red.400">{filteredFaculty.length}</Text>
              </Box>
            </Flex>
          </CardHeader>


          {/* <CardBody color="gray.500">
    <Text>{detail.description}</Text>
  </CardBody> */}

          <Divider borderColor="gray.200" />

          <CardFooter>
            <HStack>
              <Text>List of all faculty register in the system</Text>
            </HStack>
          </CardFooter>
        </Card>

        <Card borderTopWidth="8px" borderTopColor="red.400" bg="white" shadow="lg">
          <CardHeader color="gray.700">
            <Flex gap={5}>
              <Box w="50px" h="50px">
                <CheckCircleIcon boxSize={50} color="red.400" />
              </Box>
              <Box>
                <Heading as="h2" size="lg">Staff</Heading>
                <Text fontSize="6xl" color="red.400">{filteredStaff.length}</Text>
              </Box>
            </Flex>
          </CardHeader>


          {/* <CardBody color="gray.500">
    <Text>{detail.description}</Text>
  </CardBody> */}

          <Divider borderColor="gray.200" />

          <CardFooter>
            <HStack>
              <Text>List of all ID Issued in the system</Text>
            </HStack>
          </CardFooter>
        </Card>

        <Card borderTopWidth="8px" borderTopColor="red.400" bg="white" shadow="lg">
          <CardHeader color="gray.700">
            <Flex gap={5}>
              <Box w="50px" h="50px">
                <CheckCircleIcon boxSize={50} color="red.400" />
              </Box>
              <Box>
                <Heading as="h2" size="lg">ID Issued</Heading>
                <Text fontSize="6xl" color="red.400">{filteredStudents.length}</Text>
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


      </SimpleGrid>)}

    </>
  )
}
