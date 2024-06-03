import { useState } from "react";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Topbar from "./Screens/global/Topbar";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./Screens/dashboard";
import Team from "./Screens/team";
import Sidebar from "./Screens/global/Sidebar";
import Trajets from "./Screens/trajets";
import VerifyUsers from './Screens/verifyUsers';
import Signalements from "./Screens/reports";
import Cars from './Screens/cars'
import VerifyCars from './Screens/verifyCars';
function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/team" element={<Team />} />
              <Route path="/trajets" element={<Trajets />} />
              <Route path="/verifyUsers" element={<VerifyUsers />} />
              <Route path="/reports" element={<Signalements />} />
              <Route path="/cars" element={<Cars />} />
              <Route path="/verifyCars" element={<VerifyCars />} />



            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
