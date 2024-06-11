import React, { useCallback, useMemo, useState } from "react";
import { DeleteLigne } from "../assets/func/Picto";
import { useTheme } from "@emotion/react";
import { AgGridReact } from "ag-grid-react";
import { useMutation, useQuery } from "@apollo/client";
import { GETALLUSER } from "../assets/Querys/getUser";
import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { ADDUPDATEUSER } from "../assets/Mutations/addUpdateUser";
import { DELUTILISATEUR } from "../assets/Mutations/delUtilisateur";

const Utilisateur = () => {
  const theme = useTheme();

  const [tabUser, setTabUser] = useState([]);
  const [newUser, setNewUser] = useState();
  const [indexNewUser, setIndexNewUser] = useState();
  const [openDialogSupp, setOpenDialogSupp] = useState(false);
  const [idAtDel, setIdAtDel] = useState();

  const { refetch } = useQuery(GETALLUSER, {
    onCompleted: (data) => {
      let temp = [];
      data.getAllUsers.forEach((element) => {
        let idUtilisateur = element.id_utilisateur;
        let identifiant = element.identifiant;
        let mdp = element.mdp;
        let nom = element.nom;
        let prenom = element.prenom;
        let email = element.email;
        let numTel = element.num_tel;
        let adresse = element.adresse;
        let droit = element.droit;
        let ligue = element.ligue;
        let nbReservationGratuite = element.nb_reservation_gratuite;
        let siret = element.siret;
        let amphi = element.amphi;
        let statut = element.statut;

        let row = {
          id_utilisateur: idUtilisateur,
          identifiant: identifiant,
          mdp: mdp,
          nom: nom,
          prenom: prenom,
          email: email,
          telephone: numTel,
          adresse: adresse,
          droit: droit,
          ligue: ligue,
          nb_reservation_gratuite: nbReservationGratuite,
          siret: siret,
          amphi: amphi,
          statut: statut,
        };
        temp.push(row);
      });
      setTabUser(temp);
    },
    fetchPolicy: "cache-and-network",
  });

  const [updateUser] = useMutation(ADDUPDATEUSER, {
    onCompleted: (data) => {
      console.log(data);
      if (newUser) {
        setNewUser(false);
        let tmpData = [...tabUser];
        tmpData[indexNewUser].id_utilisateur =
          data.addUpdateUtilisateur.id_utilisateur;
        setTabUser(tmpData);
        setTimeout(() => {
          const lastRowIndex = gridOptions.getDisplayedRowCount() - 1;
          gridOptions.ensureIndexVisible(lastRowIndex);
        }, 500);
      }
    },
  });

  const [delUser] = useMutation(DELUTILISATEUR, {
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
  const suppUtilisateur = useCallback(() => {
    if (idAtDel && idAtDel > 0) {
      console.log(idAtDel);
      delUser({
        variables: { id_utilisateur: idAtDel },
      });
      closeDialogSupp();
    }
  }, [closeDialogSupp, delUser, idAtDel]);

  //AG Grid
  const [gridOptions, setGridOption] = useState();
  const containerStyle = useMemo(
    () => ({ width: "100%", height: "100vh" }),
    []
  );
  const column = useMemo(() => {
    let tab = [
      {
        field: "id_utilisateur",
        headerName: "id_Utilisateur",
        flex: 1,
        editable: false,
        sortable: true,
        cellClass: "grid-cell-centered",
      },
      {
        field: "identifiant",
        headerName: "Identifiant",
        flex: 1,
        editable: true,
        sortable: true,
        cellClass: "grid-cell-centered",
      },
      {
        field: "mdp",
        headerName: "Mdp",
        flex: 1,
        editable: true,
        sortable: true,
        cellClass: "grid-cell-centered",
      },
      {
        field: "nom",
        headerName: "Nom",
        flex: 1,
        editable: true,
        sortable: true,
        cellClass: "grid-cell-centered",
      },
      {
        field: "prenom",
        headerName: "Prenom",
        flex: 1,
        editable: true,
        sortable: true,
        cellClass: "grid-cell-centered",
      },
      {
        field: "email",
        headerName: "Email",
        flex: 2,
        editable: true,
        sortable: true,
        cellClass: "grid-cell-centered",
      },
      {
        field: "telephone",
        headerName: "telephone",
        flex: 1,
        editable: true,
        sortable: true,
        cellClass: "grid-cell-centered",
      },
      {
        field: "adresse",
        headerName: "Adresse",
        flex: 2,
        editable: true,
        sortable: true,
        cellClass: "grid-cell-centered",
      },
      {
        field: "droit",
        headerName: "Droit",
        flex: 1,
        editable: true,
        sortable: true,
        cellClass: "grid-cell-centered",
      },
      {
        field: "ligue",
        headerName: "Ligue",
        flex: 1,
        editable: true,
        sortable: true,
        cellClass: "grid-cell-centered",
      },
      {
        field: "nb_reservation_gratuite",
        headerName: "Reservation gratuite",
        flex: 1,
        editable: true,
        sortable: true,
        cellClass: "grid-cell-centered",
      },
      {
        field: "siret",
        headerName: "Siret",
        flex: 1,
        editable: true,
        sortable: true,
        cellClass: "grid-cell-centered",
      },
      {
        field: "amphi",
        headerName: "Amphi",
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
      console.log(params.data.id_utilisateur);
      setIdAtDel(params.data.id_utilisateur);
      setOpenDialogSupp(true);
    }
  }, []);

  const onCellEditingStopped = useCallback(
    (params) => {
      if (params.data.id_utilisateur == null) {
        setNewUser(true);
        setIndexNewUser(params.rowIndex);
        updateUser({
          id_utilisateur: params.data.id_utilisateur,
          [params.colDef.field]: params.newValue ? params.newValue : "",
        });
      } else {
        updateUser({
          variables: {
            id_utilisateur: params.data.id_utilisateur,
            [params.colDef.field]: params.newValue ? params.newValue : "",
          },
        });
      }
    },
    [updateUser]
  );

  const addUser = useCallback(() => {
    let tmpData = [...tabUser];
    tmpData.push({
      id_utilisateur: null,
      identifiant: "",
      mdp: "",
      nom: "",
      prenom: "",
      email: "",
      numTel: "",
      adresse: "",
      droit: "",
      ligue: 0,
      nbReservationGratuite: "",
      siret: "",
      amphi: 0,
      statut: "",
    });
    setTabUser(tmpData);
    setTimeout(() => {
      const lastRowIndex = gridOptions.getDisplayedRowCount() - 1;
      gridOptions.ensureIndexVisible(lastRowIndex);
    }, 500);
  }, [gridOptions, tabUser]);
  return (
    <div style={theme.pageTest.bodyContainer}>
      <div style={theme.pageTest.container1}>
        <Dialog open={openDialogSupp} onClose={closeDialogSupp}>
          <DialogTitle>Supprimer Utilsateur</DialogTitle>
          <DialogContentText sx={{ padding: "16px" }}>
            Êtes vous sûr de vouloir supprimer cet utilisateur ?
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
              onClick={suppUtilisateur}
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
                    rowData={tabUser}
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
                    onClick={addUser}
                  >
                    Ajouter Utilisateur
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
export default Utilisateur;
