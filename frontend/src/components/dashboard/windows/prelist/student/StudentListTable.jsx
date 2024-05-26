import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DeleteIcon,
  EditIcon,
  ViewIcon,
} from "@chakra-ui/icons";
import { Box, Button, Flex, Table, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import React, { useState } from "react";
import ReactPaginate from "react-paginate";

const StudentListTable = ({
  accounts,
  setDeleteAccount,
  handleViewAccount,
  handleEditAccount,
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const studentsPerPage = 4;

  const pageCount = Math.ceil(accounts.length / studentsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleDelete = (id) => {
    setDeleteAccount(id);
  };

  const handleViewAccounts = (id) => {
    handleViewAccount(id);
  };

  const handleEditAccounts = (id) => {
    handleEditAccount(id);
  };

  const displayStudents = accounts
    .filter((account) => account.role === "student")
    .slice(currentPage * studentsPerPage, (currentPage + 1) * studentsPerPage)
    .map((account) => (
      <Tr key={account._id}>
        <Td>{account.userId}</Td>
        <Td>{`${account.firstname} ${account.suffix} ${account.lastname}`}</Td>
        <Td>{account.course}</Td>
       
        <Td>
          <Button
          size="sm"
            leftIcon={<ViewIcon />}
            mr={2}
            onClick={() => {
              handleViewAccounts(account._id);
            }}
          >
            View
          </Button>
          <Button
          size="sm"
            leftIcon={<EditIcon />}
            mr={2}
            onClick={() => {
              handleEditAccounts(account._id);
            }}
          >
            Edit
          </Button>
          <Button
          size="sm"
            bg="red.500"
            color="white"
            leftIcon={<DeleteIcon />}
            onClick={() => {
              handleDelete(account._id);
            }}
            _hover={{bg: "red.600"}}
          >
            Delete
          </Button>
        </Td>
      </Tr>
    ));

  return (
    <Box as="section">
      <Box h="60vh" overflow="auto">
        <Table variant="simple"  w="100%">
          <Thead>
            <Tr>
              <Th>Student ID</Th>
              <Th w="30%">Name</Th>
              <Th w="20%">Course</Th>
             
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody overflowX="auto">
            {accounts.length > 0 ? (
              <>
                {displayStudents}
              </>
            ) : (
              <Tr>
                <Td colSpan={5} textAlign="center">
                  No Accounts Display
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </Box>

      {accounts.length > studentsPerPage && (
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
    </Box>
  );
};

export default StudentListTable;
