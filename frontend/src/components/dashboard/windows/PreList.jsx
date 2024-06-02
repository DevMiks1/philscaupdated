/** @format */

import {
  Box,
  List,
  ListItem,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Button,
  Flex,
  useDisclosure,
  Spacer,
} from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import StudentListTable from "./prelist/student/StudentListTable";
import { DeleteAccountModal } from "./prelist/student/crud_prelist/DeleteAccount";
import ViewAccount from "./prelist/student/crud_prelist/ViewAccount";
import EditAccount from "./prelist/student/crud_prelist/EditAccount";
import InstructorListTable from "./prelist/instructor/InstructorListTable";
import StaffListTable from "./prelist/staff/StaffListTable";
import { AddIcon } from "@chakra-ui/icons";
import GenerateAccount from "./prelist/GenerateAccount";
import { useData } from "../../context/FetchAccountContext";

const PreList = () => {
  // const [accounts, setAccounts] = useState([]);
  const [deleteAccount, setDeleteAccount] = useState(null);
  const [viewAccount, setViewAccount] = useState(null);
  const [editAccount, setEditAccount] = useState(null);
  const [generateAccount, setGenerateAccount] = useState(null);
  const { data, loading, setData } = useData();
  console.log(deleteAccount);
  // const [loading, setLoading] = useState(true);
  const {
    isOpen: isViewOpen,
    onOpen: onViewOpen,
    onClose: onViewClose,
  } = useDisclosure();
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();

  const {
    isOpen: isGenerateOpen,
    onOpen: onGenerateOpen,
    onClose: onGenerateClose,
  } = useDisclosure();

  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();


  const handleViewAccount = (accountId) => {
    const account = data.find((acc) => acc._id === accountId);
    setViewAccount(account);
    onViewOpen();
  };

  const handleEditAccount = (accountId) => {
    const account = data.find((acc) => acc._id === accountId);
    setEditAccount(account);
    onEditOpen();
  };

  const handleDeleteAccount = (accountId) => {
    const account = data.find((acc) => acc._id === accountId);
    if (account) {
      setDeleteAccount({ ...account }); // Make sure to include all fields from account
      onDeleteOpen();
    }
  };
  

  const handleGenerateModalOpen = () => {
    setGenerateAccount(true);
    onGenerateOpen();
  };

 
  

  return (
    <>
      <Tabs colorScheme="purple" variant="enclosed">
        <TabList py={10} px={5}>
          <Tab _selected={{ color: "white", bg: "purple.400" }}>Students</Tab>
          <Tab _selected={{ color: "white", bg: "purple.400" }}>Faculty</Tab>
          <Tab _selected={{ color: "white", bg: "purple.400" }}>Staff</Tab>
          <Spacer />
          <Button
            colorScheme="purple"
            leftIcon={<AddIcon />}
            onClick={handleGenerateModalOpen}
          >
            Generate Account
          </Button>
        </TabList>

        <TabPanels>
          <TabPanel>
            <List>
              <ListItem>
                <StudentListTable
                  
                  handleDeleteAccount={handleDeleteAccount}
                  handleViewAccount={handleViewAccount}
                  handleEditAccount={handleEditAccount}
                />
              </ListItem>
            </List>
          </TabPanel>

          <TabPanel>
            <List>
              <ListItem>
                <InstructorListTable
                
                handleDeleteAccount={handleDeleteAccount}
                  handleViewAccount={handleViewAccount}
                  handleEditAccount={handleEditAccount}
                />
              </ListItem>
            </List>
          </TabPanel>

          <TabPanel>
            <List>
              <ListItem>
                <StaffListTable
                 
                 handleDeleteAccount={handleDeleteAccount}
                  handleViewAccount={handleViewAccount}
                  handleEditAccount={handleEditAccount}
                />
              </ListItem>
            </List>
          </TabPanel>
        </TabPanels>
      </Tabs>

      {deleteAccount && (
        <DeleteAccountModal
        isOpen={isDeleteOpen}
        onClose={onDeleteClose}
        deleteAccount={deleteAccount}
        setDeleteAccount={setDeleteAccount}
        />
      )}

      {viewAccount && (
        <ViewAccount
          isOpen={isViewOpen}
          onClose={onViewClose}
          account={viewAccount}
        />
      )}

      {editAccount && (
        <EditAccount
          isOpen={isEditOpen}
          onClose={onEditClose}
          account={editAccount}
          
        />
      )}
      {generateAccount && (
        <GenerateAccount isOpen={isGenerateOpen} onClose={onGenerateClose} accounts={data}/>
      )}
    </>
  );
};

export default PreList;
