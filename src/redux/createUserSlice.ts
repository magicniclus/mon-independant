import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Définition de l'état initial avec une structure plus appropriée
const initialState = {
  userInfo: {
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    sexe: "",
    dateDeNaissance: "",
    nationnalite: "Française",
    departement: "",
    paysDeNaissance: "France",
    paysDeNaissanceEtranger: "",
    villeDeNaissance: "",
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo(state, action: PayloadAction<typeof initialState.userInfo>) {
      console.log("Action received in reducer:", action);
      // Mise à jour de chaque champ dans l'état
      Object.assign(state.userInfo, action.payload);
    },
  },
});

export const { setUserInfo } = userSlice.actions;

export default userSlice.reducer;
