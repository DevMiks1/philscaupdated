import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Heading, Text, Link, Center } from '@chakra-ui/react';

const PageNotFound = () => {
  return (
    <Center h="100vh">
      <Box textAlign="center">
        <Heading size="2xl" mb="4">404 - Page Not Found</Heading>
        <Text fontSize="xl" mb="4">The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</Text>
        <Link as={RouterLink} to="/" color="blue.500">Go to Home Page</Link>
      </Box>
    </Center>
  );
};

export default PageNotFound;
