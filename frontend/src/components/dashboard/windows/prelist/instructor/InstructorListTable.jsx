import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DeleteIcon,
  EditIcon,
  ViewIcon,
} from '@chakra-ui/icons';
import { Box, Button, Flex, Table, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/react";
import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';

const InstructorListTable = ({
  accounts,
  setDeleteAccount,
  handleViewAccount,
  handleEditAccount,
  loading
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const facultyPerPage = 5;



  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  

  const handleViewAccounts = (id) => {
    handleViewAccount(id);
  };

  const handleEditAccounts = (id) => {
    handleEditAccount(id);
  };

  

  const displayFaculty = accounts
    .filter((account) => account.role === "faculty")
    .slice(currentPage * facultyPerPage, (currentPage + 1) * facultyPerPage)
    .map((account) => (
      <Tr key={account._id}>
        <Td>{account.userId}</Td>
        <Td>{`${account.firstname} ${account.suffix} ${account.lastname}`}</Td>
        <Td>{account.position}</Td>

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
            _hover={{ bg: "red.600" }}
          >
            Delete
          </Button>
        </Td>
      </Tr>
    ));

    const filteredFaculty = accounts.filter((account) => account.role === "faculty");
    const pageCount = Math.ceil(filteredFaculty.length / facultyPerPage);
    console.log(filteredFaculty);

    const handleDelete = (id) => {
      setDeleteAccount(id);
      // Reset the current page if it exceeds the new number of pages after deletion
      if (currentPage >= Math.ceil((filteredFaculty.length - 1) / facultyPerPage)) {
        setCurrentPage(Math.max(0, currentPage - 1));
      }
    };
  // console.log(filteredFaculty);


  return (
    <>
      {loading ? (<Flex justify="center" align="center" h="60vh"><Spinner size="xl" /></Flex>) : (
        <Box as="section">
          <Box h="60vh" overflow="auto">
            <Table variant="simple" w="100%">
              <Thead>
                <Tr>
                  <Th>Faculty ID</Th >
                  <Th w="30%">Name</Th>
                  <Th w="20%">Position</Th>

                  <Th>Actions</Th>
                </Tr >
              </Thead >
              <Tbody overflowX="auto">
                {displayFaculty.length > 0 ? (
                  <>
                    {displayFaculty}
                  </>
                ) : (
                  <Flex justify="center" align="center" pos="absolute"
                    top="50%"
                    left="50%"
                    transform="translate(-50%, -50%)">
                    <Text fontSize="1.5rem" fontWeight="bold">No Accouts Display</Text>

                  </Flex>
                )}
              </Tbody>
            </Table >
          </Box >

          {
            pageCount > 1 && (
              <Box h="10vh" pt={20}>
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
            )
          }

        </Box >
      )}
    </>


  );
};

export default InstructorListTable;
