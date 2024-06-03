import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import StatBox from "../../components/StatBox";
import GroupIcon from "@mui/icons-material/Group";
import TimeToLeaveIcon from "@mui/icons-material/TimeToLeave";
import ReportIcon from "@mui/icons-material/Report";
import AirlineStopsIcon from "@mui/icons-material/AirlineStops";
import env from '../../env.js'
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import VerifiedIcon from '@mui/icons-material/Verified';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import StarIcon from '@mui/icons-material/Star';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
import NoCrashIcon from '@mui/icons-material/NoCrash';
import TaxiAlertIcon from '@mui/icons-material/TaxiAlert';

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [data, setData] = useState({
    users: 0,
    cars: 0,
    reports: 0,
    trajets: 0,
    reservations: 0,
    demandeVerif: 0,
    unvUsers: 0,
    verUsers: 0,
    avRating: 0,
    unvCars : 0,
    verCars: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://${env.API_IP_ADDRESS}:3002/api/stats`);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Box m="20px" marginTop= "-20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title="ShareWheels DASHBOARD"
          subtitle="Welcome to your dashboard"
        />
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={data.users}
            subtitle="Utilisateurs"
            icon={
              <GroupIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={data.cars}
            subtitle="Voitures"
            icon={
              <TimeToLeaveIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={data.trajets}
            subtitle="Trajets"
            icon={
              <AirlineStopsIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        

        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={data.reservations}
            subtitle="Reservations"
            icon={
              <BookOnlineIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={data.demandeVerif}
            subtitle="Demande de verification"
            icon={
              <HourglassTopIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={data.unvUsers}
            subtitle="Utilisateurs non vérifiés"
            icon={
              <DoNotDisturbIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={data.verUsers}
            subtitle="utilisateurs vérifiés"
            icon={
              <VerifiedIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={data.avRating}
            subtitle="Note moyenne"
            icon={
              <StarIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>


        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={data.verCars}
            subtitle="Voitures vérifiés"
            icon={
              <NoCrashIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={data.unvCars}
            subtitle="Voitures non vérifiés"
            icon={
              <TaxiAlertIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={data.reports}
            subtitle="Rapports"
            icon={
              <ReportIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        
      </Box>
    </Box>
  );
};

export default Dashboard;
