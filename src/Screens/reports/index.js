import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,useTheme 
} from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import axios from "axios";
import env from '../../env.js'


const Signalements = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [signalementsData, setSignalementsData] = useState([]);
  const [selectedDescription, setSelectedDescription] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const fetchSignalementsData = async () => {
    try {
      const response = await axios.get(
        `http://${env.API_IP_ADDRESS}:3002/api/getReports`
      );
      setSignalementsData(response.data);
    } catch (error) {
      console.error("Error fetching signalements data:", error);
    }
  };

  useEffect(() => {
    fetchSignalementsData();
  }, []);

  const handleViewDescription = (description) => {
    if (description) {
      setSelectedDescription(description);
      setOpenDialog(true);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Box m="-45px 20px 0 20px">
      <Header title="Signalements" subtitle="List of Reported Users" />
      <Grid container spacing={2} m="30px 0 0 0">
        {signalementsData.map((signalement, index) => (
          <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
            <Box border={1} borderRadius={5} p={2} width = {220}>
              <Typography variant="h6" marginBottom="3px">
                Reported User: {signalement.TargetUserID}
              </Typography>
              <Typography variant="body1" marginBottom="6px">
                Reporter: {signalement.SignalerUserID}
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleViewDescription(signalement.Description)}
              >
                View Description
              </Button>
            </Box>
          </Grid>
        ))}
      </Grid>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Description</DialogTitle>
        <DialogContent>
          {selectedDescription && selectedDescription.map((line, index) => (
            <Typography key={index} variant="body1" gutterBottom>
              {line}
            </Typography>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Signalements;
