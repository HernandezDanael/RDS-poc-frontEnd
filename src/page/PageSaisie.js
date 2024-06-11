import React, { useState, useCallback, useMemo, useEffect } from "react";
import { MenuItem, Select, useTheme } from "@mui/material";
import Saisie from "../components/Saisie";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import { SnackBar } from "../components/SnackBarCustom";
import InfoIcon from "@mui/icons-material/Info";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { GETALLSALLE } from "../assets/Querys/getSalle";
import {
  ADDUPDATESAISIE,
  SUPPSAISE,
} from "../assets/Mutations/addUpdateSaisie";
import { GETALLSAISIEUSER, GETSAISIEDAY } from "../assets/Querys/getSaisie";
import { AgGridReact } from "ag-grid-react";
const PageSaisie = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.value);
  //les tableaux des données
  const [tabSalle, setTabSalle] = useState([]);
  const [tabHeuresSaisie, setTabHeuresSaisie] = useState([]);
  const [dataRow, setDataRow] = useState([]);
  //les infos lignes
  const [year, setYear] = useState();
  const [mois, setMois] = useState("");
  const [jour, setJour] = useState("");
  const [heure, setHeure] = useState("");
  const [salle, setSalle] = useState("");
  const [reservation, setReservation] = useState("");
  const [openDialogDelet, setOpenDialogDelet] = useState(false);
  const [firstLoad, setFirstLoad] = useState(true);

  const openToastSucessSaisie = useCallback(() => {
    SnackBar.open({
      text: "Réservation validée.",
      snackbar: {},
      severity: "success",
      style: {},
      picto: <InfoIcon></InfoIcon>,
      position: { vertical: "bottom", horizontal: "left" },
      duration: 4000,
    });
  }, []);

  const openToastSucessSupSaisiee = useCallback(() => {
    SnackBar.open({
      text: "Réservation annulé.",
      snackbar: {},
      severity: "success",
      style: {},
      picto: <InfoIcon></InfoIcon>,
      position: { vertical: "bottom", horizontal: "left" },
      duration: 4000,
    });
  }, []);

  useQuery(GETALLSALLE, {
    onCompleted: (data) => {
      let temp = [];
      data.getAllSalle.forEach((element) => {
        if (element.statut == "ouvert") {
          temp.push({ id: element.id_salle, nom: element.description });
        }
      });
      setTabSalle(temp);
    },
  });
  const [updateSaisieStatut] = useMutation(ADDUPDATESAISIE);
  const [addSaisie] = useMutation(ADDUPDATESAISIE, {
    onCompleted: (data) => {
      setMois("");
      setJour("");
      setHeure("");
      setSalle("");
      openToastSucessSaisie();
      refetch();
    },
  });
  const [updateSaisie] = useLazyQuery(GETALLSAISIEUSER, {
    onCompleted: (data) => {
      data.getAllSaisie.forEach((element) => {
        let periode = element.periode.split("/");
        let annee = periode[0];
        let mois = periode[1];
        let jour = periode[2];
        let heures = periode[4];
        let currentJour = new Date();
        let currenYear = currentJour.getFullYear();
        let currentMonth = currentJour.getMonth();
        let currentDay = currentJour.getDate();
        let currentHour = currentJour.getHours();
        if (currenYear > annee) {
          updateSaisieStatut({
            variables: {
              id_reservation: element.id_reservation,
              id_utilisateur: element.id_utilisateur,
              periode: element.period,
              id_salle: element.id_salle,
              statut: "Cloturée",
            },
          });
        } else if (
          currenYear == parseInt(annee) &&
          currentMonth + 1 > parseInt(mois)
        ) {
          updateSaisieStatut({
            variables: {
              id_reservation: element.id_reservation,
              id_utilisateur: element.id_utilisateur,
              periode: element.period,
              id_salle: element.id_salle,
              statut: "Cloturée",
            },
          });
        } else if (
          currenYear == parseInt(annee) &&
          currentMonth + 1 == parseInt(mois) &&
          currentDay > parseInt(jour)
        ) {
          updateSaisieStatut({
            variables: {
              id_reservation: element.id_reservation,
              id_utilisateur: element.id_utilisateur,
              periode: element.period,
              id_salle: element.id_salle,
              statut: "Cloturée",
            },
          });
        } else if (
          currenYear == parseInt(annee) &&
          currentMonth + 1 == parseInt(mois) &&
          currentDay == parseInt(jour) &&
          currentHour > parseInt(heures) + 1
        ) {
          updateSaisieStatut({
            variables: {
              id_reservation: element.id_reservation,
              id_utilisateur: element.id_utilisateur,
              periode: element.period,
              id_salle: element.id_salle,
              statut: "Cloturée",
            },
          });
        }
      });
      if (firstLoad === true) {
        refetch();
        setFirstLoad(false);
      }
    },
    fetchPolicy: "cache-and-network",
  });
  const { refetch } = useQuery(GETALLSAISIEUSER, {
    variables: {
      id_utilisateur: currentUser.id_utilisateur,
    },
    onCompleted: (data) => {
      let temp = [];
      updateSaisie();
      data.getAllSaisie.forEach((element) => {
        let periode = element.periode.split("/");
        let annee = periode[0];
        let mois = periode[1];
        let jour = periode[2];
        let salle = periode[3];
        let heures = periode[4];
        let nextHeure = parseInt(heures) + 1;
        let date = new Date(annee + "-" + mois + "-" + jour);

        let salleNom = "";
        let jourSemaine = [
          "Dimanche",
          "Lundi",
          "Mardi",
          "Mercredi",
          "Jeudi",
          "Vendredi",
          "Samedi",
        ];
        let moisSemaine = (mois = [
          "Janvier",
          "Février",
          "Mars",
          "Avril",
          "Mai",
          "Juin",
          "Juillet",
          "Août",
          "Septembre",
          "Octobre",
          "Novembre",
          "Décembre",
        ]);
        let nomJourSaisie = jourSemaine[date.getDay()];
        let moisSaisie = moisSemaine[date.getMonth()];

        let heureSaisie = heures + "H-" + nextHeure.toString() + "H";
        if (tabSalle.length > 0) {
          tabSalle.forEach((element) => {
            if (element.id == parseInt(salle)) {
              salleNom = element.nom;
              return;
            }
          });
        }
        let ligne = {
          id_reservation: element.id_reservation,
          annee: annee,
          mois: moisSaisie,
          jour: nomJourSaisie + " " + jour,
          salle: salleNom,
          heures: heureSaisie,
          statut: element.statut,
        };
        temp.push(ligne);
      });
      setDataRow(temp.reverse());
    },
    fetchPolicy: "cache-and-network",
  });
  const [getHeureSaisie] = useLazyQuery(GETSAISIEDAY, {
    onCompleted: (data) => {
      setTabHeuresSaisie(data.getSaisieDay);
    },
    fetchPolicy: "cache-and-network",
  });

  const [suppOneSaisie] = useMutation(SUPPSAISE, {
    onCompleted: (data) => {
      setOpenDialogDelet(false);
      openToastSucessSupSaisiee();
      refetch();
    },
  });

  const getMois = useCallback(() => {
    let temp = [];
    let getmonth = new Date().getMonth();
    for (let i = getmonth + 1; i <= 12; i++) {
      if (i < 10) {
        if (i == 1) {
          temp.push({ mois: "0" + i.toString(), nom: "Janvier" });
        } else if (i == 2) {
          temp.push({ mois: "0" + i.toString(), nom: "Février" });
        } else if (i == 3) {
          temp.push({ mois: "0" + i.toString(), nom: "Mars" });
        } else if (i == 4) {
          temp.push({ mois: "0" + i.toString(), nom: "Avril" });
        } else if (i == 5) {
          temp.push({ mois: "0" + i.toString(), nom: "Mai" });
        } else if (i == 6) {
          temp.push({ mois: "0" + i.toString(), nom: "Juin" });
        } else if (i == 7) {
          temp.push({ mois: "0" + i.toString(), nom: "Juillet" });
        } else if (i == 8) {
          temp.push({ mois: "0" + i.toString(), nom: "Août" });
        } else if (i == 9) {
          temp.push({ mois: "0" + i.toString(), nom: "Septembre" });
        }
      } else {
        if (i == 10) {
          temp.push({ mois: i.toString(), nom: "Octobre" });
        } else if (i == 11) {
          temp.push({ mois: i.toString(), nom: "Novembre" });
        } else if (i == 12) {
          temp.push({ mois: i.toString(), nom: "Décembre" });
        }
      }
    }

    return temp;
  }, []);
  const getDay = useCallback(() => {
    let tabmois = getMois();
    let year = new Date().getFullYear();
    let tab = [];
    let lastTab = [];
    let lastJour = 0;
    let days = "";
    tabmois.forEach((element) => {
      let lastDay = new Date(year, element.mois, 0);
      tab.push(lastDay.getDate());
    });
    for (let i = 0; i < tab.length; i++) {
      if (i == 0) {
        let jour = new Date().getDate();
        days = Array.from(
          { length: tab[i] - jour },
          (_, index) => index + jour + 1
        );
      } else {
        days = Array.from({ length: tab[i] }, (_, index) => index + 1);
      }
      let tabDay = [];
      // eslint-disable-next-line no-loop-func
      days.forEach((items) => {
        if ((items + lastJour) % 7 == 1) {
          tabDay.push({ num: items, jour: "Lundi" });
        } else if ((items + lastJour) % 7 == 2) {
          tabDay.push({ num: items, jour: "Mardi" });
        } else if ((items + lastJour) % 7 == 3) {
          tabDay.push({ num: items, jour: "Mercredi" });
        } else if ((items + lastJour) % 7 == 4) {
          tabDay.push({ num: items, jour: "Jeudi" });
        } else if ((items + lastJour) % 7 == 5) {
          tabDay.push({ num: items, jour: "Vendredi" });
        } else if ((items + lastJour) % 7 == 6) {
          tabDay.push({ num: items, jour: "Samedi" });
        } else if ((items + lastJour) % 7 == 0) {
          tabDay.push({ num: items, jour: "Dimanche" });
        }
      });

      if (tabDay[tabDay.length - 1].jour == "Lundi") {
        lastJour = 1;
      } else if (tabDay[tabDay.length - 1].jour == "Mardi") {
        lastJour = 2;
      } else if (tabDay[tabDay.length - 1].jour == "Mercredi") {
        lastJour = 3;
      } else if (tabDay[tabDay.length - 1].jour == "Jeudi") {
        lastJour = 4;
      } else if (tabDay[tabDay.length - 1].jour == "Vendredi") {
        lastJour = 5;
      } else if (tabDay[tabDay.length - 1].jour == "Samedi") {
        lastJour = 6;
      } else if (tabDay[tabDay.length - 1].jour == "Dimanche") {
        lastJour = 0;
      }
      lastTab.push(tabDay);
    }

    return lastTab;
  }, [getMois]);
  const getHeure = useCallback(() => {
    let temp = [];
    for (let i = 8; i < 19; i++) {
      if (i < 12 || i > 13) {
        temp.push({ num: i, nom: i + "H - " + (i + 1) + "H" });
      }
    }
    if (tabHeuresSaisie.length > 0) {
      tabHeuresSaisie.forEach((element) => {
        let periode = element.periode.split("/");
        let item = parseInt(periode[periode.length - 1]);
        temp.forEach((object) => {
          if (object.num === item) {
            temp.splice(temp.indexOf(object), 1);
          }
        });
      });
    }
    return temp;
  }, [tabHeuresSaisie]);
  const getAnnee = useMemo(() => {
    const tabtp = [];
    const year = new Date().getFullYear();
    setYear(year);
    tabtp.push(
      <option key={""} aria-label="None" value={year}>
        {year}
      </option>
    );

    return tabtp;
  }, []);

  const getAllMois = useMemo(() => {
    const tabtp = [];
    tabtp.push(<option key="" aria-label="None" value="" />);
    getMois().forEach((element) => {
      tabtp.push(
        <option
          sx={{ ...theme.pageTest.selectFontColor }}
          key={element.mois}
          value={element.mois}
        >
          {element.nom}
        </option>
      );
    });
    return tabtp;
  }, [getMois, theme.pageTest.selectFontColor]);

  const getJour = useMemo(() => {
    const tabtp = [];
    tabtp.push(<option key="" aria-label="None" value="" />);
    if (mois !== "" && mois !== undefined) {
      let getmonth = parseInt(new Date().getMonth()) + 1;
      let index = parseInt(mois) - getmonth;
      let jour = getDay();
      jour[index].forEach((element) => {
        tabtp.push(
          <option
            sx={{ ...theme.pageTest.selectFontColor }}
            key={element.num}
            value={element.num}
          >
            {element.jour + " " + element.num}
          </option>
        );
      });
    }

    return tabtp;
  }, [getDay, mois, theme.pageTest.selectFontColor]);

  const getAllSalle = useMemo(() => {
    const tabtp = [];
    tabtp.push(<option key="" aria-label="None" value="" />);
    tabSalle.forEach((element) => {
      tabtp.push(
        <option
          sx={{ ...theme.pageTest.selectFontColor }}
          key={element.id}
          value={element.id}
        >
          {element.nom}
        </option>
      );
    });
    return tabtp;
  }, [tabSalle, theme.pageTest.selectFontColor]);
  const getAllHeure = useMemo(() => {
    const tabtp = [];
    tabtp.push(<option key="" aria-label="None" value="" />);
    getHeure().forEach((element) => {
      tabtp.push(
        <option
          sx={{ ...theme.pageTest.selectFontColor }}
          key={element.num}
          value={element.num}
        >
          {element.nom}
        </option>
      );
    });

    return tabtp;
  }, [getHeure, theme.pageTest.selectFontColor]);

  const onBlureSaisieSalle = useCallback(() => {
    if (year !== "" && mois !== "" && jour !== "" && salle !== "") {
      let period =
        year.toString() +
        "/" +
        mois.toString() +
        "/" +
        jour.toString() +
        "/" +
        salle.toString() +
        "/%";
      getHeureSaisie({
        variables: {
          periode: period,
        },
      });
    }
  }, [getHeureSaisie, jour, mois, salle, year]);

  const handleChangeMois = useCallback((event) => {
    setMois(event.target.value);
  }, []);
  const handleChangeJour = useCallback((event) => {
    setJour(event.target.value);
  }, []);
  const handleChangeSalle = useCallback((event) => {
    setSalle(event.target.value);
  }, []);
  const handleChangeHeure = useCallback((event) => {
    setHeure(event.target.value);
  }, []);
  const handleChangeDialogDel = useCallback(() => {
    setOpenDialogDelet(true);
  }, []);
  const handleCloseDel = useCallback((event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenDialogDelet(false);
  }, []);
  const handleAddSaisie = useCallback(() => {
    let period =
      year.toString() +
      "/" +
      mois.toString() +
      "/" +
      jour.toString() +
      "/" +
      salle.toString() +
      "/" +
      heure.toString();
    addSaisie({
      variables: {
        id_utilisateur: currentUser.id_utilisateur,
        periode: period,
        id_salle: parseInt(salle),
        statut: "en cours",
      },
    });
  }, [addSaisie, currentUser.id_utilisateur, heure, jour, mois, salle, year]);
  const handleChangeRow = (event) => {
    setReservation(event.data.id_reservation);
  };

  const onClickSupp = useCallback(() => {
    if (reservation !== undefined && reservation !== "") {
      suppOneSaisie({
        variables: {
          id_reservation: reservation,
        },
      });
    }
  }, [reservation, suppOneSaisie]);

  const disableSaisie = useCallback(() => {
    if (
      year !== undefined &&
      year !== "" &&
      mois !== undefined &&
      mois !== "" &&
      jour !== undefined &&
      jour !== "" &&
      salle !== undefined &&
      salle !== "" &&
      heure !== undefined &&
      heure !== ""
    ) {
      return false;
    } else {
      return true;
    }
  }, [heure, jour, mois, salle, year]);

  return (
    <>
      <div style={theme.pageTest.periodContainer}></div>
      <Saisie
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
        handleAddSaisie={handleAddSaisie}
        onBlureSaisieSalle={onBlureSaisieSalle}
        dataRow={dataRow}
        disableSaisie={disableSaisie}
        handleChangeRow={handleChangeRow}
        onClickSupp={onClickSupp}
        openDialogDelet={openDialogDelet}
        handleChangeDialogDel={handleChangeDialogDel}
        handleCloseDel={handleCloseDel}
      ></Saisie>
    </>
  );
};
export default PageSaisie;
