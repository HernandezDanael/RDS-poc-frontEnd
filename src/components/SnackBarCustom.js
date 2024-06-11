import { Alert, Snackbar } from "@mui/material";
import React, { useImperativeHandle, forwardRef, useCallback } from "react";
import { useReducer } from "react";

// Composant custom pour affichage des snackBar dans l'application

//Pour être utlisier il sufit d'appeler la fonction SnackBar.open()

// Paramètre disponible de la fonction
/*
props : {
    text: String,
    snackbar: Object permet d'override le style de la snackbar voir mui Snackbar pour les paramètres
    style: Object permet de mettre à jour le style du componsant
    picto: Picto/Element mui a mettre à l'interieur
    position: Object -> vertical: String  (value disponible top, bottom) et horizontal: String (value disponible left,rigth, middle)
    duration: Number -> temps d'ouverture de la popup
}
*/

const reducer = (state, action) => {
  if (action.type === "open") {
    return {
      text: action.payload.text ? action.payload.text : "",
      open: true,
      snackbar: action.payload.snackbar ? action.payload.snackbar : {},
      severity: action.payload.severity ? action.payload.severity : "",
      style: action.payload.style ? action.payload.style : {},
      picto: action.payload.picto ? action.payload.picto : null,
      position: action.payload.position
        ? action.payload.position
        : { vertical: "bottom", horizontal: "left" },
      duration: action.payload.duration ? action.payload.duration : 6000,
    };
  }
  if (action.type === "close") {
    return {
      ...state,
      open: false,
    };
  }
};

// eslint-disable-next-line react/display-name
const SnackBarCustomUI = forwardRef((props, ref) => {
  const [config, dispatch] = useReducer(reducer, {
    text: "",
    open: false,
    severity: "",
    style: {},
    picto: null,
    position: { vertical: "bottom", horizontal: "left" },
    duration: "",
  });

  const open = useCallback(
    ({ text, snackbar, severity, style, picto, position, duration }) => {
      dispatch({
        type: "open",
        payload: { text, snackbar, severity, style, picto, position, duration },
      });
    },
    []
  );
  const close = useCallback(() => {
    dispatch({ type: "close" });
  }, []);

  useImperativeHandle(ref, () => ({ open }), [open]);
  return (
    <Snackbar
      anchorOrigin={{
        vertical: config.position.vertical,
        horizontal: config.position.horizontal,
      }}
      open={config.open}
      autoHideDuration={config.duration}
      style={{ ...config.style }}
      sx={{ ...config.snackbar }}
      onClose={
        config.severity === "error"
          ? () => {}
          : () => {
              close();
            }
      }
    >
      <Alert
        sx={{ width: "95vw" }}
        severity={config.severity}
        variant="filled"
        icon={config.picto ? config.picto : <></>}
      >
        {config.text}
      </Alert>
    </Snackbar>
  );
});

let SnackBar = null;
const SnackBarCustom = () => {
  const setRef = useCallback((ref) => {
    if (ref) {
      SnackBar = ref;
    }
  }, []);
  return <SnackBarCustomUI ref={setRef} />;
};

export default SnackBarCustom;
export { SnackBar };
