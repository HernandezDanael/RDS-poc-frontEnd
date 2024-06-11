/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useState, useEffect } from "react";
import { createApolloClient } from "../apollo/apolloClient";
import { PersistGate } from "redux-persist/lib/integration/react";
import { ApolloProvider } from "@apollo/client";
import { Provider, useSelector } from "react-redux";
import Home from "../page/Home";
import store, { persistor } from "../assets/app/store";
import { ThemeProvider, createTheme } from "@mui/material";
import SnackBarCustom from "./SnackBarCustom";
import { defaultTheme, defaultThemeWhite } from "../assets/styles/theme";
import { PageLayout } from "./PageLayout";

export const MyApplication = () => {
  const [dialogError, setDialogError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isChangeTheme, setIsChangeTheme] = useState(false);
  const [theme, setTheme] = useState(createTheme(defaultTheme));
  const currentUser = useSelector((state) => state.user.value);
  const client = useRef(
    createApolloClient(setDialogError, setErrorMessage, setIsLoading)
  );

  const [isFirstLoad, setIsFirstLoad] = useState(true);
  useEffect(() => {
    if (isFirstLoad) {
      if (store.getState().theme.value.theme === "light") {
        setTheme(createTheme(defaultThemeWhite));
        setIsFirstLoad(false);
      } else if (store.getState().theme.value.theme === "dark") {
        setTheme(createTheme(defaultTheme));
        setIsFirstLoad(false);
      }
    } else {
      if (store.getState().theme.value.theme === "light" && isChangeTheme) {
        setTheme(createTheme(defaultThemeWhite));
        setIsChangeTheme(false);
      } else if (
        store.getState().theme.value.theme === "dark" &&
        isChangeTheme
      ) {
        setTheme(createTheme(defaultTheme));
        setIsChangeTheme(false);
      }
    }
  }, [isChangeTheme]);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {/*ajout des fonctions d'apollo dans le dom */}
        <ApolloProvider client={client.current}>
          {/*ajout du theme css dans le dom*/}
          <ThemeProvider theme={theme}>
            <SnackBarCustom></SnackBarCustom>
            <div>
              {currentUser.droit === "" ||
              currentUser.droit === "en attente" ? (
                <PageLayout></PageLayout>
              ) : (
                <Home setIsChangeTheme={setIsChangeTheme} />
              )}
            </div>
          </ThemeProvider>
        </ApolloProvider>
      </PersistGate>
    </Provider>
  );
};
