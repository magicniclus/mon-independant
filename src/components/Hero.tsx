"use client";

import { CheckBadgeIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../redux/createUserSlice";

const Hero = () => {
  const dispatch = useDispatch();

  const [formValues, setFormValues] = useState({
    nom: "",
    prenom: "",
    email: "",
    cgu: false,
  });

  const [disabled, setDisabled] = useState(true);

  const route = useRouter();

  const nameRegex = /^[A-Za-z]{2,}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  useEffect(() => {
    const isFormValid =
      nameRegex.test(formValues.nom) &&
      nameRegex.test(formValues.prenom) &&
      emailRegex.test(formValues.email) &&
      formValues.cgu;
    setDisabled(!isFormValid);
  }, [formValues, nameRegex, emailRegex]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type } = e.target;
    const value = type === "checkbox" ? e.target.checked : e.target.value;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!nameRegex.test(formValues.nom) || !nameRegex.test(formValues.prenom)) {
      alert(
        "Le nom et le prénom doivent contenir au moins deux lettres et aucun chiffre."
      );
      return;
    }

    if (!emailRegex.test(formValues.email)) {
      alert("Veuillez saisir une adresse email valide.");
      return;
    }

    if (!formValues.cgu) {
      alert(
        "Vous devez accepter les conditions générales de vente ainsi que la politique de confidentialité."
      );
      return;
    }

    // Dispatch l'action pour stocker les informations de l'utilisateur
    dispatch(
      setUserInfo({
        nom: formValues.nom,
        prenom: formValues.prenom,
        email: formValues.email,
      })
    );
    // route.push("/devenir-auto-entrepreneur/declaration");
  };

  return (
    <>
      <style jsx>{`
        .background::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.3);
          z-index: 0;
        }
        .content {
          position: relative;
          z-index: 1;
        }
      `}</style>
      <section className="w-full bg-[url('/background/woman.jpg')] py-10 md:py-24 bg-no-repeat bg-cover bg-center relative background text-slate-700">
        <div className="px-6 lg:px-8 max-w-6xl mx-auto flex md:flex-row flex-col z-10 content">
          <div className="md:w-1/2 w-full">
            <h1 className=" text-white font-bold sm:text-6xl text-4xl">
              Créez votre <br /> auto-entreprise <br /> en quelques cliques
            </h1>
            <ul className=" text-white mt-8">
              <li className="mt-3 flex items-center  md:text-normal text-xs">
                <CheckBadgeIcon className="min-w-[12px] h-4 md:h-7 w-auto text-green-700 mr-3" />
                Déclaration simplifiée au Statut Auto Entrepreneur 2024
              </li>
              <li className="mt-3 flex items-center md:text-normal text-xs">
                <CheckBadgeIcon className="min-w-[12px] h-4 md:h-7 w-auto text-green-700 mr-3" />
                Déclaration simple et rapide
              </li>
              <li className="mt-3 flex items-center md:text-normal text-xs">
                {" "}
                <CheckBadgeIcon className="min-w-[12px] h-4 md:h-7 w-auto text-green-700 mr-3" />
                Dossier traité sous 24h
              </li>
            </ul>
          </div>
          <div className="md:w-1/2 w-full flex justify-center">
            <form
              className="md:w-[80%] w-full py-8 bg-white md:bg-white/85 rounded-md px-5 md:px-8 flex-col items-center md:mt-0 mt-7"
              onSubmit={handleSubmit}
            >
              <h2 className="text-center font-semibold w-9/12 mx-auto">
                Formulaire de démarche en ligne simplifié
              </h2>
              <div className=" flex justify-between mt-5">
                <div className="w-full md:w-[45%]">
                  <label htmlFor="nom" className="text-slate-700">
                    Nom
                  </label>
                  <input
                    name="nom"
                    onChange={handleChange}
                    type="text"
                    placeholder="Votre nom"
                    className="w-full border px-2 py-1 rounded-md border-slate-400 mt-2"
                  />
                </div>
                <div className="w-[45%] md:block hidden">
                  <label htmlFor="prenom" className="text-slate-700">
                    Prénom
                  </label>
                  <input
                    name="prenom"
                    onChange={handleChange}
                    type="text"
                    placeholder="Votre prénom"
                    className="w-full border px-2 py-1 rounded-md border-slate-400 mt-2"
                  />
                </div>
              </div>
              <div className="w-full md:hidden block mt-3">
                <label htmlFor="prenom" className="text-slate-700">
                  Prénom
                </label>
                <input
                  name="prenom"
                  onChange={handleChange}
                  type="text"
                  placeholder="Votre prénom"
                  className="w-full border px-2 py-1 rounded-md border-slate-400 mt-2"
                />
              </div>
              <div className="w-full mt-3">
                <label htmlFor="email" className="text-slate-700">
                  Email
                </label>
                <input
                  name="email"
                  onChange={handleChange}
                  type="email"
                  placeholder="Votre email"
                  className="w-full border px-2 py-1 rounded-md border-slate-400 mt-2"
                />
              </div>
              <div className="w-full flex mt-3">
                <input
                  type="checkbox"
                  id="cgu"
                  name="cgu"
                  onChange={handleChange}
                  className="mr-2 cursor-pointer"
                />
                <label htmlFor="cgu" className="text-slate-700 ml-2 text-xs">
                  J&apos;accepte les{" "}
                  <a href="#">conditions générales de vente</a> ainsi que la
                  <a href="#">politique de confidentialité</a>.
                </label>
              </div>
              <button
                disabled={disabled}
                type="submit"
                className={`${
                  disabled ? "bg-green-700/70" : "bg-green-700"
                }  text-white w-full py-2 rounded-md mt-5 hover:bg-green-700/70 transition duration-150 easeInOut`}
              >
                Créer mon auto-entreprise
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
