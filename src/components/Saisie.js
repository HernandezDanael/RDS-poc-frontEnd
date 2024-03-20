import {
  Button,
  useTheme,
  Accordion,
  AccordionDetails,
  Typography,
  AccordionSummary,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  InputLabel,
} from '@mui/material';
import React, { useCallback, useMemo, useState } from 'react';
import Tab from './Tab';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const Saisie = ({
  idAnnee,
  idSemaine,
  saisieType,
  handleClick,
  openDialogDelete,
  tabContent,
  openSupSaisie,
  total,
  closeDialogDelete,
  suppSaisieAll,
  suppSaisieAllSemaine,
  openDialogDeleteSemaine,
  closeDialogDeleteSemaine,
  openSupSaisieSemaine,
}) => {
  const theme = useTheme();
  const [error, setError] = useState(false);

  const onErrorSaisie = useCallback(
    (currentSaisie) => {
      let totalTemp = total();
      if (saisieType == 'semaine') {
        tabContent.forEach((element) => {
          if (element.id == currentSaisie.id && element.id_saisie != undefined) {
            totalTemp = totalTemp - element.total;
          }
        });
        if (totalTemp > 45 || totalTemp + parseFloat(currentSaisie.value) > 45) {
          setError(true);
          return true;
        } else {
          setError(false);
          return false;
        }
      } else {
        let lundi = currentSaisie.lundi != undefined ? (currentSaisie.lundi != '' ? parseFloat(currentSaisie.lundi) : 0) : 0;
        let mardi = currentSaisie.mardi != undefined ? (currentSaisie.mardi != '' ? parseFloat(currentSaisie.mardi) : 0) : 0;
        let mercredi = currentSaisie.mercredi != undefined ? (currentSaisie.mercredi != '' ? parseFloat(currentSaisie.mercredi) : 0) : 0;
        let jeudi = currentSaisie.jeudi != undefined ? (currentSaisie.jeudi != '' ? parseFloat(currentSaisie.jeudi) : 0) : 0;
        let vendredi = currentSaisie.vendredi != undefined ? (currentSaisie.vendredi != '' ? parseFloat(currentSaisie.vendredi) : 0) : 0;
        tabContent.forEach((element) => {
          if (element.id == currentSaisie.id && element.id_saisie != undefined) {
            totalTemp = totalTemp - element.total;
          }
        });
        if (totalTemp > 45 || totalTemp + lundi + mardi + mercredi + jeudi + vendredi > 45) {
          setError(true);
          return true;
        } else {
          setError(false);
          return false;
        }
      }
    },
    [saisieType, tabContent, total]
  );

  const headerAccordion = useMemo(() => {
    if (saisieType == 'semaine') {
      return (
        <>
          <AccordionSummary style={theme.pageTest.accordeonCursor}>
            <div style={theme.pageTest.standardContainerHeaderAccord}>
              <div style={theme.pageTest.standardFlexContainer}>Saisie Semaine</div>
              <div>Total : {total()}H</div>
            </div>
          </AccordionSummary>
          <div style={theme.pageTest.standardLabelContainer}>
            <InputLabel sx={{ width: '100%' }}>
              <div style={theme.pageTest.standardHeadLabelContainer}>
                <div style={theme.pageTest.accordContainerSemaine}>Type de projet</div>
                <div style={theme.pageTest.accordContainerSemaine}>Projet</div>
                <div style={theme.pageTest.accordContainerSemaine}>Client</div>
                <div style={theme.pageTest.accordContainerSemaine}>Tâche</div>
                <div style={theme.pageTest.accordSemaineContainer}>Total Heure</div>
              </div>
            </InputLabel>
            <Button sx={{ ...theme.pageTest.trashBoutonHeader }} onClick={openDialogDeleteSemaine()}>
              <DeleteForeverIcon />
            </Button>
          </div>
        </>
      );
    } else {
      return (
        <>
          <AccordionSummary style={theme.pageTest.accordeonCursor}>
            <div style={theme.pageTest.standardContainerHeaderAccord}>
              <div style={theme.pageTest.standardFlexContainer}>Saisie Jour</div>
              <div>Total : {total()}H</div>
            </div>
          </AccordionSummary>
          <div style={theme.pageTest.standardLabelContainer}>
            <InputLabel sx={{ width: '100%' }}>
              <div style={theme.pageTest.standardHeadLabelContainer}>
                <div style={theme.pageTest.accordContainer}>Type de projet</div>
                <div style={theme.pageTest.accordContainer}>Projet</div>
                <div style={theme.pageTest.accordContainer}>Client</div>
                <div style={theme.pageTest.accordContainer}>Tâche</div>
                <div style={theme.pageTest.accordDayContainer}>Lundi</div>
                <div style={theme.pageTest.accordDayContainer}>Mardi </div>
                <div style={theme.pageTest.accordDayContainer}>Mercredi </div>
                <div style={theme.pageTest.accordDayContainer}>Jeudi</div>
                <div style={theme.pageTest.accordDayContainer}>Vendredi</div>
              </div>
            </InputLabel>
            <Button sx={{ ...theme.pageTest.trashBoutonHeader }} onClick={openDialogDelete()}>
              <DeleteForeverIcon />
            </Button>
          </div>
        </>
      );
    }
  }, [
    openDialogDelete,
    openDialogDeleteSemaine,
    saisieType,
    theme.pageTest.accordContainer,
    theme.pageTest.accordContainerSemaine,
    theme.pageTest.accordDayContainer,
    theme.pageTest.accordSemaineContainer,
    theme.pageTest.accordeonCursor,
    theme.pageTest.standardContainerHeaderAccord,
    theme.pageTest.standardFlexContainer,
    theme.pageTest.standardHeadLabelContainer,
    theme.pageTest.standardLabelContainer,
    theme.pageTest.trashBoutonHeader,
    total,
  ]);

  const dataTab = useMemo(() => {
    
      return tabContent.map((element) => (
        <Tab
          key={element.id}
          id={element.id}
          id_annee={idAnnee}
          id_semaine={idSemaine}
          id_saisie={element.id_saisie}
          typeProjet={element.typeProjet}
          projet={element.projet}
          client={element.client}
          tache={element.tache}
          lundi={element.lundi}
          mardi={element.mardi}
          mercredi={element.mercredi}
          jeudi={element.jeudi}
          vendredi={element.vendredi}
          total={element.total}
          onErrorSaisie={(currentSaisie) => onErrorSaisie(currentSaisie)}
          error={error}></Tab>
      ));
    
  }, [error, idAnnee, idSemaine, onErrorSaisie, saisieType, tabContent]);
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
                    {dataTab}
                    <Typography>
                      <div style={theme.pageTest.standardContainer}>
                        <div style={theme.pageTest.standardFlexContainer}>
                          <Button sx={theme.pageTest.standarddHomeBouton} onClick={handleClick()}>
                            Ajouter une saisie
                          </Button>
                        </div>
                      </div>
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                <Dialog
                  open={openSupSaisieSemaine}
                  onClose={closeDialogDeleteSemaine}
                  aria-labelledby="alert-dialog-deleteSaisie"
                  aria-describedby="alert-dialog-deleteSaisie">
                  <DialogTitle id="dialog-deleteAllsaisie">Suppression des saisies</DialogTitle>
                  <DialogContent>Êtes vous sûr de vouloir supprimer toutes les saisies ?</DialogContent>
                  <DialogActions>
                    <Button onClick={suppSaisieAllSemaine()}>Confirmer</Button>
                    <Button onClick={closeDialogDeleteSemaine()}>Annuler</Button>
                  </DialogActions>
                </Dialog>

                <Dialog
                  open={openSupSaisie}
                  onClose={closeDialogDelete}
                  aria-labelledby="alert-dialog-deleteSaisie"
                  aria-describedby="alert-dialog-deleteSaisie">
                  <DialogTitle id="dialog-deleteAllsaisie">Suppression des saisies</DialogTitle>
                  <DialogContent>Êtes vous sûr de vouloir supprimer toutes les saisies ?</DialogContent>
                  <DialogActions>
                    <Button onClick={suppSaisieAll()}>Confirmer</Button>
                    <Button onClick={closeDialogDelete()}>Annuler</Button>
                  </DialogActions>
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
