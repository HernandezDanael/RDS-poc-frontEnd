import {
  useTheme,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  InputLabel,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import React, { useCallback, useMemo, useState } from "react";
import Tab from "./Tab";
import { AgGridReact } from "ag-grid-react";
import { DeleteLigne } from "../assets/func/Picto";

const Saisie = ({
  year,
  mois,
  jour,
  heure,
  salle,
  getAnnee,
  getAllMois,
  getJour,
  getAllSalle,
  getAllHeure,
  handleChangeMois,
  handleChangeJour,
  handleChangeSalle,
  handleChangeHeure,
  handleAddSaisie,
  onBlureSaisieSalle,
  dataRow,
  disableSaisie,
  handleChangeRow,
  openDialogDelet,
  onClickSupp,
  handleChangeDialogDel,
  handleCloseDel,
}) => {
  const theme = useTheme();
  const headerAccordion = useMemo(() => {
    return (
      <>
        <AccordionSummary style={theme.pageTest.accordeonCursor}>
          <div style={theme.pageTest.standardContainerHeaderAccord}>
            <div style={theme.pageTest.standardFlexContainer}>Reservation</div>
          </div>
        </AccordionSummary>
        <div style={theme.pageTest.standardLabelContainer}>
          <InputLabel sx={{ width: "100%" }}>
            <div style={theme.pageTest.standardHeadLabelContainer}>
              <div style={theme.pageTest.accordContainer}>Annee</div>
              <div style={theme.pageTest.accordContainer}>Mois</div>
              <div style={theme.pageTest.accordContainer}>Jour</div>
              <div style={theme.pageTest.accordContainer}>Salle</div>
              <div style={theme.pageTest.accordContainer}>Heures</div>
            </div>
          </InputLabel>
        </div>
      </>
    );
  }, [
    theme.pageTest.accordContainer,
    theme.pageTest.accordeonCursor,
    theme.pageTest.standardContainerHeaderAccord,
    theme.pageTest.standardFlexContainer,
    theme.pageTest.standardHeadLabelContainer,
    theme.pageTest.standardLabelContainer,
  ]);
  //AG Grid
  const [gridOptions, setGridOption] = useState();
  const containerStyle = useMemo(
    () => ({ width: "100%", height: "100vh" }),
    []
  );
  const column = useMemo(() => {
    let tab = [
      {
        field: "annee",
        headerName: "Annee",
        flex: 1,
        editable: false,
        sortable: true,
        cellClass: "grid-cell-centered",
      },
      {
        field: "mois",
        headerName: "Mois",
        flex: 1,
        editable: false,
        sortable: true,
        cellClass: "grid-cell-centered",
      },
      {
        field: "jour",
        headerName: "Jour",
        flex: 1,
        editable: false,
        sortable: true,
        cellClass: "grid-cell-centered",
      },
      {
        field: "salle",
        headerName: "Salle",
        flex: 1,
        editable: false,
        sortable: true,
        cellClass: "grid-cell-centered",
      },
      {
        field: "heures",
        headerName: "heures",
        flex: 1,
        editable: false,
        sortable: true,
        cellClass: "grid-cell-centered",
      },
      {
        field: "statut",
        headerName: "Statut",
        flex: 1,
        editable: false,
        sortable: true,
        cellClass: "grid-cell-centered",
      },
      {
        field: "del",
        headerName: "",
        flex: 0.5,
        editable: false,
        sortable: false,
        cellStyle: {
          ...theme.agGridCustom.gridCellCentered,
          padding: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          PointerEvents: "auto",
          cursor: "pointer",
        },
        onCellClicked: (event) => {
          if (event.column.colId === "del" && event.data.statut == "en cours") {
            handleChangeDialogDel();
          }
        },
        cellRenderer: (event) => {
          if (event.data.statut == "en cours") {
            return DeleteLigne(event, theme);
          }
        },
      },
    ];
    return tab;
  }, [handleChangeDialogDel, theme]);
  const defaultColDef = useMemo(
    () => ({
      width: 100,
      editable: true,
      filter: "agTextColumnFilter",
      wrapHeaderText: true,
      autoHeaderHeight: true,
      suppressMovable: true,
      filtersParams: {
        suppressAndOrCondition: true,
      },
    }),
    []
  );
  const onGridReady = useCallback(
    (e) => {
      setGridOption(e.api);
    },
    [setGridOption]
  );

  return (
    <div style={theme.pageTest.bodyContainer}>
      <div style={theme.pageTest.container1}>
        <div style={theme.pageTest.constainer3}>
          <div style={theme.pageTest.bodyContainer}>
            <div style={theme.pageTest.container2}>
              <div>
                <Accordion style={theme.pageTest.accordeon} expanded={true}>
                  {headerAccordion}
                  <AccordionDetails sx={theme.pageTest.colorstandardContainer}>
                    <Tab
                      year={year}
                      mois={mois}
                      jour={jour}
                      heure={heure}
                      salle={salle}
                      getAnnee={getAnnee}
                      getAllMois={getAllMois}
                      getJour={getJour}
                      getAllSalle={getAllSalle}
                      getAllHeure={getAllHeure}
                      handleChangeMois={handleChangeMois}
                      handleChangeJour={handleChangeJour}
                      handleChangeSalle={handleChangeSalle}
                      handleChangeHeure={handleChangeHeure}
                      onBlureSaisieSalle={onBlureSaisieSalle}
                    ></Tab>
                  </AccordionDetails>
                </Accordion>
                <div style={theme.pageTest.standardConfirmBouton}>
                  <Button
                    onClick={handleAddSaisie}
                    style={
                      disableSaisie() == true
                        ? { ...theme.pageTest.standardDisableHomeBouton }
                        : { ...theme.pageTest.standardHomeBouton }
                    }
                    disabled={disableSaisie()}
                  >
                    confirmer
                  </Button>
                </div>
                <div
                  style={{
                    height: "40vh",
                    marginTop: "64px",
                  }}
                >
                  <div
                    style={{
                      ...theme.agGridCustom.gridStyles,
                    }}
                    className={
                      theme.palette.mode == "light"
                        ? "ag-theme-alpine"
                        : "ag-theme-alpine-dark"
                    }
                  >
                    <AgGridReact
                      rowData={dataRow}
                      columnDefs={column}
                      defaultColDef={defaultColDef}
                      onGridReady={onGridReady}
                      gridOptions={{ rowClass: "pointerCursor" }}
                      onCellClicked={handleChangeRow}
                      rowHeight={32}
                      rowSelection={"single"}
                    ></AgGridReact>
                  </div>
                </div>
                <Dialog open={openDialogDelet} onClose={handleCloseDel}>
                  <DialogTitle>Annulé Réservation</DialogTitle>
                  <DialogContent>
                    <p>Êtes-vous sûr de vouloir annuler cette réservation ?</p>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "end",
                        marginTop: "32px",
                      }}
                    >
                      <Button
                        onClick={onClickSupp}
                        style={{
                          marginRight: "8px",
                          ...theme.pageTest.standardHomeBouton,
                        }}
                      >
                        Confirmer
                      </Button>
                      <Button
                        onClick={handleCloseDel}
                        style={{
                          ...theme.pageTest.standardHomeBouton,
                        }}
                      >
                        Annulé
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Saisie;
