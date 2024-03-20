import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Définition de l'état initial avec une structure plus appropriée
const initialState = {
  userInfo: {
    nom: "",
    prenom: "",
    email: "",
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Action pour mettre à jour les informations de l'utilisateur
    setUserInfo(
      state,
      action: PayloadAction<{ nom: string; prenom: string; email: string }>
    ) {
      const { nom, prenom, email } = action.payload;
      state.userInfo.nom = nom;
      state.userInfo.prenom = prenom;
      state.userInfo.email = email;
    },
  },
});

export const { setUserInfo } = userSlice.actions;

export default userSlice.reducer;
