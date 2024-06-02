import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DeleteIcon,
  EditIcon,
  ViewIcon,
} from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import { Spinner } from "@chakra-ui/react";
import { useData } from "../../../../context/FetchAccountContext";

const StudentListTable = ({
  handleDeleteAccount,
  handleViewAccount,
  handleEditAccount,
}) => {
  const { data, loading } = useData();
  const [currentPage, setCurrentPage] = useState(0);
  const studentsPerPage = 5;

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
      currentPage >= Math.ceil((filteredStudents.length - 1) / studentsPerPage)
    ) {
      setCurrentPage(Math.max(0, currentPage - 1));
    }
  };
  

  const displayStudents = data
    .filter((account) => account.role === "student")
    .slice(currentPage * studentsPerPage, (currentPage + 1) * studentsPerPage)
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
            mr={2}
            onClick={() => {
              handleDeleteAccounts(account._id);
            }}
            _hover={{ bg: "red.600" }}
          >
            Delete
          </Button>
          {/* <Button
            size="sm"
            bg="red.500"
            color="white"
            leftIcon={<DeleteIcon />}
            onClick={() => {
              handleDelete(account._id);
            }}
            _hover={{ bg: "red.600" }}
          >
            Issue ID
          </Button> */}
        </Td>
      </Tr>
    ));

  const filteredStudents = data.filter((account) => account.role === "student");
  const pageCount = Math.ceil(filteredStudents.length / studentsPerPage);

  return (
    <>
      {loading ? (
        <Flex justify="center" align="center" h="60vh">
          <Spinner size="xl" />
        </Flex>
      ) : (
        <Box as="section">
          <Box h="60vh" overflow="auto">
            <Table variant="simple" w="100%">
              <Thead>
                <Tr>
                  <Th>Student ID</Th>
                  <Th w="30%">Name</Th>
                  <Th w="20%">Course</Th>

                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody overflowX="auto">
                {displayStudents.length > 0 ? (
                  <>{displayStudents}</>
                ) : (
                  <Flex
                    justify="center"
                    align="center"
                    pos="absolute"
                    top="50%"
                    left="50%"
                    transform="translate(-50%, -50%)"
                  >
                    <Text fontSize="1.5rem" fontWeight="bold">
                      No Accouts Display
                    </Text>
                  </Flex>
                )}
              </Tbody>
            </Table>
          </Box>

          {pageCount > 1 && (
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
          )}
        </Box>
      )}
    </>
  );
};

export default StudentListTable;
