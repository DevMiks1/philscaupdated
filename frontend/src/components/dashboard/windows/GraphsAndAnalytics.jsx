import { CheckCircleIcon, EditIcon, Icon, StarIcon, ViewIcon } from "@chakra-ui/icons";
import { Avatar, Box, Button, Card, CardBody, CardFooter, CardHeader, Divider, Flex, HStack, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import { useLoaderData } from "react-router-dom";

export default function GraphsAndAnalytics() {

  const data = [
    {
      title: "Total Students",
      count: 200,
      description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus rem dignissimos sit facilis perferendis natus.",
      color: "red.400",
      date: "April 2024",
    },
    {
      title: "Accounts",
      count: 220,
      description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus rem dignissimos sit facilis perferendis natus.",
      color: "blue.400",
      date: "April 2024",
    },
    {
      title: "Most Users",
      count: 200,
      description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus rem dignissimos sit facilis perferendis natus.",
      color: "green.400",
      date: "April 2024",
    },
    {
      title: "ID Lost Reports",
      count: 230,
      description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus rem dignissimos sit facilis perferendis natus.",
      color: "purple.400",
      date: "April 2024",
    },
    {
      title: "Created ID's",
      count: 250,
      description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus rem dignissimos sit facilis perferendis natus.",
      color: "yellow.400",
      date: "April 2024",
    },
  ];

  return (
    <SimpleGrid spacing={10} minChildWidth={300}>
    {data.map((detail, index) => (
      <Card key={index} borderTopWidth="8px" borderTopColor={detail.color} bg="white" shadow="lg">
        <CardHeader color="gray.700">
          <Flex gap={5}>
            <Box w="50px" h="50px">
              <CheckCircleIcon boxSize={50} color={detail.color} />
            </Box>
            <Box>
              <Heading as="h2" size="lg">{detail.title}</Heading>
              <Text fontSize="6xl" color={detail.color}>{detail.count}</Text>
              <Text>as of {detail.date}</Text>
            </Box>
          </Flex>
        </CardHeader>

        <CardBody color="gray.500">
          <Text>{detail.description}</Text>
        </CardBody>

        <Divider borderColor="gray.200" />

        <CardFooter>
          <HStack>
            <Button variant="ghost" leftIcon={<ViewIcon />} />
          </HStack>
        </CardFooter>
      </Card>
    ))}
  </SimpleGrid>
  )
}
