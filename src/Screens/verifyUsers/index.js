import React, { useState, useEffect } from "react";
import { Box, Button, useTheme, Dialog, DialogTitle, DialogContent, DialogActions, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import axios from "axios";
import env from '../../env.js'


const VerifyUsers = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [userData, setUserData] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showIdCard, setShowIdCard] = useState(false);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`http://${env.API_IP_ADDRESS}:3002/api/verifyUsers`);
      // Map id_uti to id for each row
      const userDataWithId = response.data.map(row => ({ ...row, id: row.id_uti }));
      setUserData(userDataWithId);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleVerify = async (userId) => {
    console.log("Verifying user with ID:", userId);
    try {
      await axios.put(`http://${env.API_IP_ADDRESS}:3002/api/verifyUsers/${userId}`);
      // Update the user's verification status in the state
      setUserData(prevData =>
        prevData.map(user =>
          user.id_uti === userId ? { ...user, est_certifie: 1 } : user
        )
      );
    } catch (error) {
      console.error("Error verifying user:", error);
    }
  };

  const handleViewIdCard = (user) => {
    setSelectedUser(user);
    setShowIdCard(true);
  };

  const handleCloseIdCard = () => {
    setSelectedUser(null);
    setShowIdCard(false);
  };

  const columns = [
    { field: "id_uti", headerName: "ID" },
    { field: "nom", headerName: "Name", flex: 1, cellClassName: "name-column--cell", flex:0.6 },
    { field: "prenom", headerName: "Prenom", flex: 1, cellClassName: "name-column--cell" , flex: 0.8},
    { field: "num_tel", headerName: "Phone Number", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false, flex: 1,
      renderCell: (params) => (
        <div style={{ marginLeft: "10px" }}>
<Button variant="contained" color="primary" onClick={() => handleVerify(params.row.id_uti)}>
  Verify
</Button>
          <Button variant="contained" color="info" onClick={() => handleViewIdCard(params.row)}>
            View ID Card
          </Button>
        </div>
      )
    }
  ];

  return (
    <Box m="-45px 20px 0 20px">
      <Header title="USERS" subtitle="Managing Users" />
      <Box m="40px 0 0 0" height="75vh">
        <DataGrid checkboxSelection rows={userData} columns={columns} />
      </Box>
      <Dialog open={showIdCard} onClose={handleCloseIdCard}>
        <DialogTitle>ID Card</DialogTitle>
        <DialogContent>
          <img src={`data:image/jpeg;base64,${selectedUser && selectedUser.idCard}`} alt="ID Card" />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseIdCard}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default VerifyUsers;
