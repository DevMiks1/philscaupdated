import React, { useState, useEffect } from 'react';
import { Box, Button, Card, Divider, List, ListItem, SimpleGrid, Text } from '@chakra-ui/react';
import IdModal from './prelist/student/idmodal/IdModal';
import { fetchAccountAPI } from '../../api/AccountsApi'; // Import the API functions

export default function StudIDList() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [studentData, setStudentData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAccountAPI(); // Fetch student data from the API
        setStudentData(data);
      } catch (error) {
        // Handle error
        console.error("Error fetching student data:", error);
      }
    };

    fetchData(); // Call fetchData function when component mounts
  }, []);

  const handleViewClick = (student) => {
    setSelectedStudent(student);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedStudent(null);
  };

  return (
    <>
      <SimpleGrid minChildWidth="120px" spacing="10px" mt="20px">
        {studentData.map((student) => (
          <Card
            key={student._id} // Assuming each student object has an _id field
            bg="purple.200"
            height="80px"
            rounded="lg"
            shadow="lg"
            p="10px"
            position="relative"
          >
            <List spacing={3}>
              <ListItem>
                <Text color="purple.800" fontSize={12}>{student.name}</Text>
              </ListItem>
            </List>
            <Divider borderColor="gray.400" />
            <Button
              position="absolute"
              size="xs"
              colorScheme="purple"
              textColor="white"
              top="50%"
              left="50%"
              transform="translate(-50%, -50%)"
              onClick={() => handleViewClick(student)}
            >
              View
            </Button>
          </Card>
        ))}
      </SimpleGrid>
      <IdModal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        studentName={selectedStudent?.name}
      />
    </>
  );
}
