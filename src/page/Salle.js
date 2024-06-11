import React, { useCallback, useMemo, useState } from "react";
import { DeleteLigne } from "../assets/func/Picto";
import { useTheme } from "@emotion/react";
import { AgGridReact } from "ag-grid-react";
import { useMutation, useQuery } from "@apollo/client";
import { Button, Dialog, DialogContentText, DialogTitle } from "@mui/material";
import { GETALLSALLE } from "../assets/Querys/getSalle";
import { ADDUPDATESALLE } from "../assets/Mutations/addUpdateSalle";
import { DELSALLE } from "../assets/Mutations/delSalle";

const Salle = () => {
  const theme = useTheme();

  const [tabSalle, setTabSalle] = useState([]);
  const [newSalle, setNewSalle] = useState();
  const [indexnewSalle, setIndexNewSalle] = useState();
  const [openDialogSupp, setOpenDialogSupp] = useState(false);
  const [idAtDel, setIdAtDel] = useState();

  const { refetch } = useQuery(GETALLSALLE, {
    onCompleted: (data) => {
      console.log(data);
      let temp = [];
      data.getAllSalle.forEach((element) => {
        let idSalle = element.id_salle;
        let description = element.description;
        let statut = element.statut;

        let row = {
          id_salle: idSalle,
          description: description,
          statut: statut,
        };
        temp.push(row);
      });
      setTabSalle(temp);
    },
    fetchPolicy: "cache-and-network",
  });

  const [updateSalle] = useMutation(ADDUPDATESALLE, {
    onCompleted: (data) => {
      console.log(data);
      if (newSalle) {
        setNewSalle(false);
        let tmpData = [...tabSalle];
        tmpData[indexnewSalle].id_salle = data.addUpdateSalle.id_salle;
        setTabSalle(tmpData);
        setTimeout(() => {
          const lastRowIndex = gridOptions.getDisplayedRowCount() - 1;
          gridOptions.ensureIndexVisible(lastRowIndex);
        }, 500);
      }
    },
  });
  const [delSalle] = useMutation(DELSALLE, {
    onCompleted: (data) => {
      refetch();
    },
  });
  const closeDialogSupp = useCallback((event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenDialogSupp(false);
  }, []);
  const suppSalle = useCallback(() => {
    if (idAtDel && idAtDel > 0) {
      delSalle({
        variables: { id_salle: idAtDel },
      });
      closeDialogSupp();
    }
  }, [closeDialogSupp, delSalle, idAtDel]);

  //AG Grid
  const [gridOptions, setGridOption] = useState();
  const containerStyle = useMemo(
    () => ({ width: "100%", height: "100vh" }),
    []
  );
  const column = useMemo(() => {
    let tab = [
      {
        field: "id_salle",
        headerName: "id_salle",
        flex: 1,
        editable: false,
        sortable: true,
        cellClass: "grid-cell-centered",
      },
      {
        field: "description",
        headerName: "description",
        flex: 1,
        editable: true,
        sortable: true,
        cellClass: "grid-cell-centered",
      },
      {
        field: "statut",
        headerName: "statut",
        flex: 1,
        editable: true,
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

        cellRenderer: (event) => {
          return DeleteLigne(event, theme);
        },
      },
    ];
    return tab;
    // eslint-disable-next-line no-sparse-arrays
  }, [, theme]);
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

  const onCellClicked = useCallback((params) => {
    if (params.column.userProvidedColDef.field == "del") {
      setIdAtDel(params.data.id_salle);
      setOpenDialogSupp(true);
    }
  }, []);

  const onCellEditingStopped = useCallback(
    (params) => {
      if (params.data.id_salle == null) {
        setNewSalle(true);
        setIndexNewSalle(params.rowIndex);
        updateSalle({
          id_salle: params.data.id_salle,
          [params.colDef.field]: params.newValue ? params.newValue : "",
        });
      } else {
        updateSalle({
          variables: {
            id_salle: params.data.id_salle,
            [params.colDef.field]: params.newValue ? params.newValue : "",
          },
        });
      }
    },
    [updateSalle]
  );

  const addSalle = useCallback(() => {
    let tmpData = [...tabSalle];
    tmpData.push({
      id_salle: null,
      description: "",
      statut: "",
    });
    setTabSalle(tmpData);
    setTimeout(() => {
      const lastRowIndex = gridOptions.getDisplayedRowCount() - 1;
      gridOptions.ensureIndexVisible(lastRowIndex);
    }, 500);
  }, [gridOptions, tabSalle]);
  return (
    <div style={theme.pageTest.bodyContainer}>
      <div style={theme.pageTest.container1}>
        <Dialog open={openDialogSupp} onClose={closeDialogSupp}>
          <DialogTitle>Supprimer Salle</DialogTitle>
          <DialogContentText sx={{ padding: "16px" }}>
            Êtes vous sûr de vouloir supprimer cet Salle ?
          </DialogContentText>
          <div
            style={{
              display: "flex",
              justifyContent: "end",
              marginTop: "32px",
              padding: "0px 16px 16px 16px",
            }}
          >
            <Button
              sx={{ ...theme.pageTest.standardHomeBouton, marginRight: "8px" }}
              onClick={suppSalle}
            >
              Confirmer
            </Button>
            <Button
              sx={theme.pageTest.standardHomeBouton}
              onClick={closeDialogSupp}
            >
              Annuler
            </Button>
          </div>
        </Dialog>
        <div style={theme.pageTest.constainer3}>
          <div style={theme.pageTest.bodyContainer}>
            <div style={theme.pageTest.container2}>
              <div
                style={{
                  height: "75vh",
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
                    rowData={tabSalle}
                    onCellEditingStopped={onCellEditingStopped}
                    columnDefs={column}
                    onCellClicked={onCellClicked}
                    defaultColDef={defaultColDef}
                    onGridReady={onGridReady}
                    gridOptions={{ rowClass: "pointerCursor" }}
                    rowHeight={32}
                    rowSelection={"single"}
                  ></AgGridReact>
                </div>
                <div
                  style={{
                    marginTop: "8px",
                    display: "flex",
                    justifyContent: "end",
                  }}
                >
                  <Button
                    sx={theme.pageTest.standardHomeBouton}
                    onClick={addSalle}
                  >
                    Ajouter Salle
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Salle;
