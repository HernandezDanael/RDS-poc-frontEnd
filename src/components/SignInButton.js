import React, { useCallback, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';

/**
 * Renders a button which, when selected, will open a popup for login
 */
export const SignInButton = () => {
  
  const [opendDialogConnectionBool, setOpenDialogConnectonBool] = useState(false)

  const handleClick = useCallback(()=>{
    setOpenDialogConnectonBool(true)
  },[])

  const handleClose = useCallback((event, reason)=>{
    if (reason === 'clickaway'){
      return
    }setOpenDialogConnectonBool(false)
  },[])

  return (
    <>
    <Button
      onClick={handleClick}
      sx={{ backgroundColor: '#2f2f2f' }}
      style={{
        cursor: 'pointer',
        textTransform: 'none',
        borderRadius: 0,
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: '64px',
        width: '200px',
        fontSize: '20px',
      }}
      variant="contained">
      <img style={{ height: '34px' }} src={'logords.png'} alt="buttonConnexion"></img>
      Connexion
    </Button>
    <Dialog
    open={opendDialogConnectionBool}
    onClose={handleClose}
    >
      <DialogTitle>
      Connexion
      </DialogTitle>
      <DialogContent>
        <div style={{display: 'flex', flexDirection:'column'}}>
        <TextField>

        </TextField>
        <TextField style={{marginTop: '8px'}}>

        </TextField></div>
      </DialogContent>
      <DialogActions>
      <Button sx={{minWidth: '150px',
          height: '32px',
          borderRadius: '8px',
          backgroundColor:' #006689',
          color: '#ffffff',
          textTransform: 'none',
          boxShadow: '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)',
          '&:hover': {
            color: '#000',
          },}}>
        confirmer     
      </Button>
      <Button sx={{minWidth: '150px',
          height: '32px',
          borderRadius: '8px',
          backgroundColor: ' #006689',
          color: '#ffffff',
          textTransform: 'none',
          boxShadow: '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)',
          '&:hover': {
            color: '#000',
          },}}> 
        Annuler    
      </Button>
      </DialogActions>

    </Dialog>
    </>
  );
};
