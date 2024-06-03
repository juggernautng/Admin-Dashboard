import React, { useState, useEffect } from "react";
import { Box, Button, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import axios from "axios";
import env from '../../env.js';

const Cars = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [carData, setCarData] = useState([]);

  const fetchCarData = async () => {
    try {
      const response = await axios.get(`http://${env.API_IP_ADDRESS}:3002/api/getCars`);
      const carDataWithId = response.data.map((row, index) => ({ ...row, id: index })); // Add an `id` field for DataGrid
      setCarData(carDataWithId);
    } catch (error) {
      console.error("Error fetching car data:", error);
    }
  };

  useEffect(() => {
    fetchCarData();
  }, []);

  const handleDelete = async (matricule) => {
    try {
      await axios.delete(`http://${env.API_IP_ADDRESS}:3002/api/getCars/${matricule}`);
      setCarData(prevData => prevData.filter(car => car.matricule !== matricule));
    } catch (error) {
      console.error("Error deleting car:", error);
    }
  };

  const columns = [
    { field: "matricule", headerName: "Matricule", flex: 1 },
    { field: "id_prop", headerName: "ID Prop", flex: 1 },
    { field: "modele", headerName: "Model", flex: 1 },
    { field: "couleur", headerName: "Color", flex: 1 },
    { field: "voiture_est_certifie", headerName: "Certified", type: "boolean", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="secondary"
          onClick={() => handleDelete(params.row.matricule)}
        >
          Delete
        </Button>
      ),
      flex: 1
    }
  ];

  return (
    <Box m="-45px 20px 0 20px">
      <Header title="CARS" subtitle="Managing Cars" />
      <Box m="40px 0 0 0" height="75vh">
        <DataGrid checkboxSelection rows={carData} columns={columns} />
      </Box>
    </Box>
  );
};

export default Cars;
