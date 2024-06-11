import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useTheme } from "@mui/material";
import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css";
import PageSaisie from "./PageSaisie";
import Headers from "../components/Headers";
import Menu from "../components/Menu";
import Utilisateur from "./Utilisateur";
import Salle from "./Salle";
import SaisieData from "./PageSaisieData";
const Home = ({ setIsChangeTheme, emailUser, userToken, accessToken }) => {
  const theme = useTheme();

  return (
    <BrowserRouter>
      <div className="containerApp" style={{ height: window.innerHeight }}>
        <div
          className="window"
          style={{
            backgroundColor: theme.palette.background.main,
            padding: "0",
            height: window.innerHeight,
          }}
        >
          <Headers setIsChangeTheme={setIsChangeTheme}></Headers>
          <div
            style={{
              width: "100%",
              display: "flex",
              height: "calc(100% - 112px)",
            }}
          >
            <Menu></Menu>
            <div style={{ width: "100%" }}>
              <Routes>
                <Route path="*" element={<PageSaisie />} />
                <Route path="/utilisateur" element={<Utilisateur />} />
                <Route path="/salle" element={<Salle />} />
                <Route path="/saisieData" element={<SaisieData />} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
};
export default Home;
