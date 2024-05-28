import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DeleteIcon,
  EditIcon,
  ViewIcon,
} from "@chakra-ui/icons";
import { Box, Button, Flex, Table, Tbody, Td, Text, Th, Thead, Tr, Spinner } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useAuth } from "../../context/Auth";
import { fetchAccountAPI } from "../../api/AccountsApi";

const Reports = ({
  accounts,
  setDeleteAccount,
  handleViewAccount,
  handleEditAccount,
  loading,
}) => {
  const [allUsers, setAllUsers] = useState([]);

  const [currentPage, setCurrentPage] = useState(0);
  const reportsPerPage = 5;

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const auth = useAuth();
  const authId = auth.user._id;
  const fetchAllUsers = async () => {
    try {
      const data = await fetchAccountAPI();
      setAllUsers(data.filter((el) => ["student", "faculty", "staff"].includes(el.role) && el.affidavit !== "" && el.affidavit !== null));
    } catch (error) {
      console.error("Error fetching all users:", error);
    }
  };
  
  
  

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const displayReports = allUsers
    ?.slice(currentPage * reportsPerPage, (currentPage + 1) * reportsPerPage)
    .map((account) => (
      <Tr key={account._id}>
        
        <Td>{`${account.firstname} ${account.suffix} ${account.lastname}`}</Td>
        <Td>{account.affidavit}</Td>
        <Td>
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
            Download Reports
          </Button>
        </Td>
      </Tr>
    ));

  const pageCount = Math.ceil((allUsers?.length || 0) / reportsPerPage);

  const handleDelete = (id) => {
    setDeleteAccount(id);
    // Reset the current page if it exceeds the new number of pages after deletion
    if (currentPage >= Math.ceil(((allUsers?.length || 0) - 1) / reportsPerPage)) {
      setCurrentPage(Math.max(0, currentPage - 1));
    }
  };

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
                 
                  <Th>Name</Th>
                  <Th>Affidavit</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {displayReports.length > 0 ? (
                  <>
                    {displayReports}
                  </>
                ) : (
                  <Tr>
                    <Td colSpan="4" textAlign="center">
                      <Text fontSize="1.5rem" fontWeight="bold">No Reports Display</Text>
                    </Td>
                  </Tr>
                )}
              </Tbody>
            </Table>
          </Box>
          {pageCount > 1 && (
            <Box pt={20}>
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

export default Reports;
