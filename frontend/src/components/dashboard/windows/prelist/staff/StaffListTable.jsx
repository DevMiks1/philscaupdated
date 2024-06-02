/** @format */

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DeleteIcon,
  EditIcon,
  ViewIcon,
} from "@chakra-ui/icons";
import { Box, Button, Flex, Table, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/react";
import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import { useData } from "../../../../context/FetchAccountContext";

const StaffListTable = ({

  handleDeleteAccount,
  handleViewAccount,
  handleEditAccount,
}) => {
  const { data, loading, setData } = useData();
  const [currentPage, setCurrentPage] = useState(0);
  const staffPerPage = 5;



  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };


  const handleViewAccounts = (id) => {
    handleViewAccount(id);
  };

  const handleEditAccounts = (id) => {
    handleEditAccount(id);
  };

  const handleDeleteAccounts = (id) => {
    handleDeleteAccount(id);
    console.log(id)
    if (
      currentPage >= Math.ceil((filteredStaff.length - 1) / staffPerPage)
    ) {
      setCurrentPage(Math.max(0, currentPage - 1));
    }
  };

  const displayStaff = data
    .filter((account) => account.role === "staff")
    .slice(currentPage * staffPerPage, (currentPage + 1) * staffPerPage)
    .map((account) => (

      <Tr key={account._id}>
        <Td>{account.schoolid}</Td>
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
              handleDeleteAccounts(account._id);
            }}
            _hover={{ bg: "red.600" }}
          >
            Delete
          </Button>
        </Td>
      </Tr>

    ));

  const filteredStaff = data.filter((account) => account.role === "staff");

  const pageCount = Math.ceil(filteredStaff.length / staffPerPage);


  return (
    <>
      {loading ? (<Flex justify="center" align="center" h="60vh"><Spinner size="xl" /></Flex>) : (
        <Box as="section">
          <Box h="60vh" overflow="auto">
            <Table variant="simple" w="100%">
              <Thead>
                <Tr>
                  <Th>STAFF ID</Th >
                  <Th w="30%">Name</Th>
                  <Th w="20%">Position</Th>

                  <Th>Actions</Th>
                </Tr >
              </Thead >
              <Tbody overflowX="auto">
                {displayStaff.length > 0 ? (
                  <>
                    {displayStaff}
                  </>
                ) : (
                  <Flex justify="center" align="center" h="60vh">
                    <Text fontSize="1.5rem" fontWeight="bold">No Accounts Display</Text>
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

export default StaffListTable;
