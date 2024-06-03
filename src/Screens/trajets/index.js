import React, { useState, useEffect } from "react";
import { Box, Button, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import axios from "axios";
import env from '../../env.js'


const Trajets = () => {
  const theme = useTheme();
  const [trajets, setTrajets] = useState([]);

  const fetchTrajets = async () => {
    try {
      const response = await axios.get(`http://${env.API_IP_ADDRESS}:3002/api/trajets`);
      setTrajets(response.data.map(trajet => ({ ...trajet, id: trajet.id_trajet })));
    } catch (error) {
      console.error("Error fetching trajets:", error);
    }
  };

  useEffect(() => {
    fetchTrajets();
  }, []);

  const handleDelete = async (id_trajet) => {
    try {
      await axios.delete(`http://${env.API_IP_ADDRESS}:3002/api/trajets/${id_trajet}`);
      setTrajets(prevTrajets => prevTrajets.filter(trajet => trajet.id_trajet !== id_trajet));
    } catch (error) {
      console.error("Error deleting trajet:", error);
    }
  };

  const columns = [
    { field: "id_trajet", headerName: "ID", width: 90 },
    { field: "depart", headerName: "Depart", flex: 1 },
    { field: "arrivee", headerName: "Arrivee", flex: 1 },
    { field: "timestamp", headerName: "Timestamp", flex: 1 },
    { field: "prix", headerName: "Prix", type: "number", width: 120 },
    { field: "id_conducteur", headerName: "Conducteur ID", type: "number", width: 160 },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="secondary"
          onClick={() => handleDelete(params.row.id_trajet)}
        >
          Delete
        </Button>
      )
    }
  ];

  return (
    <Box m="-45px 20px 0 20px">
        <Header title="TRAJETS" subtitle="Managing Trips" />
        <Box m="40px 0 0 0" height="75vh">
        <DataGrid rows={trajets} columns={columns} pageSize={10} />
      </Box>
    </Box>
  );
};

export default Trajets;
