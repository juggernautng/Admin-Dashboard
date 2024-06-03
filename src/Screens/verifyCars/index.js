import React, { useState, useEffect } from "react";
import { Box, Button, useTheme, Dialog, DialogTitle, DialogContent, DialogActions, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import axios from "axios";
import env from '../../env.js';

const VerifyCars = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [carData, setCarData] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [showCertificat, setShowCertificat] = useState(false);

  const fetchCarData = async () => {
    try {
      const response = await axios.get(`http://${env.API_IP_ADDRESS}:3002/api/verifyCars`);
      const carDataWithId = response.data.map((row, index) => ({ ...row, id: index })); // Add an `id` field for DataGrid
      setCarData(carDataWithId);
    } catch (error) {
      console.error("Error fetching car data:", error);
    }
  };

  useEffect(() => {
    fetchCarData();
  }, []);

  const handleVerify = async (matricule) => {
    console.log("Verifying car with Matricule:", matricule);
    try {
      await axios.put(`http://${env.API_IP_ADDRESS}:3002/api/verifyCars/${matricule}`);
      setCarData(prevData =>
        prevData.map(car =>
          car.matricule === matricule ? { ...car, voiture_est_certifie: 1 } : car
        )
      );
    } catch (error) {
      console.error("Error verifying car:", error);
    }
  };

  const handleViewCertificat = (car) => {
    setSelectedCar(car);
    setShowCertificat(true);
  };

  const handleCloseCertificat = () => {
    setSelectedCar(null);
    setShowCertificat(false);
  };

  const columns = [
    { field: "matricule", headerName: "Matricule", flex: 1 },
    { field: "id_prop", headerName: "ID Prop", flex: 0.5 },
    { field: "modele", headerName: "Model", flex: 0.5 },
    { field: "couleur", headerName: "Color", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      flex: 1,
      renderCell: (params) => (
        <div style={{ marginLeft: "10px" }}>
          <Button variant="contained" color="primary" onClick={() => handleVerify(params.row.matricule)}>
            Verify
          </Button>
          <Button variant="contained" color="info" onClick={() => handleViewCertificat(params.row)}>
            View Certificate
          </Button>
        </div>
      )
    }
  ];

  return (
    <Box m="-45px 20px 0 20px">
      <Header title="CARS" subtitle="Managing Cars" />
      <Box m="40px 0 0 0" height="75vh">
        <DataGrid checkboxSelection rows={carData} columns={columns} />
      </Box>
      <Dialog open={showCertificat} onClose={handleCloseCertificat}>
        <DialogTitle>Certificate</DialogTitle>
        <DialogContent>
          <img src={`data:image/jpeg;base64,${selectedCar && selectedCar.voiture_certificat}`} alt="Certificate" />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCertificat}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default VerifyCars;
