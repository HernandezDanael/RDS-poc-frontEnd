import { createSlice } from "@reduxjs/toolkit";

export const CurrentUserSlice = createSlice({
  name: "User",
  initialState: {
    value: {
      id_utilisateur: "",
      adresse: "",
      siret: "",
      email: "",
      num_tel: "",
      nom: "",
      prenom: "",
      droit: "",
      ligue: "",
      nb_reservation_gratuite: "",
      amphi: "",
      statut: "",
      identifiant: "",
    },
  },
  reducers: {
    updateUser: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { updateUser } = CurrentUserSlice.actions;
export default CurrentUserSlice.reducer;
