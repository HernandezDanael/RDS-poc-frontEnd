const getDefaultThemeAbstarct = (variables) => {
  return {
    accueil: {
      formControl: { width: "100%" },
      formGroup: {
        display: "flex",
        flexWrap: "wrap",
        width: "100%",
        flexDirection: "row",
      },
      containerFormGroup: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        border: "1px solid",
        borderRadius: "4px",
        padding: "8px",
      },
    },
    mainContainer: {
      display: "flex",
      flexDirection: "column",
      width: "calc(100% - 300px)",
    },
    mainContainerWithoutMenu: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
    },
    popup: {
      text: {
        padding: "0 12px",
      },
      inputLabelDialog: {
        position: "relative",
        transform: "none",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        maxWidth: "100%",
      },
      dialogActions: { display: "flex", justifyContent: "space-between" },
      buttonPopUp: {
        boxShadow: variables.palette.boxShadow.default,
        backgroundColor: variables.palette.buttonpopup.default,
        color: variables.palette.text.primary,
        width: "100%",
        textTransform: "none",
      },
      buttonDisabled: {
        color: "rgba(255, 255, 255, 0.3)",
        boxShadow: "none",
        backgroundColor: "rgba(255, 255, 255, 0.12)",
      },
    },
    pageTest: {
      inputValue: {
        backgroundColor: variables.palette.surfaceVariant.main,
      },
      accordContainer: {
        display: "flex",
        width: "100%",
        flex: 2,
        flexDirection: "column",
        justifyContent: "center",
      },
      accordContainerSemaine: {
        display: "flex",
        flex: 2,
        width: "100%",
        flexDirection: "column",
        justifyContent: "center",
      },
      accordDayContainer: {
        width: "100%",
        display: "flex",
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
      },
      accordSemaineContainer: {
        width: "100%",
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      },
      standardContainer: {
        display: "flex",
        flexDirection: "row",
      },
      standardContainerSemaine: {
        display: "flex",
        flexDirection: "row",
        marginBottom: "8px",
      },
      themeChange: {
        textOverflow: "ellipsis",
        overflow: "hidden",
        wordBreak: "break-word",
        marginLeft: "2px",
      },
      standardTabContainer: {
        display: "flex",
        flexDirection: "column",
        marginBottom: "16px",
      },
      standardContainerHeaderAccord: {
        display: "flex",
        flexDirection: "row",
        flex: "1",
        fontFamily: variables.typography.fontFamily,
      },

      standardBoutonContainer: {
        display: "flex",
        flexDirection: "row",
        marginRight: "8px",
      },
      standardFlexContainer: {
        display: "flex",
        flex: "1",
        flexDirection: "row",
      },

      periodContainer: {
        width: "68%",
        display: "flex",
        paddingTop: "5%",
        flexDirection: "row",
        marginLeft: "16%",
      },
      colorstandardContainer: {
        backgroundColor: variables.palette.surfaceVariant.main,
        borderRadius: "0px 0px 15px 15px",
        padding: "8px 16px 10px",
      },
      standardLabelContainer: {
        display: "flex",
        flexWrap: "nowrap",
        flexDirection: "row",
        padding: "8px 16px 16px",
      },
      standardHeadLabelContainer: {
        display: "flex",
        width: "100%",
      },
      standardSemaineHeadLabelContainer: {
        display: "flex",
        flexDirection: "row",
      },
      standardSelectContainer: {
        width: "100%",
        flex: 2,
        display: "flex",
      },
      standardSelectContainerJourn: {
        width: "100%",
        display: "flex",
      },
      standardSelectDay: {
        width: "100%",
        display: "flex",
        flex: "1",
      },
      accordSelectContainerButton: {
        width: "100%",
        display: "flex",
        flex: "0.2",
      },
      standardSelectVDay: {
        width: "100%",
        display: "flex",
        flex: "1",
        padding: "0px 10px 0px 0px",
      },
      standardLastSelectContainer: {
        width: "100%",
        display: "flex",
        flex: "1",
      },
      banerContainer: {
        height: "96px",
        width: "100%",
        display: "flex",
        flexDirection: "row",
        backgroundColor: variables.palette.surfaceVariant.main,
      },
      bodyContainer: {
        display: "flex",
        flexDirection: "row",
        backgroundColor: variables.palette.background.main,
      },
      banerFlexContainer1: {
        flex: "1.5",
        alignItems: "center",
        display: "flex",
      },
      banerflexContainer3: {
        flex: "1",
        alignItems: "center",
        display: "flex",
        justifyContent: "end",
        paddingRight: "16px",
      },
      banerFlexContainer2: {
        flex: "1",
        alignItems: "center",
        display: "flex",
      },
      titleStyle: {
        fontSize: "25px",
        color: variables.palette.onSurfaceVariant.main,
      },
      container: {
        display: "flex",
        width: "100%",

        paddingLeft: "16px",
        alignItems: "center",
      },
      container1: {
        display: "flex",
        flexDirection: "column",
        paddingLeft: "4%",
        paddingRight: "4%",
        width: "100%",
        height: "100%",
      },
      container2: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
      },
      constainer3: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        marginTop: "16px",
      },

      imageStyle: {
        height: "80px",
        width: "80px",
        marginRight: "4px",
        borderRadius: "50%",
      },
      selectperso: {
        overrides: {
          MuiFormControl: {
            root: {
              margin: "8px",
              minWidth: "120px",
            },
          },
          MuiSelect: {
            root: {
              padding: "8px",
            },
          },
        },
      },
      periodeText: {
        alignContent: "center",
        display: "flex",
        alignItems: "center",
        marginLeft: "8px",
        height: "32px",
        borderRadius: "8px",
        padding: "0px 13px",
        backgroundColor: variables.palette.secondary.main,
        color: variables.palette.onSecondary.main,
        boxShadow:
          "rgba(0, 0, 0, 0.2) 0px 3px 1px -2px, rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px",
      },
      trashBouton: {
        height: "32px",
        minWidth: "32px",
        flex: 0.2,
        border: "none",
        color: variables.palette.onSurfaceVariant.main,
      },
      trashBoutonHeader: {
        height: "16px",
        minWidth: "32px",
        flex: 0.2,
        border: "none",
        color: variables.palette.onSecondaryContainer.main,
      },
      homeTempBouton: {
        minWidth: "150px",
        height: "32px",
        width: "128px",
        borderRadius: "8px",
        margin: "8px",
        backgroundColor: variables.palette.primary.main,
        textTransform: "none",
        color: variables.palette.onPrimary.main,
        boxShadow:
          "0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)",
      },
      standardHomeBouton: {
        width: "8vw",
        height: "32px",
        borderRadius: "8px",
        backgroundColor: variables.palette.primary.main,
        color: variables.palette.onPrimary.main,
        textTransform: "none",
        boxShadow:
          "0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)",
        "&:hover": {
          color: "#000",
        },
      },
      standardConfirmBouton: {
        display: "flex",
        justifyContent: "end",
      },
      standardDisableHomeBouton: {
        minWidth: "150px",
        height: "32px",
        borderRadius: "8px",
        backgroundColor: variables.palette.disabledBack.main,
        color: variables.palette.onDisabledBack.main,
        textTransform: "none",
        boxShadow: "none",
      },
      homeSecondaryBouton: {
        minWidth: "150px",
        height: "32px",
        borderRadius: "8px",
        marginTop: "8px",
        backgroundColor: variables.palette.secondary.main,
        color: variables.palette.onSecondary.main,
        textTransform: "none",
        boxShadow:
          "0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)",
      },
      accordeon: {
        width: "100%",
        backgroundColor: variables.palette.secondaryContainer.main,
        borderRadius: "15px",
        marginBottom: "16px",
      },
      accordeonCursor: {
        cursor: "default",
      },
      boutonContainerSemaine: {
        width: "84%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "end",
        paddingRight: "8px",
      },
      textStyle: {
        fontSize: "20px",
        color: variables.palette.onSecondaryContainer.main,
      },

      accordSelectContainer: {
        backgroundColor: variables.palette.surfaceVariant.main,
        display: "flex",
        flexDirection: "column",
        flex: "1",
        paddingRight: "32px",
      },
      selectFontColor: {
        color: variables.palette.onSurfaceVariant.main,
      },

      sxThemeChange: {
        float: "left",
        marginRight: "8px",
      },
      themeChangeStyle: {
        display: "flex",
        alignItems: "center",
      },
    },
    menu: {
      closed: {
        display: "none",
      },
      containerMenuClosed: {
        width: 0,
      },

      iconSelect: {
        width: "40px",
        height: "40px",
      },

      buttonWhenClosed: {
        position: "absolute",
        top: "4px",
        left: "4px",
        padding: "2px 6px",
      },
      buttonOpenMenuOpen: {
        display: "none",
      },
      buttonOpenMenuClosed: {
        display: "block",
      },
      textInfoOffre: {
        padding: "4px",
        fontSize: "15px",
      },
      spacingBot: {
        paddingBot: "4px",
        fontSize: "14px",
      },

      pictoMenuOpen: {
        width: "24px",
        height: "24px",
      },

      containerMenuLittle: {
        width: "310px",
      },
      transitionStyles: {
        entering: { width: "310px", display: "block", opacity: "1" },
        entered: { width: "310px", display: "block", opacity: "1" },
        exiting: { width: "0px", display: "block", opacity: "0" },
        exited: { width: "0px", display: "none", opacity: "0" },
      },
      transitionStylesLittle: {
        entering: { width: "252px", display: "block", opacity: "1" },
        entered: { width: "252px", display: "block", opacity: "1" },
        exiting: { width: "0px", display: "block", opacity: "0" },
        exited: { width: "0px", display: "none", opacity: "0" },
      },
      buttonCloseMenu: {
        position: "absolute",
        left: "284px",
        bottom: "14px",
      },
      buttonCloseMenuLittle: {
        left: "154px",
      },
      right: {
        float: "right",
      },
      photoProfil: {
        float: "left",
        width: "60px",
        height: "60px",
        borderRadius: "50%",
        boxShadow: variables.palette.boxShadow.default,
      },
      left: {
        float: "left",
        margin: "0 0 0 20px",
        display: "block",
        width: "50%",
      },

      padding: {
        padding: "10px 0 0 0",
      },
      containerMenuGray: {
        borderRadius: "4px",
        padding: "4px",
        fontSize: "13px",
        border: "1px solid #62606469",
      },
      separator: {
        height: "2px",
        borderRadius: "1px",
        backgroundColor: variables.palette.text.primary,
        margin: "8px",
      },
      buttonMenuSelect: {
        backgroundColor: variables.palette.primary.main,
        pointerEvent: "none",
        cursor: "default",
        color: variables.palette.button.main,
        maxHeight: "40px",
        "&:hover": {
          backgroundColor: variables.palette.primary.main,
          opacity: 1,
        },
      },
      buttonMenu: {
        backgroundColor: variables.palette.button.main,
        color: variables.palette.text.primary,
        textTransform: "none",
        border: "1px solid #62606469",
        width: "100%",
        margin: "4px 0",
        maxHeight: "40px",
        "&:hover": {
          color: variables.palette.text.primary,
          opacity: 1,
        },
      },
      pictoBin: {
        color: variables.palette.text.primary,
      },
      pictoMenu: {
        width: "36px",
        height: "36px",
        padding: "4px",
        margin: 0,
        borderRadius: "50%",
        backgroundColor: variables.palette.button.main,
        boxShadow: variables.palette.boxShadow.default,
      },

      boutonArr: {
        marginTop: "4px",
        backgroundColor: variables.palette.button.main,
        color: variables.palette.text.primary,
        textTransform: "none",
        width: "100%",
        boxShadow: variables.palette.boxShadow.default,
      },
      align: {
        margin: "70px 0 15px 0",
        backgroundColor: variables.palette.button.main,
        borderRadius: "4px",
        padding: "4px",
        fontSize: "13px",
      },
    },
    button: {
      textButton: {
        padding: "3px 0 0 0",
      },
    },
  };
};

