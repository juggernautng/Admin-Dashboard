import React, { useState, useEffect } from "react";
import { Box, Button, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import axios from "axios";
import env from '../../env.js'
const Team = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [userData, setUserData] = useState([]);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`http://${env.API_IP_ADDRESS}:3002/api/getusers`);
      const userDataWithId = response.data.map(row => ({ ...row, id: row.id_uti }));
      setUserData(userDataWithId);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleDelete = async (email) => {
    console.log(email)
    try {
      await axios.delete(`http://${env.API_IP_ADDRESS}:3002/api/getusers/${email}`);
      setUserData(prevData => prevData.filter(user => user.email !== email));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const columns = [
    { field: "id_uti", headerName: "ID" },
    { field: "nom", headerName: "Name", flex: 1, cellClassName: "name-column--cell" },
    { field: "prenom", headerName: "Prenom", flex: 1, cellClassName: "name-column--cell" },
    { field: "total_rating", headerName: "Rating", type: "number", headerAlign: "left", align: "left" },
    { field: "num_tel", headerName: "Phone Number", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="secondary"
          onClick={() => handleDelete(params.row.email)}
        >
          Delete
        </Button>
      )
    }
  ];

  return (
    <Box m="-45px 20px 0 20px">
      <Header title="USERS" subtitle="Managing Users" />
      <Box m="40px 0 0 0" height="75vh">
        <DataGrid checkboxSelection rows={userData} columns={columns} />
      </Box>
    </Box>
  );
};

export default Team;
