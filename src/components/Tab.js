import React, { useCallback } from "react";
import { useTheme, NativeSelect, Button } from "@mui/material";

const Tab = ({
  year,
  mois,
  jour,
  heure,
  salle,
  getAnnee,
  getAllMois,
  getJour,
  getAllSalle,
  getAllHeure,
  handleChangeMois,
  handleChangeJour,
  handleChangeSalle,
  handleChangeHeure,
  onBlureSaisieSalle,
}) => {
  const theme = useTheme();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getNextField = (currentField) => {
    switch (currentField) {
      case "annee":
        return "mois";
      case "mois":
        return "jour";
      case "jour":
        return "salle";
      case "salle":
        return "heure";
      case "heure":
        return "annee";

      default:
        return null;
    }
  };
  const handleEnter = useCallback(
    (event, currentField) => {
      if (event.key === "Enter") {
        const nextField = getNextField(currentField);
        if (nextField) {
          document.getElementById(nextField).focus();
        }
      }
    },
    [getNextField]
  );

  return (
    <div style={theme.pageTest.standardTabContainer}>
      <div style={theme.pageTest.standardSelectContainerJourn}>
        <div style={theme.pageTest.standardSelectContainer}>
          <div style={theme.pageTest.accordSelectContainer}>
            {getAnnee.length > 0 && (
              <NativeSelect
                id={"annee"}
                style={theme.pageTest.inputValue}
                disabled={true}
                onKeyDown={(event) => {
                  handleEnter(event, "annee");
                }}
              >
                {getAnnee}
              </NativeSelect>
            )}
          </div>
        </div>
        <div style={theme.pageTest.standardSelectContainer}>
          <div style={theme.pageTest.accordSelectContainer}>
            {getAnnee.length > 0 && (
              <NativeSelect
                id={"mois"}
                style={theme.pageTest.inputValue}
                value={mois}
                onChange={handleChangeMois}
                onKeyDown={(event) => {
                  handleEnter(event, "mois");
                }}
              >
                {getAllMois}
              </NativeSelect>
            )}
          </div>
        </div>
        <div style={theme.pageTest.standardSelectContainer}>
          <div style={theme.pageTest.accordSelectContainer}>
            {getAnnee.length > 0 && (
              <NativeSelect
                id={"jour"}
                style={theme.pageTest.inputValue}
                value={jour}
                onChange={handleChangeJour}
                onKeyDown={(event) => {
                  handleEnter(event, "jour");
                }}
              >
                {getJour}
              </NativeSelect>
            )}
          </div>
        </div>
        <div style={theme.pageTest.standardSelectContainer}>
          <div style={theme.pageTest.accordSelectContainer}>
            {getAnnee.length > 0 && (
              <NativeSelect
                id={"salle"}
                style={theme.pageTest.inputValue}
                value={salle}
                onChange={handleChangeSalle}
                onBlur={onBlureSaisieSalle}
                onKeyDown={(event) => {
                  handleEnter(event, "salle");
                }}
              >
                {getJour.length > 0 && jour != "" ? getAllSalle : ""}
              </NativeSelect>
            )}
          </div>
        </div>
        <div style={theme.pageTest.standardSelectContainer}>
          <div style={theme.pageTest.accordSelectContainer}>
            {getAnnee.length > 0 && (
              <NativeSelect
                id={"heure"}
                style={theme.pageTest.inputValue}
                value={heure}
                onKeyDown={(event) => {
                  handleEnter(event, "heure");
                }}
                onChange={handleChangeHeure}
              >
                {getAllSalle.length > 0 && salle != "" ? getAllHeure : ""}
              </NativeSelect>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Tab;
