import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormGroup, InputLabel, useTheme } from '@mui/material';
import React from 'react';

const DialogErrors = ({ open, onClose, errorMessage }) => {
  const theme = useTheme();

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="dialog-Erreur" aria-describedby="dialog-description">
      <DialogTitle id="dialog-Erreur">Erreur</DialogTitle>
      <DialogContent dividers>
        <FormControl component="fieldset" variant="standard" sx={theme.accueil.formControl}>
          <FormGroup sx={theme.accueil.formGroup}>
            <div style={theme.accueil.containerFormGroup}>
              <InputLabel sx={theme.popup.inputLabelDialog} id="tentPLabel">
                <div style={{ maxWidth: '100%', display: 'block', overflowWrap: 'break-word' }}>
                  <div>Impossible de réaliser l&apos;action : </div>
                  <div style={{ color: 'red', overflowWrap: 'break-word', whiteSpace: 'normal' }}>{errorMessage}</div>
                </div>
              </InputLabel>
            </div>
          </FormGroup>
        </FormControl>
      </DialogContent>
      <DialogActions sx={theme.popup.dialogActions}>
        <Button onClick={onClose} sx={theme.popup.buttonPopUp}>
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogErrors;
