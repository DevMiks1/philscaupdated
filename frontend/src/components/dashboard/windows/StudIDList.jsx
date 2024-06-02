/** @format */

import React, { useState, } from "react";
import {
  Box,
  Input,
  Select,
  Flex,
  Tabs,
  TabList,
  Tab,
  Spacer,
  TabPanels,
  TabPanel,
  List,
  ListItem,
} from "@chakra-ui/react";
import IdModal from "./prelist/student/idmodal/IdModal";
import { useData } from "../../context/FetchAccountContext";
import StudentId from "./StudentId";
import StaffId from "./StaffId";
import FacultyId from "./FacultyId";

export default function StudIDList() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);

  const [searchQuery, setSearchQuery] = useState("");
  const [filterCriteria, setFilterCriteria] = useState("issued"); // Default filter criteria set to 'issued'
  const { data } = useData();

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

  return (
    <>
      <Box mt={10} mx={10} mb={2}>
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
              value={filterCriteria}
              onChange={(e) => setFilterCriteria(e.target.value)}
            >
              <option value="issued">Issued</option>
              <option value="non-issued">Non-Issued</option>
            </Select>
          </Box>
        </Flex>
      </Box>

      <Tabs colorScheme="purple" variant="enclosed">
        <TabList py={10} px={5}>
          <Tab _selected={{ color: "white", bg: "purple.400" }}>Students</Tab>
          <Tab _selected={{ color: "white", bg: "purple.400" }}>Faculty</Tab>
          <Tab _selected={{ color: "white", bg: "purple.400" }}>Staff</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <List>
              <ListItem>
                <StudentId
                  data={data}
                  filterCriteria={filterCriteria}
                  searchQuery={searchQuery}
                  handleViewClick={handleViewClick}
                  currentPage={currentPage}
                  handlePageClick={handlePageClick}
                  // setDeleteAccount={setDeleteAccount}
                  // handleViewAccount={handleViewAccount}
                  // handleEditAccount={handleEditAccount}
                />
              </ListItem>
            </List>
          </TabPanel>

          <TabPanel>
            <List>
              <ListItem>
                <StaffId
                  data={data}
                  filterCriteria={filterCriteria}
                  searchQuery={searchQuery}
                  handleViewClick={handleViewClick}
                  currentPage={currentPage}
                  handlePageClick={handlePageClick}
                  // setDeleteAccount={setDeleteAccount}
                  // handleViewAccount={handleViewAccount}
                  // handleEditAccount={handleEditAccount}
                />
              </ListItem>
            </List>
          </TabPanel>

          <TabPanel>
            <List>
              <ListItem>
                <FacultyId
                  data={data}
                  filterCriteria={filterCriteria}
                  searchQuery={searchQuery}
                  handleViewClick={handleViewClick}
                  currentPage={currentPage}
                  handlePageClick={handlePageClick}
                  // setDeleteAccount={setDeleteAccount}
                  // handleViewAccount={handleViewAccount}
                  // handleEditAccount={handleEditAccount}
                />
              </ListItem>
            </List>
          </TabPanel>
        </TabPanels>
      </Tabs>

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
