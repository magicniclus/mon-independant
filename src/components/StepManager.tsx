"use client";

import { useState } from "react";
import Coordonnee from "./molecules/createUserStep/Coordonnee";

const StepManager = () => {
  const [disabled, setDisabled] = useState(true);
  return (
    <section className="md:w-7/12 w-full">
      <form className="px-6 lg:px-8 text-slate-700 flex flex-col">
        {<Coordonnee />}
        <button
          type="button"
          className={`${
            disabled ? "bg-green-700/70" : "bg-green-700"
          }  text-white w-full py-2 rounded-md mt-10 hover:bg-green-700/70 transition duration-150 easeInOut`}
        >
          Continuer
        </button>
      </form>
    </section>
  );
};

export default StepManager;
