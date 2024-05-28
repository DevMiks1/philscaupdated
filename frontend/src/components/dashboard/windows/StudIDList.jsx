import React, { useState, useEffect } from 'react';
import {
  Box, Button, Table, TableCaption, TableContainer,
  Tbody, Td, Tfoot, Th, Thead, Tr, Input, Select,
  Flex, Menu, MenuButton, MenuList, MenuItem,
} from '@chakra-ui/react';
import IdModal from './prelist/student/idmodal/IdModal';
import { fetchAccountAPI } from '../../api/AccountsApi';
import { ViewIcon, ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import ReactPaginate from 'react-paginate';

export default function StudIDList() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [studentData, setStudentData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCriteria, setFilterCriteria] = useState('');

  const studentsPerPage = 4;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAccountAPI();
        setStudentData(data);
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };

    fetchData();
  }, []);

  const handleViewClick = (student) => {
    setSelectedStudent(student);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedStudent(null);
  };

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const pageCount = Math.ceil(studentData.length / studentsPerPage);

  const filteredStudents = studentData
    .filter(student => {
      const fullName = `${student.firstname} ${student.lastname}`;
      return fullName.toLowerCase().includes(searchQuery.toLowerCase());
    })
    .filter(student => {
      if (filterCriteria === '') return true;
      return student.course === filterCriteria;
    })
    .slice(currentPage * studentsPerPage, (currentPage + 1) * studentsPerPage);

  const displayStudents = filteredStudents.map(student => (
    <Tr key={student.userId}>
      <Td>{student.firstname} {student.lastname}</Td>
      <Td>{student.course}</Td>
      <Td>
        <Button
          size="sm"
          leftIcon={<ViewIcon />}
          onClick={() => handleViewClick(student)}
        >
          View
        </Button>
      </Td>
    </Tr>
  ));

  return (
    <>
      <Box margin={10}>
        <Flex gap={5}>
          <Box>
            <Input
              placeholder="Search by name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Box>
          <Box>
            <Select
              placeholder="Filter by course"
              value={filterCriteria}
              onChange={(e) => setFilterCriteria(e.target.value)}
            >
              <option value="">All Courses</option>
              <option value="BSIT">BSIT</option>
              <option value="BSCS">BSCS</option>
            </Select>
          </Box>
        </Flex>
      </Box>

      <TableContainer mb={4}>
        <Table variant='simple'>
          <TableCaption>Student ID List</TableCaption>
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Course</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {displayStudents.length > 0 ? (
              displayStudents
            ) : (
              <Tr>
                <Td colSpan={3} textAlign="center">
                  No Students Available
                </Td>
              </Tr>
            )}
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>Name</Th>
              <Th>Course</Th>
              <Th>Action</Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>

      {studentData.length > studentsPerPage && (
        <Box h="10vh" pt={10}>
          <ReactPaginate
            pageCount={pageCount}
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            activeClassName={"active"}
            previousLabel={<ChevronLeftIcon />}
            nextLabel={<ChevronRightIcon />}
          />
        </Box>
      )}

      {selectedStudent && (
        <IdModal
          isOpen={modalOpen}
          onClose={handleCloseModal}
          student={selectedStudent}
        />
      )}
    </>
  );
}
