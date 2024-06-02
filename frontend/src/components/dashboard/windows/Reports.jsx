import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DeleteIcon,
  DownloadIcon,
  EditIcon,
  ViewIcon,
} from "@chakra-ui/icons";
import { Box, Button, Flex, Table, Tbody, Td, Text, Th, Thead, Tr, Spinner, useDisclosure } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { fetchAccountAPI } from "../../api/AccountsApi";
import ModalAffidavit from "./ModalAffidavit";
import { useData } from "../../context/FetchAccountContext";

const Reports = ({

}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [viewAccount, setViewAccount] = useState(null);
  const { data, loading, setData } = useData();

  const {
    isOpen: isViewOpen,
    onOpen: onViewOpen,
    onClose: onViewClose,
  } = useDisclosure();

  const reportsPerPage = 5;

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  

  const handleViewAccounts = (id) => {
    handleViewAccount(id);
  };

  const handleViewAccount = (accountId) => {
    const account = data.find((acc) => acc._id === accountId);
    setViewAccount(account);
    onViewOpen();
  };

 
  const filteredRecords = data
    .filter((acc) => acc.affidavit)
  console.log(filteredRecords);



  const displayReports = filteredRecords
    ?.slice(currentPage * reportsPerPage, (currentPage + 1) * reportsPerPage)
    .map((account) => {
      console.log(account); // Log the account data
      return (
        <Tr key={account._id}>
          <Td>{`${account.firstname} ${account.suffix} ${account.lastname}`}</Td>
          <Td>
            {account.affidavit && (
              <img
                src={account.affidavit}
                alt="Affidavit"
                style={{ maxWidth: '70px', maxHeight: '70px' }}
              />
            )}
          </Td>

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
            {/* <Button
              size="sm"
              bg="red.500"
              color="white"
              leftIcon={<DownloadIcon />}
              onClick={() => handleDownload(account.affidavit)}
              _hover={{ bg: "red.600" }}
            >
              Download Image
            </Button> */}

          </Td>
        </Tr>
      );
    });



  console.log(displayReports);
  const pageCount = Math.ceil((data?.length || 0) / reportsPerPage);

  // const handleDelete = (id) => {
  //   setDeleteAccount(id);
  //   // Reset the current page if it exceeds the new number of pages after deletion
  //   if (currentPage >= Math.ceil(((allUsers?.length || 0) - 1) / reportsPerPage)) {
  //     setCurrentPage(Math.max(0, currentPage - 1));
  //   }
  // };

  return (
    <>
      {loading ? (
        <Flex justify="center" align="center" h="60vh">
          <Spinner size="xl" />
        </Flex>
      ) : (
        <Box as="section">
          <Flex px={5} py={10} fontSize="30px" fontWeight="bold">Reports for Affidavit of Loss</Flex>
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
                    {

                      displayReports}
                  </>
                ) : (
                  <Tr>
                    <Td colSpan="3" textAlign="center">
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

          {viewAccount && (
            <ModalAffidavit
              isOpen={isViewOpen}
              onClose={onViewClose}
              account={viewAccount}
            />
          )}


        </Box>
      )}

    </>
  );
};

export default Reports;
