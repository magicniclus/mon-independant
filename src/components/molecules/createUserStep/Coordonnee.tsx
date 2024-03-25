"use client";

import { setUserInfo } from "@/redux/createUserSlice";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateField } from "@mui/x-date-pickers/DateField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

const Coordonnee = () => {
  const dispatch = useDispatch();

  const userNom = useSelector(
    (state: RootState) => state.createUser.userInfo.nom
  );

  const userPrenom = useSelector(
    (state: RootState) => state.createUser.userInfo.prenom
  );

  const userEmail = useSelector(
    (state: RootState) => state.createUser.userInfo.email
  );

  const [formValues, setFormValues] = useState({
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
  });

  const [formErrors, setFormErrors] = useState({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    nationnalite: "",
    departement: "",
    paysDeNaissance: "",
    paysDeNaissanceEtranger: "",
    villeDeNaissance: "",
  });

  useEffect(() => {
    // Vérifie si userNom, userPrenom, ou userEmail ne sont pas vides
    if (userNom !== "" || userPrenom !== "" || userEmail !== "") {
      setFormValues((prev) => ({
        ...prev,
        nom: userNom,
        prenom: userPrenom,
        email: userEmail,
      }));
    }
  }, [userNom, userPrenom, userEmail]);

  const handleSexeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Mettre à jour directement la valeur de sexe
    setFormValues((prev) => ({ ...prev, sexe: e.target.value }));
  };

  const handlePaysDeNaissanceChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    setFormValues((prev) => ({
      ...prev,
      paysDeNaissance: value,
      // Réinitialise le champ du pays de naissance si on sélectionne "France"
      nationnalite: value === "France" ? "Française" : "",
    }));
  };

  const handleDateChange = (newValue: string) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      dateDeNaissance: newValue,
    }));
  };

  // Fonction modifiée pour gérer les changements d'autres champs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    validateField(name, value);
  };

  const validateField = (name: string, value: string) => {
    let error = "";
    switch (name) {
      case "nom":
      case "prenom":
      case "nationnalite":
      case "departement":
      case "paysDeNaissance":
      case "villeDeNaissance":
      case "paysDeNaissanceEtranger":
        error = value.trim() === "" ? "Ce champ est obligatoire." : "";
        break;
      case "email":
        error = !/^\S+@\S+\.\S+$/.test(value) ? "Adresse email invalide." : "";
        break;
      case "telephone":
        error = !/^\d{10}$/.test(value) ? "Numéro de téléphone invalide." : "";
        break;
      default:
        break;
    }
    setFormErrors((errors) => ({ ...errors, [name]: error }));
  };

  useEffect(() => {
    console.log(formValues);
    if (
      (formValues.nom &&
        formValues.prenom &&
        formValues.email &&
        formValues.telephone &&
        formValues.sexe &&
        formValues.dateDeNaissance &&
        formValues.nationnalite &&
        formValues.departement &&
        formValues.paysDeNaissance) ||
      (formValues.dateDeNaissance &&
        formValues.email &&
        formValues.email &&
        formValues.nom &&
        formValues.prenom &&
        formValues.paysDeNaissance &&
        formValues.paysDeNaissanceEtranger &&
        formValues.sexe &&
        formValues.telephone &&
        formValues.villeDeNaissance)
    ) {
      dispatch(setUserInfo(formValues));
    }
  }, [formValues]);

  return (
    <>
      {/* <h2 className="font-semibold text-lg">Identité</h2> */}
      <div className="flex justify-between">
        <div className="w-full md:w-[48%]">
          <label htmlFor="nom" className="text-slate-700 text-sm">
            Nom
          </label>
          <input
            name="nom"
            onChange={handleChange}
            value={formValues.nom}
            type="text"
            placeholder="Votre nom"
            className="w-full border hover:border-slate-500 focus:border-slate-500 px-2 py-2 rounded-md border-slate-400 mt-2 text-sm"
          />
          {formErrors.nom && (
            <p className="text-red-500 text-xs mt-1">{formErrors.nom}</p>
          )}
        </div>
        <div className="w-full md:w-[48%]">
          <label htmlFor="prenom" className="text-slate-700 text-sm">
            Prénom
          </label>
          <input
            name="prenom"
            onChange={handleChange}
            value={formValues.prenom}
            type="text"
            placeholder="Votre prénom"
            className="w-full border px-2 py-2 rounded-md border-slate-400 mt-2  hover:border-slate-500 focus:border-slate-500 text-sm"
          />
          {formErrors.prenom && (
            <p className="text-red-500 text-xs mt-1">{formErrors.prenom}</p>
          )}
        </div>
      </div>
      <div className="w-full mt-5">
        <label className="text-slate-700 text-sm">Sexe</label>
        <div className="w-full flex justify-between">
          <div className="flex items-center mt-2 w-[47%]">
            <input
              id="homme"
              value="Homme"
              name="sexe"
              checked={formValues.sexe === "Homme"}
              onChange={handleSexeChange}
              type="radio"
              className="mr-2 h-5 w-5 cursor-pointer"
            />
            <label htmlFor="homme" className="ml-3 text-sm">
              Homme
            </label>
          </div>
          <div className="flex items-center w-[47%]">
            <input
              id="femme"
              value="Femme"
              name="sexe"
              checked={formValues.sexe === "Femme"}
              onChange={handleSexeChange}
              type="radio"
              className="mr-2 h-5 w-5 cursor-pointer"
            />
            <label htmlFor="femme" className="ml-3 text-sm">
              Femme
            </label>
          </div>
        </div>
      </div>
      <div className="flex justify-between mt-5">
        <div className="w-full md:w-[48%]">
          <label htmlFor="email" className="text-slate-700 text-sm">
            Téléphone
          </label>
          <input
            name="telephone"
            onChange={handleChange}
            type="email"
            placeholder="Votre téléphone"
            className="w-full border px-2 py-2 rounded-md border-slate-400 mt-2  hover:border-slate-500 focus:border-slate-500 text-sm"
          />
          {formErrors.telephone && (
            <p className="text-red-500 text-xs mt-1">{formErrors.telephone}</p>
          )}
        </div>
        <div className="w-full md:w-[48%]">
          <label htmlFor="email" className="text-slate-700">
            Email
          </label>
          <input
            name="email"
            onChange={handleChange}
            value={formValues.email}
            type="email"
            placeholder="Votre email"
            className="w-full border px-2 py-2 rounded-md border-slate-400 mt-2  hover:border-slate-500 focus:border-slate-500 text-sm"
          />
          {formErrors.email && (
            <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>
          )}
        </div>
      </div>
      <div className="w-full flex flex-col mt-5">
        <label htmlFor="dateDeNaissance" className="text-slate-700 text-sm">
          Date de naissance
        </label>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DateField", "DateField", "DateField"]}>
            <DateField
              value={formValues.dateDeNaissance}
              onChange={(newValue: string | null) =>
                handleDateChange(newValue as string)
              }
              format="DD/MM/YYYY"
              sx={{
                "& .MuiInputBase-input, & .MuiOutlinedInput-input": {
                  padding: "8px !important", // Ajustement ici
                  // Si le style ne s'applique pas, il peut être nécessaire d'inspecter d'autres styles conflictuels
                },
                "& .MuiInputBase-root": {
                  border: "0.05px solid #94a3b8",
                  borderRadius: "0.4rem",
                  color: "#64748b",
                  "&:hover": {
                    borderColor: "#64748b",
                  },
                  "&:focus": {
                    borderColor: "#64748b",
                  },
                },
              }}
            />
          </DemoContainer>
        </LocalizationProvider>
      </div>
      <div className="w-full flex flex-col mt-5">
        <label htmlFor="dateDeNaissance" className="text-slate-700">
          Pays de naissance
        </label>
        <div className="w-full flex justify-between">
          <div className="w-full flex justify-between">
            <div className="flex w-[48%] justify-start items-center mt-2">
              <input
                type="radio"
                value="France"
                checked={formValues.paysDeNaissance === "France"}
                onChange={handlePaysDeNaissanceChange}
                className="border h-5 w-5 px-3 py-4 rounded-md border-slate-400 hover:border-slate-500 focus:border-slate-500 text-sm cursor-pointer"
              />
              <h3 className="ml-3 text-sm">France</h3>
            </div>
            <div className="flex w-[48%] justify-start items-center">
              <input
                type="radio"
                value="Etranger"
                checked={formValues.paysDeNaissance === "Etranger"}
                onChange={handlePaysDeNaissanceChange}
                className="border h-5 w-5 px-3 py-4 rounded-md border-slate-400 hover:border-slate-500 focus:border-slate-500 text-sm cursor-pointer"
              />
              <h3 className="ml-3 text-sm">À l&apos;étranger</h3>
            </div>
          </div>
        </div>
        {formValues.paysDeNaissance === "Etranger" ? (
          <>
            <div className="flex md:flex-row flex-col justify-between">
              <div className="w-full mt-5 md:w-[47%] w-full">
                <label htmlFor="paysDeNaissance" className="text-slate-700">
                  Pays de naissance
                </label>
                <input
                  type="text"
                  id="paysDeNaissanceEtranger"
                  name="paysDeNaissanceEtranger"
                  value={formValues.paysDeNaissanceEtranger}
                  onChange={handleChange}
                  placeholder="Entrez le pays de naissance"
                  className="w-full border px-2 py-2 rounded-md border-slate-400 mt-2 hover:border-slate-500 focus:border-slate-500 text-sm"
                />
                {formErrors.paysDeNaissanceEtranger && (
                  <p className="text-red-500 text-xs mt-1">
                    {formErrors.paysDeNaissanceEtranger}
                  </p>
                )}
              </div>
              <div className="w-full mt-5 md:w-[47%] w-full">
                <label
                  htmlFor="villeDeNaissance"
                  className="text-slate-700 text-sm"
                >
                  Ville de naissance
                </label>
                <input
                  name="villeDeNaissance"
                  onChange={handleChange}
                  type="text"
                  placeholder="Votre ville de naissance"
                  className="w-full border px-2 py-2 rounded-md border-slate-400 mt-2 hover:border-slate-500 focus:border-slate-500 text-sm"
                  value={formValues.villeDeNaissance}
                />
                {formErrors.villeDeNaissance && (
                  <p className="text-red-500 text-xs mt-1">
                    {formErrors.villeDeNaissance}
                  </p>
                )}
              </div>
            </div>
            <div className="w-full mt-5">
              <label
                htmlFor="villeDeNaissance"
                className="text-slate-700 text-sm"
              >
                Nationnalité
              </label>
              <input
                name="nationnalite"
                onChange={handleChange}
                value={formValues.nationnalite || "Francaise"}
                type="text"
                placeholder="Nationnalité"
                className="w-full border px-2 py-2 rounded-md border-slate-400 mt-2 hover:border-slate-500 focus:border-slate-500 text-sm"
              />
              {formErrors.nationnalite && (
                <p className="text-red-500 text-xs mt-1">
                  {formErrors.nationnalite}
                </p>
              )}
            </div>
          </>
        ) : (
          <>
            <div className="w-full mt-5">
              <label htmlFor="departement" className="text-slate-700 text-sm">
                Département de naissance
              </label>
              <input
                name="departement"
                onChange={handleChange}
                value={formValues.departement}
                type="text"
                placeholder="Votre département de naissance"
                className="w-full border px-2 py-2 rounded-md border-slate-400 mt-2 hover:border-slate-500 focus:border-slate-500 text-sm"
              />
              {formErrors.departement && (
                <p className="text-red-500 text-xs mt-1">
                  {formErrors.departement}
                </p>
              )}
            </div>
            <div className="w-full mt-5">
              <label
                htmlFor="villeDeNaissance"
                className="text-slate-700 text-sm"
              >
                Nationnalité
              </label>
              <input
                name="nationnalite"
                onChange={handleChange}
                value={formValues.nationnalite || "Francaise"}
                type="text"
                placeholder="Nationnalité"
                className="w-full border px-2 py-2 rounded-md border-slate-400 mt-2 hover:border-slate-500 focus:border-slate-500 text-sm"
              />
              {formErrors.nationnalite && (
                <p className="text-red-500 text-xs mt-1">
                  {formErrors.nationnalite}
                </p>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Coordonnee;