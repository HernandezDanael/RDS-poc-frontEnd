import React, { useCallback, useState } from "react";
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  TextField,
} from "@mui/material";
import { GETONEUSER } from "../assets/Querys/getUser";
import { useLazyQuery, useMutation } from "@apollo/client";
import { useDispatch } from "react-redux";
import { updateUser } from "../assets/feature/CurrentUserReducer";
import { SnackBar } from "./SnackBarCustom";
import InfoIcon from "@mui/icons-material/Info";
/**
 * Renders a button which, when selected, will open a popup for login
 */

import { ADDUPDATEUSER } from "../assets/Mutations/addUpdateUser";
import { CheckBox } from "@mui/icons-material";
import { useTheme } from "@emotion/react";
import md5 from "js-md5";
export const SignInButton = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [opendDialogConnectionBool, setOpenDialogConnectonBool] =
    useState(false);
  const [openDialogInscription, setOpenDialogInscription] = useState(false);
  const [idUtilisateur, setIdUtilisateur] = useState("");
  const [pwdUtilisateur, setPwdUtilisateur] = useState("");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [numTel, setNumTel] = useState("");
  const [adresse, setAdresse] = useState("");
  const [siret, setSiret] = useState("");
  const [ligue, setLigue] = useState(false);
  const [onErrorEmail, setOnErrorEmail] = useState(false);
  const [onErrorTel, setOnErrorTel] = useState(false);
  const [onErrorSiret, setOnErrorSiret] = useState(false);

  const openToastError = useCallback(() => {
    SnackBar.open({
      text: "identifiant ou mot de passe incorrecte",
      snackbar: {},
      severity: "error",
      style: {},
      picto: <InfoIcon></InfoIcon>,
      position: { vertical: "bottom", horizontal: "left" },
      duration: 4000,
    });
  }, []);
  const openToastSucessInscription = useCallback(() => {
    SnackBar.open({
      text: "Inscription validée.",
      snackbar: {},
      severity: "success",
      style: {},
      picto: <InfoIcon></InfoIcon>,
      position: { vertical: "bottom", horizontal: "left" },
      duration: 4000,
    });
  }, []);
  const openToastSucessInscriptionEncours = useCallback(() => {
    SnackBar.open({
      text: "Inscription validée, en cours de vérification.",
      snackbar: {},
      severity: "success",
      style: {},
      picto: <InfoIcon></InfoIcon>,
      position: { vertical: "bottom", horizontal: "left" },
      duration: 4000,
    });
  }, []);
  const openToastDisabledError = useCallback(() => {
    SnackBar.open({
      text: "",
      snackbar: {},
      severity: "",
      style: {},
      picto: "",
      position: { vertical: "bottom", horizontal: "left" },
      duration: 5,
    });
  }, []);
  const openToastErrorSiret = useCallback(() => {
    SnackBar.open({
      text: "Numéro de Siret erroné.",
      snackbar: {},
      severity: "error",
      style: {},
      picto: <InfoIcon></InfoIcon>,
      position: { vertical: "bottom", horizontal: "left" },
    });
  }, []);
  const openToastErrorEmail = useCallback(() => {
    SnackBar.open({
      text: "Email invalide",
      snackbar: {},
      severity: "error",
      style: {},
      picto: <InfoIcon></InfoIcon>,
      position: { vertical: "bottom", horizontal: "left" },
      duration: 4000,
    });
  }, []);
  const openToastErrorTel = useCallback(() => {
    SnackBar.open({
      text: "Veuillez renseigner un numéro de téléphone correct",
      snackbar: {},
      severity: "error",
      style: {},
      picto: <InfoIcon></InfoIcon>,
      position: { vertical: "bottom", horizontal: "left" },
      duration: 4000,
    });
  }, []);
  const handleClick = useCallback(() => {
    setOpenDialogConnectonBool(true);
  }, []);
  const handleClickInscription = useCallback((event) => {
    setOpenDialogInscription(true);
    setOpenDialogConnectonBool(false);
  }, []);
  const handleClose = useCallback((event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenDialogConnectonBool(false);
  }, []);
  const handleCloseInscription = useCallback((event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenDialogInscription(false);
    setIdUtilisateur("");
    setPwdUtilisateur("");
    setNom("");
    setPrenom("");
    setEmail("");
    setNumTel("");
    setAdresse("");
    setSiret("");
    setLigue(false);
    setOnErrorEmail(false);
    setOnErrorSiret(false);
    setOnErrorTel(false);
  }, []);
  const handleChangeIdUtilisateur = useCallback((event) => {
    setIdUtilisateur(event.target.value);
  }, []);
  const handleChangePwdUtilisateur = useCallback((event) => {
    setPwdUtilisateur(event.target.value);
  }, []);

  const handleChangeNom = useCallback((event) => {
    const regex = new RegExp("^[a-zA-ZÀ-ÿ -]*$");
    if (regex.test(event.target.value)) {
      setNom(event.target.value);
    }
  }, []);

  const handleChangePrenom = useCallback((event) => {
    const regex = new RegExp("^[a-zA-ZÀ-ÿ -]*$");
    if (regex.test(event.target.value)) {
      setPrenom(event.target.value);
    }
  }, []);

  const handleChangeEmail = useCallback((event) => {
    setEmail(event.target.value);
  }, []);

  const handleChangeNumeroTel = useCallback((event) => {
    const regex = new RegExp("^[0-9]*$");
    if (regex.test(event.target.value)) {
      setNumTel(event.target.value);
    }
  }, []);

  const handleChangeAdresse = useCallback((event) => {
    setAdresse(event.target.value);
  }, []);

  const handleChangeSiret = useCallback((event) => {
    const regex = new RegExp("^[0-9]*$");
    if (regex.test(event.target.value)) {
      setSiret(event.target.value);
    }
  }, []);

  const handleChangeLigue = useCallback((event) => {
    console.log(event.target.checked);
    setLigue(event.target.checked);
  }, []);

  const onBlureEmail = useCallback(() => {
    const regex = new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$");
    if (regex.test(email) || email === "") {
      setOnErrorEmail(false);
      openToastDisabledError();
    } else {
      setOnErrorEmail(true);
      openToastErrorEmail();
    }
  }, [email, openToastDisabledError, openToastErrorEmail]);

  const onBlureTel = useCallback(() => {
    const regex = new RegExp("^\\d{1,3}(?:[-. ]?\\d{3}){2,3}$");
    if (regex.test(numTel) || numTel === "") {
      setOnErrorTel(false);
      openToastDisabledError();
    } else {
      setOnErrorTel(true);
      openToastErrorTel();
    }
  }, [numTel, openToastDisabledError, openToastErrorTel]);

  const onBlureSiret = useCallback(() => {
    const regex = new RegExp("^\\d{14}$");
    if (regex.test(siret) || siret === "") {
      setOnErrorSiret(false);
      openToastDisabledError();
    } else {
      setOnErrorSiret(true);
      openToastErrorSiret();
    }
  }, [openToastDisabledError, openToastErrorSiret, siret]);
  const disableInscription = useCallback(() => {
    if (
      onErrorTel === false &&
      onErrorSiret === false &&
      onErrorEmail === false &&
      nom !== "" &&
      nom !== undefined &&
      prenom !== "" &&
      prenom !== undefined &&
      email !== "" &&
      email !== undefined &&
      numTel !== "" &&
      numTel !== undefined &&
      adresse !== "" &&
      adresse !== undefined &&
      siret !== "" &&
      siret !== undefined &&
      idUtilisateur !== "" &&
      idUtilisateur !== undefined &&
      pwdUtilisateur !== "" &&
      pwdUtilisateur !== undefined
    ) {
      return false;
    } else {
      return true;
    }
  }, [
    adresse,
    email,
    idUtilisateur,
    nom,
    numTel,
    onErrorEmail,
    onErrorSiret,
    onErrorTel,
    prenom,
    pwdUtilisateur,
    siret,
  ]);
  const [userConnection] = useLazyQuery(GETONEUSER, {
    fetchPolicy: "cache-and-network",
    onCompleted: (data) => {
      if (data.utilisateur !== null) {
        dispatch(
          updateUser({
            id_utilisateur: data.utilisateur.id_utilisateur,
            adresse: data.utilisateur.adresse,
            siret: data.utilisateur.siret,
            email: data.utilisateur.email,
            num_tel: data.utilisateur.num_tel,
            nom: data.utilisateur.nom,
            prenom: data.utilisateur.prenom,
            droit: data.utilisateur.droit,
            ligue: data.utilisateur.ligue,
            nb_reservation_gratuite: data.utilisateur.nb_reservation_gratuite,
            amphi: data.utilisateur.amphi,
            statut: data.utilisateur.statut,
            identifiant: data.utilisateur.identifiant,
          })
        );
        openToastDisabledError();
      } else {
        openToastError();
        setIdUtilisateur("");
        setPwdUtilisateur("");
      }
    },
  });

  const [userInscription] = useMutation(ADDUPDATEUSER);

  const connextion = useCallback(() => {
    if (idUtilisateur !== "" && pwdUtilisateur !== "") {
      userConnection({
        variables: {
          identifiant: idUtilisateur,
          mdp: md5(pwdUtilisateur + "DHZ"),
        },
      });
      handleClose();
    } else {
      openToastError();
    }
  }, [
    handleClose,
    idUtilisateur,
    openToastError,
    pwdUtilisateur,
    userConnection,
  ]);

  const addUer = useCallback(() => {
    if (
      nom !== "" &&
      nom !== undefined &&
      prenom !== "" &&
      prenom !== undefined &&
      email !== "" &&
      email !== undefined &&
      numTel !== "" &&
      numTel !== undefined &&
      adresse !== "" &&
      adresse !== undefined &&
      siret !== "" &&
      siret !== undefined &&
      idUtilisateur !== "" &&
      idUtilisateur !== undefined &&
      pwdUtilisateur !== "" &&
      pwdUtilisateur !== undefined
    ) {
      if (ligue === true) {
        userInscription({
          variables: {
            identifiant: idUtilisateur,
            mdp: md5(pwdUtilisateur + "DHZ"),
            adresse: adresse,
            siret: siret,
            email: email,
            num_tel: parseInt(numTel),
            nom: nom,
            prenom: prenom,
            droit: "utilisateur",
            ligue: 1,
            nb_reservation_gratuite: 6,
            amphi: 1,
            statut: "en attente",
          },
        });
        openToastSucessInscriptionEncours();
      } else {
        userInscription({
          variables: {
            identifiant: idUtilisateur,
            mdp: md5(pwdUtilisateur + "DHZ"),
            adresse: adresse,
            siret: siret,
            email: email,
            num_tel: parseInt(numTel),
            nom: nom,
            prenom: prenom,
            droit: "utilisateur",
            ligue: 0,
            nb_reservation_gratuite: 0,
            amphi: 0,
            statut: "ouvert",
          },
        });
        openToastSucessInscription();
      }
      handleCloseInscription();
      setIdUtilisateur("");
      setPwdUtilisateur("");
      setNom("");
      setPrenom("");
      setEmail("");
      setNumTel("");
      setAdresse("");
      setSiret("");
      setLigue(false);
    }
  }, [
    adresse,
    email,
    handleCloseInscription,
    idUtilisateur,
    ligue,
    nom,
    numTel,
    openToastSucessInscription,
    openToastSucessInscriptionEncours,
    prenom,
    pwdUtilisateur,
    siret,
    userInscription,
  ]);

  return (
    <>
      <Button
        onClick={handleClick}
        sx={{ backgroundColor: "#2f2f2f" }}
        style={{
          cursor: "pointer",
          textTransform: "none",
          borderRadius: 0,
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          height: "64px",
          width: "200px",
          fontSize: "20px",
        }}
        variant="contained"
      >
        <img
          style={{ height: "34px" }}
          src={"logords.jpg"}
          alt="logo societe"
        ></img>
        Connexion
      </Button>
      <Dialog open={opendDialogConnectionBool} onClose={handleClose}>
        <DialogTitle>Connexion</DialogTitle>
        <DialogContent>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <TextField
              onChange={handleChangeIdUtilisateur}
              value={idUtilisateur}
              label={"Indentifant"}
            ></TextField>
            <TextField
              onChange={handleChangePwdUtilisateur}
              value={pwdUtilisateur}
              type="password"
              style={{ marginTop: "8px" }}
              label={"Mot de passe"}
            ></TextField>
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            sx={{
              minWidth: "150px",
              height: "32px",
              borderRadius: "8px",
              backgroundColor: " #006689",
              color: "#ffffff",
              textTransform: "none",
              boxShadow:
                "0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)",
              "&:hover": {
                color: "#000",
              },
            }}
            onClick={handleClickInscription}
          >
            Inscription
          </Button>
          <Button
            sx={{
              minWidth: "150px",
              height: "32px",
              borderRadius: "8px",
              backgroundColor: " #006689",
              color: "#ffffff",
              textTransform: "none",
              boxShadow:
                "0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)",
              "&:hover": {
                color: "#000",
              },
            }}
            onClick={connextion}
          >
            Confirmer
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openDialogInscription}
        onClose={handleCloseInscription}
        maxWidth={"40vw"}
      >
        <DialogTitle>Inscription</DialogTitle>
        <DialogContent>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              width: "35vw",
              padding: "10px 10px 10px 10px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                flex: "1",
                marginRight: "16px",
              }}
            >
              <TextField
                onChange={handleChangeNom}
                value={nom}
                style={{ marginBottom: "8px" }}
                label={"nom"}
              ></TextField>

              <TextField
                onChange={handleChangeEmail}
                value={email}
                style={{ marginBottom: "8px" }}
                label={"email"}
                onBlur={onBlureEmail}
                error={onErrorEmail}
              ></TextField>

              <TextField
                onChange={handleChangeAdresse}
                value={adresse}
                style={{ marginBottom: "8px" }}
                label={"adresse"}
              ></TextField>

              <TextField
                onChange={handleChangeIdUtilisateur}
                value={idUtilisateur}
                style={{ marginBottom: "8px" }}
                label={"identifiant"}
              ></TextField>
              <FormControlLabel
                control={
                  <Checkbox onChange={handleChangeLigue} value={ligue} />
                }
                label="Ligue"
              />
            </div>
            <div
              style={{ display: "flex", flexDirection: "column", flex: "1" }}
            >
              <TextField
                onChange={handleChangePrenom}
                value={prenom}
                style={{ marginBottom: "8px" }}
                label={"prenom"}
              ></TextField>

              <TextField
                onChange={handleChangeNumeroTel}
                value={numTel}
                style={{ marginBottom: "8px" }}
                label={"Numéro de télephone"}
                onBlur={onBlureTel}
                error={onErrorTel}
              ></TextField>

              <TextField
                onChange={handleChangeSiret}
                value={siret}
                style={{ marginBottom: "8px" }}
                label={"siret"}
                onBlur={onBlureSiret}
                error={onErrorSiret}
              ></TextField>
              <TextField
                onChange={handleChangePwdUtilisateur}
                value={pwdUtilisateur}
                style={{ marginBottom: "8px" }}
                label={"mot de passe"}
              ></TextField>
            </div>
          </div>
          <Button
            style={{ marginLeft: "19.5vw", marginRight: "8px" }}
            sx={{
              minWidth: "150px",
              height: "32px",
              borderRadius: "8px",
              backgroundColor: " #006689",
              color: "#ffffff",
              textTransform: "none",
              boxShadow:
                "0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)",
              "&:hover": {
                color: "#000",
              },
            }}
            disabled={disableInscription()}
            onClick={addUer}
          >
            Confirmer
          </Button>
          <Button
            sx={{
              minWidth: "150px",
              height: "32px",
              borderRadius: "8px",
              backgroundColor: " #006689",
              color: "#ffffff",
              textTransform: "none",
              boxShadow:
                "0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)",
              "&:hover": {
                color: "#000",
              },
            }}
            onClick={handleCloseInscription}
          >
            Annuler
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};
