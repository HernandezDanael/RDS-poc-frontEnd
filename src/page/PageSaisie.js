import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { MenuItem, Select, useTheme } from '@mui/material';
import Saisie from '../components/Saisie';
import { useDispatch, useSelector } from 'react-redux';
// import { updatePopulate } from '../assets/feature/PopulateReducer';
// import { updatePeriode } from '../assets/feature/PeriodeReducer';
import { Button } from '@mui/material';
import { SnackBar } from '../components/SnackBarCustom';
import InfoIcon from '@mui/icons-material/Info';
// import { updateSaisie } from '../assets/feature/SaisieReduceur';

const PageSaisie = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  //les reducers
  // const saisieResult = useSelector((state) => state.saisie.value);
  // const populate = useSelector((state) => state.populate.value);
  // const user = useSelector((state) => state.currentUser.value);
  // const currentUser = useSelector((state) => state.currentUser.value);

  //les states
  const [saisieType, setSaisieType] = useState(null);
  const [semaine, setSemaine] = useState([]);
  const [tabAnnee, setTabAnnee] = useState([]);
  const [tabSemaine, setTabSemaine] = useState([]);
  const [disableCopie, setDisableCopie] = useState(false);
  const [currentWeek, setCurrentWeek] = useState(null);
  const [currentYear, setCurrentYear] = useState(null);
  const [idYear, setIdYear] = useState();

  const [openSupSaisie, setOpenSupSaisie] = useState(false);
  const [openSupSaisieSemaine, setOpenSupSaisieSemaine] = useState(false);

  //Données du tableau des heures
  const [tabContent, setTabContent] = useState([]);
  const [tabSaisie, setTabSaisie] = useState([]);
  const [counter, setCounter] = useState(0);
  const [copieSemaine, setCopieSemaine] = useState(false);
  const [idSemaine, setIdSemaine] = useState(0);
  const [idAnnee, setIdAnnee] = useState(0);

  //semaine.length < 4 ? parseInt(semaine.slice(2, 3)) : parseInt(semaine.slice(2, 4));
  //Récupération des données des heures de l'utilisateur connecté

  //semaine selectionnée en jour
  const onCompletedGetSaisieJour = useCallback(
    (data) => {
      let tabtemp = [];
      let tabTempSaisie = [];
      let count = counter;
      if (data.saisieJour.length === 0) {
        tabtemp.push({
          id: count,
          id_saisie: undefined,
          typeProjet: undefined,
          projet: undefined,
          client: undefined,
          tache: undefined,
          lundi: undefined,
          mardi: undefined,
          mercredi: undefined,
          jeudi: undefined,
          vendredi: undefined,
          total: undefined,
        });
        count = count + 1;
        setTabContent(tabtemp);
      }

      data.saisieJour.forEach((element) => {
        tabtemp.push({
          id: count,
          id_saisie: element.id_saisie,
          typeProjet: element.id_type_projet,
          projet: element.id_projet,
          client: element.id_client,
          tache: element.id_tache,
          lundi: element.lundi,
          mardi: element.mardi,
          mercredi: element.mercredi,
          jeudi: element.jeudi,
          vendredi: element.vendredi,
          total: element.lundi + element.mardi + element.mercredi + element.jeudi + element.vendredi,
        });
        count = count + 1;
      });
      tabSaisie.forEach((element) => {
        if (element.id_saisie === undefined) {
          if (
            element.typeProjet !== undefined &&
            element.projet !== undefined &&
            element.client !== undefined &&
            element.tache !== undefined
          ) {
            let row = {
              id: count,
              id_saisie: element.id_saisie,
              typeProjet: element.typeProjet,
              projet: element.projet,
              client: element.client,
              tache: element.tache,
              lundi: element.lundi,
              mardi: element.mardi,
              mercredi: element.mercredi,
              jeudi: element.jeudi,
              vendredi: element.vendredi,
              total: element.total,
            };
            count = count + 1;
            tabTempSaisie.push(row);
          }
        }
      });

      tabtemp.forEach((element) => {
        if (element.id_saisie !== undefined) {
          tabTempSaisie.forEach((items) => {
            if (
              items.typeProjet === element.typeProjet &&
              items.projet === element.projet &&
              items.client === element.client &&
              items.tache === element.tache
            ) {
              tabTempSaisie.splice(tabTempSaisie.indexOf(items), 1);
            }
          });
        }
      });
      tabtemp = [...tabtemp, ...tabTempSaisie];
      setTabSaisie(tabtemp);
      setTabContent([...tabtemp]);
      setCounter(counter + count);
    },
    [counter, tabSaisie]
  );

  //semaine selectionnée en semaine

  const onCompletedGetSaisieSemaine = useCallback(
    (data) => {
      let tabtemp = [];
      let tabTempSaisie = [];
      let count = counter;
      if (data.saisieSemaine.length === 0) {
        tabtemp.push({
          id: count,
          id_saisie: undefined,
          typeProjet: undefined,
          projet: undefined,
          client: undefined,
          tache: undefined,
          total: undefined,
        });
        count = count + 1;
        setTabContent(tabtemp);
      }

      data.saisieSemaine.forEach((element) => {
        tabtemp.push({
          id: count,
          id_saisie: element.id_saisie,
          typeProjet: element.id_type_projet,
          projet: element.id_projet,
          client: element.id_client,
          tache: element.id_tache,
          total: element.total_heure,
        });
        count = count + 1;
      });
      tabSaisie.forEach((element) => {
        if (element.id_saisie === undefined) {
          if (
            element.typeProjet !== undefined &&
            element.projet !== undefined &&
            element.client !== undefined &&
            element.tache !== undefined
          ) {
            let row = {
              id: count,
              id_saisie: element.id_saisie,
              typeProjet: element.typeProjet,
              projet: element.projet,
              client: element.client,
              tache: element.tache,
              total: element.total,
            };
            count = count + 1;
            tabTempSaisie.push(row);
          }
        }
      });

      tabtemp.forEach((element) => {
        if (element.id_saisie !== undefined) {
          tabTempSaisie.forEach((items) => {
            if (
              items.typeProjet === element.typeProjet &&
              items.projet === element.projet &&
              items.client === element.client &&
              items.tache === element.tache
            ) {
              tabTempSaisie.splice(tabTempSaisie.indexOf(items), 1);
            }
          });
        }
      });
      tabtemp = [...tabtemp, ...tabTempSaisie];
      setTabSaisie(tabtemp);
      setTabContent([...tabtemp]);
      setCounter(counter + count);
    },
    [counter, tabSaisie]
  );

  const onCompletedLastSaisieJour = useCallback(
    (data) => {
      if (data.saisieJour.length == 0) {
        setDisableCopie(true);
      }
      let tabtemp = [];
      let count = counter;
      data.saisieJour.forEach((element) => {
        let row = {
          id: count,
          id_annee: parseInt(semaine.slice(0, 2)),
          id_semaine: semaine.length < 4 ? parseInt(semaine.slice(2, 3)) : parseInt(semaine.slice(2, 4)),
          id_saisie: undefined,
          typeProjet: element.id_type_projet,
          projet: element.id_projet,
          client: element.id_client,
          tache: element.id_tache,
          lundi: undefined,
          mardi: undefined,
          mercredi: undefined,
          jeudi: undefined,
          vendredi: undefined,
          total: undefined,
        };
        tabtemp.push(row);
        count = count + 1;
      });
      tabSaisie.forEach((element) => {
        if (element.typeProjet == undefined && element.projet == undefined && element.client == undefined && element.tache == undefined) {
          tabSaisie.splice(tabSaisie.indexOf(element), 1);
        }
        tabtemp.forEach((items) => {
          if (
            element.typeProjet == items.typeProjet &&
            element.projet == items.projet &&
            element.client == items.client &&
            element.tache == items.tache
          ) {
            tabtemp.splice(tabtemp.indexOf(items), 1);
          }
        });
      });

      tabtemp = [...tabSaisie, ...tabtemp];
      if (copieSemaine == true) {
        setCounter(count);
        setTabContent(tabtemp);
        setTabSaisie(tabtemp);
        setCopieSemaine(false);
        // dispatch(updatePopulate('copieOff'));
      }
    },
    [copieSemaine, counter, dispatch, semaine, tabSaisie]
  );
  const onCompletesdLastSaisieSemaine = useCallback(
    (data) => {
      if (data.saisieSemaine.length == 0) {
        setDisableCopie(true);
      }
      let tabtemp = [];
      let count = counter;
      data.saisieSemaine.forEach((element) => {
        let row = {
          id: count,
          id_annee: parseInt(semaine.slice(0, 2)),
          id_semaine: semaine.length < 4 ? parseInt(semaine.slice(2, 3)) : parseInt(semaine.slice(2, 4)),
          id_saisie: undefined,
          typeProjet: element.id_type_projet,
          projet: element.id_projet,
          client: element.id_client,
          tache: element.id_tache,
          total: undefined,
        };
        tabtemp.push(row);
        count = count + 1;
      });
      tabSaisie.forEach((element) => {
        if (element.typeProjet == undefined && element.projet == undefined && element.client == undefined && element.tache == undefined) {
          tabSaisie.splice(tabSaisie.indexOf(element), 1);
        }
        tabtemp.forEach((items) => {
          if (
            element.typeProjet == items.typeProjet &&
            element.projet == items.projet &&
            element.client == items.client &&
            element.tache == items.tache
          ) {
            tabtemp.splice(tabtemp.indexOf(items), 1);
          }
        });
      });
      tabtemp = [...tabSaisie, ...tabtemp];
      if (copieSemaine == true) {
        setCounter(count);
        setTabContent(tabtemp);
        setTabSaisie(tabtemp);
        setCopieSemaine(false);
        // dispatch(updatePopulate('copieOff'));
      }
    },
    [copieSemaine, counter, dispatch, semaine, tabSaisie]
  );

  //requete saisieJour
  // const [getLastSaisieJourCallback] = useLazyQuery(GETSAISIEJOUR, {
  //   fetchPolicy: 'cache-and-network',
  //   onCompleted: onCompletedLastSaisieJour,
  // });

  // const [getCurrentSaisieJourCallback] = useLazyQuery(GETSAISIEJOUR, {
  //   fetchPolicy: 'cache-and-network',
  //   onCompleted: onCompletedGetSaisieJour,
  // });

  // //requete saisieSemaine
  // const [getLastSaisieSemaineCallback] = useLazyQuery(GETSAISIESEMAINE, {
  //   fetchPolicy: 'cache-and-network',
  //   onCompleted: onCompletesdLastSaisieSemaine,
  // });

  // const [getCurrentSaisieSemaineCallback] = useLazyQuery(GETSAISIESEMAINE, {
  //   fetchPolicy: 'cache-and-network',
  //   onCompleted: onCompletedGetSaisieSemaine,
  // });

  // useEffect(() => {
  //   if (idAnnee && idSemaine && idAnnee > 0 && idSemaine > 1) {
  //     if (saisieType == 'semaine') {
  //       getLastSaisieSemaineCallback({ variables: { id_annee: idAnnee, id_semaine: idSemaine - 1 } });
  //       getCurrentSaisieSemaineCallback({ variables: { id_annee: idAnnee, id_semaine: idSemaine } });
  //     } else {
  //       getLastSaisieJourCallback({ variables: { id_annee: idAnnee, id_semaine: idSemaine - 1 } });

  //       getCurrentSaisieJourCallback({ variables: { id_annee: idAnnee, id_semaine: idSemaine } });
  //     }
  //   } else if (idAnnee && idSemaine && idAnnee > 0 && idSemaine > 0) {
  //     if (saisieType == 'semaine') {
  //       getCurrentSaisieSemaineCallback({ variables: { id_annee: idAnnee, id_semaine: idSemaine } });
  //     } else {
  //       getCurrentSaisieJourCallback({ variables: { id_annee: idAnnee, id_semaine: idSemaine } });
  //     }
  //   }
  //   // c'est volotaire c'est juste pour le premier chargement ;)
  // }, [
  //   getLastSaisieJourCallback,
  //   getCurrentSaisieJourCallback,
  //   idAnnee,
  //   idSemaine,
  //   saisieType,
  //   getLastSaisieSemaineCallback,
  //   getCurrentSaisieSemaineCallback,
  // ]);

  const openToast = useCallback(() => {
    SnackBar.open({
      text: 'Tous les éléments ont été supprimés',
      snackbar: {},
      style: {},
      picto: <InfoIcon></InfoIcon>,
      position: { vertical: 'bottom', horizontal: 'left' },
      duration: 4000,
    });
  }, []);
  const openToastUnit = useCallback(() => {
    SnackBar.open({
      text: 'La ligne a été supprimée',
      snackbar: {},
      style: {},
      picto: <InfoIcon></InfoIcon>,
      position: { vertical: 'bottom', horizontal: 'left' },
      duration: 4000,
    });
  }, []);
  const openToastSaisie = useCallback(() => {
    SnackBar.open({
      text: 'Saisie effectuer',
      snackbar: {},
      style: {},
      picto: <InfoIcon></InfoIcon>,
      position: { vertical: 'bottom', horizontal: 'left' },
      duration: 4000,
    });
  }, []);
  const completedSupp = useCallback(() => {
    openToast();
  }, [openToast]);

  // const [suppSaisie] = useMutation(SUPPSAISIEJOUR, {
  //   onCompleted: completedSupp,
  // });

  // const useSuppSaisie = useCallback(
  //   (element) => {
  //     suppSaisie({
  //       variables: {
  //         id_saisie: element.id_saisie,
  //         id_utilisateur: currentUser.id_utilisateur,
  //       },
  //     });
  //   },
  //   [currentUser.id_utilisateur, suppSaisie]
  // );
  // const [suppSaisieSemaine] = useMutation(SUPPSAISIESEMAINE, {
  //   onCompleted: completedSupp,
  // });

  // const useSuppSaisieSemaine = useCallback(
  //   (element) => {
  //     suppSaisieSemaine({
  //       variables: {
  //         id_saisie: element.id_saisie,
  //         id_utilisateur: currentUser.id_utilisateur,
  //       },
  //     });
  //   },
  //   [currentUser.id_utilisateur, suppSaisieSemaine]
  // );
  const addNewPeriode = useCallback(() => {
    setTabContent([]);
    setTabSaisie([]);
    setCounter(0);
  }, []);

  //LES POPULATES DE DANAEL
  // useEffect(() => {
  //   if (populate === 'ajoueSaisie') {
  //     let tabTemp = [...tabSaisie];
  //     if (tabTemp.length > 0) {
  //       tabTemp.forEach((element) => {
  //         // getCurrentSaisieJourCallback({
  //         //   variables: { id_annee: idAnnee, id_semaine: idSemaine },
  //         // });
  //       });
  //     }
  //     let row = {
  //       id: counter,
  //       id_saisie: undefined,
  //       typeProjet: undefined,
  //       projet: undefined,
  //       client: undefined,
  //       tache: undefined,
  //       lundi: undefined,
  //       mardi: undefined,
  //       mercredi: undefined,
  //       jeudi: undefined,
  //       vendredi: undefined,
  //       total: undefined,
  //     };
  //     // dispatch(updateSaisie(row));
  //     openToastSaisie();
  //     setTabSaisie(tabTemp);
  //     // dispatch(updatePopulate(''));
  //   }
  //   if (populate === 'ajoueSaisieSemaine') {
  //     let tabTemp = [...tabSaisie];
  //     if (tabTemp.length > 0) {
  //       tabTemp.forEach((element) => {
  //         // getCurrentSaisieSemaineCallback({
  //         //   variables: { id_annee: idAnnee, id_semaine: idSemaine },
  //         // });
  //       });
  //     }
  //     let row = {
  //       id: counter,
  //       id_saisie: undefined,
  //       typeProjet: undefined,
  //       projet: undefined,
  //       client: undefined,
  //       tache: undefined,
  //       total: undefined,
  //     };
  //     // dispatch(updateSaisie(row));
  //     openToastSaisie();
  //     setTabSaisie(tabTemp);
  //     // dispatch(updatePopulate(''));
  //   }

  // //   if (populate === 'copieJour') {
  // //     setCopieSemaine(true);
  // //     if (idSemaine == 1) {
  // //       getLastSaisieJourCallback({
  // //         variables: { id_annee: idAnnee - 1, id_semaine: 52 },
  // //       });
  // //     } else {
  // //       getLastSaisieJourCallback({
  // //         variables: { id_annee: idAnnee, id_semaine: idSemaine - 1 },
  // //       });
  // //     }

  //     // dispatch(updatePopulate(''));
  // //   }
  // //   if (populate === 'copieSemaine') {
  // //     setCopieSemaine(true);
  // //     if (idSemaine == 1) {
  // //       getLastSaisieSemaineCallback({
  // //         variables: { id_annee: idAnnee - 1, id_semaine: 52 },
  // //       });
  // //     } else {
  // //       getLastSaisieSemaineCallback({
  // //         variables: { id_annee: idAnnee, id_semaine: idSemaine - 1 },
  // //       });
  // //     }

  //     // dispatch(updatePopulate(''));
  // //   }
  // //   if (populate === 'suppSaisie') {
  // //     let tabtemp = [...tabContent];
  // //     let count = 0;
  // //     let temp = [...tabSaisie];
  // //     let index = 0;
  // //     if (tabContent.length == 1 && tabContent[0].id == saisieResult.id) {
  //       // dispatch(updatePopulate('lastSaisie'));
  // //     } else {
  // //       tabtemp.forEach((element) => {
  // //         if (element.id == saisieResult.id) {
  // //           tabtemp.splice(tabtemp.indexOf(element), 1);
  // //         }
  // //         setTabContent(tabtemp);
  // //         setCounter(count);
  // //       });

  //       // dispatch(updatePopulate(''));
  // //     }
  // //     temp.forEach((element) => {
  // //       if (element.id == saisieResult.id) {
  // //         index = temp.indexOf(element);
  // //         temp.splice(index, 1);
  // //         if (element.id_saisie) {
  // //           // eslint-disable-next-line react-hooks/rules-of-hooks
  // //           useSuppSaisie(element);
  // //         }
  // //       }
  // //       setTabSaisie(temp);
  // //     });
  // //     openToastUnit();
  // //     dispatch(
  // //       updateSaisie({
  // //         id: counter,
  // //         id_saisie: undefined,
  // //         typeProjet: undefined,
  // //         projet: undefined,
  // //         client: undefined,
  // //         tache: undefined,
  // //         lundi: undefined,
  // //         mardi: undefined,
  // //         mercredi: undefined,
  // //         jeudi: undefined,
  // //         vendredi: undefined,
  // //         total: undefined,
  // //       })
  // //     );
  // //   }
  // //   if (populate === 'suppSaisieSemaine') {
  // //     let tabtemp = [...tabContent];
  // //     let count = 0;
  // //     let temp = [...tabSaisie];
  // //     let index = 0;
  // //     if (tabContent.length == 1 && tabContent[0].id == saisieResult.id) {
  //       // dispatch(updatePopulate('lastSaisie'));
  // //     } else {
  // //       tabtemp.forEach((element) => {
  // //         if (element.id == saisieResult.id) {
  // //           tabtemp.splice(tabtemp.indexOf(element), 1);
  // //         }
  // //         setTabContent(tabtemp);
  // //         setCounter(count);
  // //       });

  //       // dispatch(updatePopulate(''));
  // //     }
  // //     temp.forEach((element) => {
  // //       if (element.id == saisieResult.id) {
  // //         index = temp.indexOf(element);
  // //         temp.splice(index, 1);
  // //         if (element.id_saisie) {
  // //           // eslint-disable-next-line react-hooks/rules-of-hooks
  // //           useSuppSaisieSemaine(element);
  // //         }
  // //       }
  // //       setTabSaisie(temp);
  // //     });
  // //     openToastUnit();
  // //     dispatch(
  // //       updateSaisie({
  // //         id: counter,
  // //         id_saisie: undefined,
  // //         typeProjet: undefined,
  // //         projet: undefined,
  // //         client: undefined,
  // //         tache: undefined,
  // //         total: undefined,
  // //       })
  // //     );
  // //   }
  // }, [
  // //   counter,
  // //   dispatch,
  // //   populate,
  // //   tabSaisie,
  // //   tabContent,
  // //   getLastSaisieJourCallback,
  // //   currentUser.id_utilisateur,
  // //   getCurrentSaisieJourCallback,
  // //   currentUser,
  // //   idAnnee,
  // //   idSemaine,
  // //   saisieResult.id,
  // //   useSuppSaisie,
  // //   openToast,
  // //   openToastSaisie,
  // //   openToastUnit,
  // //   getCurrentSaisieSemaineCallback,
  // //   useSuppSaisieSemaine,
  // //   getLastSaisieSemaineCallback,
  // ]);

  //FIN DES POPULATES

  const handlClick = useCallback(() => {
    const element = {
      id: counter,
      id_saisie: undefined,
      typeProjet: undefined,
      projet: undefined,
      client: undefined,
      tache: undefined,
      lundi: undefined,
      mardi: undefined,
      mercredi: undefined,
      jeudi: undefined,
      vendredi: undefined,
      total: undefined,
    };
    // dispatch(
    //   updateSaisie({
    //     id: counter,
    //     id_saisie: undefined,
    //     typeProjet: undefined,
    //     projet: undefined,
    //     client: undefined,
    //     tache: undefined,
    //     lundi: undefined,
    //     mardi: undefined,
    //     mercredi: undefined,
    //     jeudi: undefined,
    //     vendredi: undefined,
    //     total: undefined,
    //   })
    // );
    setTabContent([...tabContent, element]);
    setCounter(counter + 1);
  }, [counter, dispatch, tabContent]);

  // useEffect(() => {
  //   if (user && user.id_type_entree && user.id_type_entree == 2) {
  //     setSaisieType('semaine');
  //   } else {
  //     setSaisieType('jour');
  //   }
  // }, [user]);

  // useQuery(GETALLANNEE, {
  //   fetchPolicy: 'cache-and-network',
  //   onCompleted: (data) => {
  //     let tabtemp = [...data.annees];
  //     setTabAnnee(tabtemp.reverse());
  //   },
  // });
  // useQuery(GETALLSEMAINE, {
  //   etchPolicy: 'cache-and-network',
  //   onCompleted: (data) => {
  //     let tabtemp = [...data.semaine];
  //     setTabSemaine(tabtemp.reverse());
  //   },
  // });

  // useEffect(() => {
  //   if (populate === 'copieOff') {
  //     setDisableCopie(true);
  //     // dispatch(updatePopulate(''));
  //   }
  // }, [dispatch, populate]);

  const openToastCopieSaisie = useCallback(() => {
    SnackBar.open({
      text: 'Copie effectuée',
      snackbar: {},
      style: {},
      picto: <InfoIcon></InfoIcon>,
      position: { vertical: 'bottom', horizontal: 'left' },
      duration: 4000,
    });
  }, []);

  const changeAnnee = useCallback(
    (event) => {
      setSemaine(event.target.value);
      setIdSemaine(event.target.value.length < 4 ? parseInt(event.target.value.slice(2, 3)) : parseInt(event.target.value.slice(2, 4)));
      setIdAnnee(parseInt(event.target.value.slice(0, 2)));
      setDisableCopie(false);
      addNewPeriode();
    },
    [addNewPeriode]
  );
  const changeSaisie = useCallback(
    (event) => {
      setSaisieType(event.target.value);
      let id_annee = parseInt(semaine.slice(0, 2));
      let nbWeek = parseInt(semaine.slice(2, 4));
      //addNewPeriode();
      setDisableCopie(false);
      // dispatch(updatePeriode({ id_annee: id_annee, id_week: nbWeek }));
      let semaineTmp = id_annee.toString() + nbWeek.toString();
      setSemaine(semaineTmp);
      setIdSemaine(semaineTmp.length < 4 ? parseInt(semaineTmp.slice(2, 3)) : parseInt(semaineTmp.slice(2, 4)));
      setIdAnnee(parseInt(semaineTmp.slice(0, 2)));
    },
    [semaine, dispatch]
  );

  const handleClickCopierSemaine = useCallback(() => {
    if (saisieType == 'semaine') {
      // dispatch(updatePopulate('copieSemaine'));
    } else {
      // dispatch(updatePopulate('copieJour'));
    }
    openToastCopieSaisie();
  }, [dispatch, openToastCopieSaisie, saisieType]);

  const getCurrentWeek = useCallback(() => {
    const currentDate = new Date();
    const firstDayOfYear = new Date(currentDate.getFullYear(), 0, 1);
    const daysPassed = Math.floor((currentDate - firstDayOfYear) / (24 * 60 * 60 * 1000));
    const currentWeekNumber = Math.ceil((daysPassed + firstDayOfYear.getDay() + 1) / 7);
    const year = currentDate.getFullYear();
    setCurrentYear(year);
    setCurrentWeek(currentWeekNumber);
  }, []);

  const getTypesAnnees = useMemo(() => {
    getCurrentWeek();
    const typesAnnees = [];
    const tabA = tabAnnee;
    const tabS = tabSemaine;
    if (tabAnnee != null) {
      let first = true;
      tabA.forEach((element) => {
        if (typesAnnees.length <= 60) {
          tabS.forEach((items) => {
            if (typesAnnees.length <= 60) {
              if (element.descriptions.toString() == currentYear && items.id_semaine == currentWeek && first) {
                first = false;
                setIdYear(element.id_annee);
                let semaineTmp = element.id_annee.toString() + items.id_semaine.toString();
                setSemaine(semaineTmp);
                setIdSemaine(semaineTmp.length < 4 ? parseInt(semaineTmp.slice(2, 3)) : parseInt(semaineTmp.slice(2, 4)));
                setIdAnnee(parseInt(semaineTmp.slice(0, 2)));
                setDisableCopie(false);
              }
              if ((element.descriptions == currentYear && items.id_semaine <= currentWeek) || element.descriptions != currentYear) {
                let id = element.id_annee.toString() + items.id_semaine.toString();
                typesAnnees.push(
                  <MenuItem key={id} value={id}>
                    Période : {element.descriptions} - {items.id_semaine}
                  </MenuItem>
                );
              } else {
                return;
              }
            }
          });
        }
      });
    }
    return typesAnnees;
  }, [currentWeek, currentYear, getCurrentWeek, tabAnnee, tabSemaine]);

  const handlClickPeriodePreced = useCallback(() => {
    let id_annee = parseInt(semaine.slice(0, 2));
    let nbWeek = parseInt(semaine.slice(2, 4));
    let year;
    if (getTypesAnnees.length > 0) {
      year = parseInt(getTypesAnnees[60].props.value.slice(0, 2));
    }
    addNewPeriode();
    setDisableCopie(false);
    if (nbWeek == 1 && id_annee !== year) {
      nbWeek = 52;
      id_annee = id_annee - 1;
      // dispatch(updatePeriode({ id_annee: id_annee, id_week: nbWeek }));
      let semaineTmp = id_annee.toString() + nbWeek.toString();
      setSemaine(semaineTmp);
      setIdSemaine(semaineTmp.length < 4 ? parseInt(semaineTmp.slice(2, 3)) : parseInt(semaineTmp.slice(2, 4)));
      setIdAnnee(parseInt(semaineTmp.slice(0, 2)));
    } else if (nbWeek != 1) {
      nbWeek = nbWeek - 1;
      // dispatch(updatePeriode({ id_annee: id_annee, id_week: nbWeek }));
      let semaineTmp = id_annee.toString() + nbWeek.toString();
      setSemaine(semaineTmp);
      setIdSemaine(semaineTmp.length < 4 ? parseInt(semaineTmp.slice(2, 3)) : parseInt(semaineTmp.slice(2, 4)));
      setIdAnnee(parseInt(semaineTmp.slice(0, 2)));
    }
  }, [semaine, getTypesAnnees, addNewPeriode, dispatch]);

  const handleClickPeriodeSuivante = useCallback(() => {
    let id_annee = parseInt(semaine.slice(0, 2));
    let nbWeek = parseInt(semaine.slice(2, 4));
    addNewPeriode();
    setDisableCopie(false);
    if (nbWeek == 52 && id_annee !== currentYear) {
      nbWeek = 1;
      id_annee = id_annee + 1;
      // dispatch(updatePeriode({ id_annee: id_annee, id_week: nbWeek }));
      let semaineTmp = id_annee.toString() + nbWeek.toString();
      setSemaine(semaineTmp);
      setIdSemaine(semaineTmp.length < 4 ? parseInt(semaineTmp.slice(2, 3)) : parseInt(semaineTmp.slice(2, 4)));
      setIdAnnee(parseInt(semaineTmp.slice(0, 2)));
    } else if (nbWeek != 52) {
      nbWeek = nbWeek + 1;
      // dispatch(updatePeriode({ id_annee: id_annee, id_week: nbWeek }));
      let semaineTmp = id_annee.toString() + nbWeek.toString();
      setSemaine(semaineTmp);
      setIdSemaine(semaineTmp.length < 4 ? parseInt(semaineTmp.slice(2, 3)) : parseInt(semaineTmp.slice(2, 4)));
      setIdAnnee(parseInt(semaineTmp.slice(0, 2)));
    }
  }, [semaine, addNewPeriode, currentYear, dispatch]);

  const weekNumberToDate = useCallback(() => {
    if (getTypesAnnees.length != 0) {
      let year = '';
      getTypesAnnees.forEach((element) => {
        if (element.props.value == semaine) {
          year = parseInt(element.props.children[1]);
        }
      });
      const weekNumber = semaine.slice(2, 4);
      const startDate = new Date(year, 0, 1);
      const dayOfWeek = startDate.getDay();
      startDate.setDate(startDate.getDate() + (dayOfWeek === 0 ? -6 : 1) + (8 - dayOfWeek));
      const endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + 4);
      startDate.setDate(startDate.getDate() - 1 + (weekNumber - 2) * 7);
      endDate.setDate(endDate.getDate() - 1 + (weekNumber - 2) * 7);
      const formattedStartDate =
        startDate.getDate().toString().padStart(2, '0') +
        '/' +
        (startDate.getMonth() + 1).toString().padStart(2, '0') +
        '/' +
        startDate.getFullYear();

      const formattedEndDate =
        endDate.getDate().toString().padStart(2, '0') +
        '/' +
        (endDate.getMonth() + 1).toString().padStart(2, '0') +
        '/' +
        endDate.getFullYear();
      return semaine.length == 0 ? (
        ''
      ) : (
        <div style={theme.pageTest.periodeText}>
          <p>
            Du {formattedStartDate} Au {formattedEndDate}
          </p>
        </div>
      );
    }
  }, [getTypesAnnees, semaine, theme.pageTest.periodeText]);

  const disablePeriodeSuiv = useCallback(() => {
    let id_annee = semaine.slice(0, 2);
    let nbWeek = semaine.slice(2, 4);
    if (nbWeek == currentWeek && id_annee == tabAnnee[0].id_annee) {
      return true;
    } else {
      return false;
    }
  }, [semaine, currentWeek, tabAnnee]);

  const disablePeriodePrec = useCallback(() => {
    let id_annee = semaine.slice(0, 2);
    let nbWeek = semaine.slice(2, 4);
    if (getTypesAnnees[60]) {
      if (nbWeek == getTypesAnnees[60].props.children[3] && id_annee == getTypesAnnees[60].props.value.slice(0, 2)) {
        return true;
      } else {
        return false;
      }
    }
  }, [semaine, getTypesAnnees]);

  const total = useCallback(() => {
    let total = 0.0;
    let totaltest = 0.0;

    for (let i = 0; i < tabSaisie.length; i++) {
      if (tabSaisie[i].total) {
        if (totaltest > 0 && isNaN(totaltest)) {
          tabSaisie.pop();
        }
        total = total + tabSaisie[i].total;
      }
    }
    if (tabSaisie.length !== 0) {
      return total;
    } else {
      return isNaN(totaltest) ? 0 : totaltest;
    }
  }, [tabSaisie]);

  const openDialogDelete = useCallback(() => {
    setOpenSupSaisie(true);
  }, []);

  const closeDialogDelete = useCallback((event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSupSaisie(false);
  }, []);
  const openDialogDeleteSemaine = useCallback(() => {
    setOpenSupSaisieSemaine(true);
  }, []);

  const closeDialogDeleteSemaine = useCallback((event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSupSaisieSemaine(false);
  }, []);

  // const suppSaisieAll = useCallback(() => {
  //   setCounter(0);
  //   tabSaisie.forEach((element) => {
  //     if (element.id_saisie) {
  //       suppSaisie({
  //         variables: {
  //           id_saisie: element.id_saisie,
  //           id_utilisateur: currentUser.id_utilisateur,
  //         },
  //       });
  //     }
  //   });
  //   let row = {
  //     id: counter,
  //     id_saisie: undefined,
  //     typeProjet: undefined,
  //     projet: undefined,
  //     client: undefined,
  //     lundi: undefined,
  //     mardi: undefined,
  //     mercredi: undefined,
  //     jeudi: undefined,
  //     vendredi: undefined,
  //   };
  //   // dispatch(updateSaisie(row));
  //   addNewPeriode();
  //   setTabContent([row]);
  //   openToast();
  //   setOpenSupSaisie(false);
  // }, [addNewPeriode, counter, currentUser.id_utilisateur, dispatch, openToast, suppSaisie, tabSaisie]);
  // const suppSaisieAllSemaine = useCallback(() => {
  //   setCounter(0);
  //   tabSaisie.forEach((element) => {
  //     if (element.id_saisie) {
  //       suppSaisieSemaine({
  //         variables: {
  //           id_saisie: element.id_saisie,
  //           id_utilisateur: currentUser.id_utilisateur,
  //         },
  //       });
  //     }
  //   });
  //   let row = {
  //     id: counter,
  //     id_saisie: undefined,
  //     typeProjet: undefined,
  //     projet: undefined,
  //     client: undefined,
  //     total: undefined,
  //   };
  //   // dispatch(updateSaisie(row));
  //   addNewPeriode();
  //   setTabContent([row]);
  //   openToast();
  //   setOpenSupSaisieSemaine(false);
  // }, [addNewPeriode, counter, currentUser.id_utilisateur, dispatch, openToast, suppSaisieSemaine, tabSaisie]);

  const onErrorSaisie = useCallback(
    (currentSaisie) => {
      if (total > 45) {
        return true;
      } else {
        return false;
      }
    },
    [total]
  );

  return (
    <>
      <Select value={saisieType} onChange={changeSaisie} style={theme.pageTest.homeTempBouton}>
        <MenuItem value={'jour'}>Employes</MenuItem>
        <MenuItem value={'semaine'}>Client</MenuItem>
      </Select>
      <div style={theme.pageTest.periodContainer}>
        <div style={theme.pageTest.standardFlexContainer}>
          {getTypesAnnees.length > 0 && semaine.length > 0 && (
            <Select value={semaine} sx={theme.pageTest.standardHomeBouton} onChange={changeAnnee}>
              {getTypesAnnees}
            </Select>
          )}
          {getTypesAnnees && weekNumberToDate()}
        </div>
        <div>
          <Button
            onClick={handleClickCopierSemaine}
            disabled={disableCopie}
            sx={disableCopie ? { ...theme.pageTest.standardDisableHomeBouton } : { ...theme.pageTest.standardHomeBouton }}>
            copiée ligne semaine précédente{' '}
          </Button>
        </div>
      </div>
      <Saisie
        idAnnee={idAnnee}
        idSemaine={idSemaine}
        saisieType={saisieType}
        handleClick={() => handlClick}
        total={() => total()}
        openDialogDelete={() => openDialogDelete}
        openDialogDeleteSemaine={() => openDialogDeleteSemaine}
        tabContent={tabContent}
        openSupSaisie={openSupSaisie}
        openSupSaisieSemaine={openSupSaisieSemaine}
        closeDialogDelete={() => closeDialogDelete}
        closeDialogDeleteSemaine={() => closeDialogDeleteSemaine}
        suppSaisieAll={() => ''}
        suppSaisieAllSemaine={() => ''}></Saisie>

      <div style={theme.pageTest.boutonContainerSemaine}>
        <div style={theme.pageTest.standardBoutonContainer}>
          <Button
            onClick={handlClickPeriodePreced}
            disabled={disablePeriodePrec()}
            sx={disablePeriodePrec() ? { ...theme.pageTest.standardDisableHomeBouton } : { ...theme.pageTest.standardHomeBouton }}>
            Semaine précédente
          </Button>
        </div>
        <div style={theme.pageTest.standardContainer}>
          <Button
            onClick={handleClickPeriodeSuivante}
            disabled={disablePeriodeSuiv()}
            sx={disablePeriodeSuiv() ? { ...theme.pageTest.standardDisableHomeBouton } : { ...theme.pageTest.standardHomeBouton }}>
            Semaine Suivante
          </Button>
        </div>
      </div>
    </>
  );
};
export default PageSaisie;
