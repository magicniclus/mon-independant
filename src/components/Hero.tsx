"use client";

import { CheckBadgeIcon } from "@heroicons/react/24/outline";

const Hero = () => {
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
      <section className="w-full bg-[url('/background/woman.jpg')] md:py-24 bg-no-repeat bg-cover bg-right relative background text-slate-700">
        <div className="px-6 lg:px-8 max-w-6xl mx-auto flex md:flex-row flex-col z-10 content">
          <div className="md:w-1/2 w-full">
            <h1 className=" text-white font-bold text-6xl">
              Créez votre <br /> auto-entreprise <br /> en quelques cliques
            </h1>
            <ul className=" text-white mt-8">
              <li className="mt-3 flex items-center">
                <CheckBadgeIcon className="h-7 w-auto text-green-700 mr-3" />{" "}
                Déclaration simplifiée au Statut Auto Entrepreneur 2024
              </li>
              <li className="mt-3 flex items-center">
                <CheckBadgeIcon className="h-7 w-auto text-green-700 mr-3" />
                Déclaration simple et rapide
              </li>
              <li className="mt-3 flex items-center">
                {" "}
                <CheckBadgeIcon className="h-7 w-auto text-green-700 mr-3" />
                Dossier traité sous 24h
              </li>
            </ul>
          </div>
          <div className="md:w-1/2 w-full flex justify-center">
            <form className="w-[80%] py-8 bg-white/85 rounded-md px-8 flex-col items-center">
              <h2 className="text-center font-semibold w-9/12 mx-auto">
                Formulaire de démarche en ligne simplifié
              </h2>
              <div className=" flex justify-between mt-5">
                <div className="w-[45%]">
                  <label htmlFor="nom" className="text-slate-700">
                    Nom
                  </label>
                  <input
                    type="text"
                    placeholder="Votre nom"
                    className="w-full border px-2 py-1 rounded-md border-slate-400 mt-2"
                  />
                </div>
                <div className="w-[45%]">
                  <label htmlFor="prenom" className="text-slate-700">
                    Prénom
                  </label>
                  <input
                    type="text"
                    placeholder="Votre prénom"
                    className="w-full border px-2 py-1 rounded-md border-slate-400 mt-2"
                  />
                </div>
              </div>
              <div className="w-full mt-3">
                <label htmlFor="email" className="text-slate-700">
                  Email
                </label>
                <input
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
                  className="mr-2 cursor-pointer"
                />
                <label htmlFor="cgu" className="text-slate-700 ml-3 text-xs">
                  J&apos;accepte les conditions générales de vente ainsi que la
                  politique de confidentialité
                </label>
              </div>
              <button className="bg-green-700 text-white w-full py-2 rounded-md mt-5 hover:bg-green-700/70 transition duration-150 easeInOut">
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
