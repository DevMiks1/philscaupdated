/** @format */

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DeleteIcon,
  EditIcon,
  ViewIcon,
} from "@chakra-ui/icons";
import { Box, Button, Flex, Grid, GridItem } from "@chakra-ui/react";
import React, { useState } from "react";
import ReactPaginate from "react-paginate";

const StaffListTable = ({
  accounts,
  setDeleteAccount,
  handleViewAccount,
  handleEditAccount,
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const studentsPerPage = 5;

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
    .filter((account) => account.role === "staff")
    .slice(currentPage * studentsPerPage, (currentPage + 1) * studentsPerPage)
    .map((account) => (
      <Grid
        gap={4}
        alignItems="center"
        templateColumns="repeat(10, 1fr)"
        key={account._id}
        py={3}
        borderBottom="1px solid #4A5568"
      >
        <GridItem w="100%" colSpan={2}>
          {account.userId}
        </GridItem>
        <GridItem w="100%" colSpan={2}>
        {`${account.firstname} ${account.suffix}.  ${account.lastname}`}
        </GridItem>
        <GridItem w="100%" colSpan={2}>
          {account.course}
        </GridItem>
        <GridItem w="100%" colSpan={2}>
          {account.year}
        </GridItem>
        <GridItem colSpan={2} gap={2}>
          <Button
            
            mr={2}
            onClick={() => {
              handleViewAccounts(account._id);
            }}
            
          ><ViewIcon /></Button>
          <Button
            
            mr={2}
            onClick={() => {
              handleEditAccounts(account._id);
            }}
            
          ><EditIcon /></Button>
          <Button
            bg="red.500"
            color="white"
            _hover={{bg: "red.600"}}
            onClick={() => {
              handleDelete(account._id);
            }}
            
          >
            <DeleteIcon />
          </Button>
        </GridItem>
      </Grid>
    ));

  return (
    <Box as="section">
      <Box h="60vh">
        <Box>
          <Grid
            gap={4}
            templateColumns="repeat(10, 1fr)"
            borderBottom="1px solid #4A5568"
            py={5}
          >
            <GridItem w="100%" colSpan={2} fontSize="18px" fontWeight="bold">
              Student ID
            </GridItem>
            <GridItem w="100%" colSpan={2} fontSize="18px" fontWeight="bold">
              Name
            </GridItem>
            <GridItem w="100%" colSpan={2} fontSize="18px" fontWeight="bold">
              Course
            </GridItem>
            <GridItem w="100%" colSpan={2} fontSize="18px" fontWeight="bold">
              Year
            </GridItem>

            <GridItem
              w="100%"
              colSpan={2}
              textAlign="center"
              fontSize="18px"
              fontWeight="bold"
            >
              Actions
            </GridItem>
          </Grid>
        </Box>

        <Box h="100%">
          {accounts.length > 0 ? (
            <>{displayStudents}</>
          ) : (
            <>
              <Flex justify="center" align="center" h="100%">
                No Accounts Display
              </Flex>
            </>
          )}
        </Box>
      </Box>
      {accounts.length > 0 ? (
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
      ) : (
        <></>
      )}
    </Box>
  );
};

export default StaffListTable;
