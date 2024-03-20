import { Button, useTheme } from '@mui/material';
import React, { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  ManageAccounts,
  QueryBuilder,
  Category,
  Person,
  SettingsAccessibility,
  Badge,
  DataThresholding,
  AssignmentTurnedIn,
} from '@mui/icons-material/';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
const Menu = () => {
  const theme = useTheme();
  const location = useLocation();

  const navigate = useNavigate();

 
  return (
    <div style={{ ...theme.menu.containerMenu, paddingTop: '12px' }}>
      <Button
        onClick={""}
        sx={
          location.pathname === '/'
            ? {
                ...theme.menu.buttonMenu,
                ...theme.menu.buttonMenuSelect,
              }
            : theme.menu.buttonMenu
        }
        variant="contained"
        startIcon={<CalendarMonthIcon></CalendarMonthIcon>}>
        <div style={theme.button.textButton}>Les Reservations</div>
      </Button>
      <Button
        onClick={""}
        sx={
          location.pathname === ''
            ? {
                ...theme.menu.buttonMenu,
                ...theme.menu.buttonMenuSelect,
              }
            : theme.menu.buttonMenu
        }
        variant="contained"
        startIcon={<ManageAccounts></ManageAccounts>}>
        <div style={theme.button.textButton}>Les Employes</div>
      </Button>
      <Button
        onClick={""}
        sx={
          location.pathname === ''
            ? {
                ...theme.menu.buttonMenu,
                ...theme.menu.buttonMenuSelect,
              }
            : theme.menu.buttonMenu
        }
        variant="contained"
        startIcon={<SettingsAccessibility></SettingsAccessibility>}>
        <div style={theme.button.textButton}>Les Client</div>
      </Button>
      <Button
        onClick={""}
        sx={
          location.pathname === ''
            ? {
                ...theme.menu.buttonMenu,
                ...theme.menu.buttonMenuSelect,
              }
            : theme.menu.buttonMenu
        }
        variant="contained"
        startIcon={<Badge></Badge>}>
        <div style={theme.button.textButton}>les facture</div>
      </Button>
      <Button
        onClick={""}
        sx={
          location.pathname === ''
            ? {
                ...theme.menu.buttonMenu,
                ...theme.menu.buttonMenuSelect,
              }
            : theme.menu.buttonMenu
        }
        variant="contained"
        startIcon={<Category></Category>}>
        <div style={theme.button.textButton}>Les Salles</div>
      </Button>
      <Button
        onClick={""}
        sx={
          location.pathname === ''
            ? {
                ...theme.menu.buttonMenu,
                ...theme.menu.buttonMenuSelect,
              }
            : theme.menu.buttonMenu
        }
        variant="contained"
        startIcon={<QueryBuilder></QueryBuilder>}>
        <div style={theme.button.textButton}>Historique Des Reservations</div>
      </Button>
 
    </div>
  );
};
export default Menu;
