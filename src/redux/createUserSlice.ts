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
  stepCreationCompte: 1,
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
    incrementStep(state) {
      state.stepCreationCompte += 1;
    },
    decrementStep(state) {
      // Assurez-vous que le step ne descend pas en dessous de 1
      if (state.stepCreationCompte > 1) {
        state.stepCreationCompte -= 1;
      }
    },
  },
});

export const { setUserInfo, incrementStep, decrementStep } = userSlice.actions;

export default userSlice.reducer;
