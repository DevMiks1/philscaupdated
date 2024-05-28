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
import { fetchAccountAPI } from "../../api/AccountsApi";
import ViewAccount from "./prelist/student/crud_prelist/ViewAccount";
import EditAccount from "./prelist/student/crud_prelist/EditAccount";
import InstructorListTable from "./prelist/instructor/InstructorListTable";
import StaffListTable from "./prelist/staff/StaffListTable";
import { AddIcon } from "@chakra-ui/icons";
import GenerateAccount from "./prelist/GenerateAccount";

const PreList = () => {
  const [accounts, setAccounts] = useState([]);
  const [deleteAccount, setDeleteAccount] = useState(null);
  const [viewAccount, setViewAccount] = useState(null);
  const [editAccount, setEditAccount] = useState(null);
  const [generateAccount, setGenerateAccount] = useState(null);
  const [loading, setLoading] = useState(true);
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

 
  
  

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const data = await fetchAccountAPI();
        setAccounts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false)
      }
    };

    fetchAccount();
  }, [accounts]);

  const handleViewAccount = (accountId) => {
    const account = accounts.find((acc) => acc._id === accountId);
    setViewAccount(account);
    onViewOpen();
  };

  const handleEditAccount = (accountId) => {
    const account = accounts.find((acc) => acc._id === accountId);
    setEditAccount(account);
    onEditOpen();
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
                  loading={loading}
                  accounts={accounts}
                  setDeleteAccount={setDeleteAccount}
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
                loading={loading}
                  accounts={accounts}
                  setDeleteAccount={setDeleteAccount}
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
                  loading={loading}
                  accounts={accounts}
                  setDeleteAccount={setDeleteAccount}
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
          accounts={accounts}
          setAccounts={setAccounts}
          setDeleteAccount={setDeleteAccount}
          deleteAccount={deleteAccount}
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
        <GenerateAccount isOpen={isGenerateOpen} onClose={onGenerateClose} accounts={accounts}/>
      )}
    </>
  );
};

export default PreList;
