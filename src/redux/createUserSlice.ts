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
  userActivite: {
    activite: "",
    activitePrincipale: "",
    nomCommercial: "",
    activiteNonSalarie: "",
    debutActivite: "",
  },
  userAdresse: {
    adresse: "",
    complementAdresse: "",
    CGV: false,
  },
  stepCreationCompte: 1,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo(state, action: PayloadAction<typeof initialState.userInfo>) {
      // Mise à jour de chaque champ dans l'état
      Object.assign(state.userInfo, action.payload);
    },
    setActiviteDetails(
      state,
      action: PayloadAction<Partial<typeof initialState.userActivite>>
    ) {
      // Ce reducer est un exemple de la manière dont vous pourriez mettre à jour les détails d'activité
      Object.assign(state.userActivite, action.payload);
    },
    setAdresseDetails(
      state,
      action: PayloadAction<Partial<typeof initialState.userAdresse>>
    ) {
      // Ce reducer est un exemple de la manière dont vous pourriez mettre à jour les détails d'adresse
      Object.assign(state.userAdresse, action.payload);
    },
    initializeCompte(state) {
      // Réinitialisation de l'état
      state.stepCreationCompte = 1;
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

export const {
  setUserInfo,
  setActiviteDetails,
  setAdresseDetails,
  incrementStep,
  decrementStep,
  initializeCompte,
} = userSlice.actions;

export default userSlice.reducer;
