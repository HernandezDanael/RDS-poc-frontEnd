import { Button, useTheme } from "@mui/material";
import React, { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ManageAccounts,
  QueryBuilder,
  Category,
  Person,
  SettingsAccessibility,
  Badge,
  DataThresholding,
  AssignmentTurnedIn,
} from "@mui/icons-material/";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { useSelector } from "react-redux";
const Menu = () => {
  const theme = useTheme();
  const location = useLocation();

  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user.value);

  const lesReservation = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const lesUtilisateur = useCallback(() => {
    navigate("/utilisateur");
  }, [navigate]);

  const lesSalle = useCallback(() => {
    navigate("/salle");
  }, [navigate]);

  const lesSaisieData = useCallback(() => {
    navigate("/saisieData");
  }, [navigate]);

  return (
    <div style={{ ...theme.menu.containerMenu, paddingTop: "12px" }}>
      <Button
        onClick={lesReservation}
        sx={
          location.pathname === "/"
            ? {
                ...theme.menu.buttonMenu,
                ...theme.menu.buttonMenuSelect,
              }
            : theme.menu.buttonMenu
        }
        variant="contained"
        startIcon={<CalendarMonthIcon></CalendarMonthIcon>}
      >
        <div style={theme.button.textButton}>Les Reservations</div>
      </Button>
      {currentUser.droit === "admin" && (
        <div>
          <Button
            onClick={lesUtilisateur}
            sx={
              location.pathname === "/utilisateur"
                ? {
                    ...theme.menu.buttonMenu,
                    ...theme.menu.buttonMenuSelect,
                  }
                : theme.menu.buttonMenu
            }
            variant="contained"
            startIcon={<ManageAccounts></ManageAccounts>}
          >
            <div style={theme.button.textButton}>Les Utilisateurs</div>
          </Button>
          <Button
            onClick={lesSalle}
            sx={
              location.pathname === "/salle"
                ? {
                    ...theme.menu.buttonMenu,
                    ...theme.menu.buttonMenuSelect,
                  }
                : theme.menu.buttonMenu
            }
            variant="contained"
            startIcon={<Category></Category>}
          >
            <div style={theme.button.textButton}>Les Salles</div>
          </Button>
          <Button
            onClick={lesSaisieData}
            sx={
              location.pathname === "/saisieData"
                ? {
                    ...theme.menu.buttonMenu,
                    ...theme.menu.buttonMenuSelect,
                  }
                : theme.menu.buttonMenu
            }
            variant="contained"
            startIcon={<Category></Category>}
          >
            <div style={theme.button.textButton}>Saisie Data</div>
          </Button>
        </div>
      )}
    </div>
  );
};
export default Menu;