const getDefaultTheme = (variables) => {
  return {
    ...getDefaultThemeAbstarct(variables),
    palette: variables.palette,
    typography: variables.typography,
    components: {
      MuiDialogContent: {
        styleOverrides: {
          root: {
            fontFamily: variables.typography.fontFamily,
          },
        },
      },
      MuiAlert: {
        styleOverrides: {
          standardSuccess: {
            backgroundColor: "#006400",
            color: "white",
          },
          standardError: {
            backgroundColor: "red",
            color: "white",
          },
          standardWarning: {
            backgroundColor: "orange",
            color: "white",
          },
          standardInfo: {
            backgroundColor: "grey",
            color: "black",
          },
          icon: {
            color: "#fff !important",
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: { gap: "0.5rem" },
        },
      },
      MuiPickersDay: {
        styleOverrides: {
          root: { paddingTop: "2px" },
        },
      },
    },
    menu: {
      ...getDefaultThemeAbstarct(variables).menu,
      default: {
        backgroundColor: variables.palette.backgroundMenu.default,
        width: "310px",
        padding: "0 12px",
        height: "100%",
      },
      containerMenu: {
        backgroundColor: variables.palette.backgroundMenu.default,
        width: "300px",
        minWidth: "300px",
        padding: "0 12px",
        height: "100%",
      },
    },
    agGridCustom: {
      ...getDefaultThemeAbstarct(variables).agGridCustom,
      gridStyles: {
        height: "100%",
        width: "100%",
        position: "relative",
        "--ag-font-family": variables.typography.fontFamily,
        "--ag-header-height": "100px",
        "--ag-font-size": "11px",
        "--ag-background-color": variables.palette.background.default,
        "--ag-header-background-color": variables.palette.background.default,
        "--ag-modal-overlay-background-color":
          variables.palette.background.default,
        "--ag-data-color": variables.palette.text.primary,
        "--ag-header-foreground-color": variables.palette.text.primary,
        "--ag-foreground-color": variables.palette.text.primary,
        "--ag-secondary-foreground-color": variables.palette.text.primary,
        "--ag-input-disabled-border-color": variables.palette.text.primary,
        "--ag-control-panel-background-color":
          variables.palette.background.default,
        "--ag-row-hover-color": "transparent",
        "--ag-column-hover-color": variables.palette.background.default,
        "--ag-input-focus-border-color": variables.palette.background.default,
        "--ag-range-selection-background-color":
          variables.palette.background.default,
        "--ag-range-selection-background-color-2":
          variables.palette.background.default,
        "--ag-range-selection-background-color-3":
          variables.palette.background.default,
        "--ag-range-selection-background-color-4":
          variables.palette.background.default,
        "--ag-disabled-foreground-color": variables.palette.background.default,
        "--ag-odd-row-background-color": variables.palette.oddRowAgGrid.default,
        "--ag-chip-background-color": variables.palette.background.default,
        "--ag-input-disabled-background-color":
          variables.palette.background.default,
        "--ag-line-height": "31px",
        "--ag-cell-horizontal-padding": "8px",
        "--ag-borders-row": "0px",
      },
      gridStylesAddProduct: {
        height: "100%",
        width: "100%",
        position: "relative",
        "--ag-font-family": variables.typography.fontFamily,
        "--ag-header-height": "100px",
        "--ag-font-size": "13px",
        "--ag-background-color": variables.palette.background.default,
        "--ag-header-background-color": variables.palette.background.default,
        "--ag-modal-overlay-background-color":
          variables.palette.background.default,
        "--ag-data-color": variables.palette.text.primary,
        "--ag-header-foreground-color": variables.palette.text.primary,
        "--ag-foreground-color": variables.palette.text.primary,
        "--ag-secondary-foreground-color": variables.palette.text.primary,
        "--ag-input-disabled-border-color": variables.palette.text.primary,
        "--ag-control-panel-background-color":
          variables.palette.background.default,
        "--ag-odd-row-background-color": variables.palette.oddRowAgGrid.default,
        "--ag-row-hover-color": "transparent",
        "--ag-column-hover-color": variables.palette.background.default,
        "--ag-input-focus-border-color": variables.palette.background.default,
        "--ag-range-selection-background-color":
          variables.palette.background.default,
        "--ag-range-selection-background-color-2":
          variables.palette.background.default,
        "--ag-range-selection-background-color-3":
          variables.palette.background.default,
        "--ag-range-selection-background-color-4":
          variables.palette.background.default,
        "--ag-disabled-foreground-color": variables.palette.background.default,
        "--ag-chip-background-color": variables.palette.background.default,
        "--ag-input-disabled-background-color":
          variables.palette.background.default,
        "--ag-line-height": "34px",
        "--ag-cell-horizontal-padding": "12px",
        "--ag-borders-row": "0px",
        "--ag-header-column-separator-width": "0px",
        "--ag-header-column-separator-display": "block",
      },
    },
    button: {
      ...getDefaultThemeAbstarct(variables).button,
    },
  };
};

const getDefaultThemeWhite = (variables) => {
  return {
    ...getDefaultTheme(variables),
    palette: variables.palette,
    typography: variables.typography,
    components: {
      MuiDialogContent: {
        styleOverrides: {
          root: {
            fontFamily: variables.typography.fontFamily,
          },
        },
      },
    },
    pageTest: {
      ...getDefaultTheme(variables).pageTest,
    },
    menu: {
      ...getDefaultTheme(variables).menu,
      buttonMenu: {
        backgroundColor: "#f3f2f1",
        color: variables.palette.text.primary,
        textTransform: "none",
        border: "1px solid #62606469",
        width: "100%",
        margin: "4px 0",
        maxHeight: "40px",
        "&:hover": {
          border: "1px solid #62606469",
          color: "#000",
        },
      },

      buttonMenuSelect: {
        pointerEvents: "none",
        cursor: "default",
        border: "1px solid #000",
        backgroundColor: "#fff",
        maxHeight: "40px",
        "&:hover": {
          border: "1px solid #000",
          backgroundColor: "#fff",
          opacity: 1,
        },
      },

      photoProfil: {
        float: "left",
        width: "60px",
        height: "60px",
        borderRadius: "50%",
        border: "1px solid #62606469",
        boxShadow: variables.palette.boxShadow.default,
      },
      containerMenuGray: {
        borderRadius: "4px",
        padding: "4px",
        fontSize: "13px",
        border: "1px solid #62606469",
      },
      containerMenu: {
        backgroundColor: "#f3f2f1",
        color: variables.palette.text.primary,
        width: "300px",
        minWidth: "300px",
        padding: "0 12px",
        height: "100%",
      },
      borderMenu: {
        borderRight: "1px solid #62606469",
        borderRadius: "4px",
        boxShadow:
          "0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)",
      },
    },
  };
};

const getDefaultVariableThemeWhite = () => {
  return {
    ...getDefaultVariableTheme(),
    typography: {
      fontFamily: "Arial",
    },

    palette: {
      mode: "light",
      boxShadow: {
        default:
          "0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)",
      },
      primary: {
        main: "#006689",
      },
      secondary: {
        main: "#4e616d",
      },
      text: {
        primary: "#000000",
      },
      tersiary: {
        main: "#605a7d",
      },
      error: {
        main: "#ba1a1a",
      },
      background: {
        main: "#fbfcfe",
      },
      outline: {
        main: "#71787d",
      },
      disabledBack: {
        main: "rgba(0, 0, 0, 0.12)",
      },
      onPrimary: {
        main: "#ffffff",
      },
      onSecondary: {
        main: "#ffffff",
      },
      onTersiary: {
        main: "#ffffff",
      },
      onError: {
        main: "#ffffff",
      },
      onBackground: {
        main: "#191c1e",
      },
      onDisabledBack: {
        main: "rgba(255, 255, 255, 0.3)",
      },
      primaryContainer: {
        main: "#c3e8ff",
      },
      secondaryContainer: {
        main: "#fff",
      },
      tersiaryContainer: {
        main: "#e6deff",
      },
      surface: {
        main: "#fbfcfe",
      },
      surfaceVariant: {
        main: "#dce3e9",
      },
      errorContainer: {
        main: "#ffdad6",
      },
      onPrimaryContainer: {
        main: "#001e2c",
      },
      onSecondaryContainer: {
        main: "#091e28",
      },
      onTersiaryContainer: {
        main: "#1c1736",
      },
      onErrorContainer: {
        main: "#410002",
      },
      onSurface: {
        main: "#191c1e",
      },
      onSurfaceVariant: {
        main: "#222628",
      },
      button: {
        main: "#fff",
        contrastText: "#fff",
        border: "1px solid #62606469",
      },
      backgroundMenu: {
        default: "#fff",
      },
      oddRowAgGrid: {
        default: "#f3f2f1",
      },
      buttonpopup: {
        default: "#f3f2f1",
      },
    },
  };
};
const getDefaultVariableTheme = () => {
  return {
    typography: {
      fontFamily: "Arial",
    },
    palette: {
      mode: "dark",
      boxShadow: {
        default:
          "0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)",
      },
      text: {
        primary: "#ffffff",
      },
      buttonpopup: {
        default: "#4E5055",
      },
      primary: {
        main: "#78d1ff",
      },
      button: {
        main: "#3C3844",
        contrastText: "#fff",
        border: "none",
      },
      secondary: {
        main: "#b5c9d7",
      },
      tersiary: {
        main: "#c9c1ea",
      },
      backgroundMenu: {
        default: "#2A2731",
      },
      oddRowAgGrid: {
        default: "#222628",
      },
      error: {
        main: "#ffb4ab",
      },
      background: {
        main: "#191c1e",
      },
      outline: {
        main: "#8a9297",
      },
      disabledBack: {
        main: "rgba(255, 255, 255, 0.12)",
      },
      onPrimary: {
        main: "#003549",
      },
      onSecondary: {
        main: "#20333d",
      },
      onTersiary: {
        main: "#312c4c",
      },
      onError: {
        main: "#690005",
      },
      onBackground: {
        main: "#e1e2e5",
      },
      onDisabledBack: {
        main: "rgba(255, 255, 255, 0.3)",
      },
      primaryContainer: {
        main: "#004c68",
      },
      secondaryContainer: {
        main: "#364955",
      },
      tersiaryContainer: {
        main: "#484264",
      },
      surface: {
        main: "#191c1e",
      },
      surfaceVariant: {
        main: "#222628",
      },
      errorContainer: {
        main: "#93000a",
      },
      onPrimaryContainer: {
        main: "#c3e8ff",
      },
      onSecondaryContainer: {
        main: "#fff",
      },
      onTersiaryContainer: {
        main: "#e6deff",
      },
      onErrorContainer: {
        main: "#ffdad6",
      },
      onSurface: {
        main: "#e1e2e5",
      },
      onSurfaceVariant: {
        main: "#fff",
      },
    },
  };
};
export const defaultTheme = getDefaultTheme(getDefaultVariableTheme());
export const defaultThemeWhite = getDefaultThemeWhite(
  getDefaultVariableThemeWhite()
);
