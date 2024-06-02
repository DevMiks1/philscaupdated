/** @format */

import { ChevronLeftIcon, ChevronRightIcon, ViewIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useState } from "react";
import ReactPaginate from "react-paginate";

const StudentId = ({
  data,
  filterCriteria,
  searchQuery,
  handleViewClick,
  currentPage,
  handlePageClick,
}) => {
  const studentsPerPage = 5;

  const filteredStudentsId = data.filter(
    (account) => account.role === "student"
  );
  const pageCount = Math.ceil(filteredStudentsId.length / studentsPerPage);
  const filteredStudents = filteredStudentsId
    .filter((student) => {
      const fullName = `${student.firstname} ${student.lastname}`;
      return fullName.toLowerCase().includes(searchQuery.toLowerCase());
    })
    .filter((student) => {
      if (filterCriteria === "") return true;
      return filterCriteria === "issued"
        ? student.isIdIssued
        : !student.isIdIssued;
    })
    .slice(currentPage * studentsPerPage, (currentPage + 1) * studentsPerPage);

  const displayStudents = filteredStudents.map((student) => (
    <Tr key={student._id}>
      <Td>
        {student.firstname} {student.lastname}
      </Td>
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
      <TableContainer mb={4}>
        <Table variant="simple">
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
                    <Text fontSize="20px" fontWeight="bold" pt={20}>
                        {filterCriteria === 'issued' 
                            ? "There are no issued IDs for now."
                            : "There are no non-issued IDs for now."
                        }
                    </Text>
                </Td>
            </Tr>
            )}
          </Tbody>
        </Table>
      </TableContainer>

      {pageCount > 1 && (
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
    </>
  );
};

export default StudentId;
