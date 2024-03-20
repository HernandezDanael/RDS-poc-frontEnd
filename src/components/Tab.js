import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { TextField, useTheme, NativeSelect, Button, Dialog, DialogTitle, DialogActions, DialogContentText } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
// import { suppSaisie, updateSaisie } from '../assets/feature/SaisieReduceur';
// import { useMutation, useQuery } from '@apollo/client';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const Tab = (props) => {
  const theme = useTheme();
  const populate = useSelector((state) => state.populate.value);
  const copie = useSelector((state) => state.copieSaisie.value);

  //les tableaux des données
  const [tabTypeProjet, setTabTypeProjet] = useState([]);
  const [tabProjet, setTabProjet] = useState([]);
  const [tabClient, setTabClient] = useState([]);
  const [tabTache, setTabTache] = useState([]);

  //les infos lignes
  const [typeProjet, setTypeProjet] = useState(props.typeProjet);
  const [projet, setProjet] = useState(props.projet);
  const [client, setClient] = useState(props.client);
  const [tache, setTache] = useState(props.tache);
  const [lundi, setLundi] = useState(props.lundi);
  const [mardi, setMardi] = useState(props.mardi);
  const [mercredi, setMercredi] = useState(props.mercredi);
  const [jeudi, setJeudi] = useState(props.jeudi);
  const [vendredi, setVendredi] = useState(props.vendredi);

  const [openSupSaisie, setOpenSupSaisie] = useState(false);
  const dispatch = useDispatch();

  const getTypeProjet = useMemo(() => {
    const tabtp = [];
    tabTypeProjet.forEach((element) => {
      if (tabtp.length <= 0) {
        tabtp.push(<option key="" aria-label="None" value="" />);
      }
      tabtp.push(
        <option style={{ ...theme.pageTest.selectFontColor }} key={element.id_type_projet} value={element.id_type_projet}>
          {element.descriptions}
        </option>
      );
    });
    return tabtp;
  }, [tabTypeProjet, theme.pageTest.selectFontColor]);

  const getProjet = useMemo(() => {
    const tabtp = [];
    tabProjet.forEach((element) => {
      if (element.id_type_projet == typeProjet) {
        if (tabtp.length <= 0) {
          tabtp.push(<option key="" aria-label="None" value="" />);
        }
        tabtp.push(
          <option sx={{ ...theme.pageTest.selectFontColor }} key={element.id_projet} value={element.id_projet}>
            {element.cause}
          </option>
        );
      }
    });
    return tabtp;
  }, [tabProjet, theme.pageTest.selectFontColor, typeProjet]);

  const getClient = useMemo(() => {
    const tabtp = [];
    tabClient.forEach((items) => {
      if (tabtp.length <= 0) {
        tabtp.push(<option key="" aria-label="None" value="" />);
      }
      tabtp.push(
        <option sx={{ ...theme.pageTest.selectFontColor }} key={items.id_client} value={items.id_client}>
          {items.client}
        </option>
      );
    });
    return tabtp;
  }, [tabClient, theme.pageTest.selectFontColor]);

  const getTache = useMemo(() => {
    const tabtp = [];
    tabTache.forEach((element) => {
      if (element.id_type_projet == typeProjet) {
        if (tabtp.length <= 0) {
          tabtp.push(<option key="" aria-label="None" value="" />);
        }
        tabtp.push(
          <option sx={{ ...theme.pageTest.selectFontColor }} key={element.id_tache} value={element.id_tache}>
            {element.descriptions}
          </option>
        );
      }
    });
    return tabtp;
  }, [tabTache, theme.pageTest.selectFontColor, typeProjet]);

  const onBlurSaisie = useCallback(
    (event) => {
    //   if (
    //     typeof typeProjet == 'number' &&
    //     typeof projet == 'number' &&
    //     typeof client == 'number' &&
    //     typeof tache == 'number'
    //   ) {
    //     props.onErrorSaisie({ id: props.id, lundi: lundi, mardi: mardi, mercredi: mercredi, jeudi: jeudi, vendredi: vendredi });
    //     if (
    //       !isNaN(lundi) ||
    //       !isNaN(mardi) ||
    //       !isNaN(mercredi) ||
    //       !isNaN(jeudi) ||
    //       !isNaN(vendredi)
    //     ) {
    //       addupdateSaisie();
    //     }
    //   }
    },
    [
    ]
  );
  useEffect(() => {
    if (populate === 'lastSaisie') {
      setTypeProjet('');
      setProjet('');
      setClient('');
      setTache('');
      setLundi('');
      setMardi('');
      setMercredi('');
      setJeudi('');
      setVendredi('');

      // dispatch(
      //   updateSaisie({
      //     id: props.id,
      //     typeProjet: typeProjet,
      //     projet: projet,
      //     client: client,
      //     tache: tache,
      //     lundi: lundi,
      //     mardi: mardi,
      //     mercredi: mercredi,
      //     jeudi: jeudi,
      //     vendredi: vendredi,
      //   })
      // );
      // dispatch(updatePopulate(''));
    }
  }, [
    client,
    copie,
    dispatch,
    jeudi,
    lundi,
    mardi,
    mercredi,
    populate,
    projet,
    props,
    props.client,
    props.id,
    props.projet,
    props.tache,
    props.typeProjet,
    tache,
    typeProjet,
    vendredi,
  ]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getNextField = (currentField) => {
    switch (currentField) {
      case 'typeProjet':
        return 'projet' + props.id;
      case 'projet':
        return 'client' + props.id;
      case 'client':
        return 'tache' + props.id;
      case 'tache':
        return 'lundi' + props.id;
      case 'lundi':
        return 'mardi' + props.id;
      case 'mardi':
        return 'mercredi' + props.id;
      case 'mercredi':
        return 'jeudi' + props.id;
      case 'jeudi':
        return 'vendredi' + props.id;
      case 'vendredi':
        return 'typeProjet' + props.id;

      default:
        return null;
    }
  };
  const handleEnter = useCallback(
    (event, currentField) => {
      if (event.key === 'Enter') {
        const nextField = getNextField(currentField);
        if (nextField) {
          document.getElementById(nextField).focus();
        }
      }
    },
    [getNextField]
  );
  const handleChangeTypeProjet = useCallback(
    (event) => {
      // dispatch(
      //   updateSaisie({
      //     id: props.id,
      //     typeProjet: event.target.value,
      //     projet: projet,
      //     client: client,
      //     tache: tache,
      //     lundi: lundi,
      //     mardi: mardi,
      //     mercredi: mercredi,
      //     jeudi: jeudi,
      //     vendredi: vendredi,
      //   })
      // );
      setTypeProjet(parseInt(event.target.value));
      setProjet('');
      setClient('');
      setTache('');
    },
    [dispatch, props.id, projet, client, tache, lundi, mardi, mercredi, jeudi, vendredi]
  );

  const handleChangeProjet = useCallback(
    (event) => {
      // dispatch(
      //   updateSaisie({
      //     id: props.id,
      //     typeProjet: typeProjet,
      //     projet: event.target.value,
      //     client: client,
      //     tache: tache,
      //     lundi: lundi,
      //     mardi: mardi,
      //     mercredi: mercredi,
      //     jeudi: jeudi,
      //     vendredi: vendredi,
      //   })
      // );

      setProjet(parseInt(event.target.value));
      setClient('');
    },
    [dispatch, props.id, typeProjet, client, tache, lundi, mardi, mercredi, jeudi, vendredi]
  );

  const handleChangeClient = useCallback(
    (event) => {
      // dispatch(
      //   updateSaisie({
      //     id: props.id,
      //     typeProjet: typeProjet,
      //     projet: projet,
      //     client: event.target.value,
      //     tache: tache,
      //     lundi: lundi,
      //     mardi: mardi,
      //     mercredi: mercredi,
      //     jeudi: jeudi,
      //     vendredi: vendredi,
      //   })
      // );
      setClient(parseInt(event.target.value));
      setTache('');
    },
    [dispatch, props.id, typeProjet, projet, tache, lundi, mardi, mercredi, jeudi, vendredi]
  );

  const handleChangeTache = useCallback(
    (event) => {
      // dispatch(
      //   updateSaisie({
      //     id: props.id,
      //     typeProjet: typeProjet,
      //     projet: projet,
      //     client: client,
      //     tache: event.target.value,
      //     lundi: lundi,
      //     mardi: mardi,
      //     mercredi: mercredi,
      //     jeudi: jeudi,
      //     vendredi: vendredi,
      //   })
      // );
      setTache(parseInt(event.target.value));
    },
    [dispatch, props.id, typeProjet, projet, client, lundi, mardi, mercredi, jeudi, vendredi]
  );

  const handleChangeLundi = useCallback(
    (event) => {
      const regex = new RegExp('^(?:[0-9]\\d?|)(?:[.,]\\d?)?$');
      let verif = event.target.value;
      if (regex.test(verif)) {
        setLundi(event.target.value);
        if (props.onErrorSaisie({ id: props.id, value: event.target.value }) == false) {
          // dispatch(
          //   updateSaisie({
          //     id: props.id,

          //     typeProjet: typeProjet,
          //     projet: projet,
          //     client: client,
          //     tache: tache,
          //     lundi: parseFloat(event.target.value),
          //     mardi: mardi,
          //     mercredi: mercredi,
          //     jeudi: jeudi,
          //     vendredi: vendredi,
          //   })
          // );
        }
      } else {
        lundi != undefined ? (lundi != '' ? setLundi(lundi) : setLundi('')) : setLundi('');
      }
    },
    [client, dispatch, jeudi, lundi, mardi, mercredi, projet, props, tache, typeProjet, vendredi]
  );

  const handleChangeMardi = useCallback(
    (event) => {
      const regex = new RegExp('^(?:[0-9]\\d?|)(?:[.,]\\d?)?$');
      let verif = event.target.value;
      if (regex.test(verif)) {
        setMardi(event.target.value);
        if (props.onErrorSaisie({ id: props.id, value: event.target.value }) == false) {
          // dispatch(
          //   updateSaisie({
          //     id: props.id,

          //     typeProjet: typeProjet,
          //     projet: projet,
          //     client: client,
          //     tache: tache,
          //     lundi: lundi,
          //     mardi: parseFloat(event.target.value),
          //     mercredi: mercredi,
          //     jeudi: jeudi,
          //     vendredi: vendredi,
          //   })
          // );
        }
      } else {
        mardi != undefined ? (mardi != '' ? setMardi(mardi) : setMardi('')) : setMardi('');
      }
    },
    [client, dispatch, jeudi, lundi, mardi, mercredi, projet, props, tache, typeProjet, vendredi]
  );

  const handleChangeMercredi = useCallback(
    (event) => {
      const regex = new RegExp('^(?:[0-9]\\d?|)(?:[.,]\\d?)?$');
      let verif = event.target.value;
      if (regex.test(verif)) {
        setMercredi(event.target.value);
        if (props.onErrorSaisie({ id: props.id, value: event.target.value }) == false) {
          // dispatch(
          //   updateSaisie({
          //     id: props.id,

          //     typeProjet: typeProjet,
          //     projet: projet,
          //     client: client,
          //     tache: tache,
          //     lundi: lundi,
          //     mardi: mardi,
          //     mercredi: parseFloat(event.target.value),
          //     jeudi: jeudi,
          //     vendredi: vendredi,
          //   })
          // );
        }
      } else {
        mercredi != undefined ? (mercredi != '' ? setMercredi(mercredi) : setMercredi('')) : setMercredi('');
      }
    },
    [client, dispatch, jeudi, lundi, mardi, mercredi, projet, props, tache, typeProjet, vendredi]
  );

  const handleChangeJeudi = useCallback(
    (event) => {
      const regex = new RegExp('^(?:[0-9]\\d?|)(?:[.,]\\d?)?$');
      let verif = event.target.value;
      if (regex.test(verif)) {
        setJeudi(event.target.value);
        if (props.onErrorSaisie({ id: props.id, value: event.target.value }) == false) {
          // dispatch(
          //   updateSaisie({
          //     id: props.id,

          //     typeProjet: typeProjet,
          //     projet: projet,
          //     client: client,
          //     tache: tache,
          //     lundi: lundi,
          //     mardi: mardi,
          //     mercredi: mercredi,
          //     jeudi: parseFloat(event.target.value),
          //     vendredi: vendredi,
          //   })
          // );
        }
      } else {
        jeudi != undefined ? (jeudi != '' ? setJeudi(jeudi) : setJeudi('')) : setJeudi('');
      }
    },
    [client, dispatch, jeudi, lundi, mardi, mercredi, projet, props, tache, typeProjet, vendredi]
  );

  const handleChangeVendredi = useCallback(
    (event) => {
      const regex = new RegExp('^(?:[0-9]\\d?|)(?:[.,]\\d?)?$');
      let verif = event.target.value;
      if (regex.test(verif)) {
        setVendredi(event.target.value);
        if (props.onErrorSaisie({ id: props.id, value: event.target.value }) == false) {
          // dispatch(
          //   updateSaisie({
          //     id: props.id,
          //     typeProjet: typeProjet,
          //     projet: projet,
          //     client: client,
          //     tache: tache,
          //     lundi: lundi,
          //     mardi: mardi,
          //     mercredi: mercredi,
          //     jeudi: jeudi,
          //     vendredi: parseFloat(event.target.value),
          //   })
          // );
        }
      } else {
        vendredi != undefined ? (vendredi != '' ? setVendredi(vendredi) : setVendredi('')) : setVendredi('');
      }
    },
    [client, dispatch, jeudi, lundi, mardi, mercredi, projet, props, tache, typeProjet, vendredi]
  );

  const suppOneSaisie = useCallback(() => {
    // dispatch(suppSaisie({ id: props.id }));
    // dispatch(updatePopulate('suppSaisie'));
    setOpenSupSaisie(false);
  }, [dispatch, props]);

  const openDialogDelete = useCallback(() => {
    setOpenSupSaisie(true);
  }, []);

  const closeDialogDelete = useCallback((event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSupSaisie(false);
  }, []);

  return (
    <div style={theme.pageTest.standardTabContainer}>
      <div style={theme.pageTest.standardSelectContainerJourn}>
        <div style={theme.pageTest.standardSelectContainer}>
          <div style={theme.pageTest.accordSelectContainer}>
            {getTypeProjet.length > 0 && (
              <NativeSelect
                id={'typeProjet' + props.id}
                style={theme.pageTest.inputValue}
                value={typeProjet}
                onChange={handleChangeTypeProjet}
                onBlur={onBlurSaisie}
                onKeyDown={(event) => {
                  handleEnter(event, 'typeProjet');
                }}>
                {getTypeProjet}
              </NativeSelect>
            )}
          </div>
        </div>
        <div style={theme.pageTest.standardSelectContainer}>
          <div style={theme.pageTest.accordSelectContainer}>
            {getTypeProjet.length > 0 && (
              <NativeSelect
                id={'projet' + props.id}
                style={theme.pageTest.inputValue}
                value={projet}
                onChange={handleChangeProjet}
                onBlur={onBlurSaisie}
                onKeyDown={(event) => {
                  handleEnter(event, 'projet');
                }}>
                {getProjet}
              </NativeSelect>
            )}
          </div>
        </div>
        <div style={theme.pageTest.standardSelectContainer}>
          <div style={theme.pageTest.accordSelectContainer}>
            {getTypeProjet.length > 0 && (
              <NativeSelect
                id={'client' + props.id}
                style={theme.pageTest.inputValue}
                value={client}
                onChange={handleChangeClient}
                onBlur={onBlurSaisie}
                onKeyDown={(event) => {
                  handleEnter(event, 'client');
                }}>
                {getProjet.length > 0 && projet != '' ? getClient : ''}
              </NativeSelect>
            )}
          </div>
        </div>
        <div style={theme.pageTest.standardSelectContainer}>
          <div style={theme.pageTest.accordSelectContainer}>
            {getTypeProjet.length > 0 && (
              <NativeSelect
                id={'tache' + props.id}
                style={theme.pageTest.inputValue}
                value={tache}
                onChange={handleChangeTache}
                onBlur={onBlurSaisie}
                onKeyDown={(event) => {
                  handleEnter(event, 'tache');
                }}>
                {getClient.length > 0 && client != '' ? getTache : ''}
              </NativeSelect>
            )}
          </div>
        </div>
        <div style={theme.pageTest.standardSelectDay}>
          <div style={theme.pageTest.accordSelectContainer}>
            <TextField
              id={'lundi' + props.id}
              variant="standard"
              value={lundi}
              onChange={handleChangeLundi}
              onBlur={onBlurSaisie}
              error={props.error}
              onKeyDown={(event) => {
                handleEnter(event, 'lundi');
              }}
              sx={props.error ? { input: theme.pageTest.standardError } : {}}
            />
          </div>
        </div>
        <div style={theme.pageTest.standardSelectDay}>
          <div style={theme.pageTest.accordSelectContainer}>
            <TextField
              id={'mardi' + props.id}
              variant="standard"
              value={mardi}
              onChange={handleChangeMardi}
              onBlur={onBlurSaisie}
              error={props.error}
              onKeyDown={(event) => {
                handleEnter(event, 'mardi');
              }}
              sx={props.error ? { input: theme.pageTest.standardError } : {}}
            />
          </div>
        </div>
        <div style={theme.pageTest.standardSelectDay}>
          <div style={theme.pageTest.accordSelectContainer}>
            <TextField
              id={'mercredi' + props.id}
              variant="standard"
              value={mercredi}
              onChange={handleChangeMercredi}
              onBlur={onBlurSaisie}
              error={props.error}
              onKeyDown={(event) => {
                handleEnter(event, 'mercredi');
              }}
              sx={props.error ? { input: theme.pageTest.standardError } : {}}
            />
          </div>
        </div>
        <div style={theme.pageTest.standardSelectDay}>
          <div style={theme.pageTest.accordSelectContainer}>
            <TextField
              id={'jeudi' + props.id}
              variant="standard"
              value={jeudi}
              onChange={handleChangeJeudi}
              onBlur={onBlurSaisie}
              error={props.error}
              onKeyDown={(event) => {
                handleEnter(event, 'jeudi');
              }}
              sx={props.error ? { input: theme.pageTest.standardError } : {}}
            />
          </div>
        </div>
        <div style={theme.pageTest.standardSelectDay}>
          <div style={theme.pageTest.accordSelectContainer}>
            <TextField
              id={'vendredi' + props.id}
              variant="standard"
              value={vendredi}
              onChange={handleChangeVendredi}
              onBlur={onBlurSaisie}
              error={props.error}
              onKeyDown={(event) => {
                handleEnter(event, 'vendredi');
              }}
              sx={props.error ? { input: theme.pageTest.standardError } : {}}
            />
          </div>
        </div>
        <Button style={theme.pageTest.trashBouton} onClick={openDialogDelete}>
          <DeleteForeverIcon />
        </Button>
      </div>

      <Dialog
        open={openSupSaisie}
        onClose={closeDialogDelete}
        aria-labelledby="alert-dialog-deleteSaisie"
        aria-describedby="alert-dialog-deleteSaisie">
        <DialogTitle id="dialog-deleteAllsaisie">Suppression de saisie</DialogTitle>
        <DialogContentText style={theme.popup.text}>Êtes vous sûr de vouloir supprimer cette saisie ?</DialogContentText>
        <DialogActions>
          <Button sx={theme.pageTest.standardHomeBouton} onClick={suppOneSaisie}>
            Confirmer
          </Button>
          <Button sx={theme.pageTest.standardHomeBouton} onClick={closeDialogDelete}>
            Annuler
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default Tab;
