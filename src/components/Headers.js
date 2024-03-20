import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme, Select, MenuItem } from '@mui/material';
import React, { useState, useCallback, useEffect } from 'react';
import { updateTheme } from '../assets/feature/ThemeReducer';

const Headers = ({ setIsChangeTheme }) => {
  const theme = useTheme();
  const { theme: themeSet } = useSelector((state) => state.theme.value);
  // const currentUser = useSelector((state) => state.currentUser.value);

  const dispatch = useDispatch();

  const [image, setImage] = useState('/dodo1.png');

  const changeTheme = useCallback(
    (event) => {
      dispatch(updateTheme({ theme: event.target.value }));
      setIsChangeTheme(true);
    },
    [dispatch, setIsChangeTheme]
  );

  // useEffect(() => {
  //   if (currentUser && currentUser.image && currentUser != '') {
  //     setImage(currentUser.image);
  //   }
  // }, [currentUser]);

  return (
    <div style={theme.pageTest.banerContainer}>
      <div style={theme.pageTest.container}>
        <div>{<img src={image} style={theme.pageTest.imageStyle} alt={"photoprofil"}/>}</div>
        <div style={theme.pageTest.banerFlexContainer1}>
          <p style={theme.pageTest.textStyle}>
            HERNANDEZ Danael
          </p>
        </div>
        <div style={theme.pageTest.banerFlexContainer2}>
          <p style={theme.pageTest.titleStyle}>Reservation des salles</p>
        </div>
        <div style={theme.pageTest.banerflexContainer3}>
          <Select
            defaultValue={1}
            sx={theme.pageTest.standardHomeBouton}
            id="theme"
            autoWidth
            value={themeSet}
            size={'small'}
            onChange={changeTheme}>
            <MenuItem value={'dark'} size="small">
              <div style={theme.pageTest.themeChangeStyle}>
                <DarkModeIcon sx={theme.pageTest.sxThemeChange}></DarkModeIcon>
                <div style={theme.pageTest.themeChange}>dark</div>
              </div>
            </MenuItem>
            <MenuItem value={'light'} size="small">
              <div style={theme.pageTest.themeChangeStyle}>
                <LightModeIcon sx={theme.pageTest.sxThemeChange}></LightModeIcon>
                <div style={theme.pageTest.themeChange}>light</div>
              </div>
            </MenuItem>
          </Select>
        </div>
      </div>
    </div>
  );
};
export default Headers;
