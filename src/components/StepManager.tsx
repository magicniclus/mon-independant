"use client";

import { incrementStep } from "@/redux/createUserSlice";
import { RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Activite from "./molecules/createUserStep/Activite";
import Adresse from "./molecules/createUserStep/Adresse";
import Checkout from "./molecules/createUserStep/Checkout";
import Coordonnee from "./molecules/createUserStep/Coordonnee";

const StepManager = () => {
  const dispatch = useDispatch();
  const [disabled, setDisabled] = useState(true);
  const step = useSelector(
    (state: RootState) => state.createUser.stepCreationCompte
  );

  const formValues = useSelector(
    (state: RootState) => state.createUser.userInfo
  );

  const formValuesActivite = useSelector(
    (state: RootState) => state.createUser.userActivite
  );

  const formValuesAdresse = useSelector(
    (state: RootState) => state.createUser.userAdresse
  );

  const handleDisabled = () => {
    switch (step) {
      case 1:
        if (formValues.paysDeNaissance === "Etranger") {
          if (
            formValues.dateDeNaissance &&
            formValues.email &&
            /^\S+@\S+\.\S+$/.test(formValues.email) &&
            formValues.nom &&
            formValues.prenom &&
            formValues.paysDeNaissance &&
            formValues.paysDeNaissanceEtranger &&
            formValues.sexe &&
            formValues.telephone &&
            formValues.villeDeNaissance &&
            formValues.nationnalite
          ) {
            setDisabled(false);
          } else setDisabled(true);
        } else {
          if (
            formValues.nom &&
            formValues.prenom &&
            formValues.email &&
            /^\S+@\S+\.\S+$/.test(formValues.email) &&
            formValues.telephone &&
            formValues.sexe &&
            formValues.dateDeNaissance &&
            formValues.nationnalite &&
            formValues.departement
          ) {
            setDisabled(false);
          } else setDisabled(true);
        }
        break;
      case 2:
        if (
          formValuesActivite.activite !== "" &&
          formValuesActivite.debutActivite !== "" &&
          formValuesActivite.activitePrincipale !== "" &&
          formValuesActivite.activiteNonSalarie !== ""
        )
          setDisabled(false);
        else setDisabled(true);
        break;
      case 3:
        const isDisabled =
          formValuesAdresse.adresse === "" || formValuesAdresse.CGV === false;
        setDisabled(isDisabled);
        break;

      default:
        break;
    }
  };

  const handleForm = () => {
    switch (step) {
      case 1:
        return <Coordonnee />;
      case 2:
        return <Activite />;
      case 3:
        return <Adresse />;
      case 4:
        return <Checkout />;
      default:
        break;
    }
  };

  const handleStep = () => {
    dispatch(incrementStep());
  };

  useEffect(() => {
    handleDisabled();
  }, [formValues, formValuesActivite, formValuesAdresse, step]);

  return (
    <section className="md:w-7/12 w-full">
      <form className="px-6 lg:px-8 text-slate-700 flex flex-col">
        {handleForm()}
        {step < 4 && (
          <button
            type="button"
            disabled={disabled}
            onClick={handleStep}
            className={`${
              disabled ? "bg-green-700/70" : "bg-green-700"
            }  text-white w-full py-2 rounded-md mt-10 hover:bg-green-700/70 transition duration-150 easeInOut`}
          >
            Continuer
          </button>
        )}
      </form>
    </section>
  );
};

export default StepManager;
