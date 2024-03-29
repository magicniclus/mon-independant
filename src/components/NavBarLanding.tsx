/* eslint-disable @next/next/no-img-element */
"use client";

import { PhoneIcon } from "@heroicons/react/20/solid";

const NavBarLanding = () => {
  return (
    <>
      <style jsx>{`
        .lign:before {
          content: "";
          position: absolute;
          top: 0%;
          left: -20px;
          width: 1px;
          height: 100%;
          background-color: #c2c2c2;
        }
      `}</style>
      <header className="bg-white text-slate-700">
        <nav
          className="mx-auto flex max-w-6xl items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex">
            <div className="-m-1.5 p-1.5">
              <span className="sr-only">Mon-independant.fr</span>
              <img
                className="h-12 w-auto"
                src="/logoWithName.png"
                alt="mon-independant.fr"
              />
            </div>
          </div>
          <div className="flex items-center justify-center relative">
            <PhoneIcon className="h-6 w-6 text-green-700 mr-4" />
            <div className="flex flex-col justify-between">
              <a
                href="tel:0979797903"
                className="font-semibold text-sm text-green-700"
              >
                09 79 79 79 03
              </a>
              <p className="text-xs">Du lundi au vendredi - de 9h à 19h</p>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default NavBarLanding;
