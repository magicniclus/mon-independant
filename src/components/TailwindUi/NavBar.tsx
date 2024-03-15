/* eslint-disable @next/next/no-img-element */
"use client";

import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

const navigation = [
  { name: "Devenir auto-entrepreneur", href: "#" },
  { name: "Modification de votre situation", href: "#" },
  { name: "Cession de votre activité", href: "#" },
  { name: "Gestion de votre entreprise", href: "#" },
];

const NavBar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [path, setPath] = useState("");

  useEffect(() => {
    // This code runs only on the client side
    const currentPath = window.location.pathname; // Now safe to access window
    setPath(currentPath);
  }, []); // Empty array ensures this runs once on mount

  const pathParts = path.split("/"); // Split the path
  const valueAfterSlash = pathParts[1];

  return (
    <>
      <style jsx>{`
        .under {
          position: relative;
        }
        .under::after {
          position: absolute;
          bottom: -24px;
          left: 50%;
          content: "";
          display: block;
          width: 0%;
          height: 3px;
          background: #15803d;
          opacity: 0;
          transition: all 0.3s ease;
          transform: translateX(-50%);
        }
        .under:hover::after {
          width: 100%;
          opacity: 1;
          left: 0;
          transform: translateX(0%);
        }
        .underContinu::after {
          position: absolute;
          bottom: -24px;
          left: 0;
          content: "";
          display: block;
          width: 100%;
          height: 3px;
          background: #15803d;
        }
      `}</style>
      <header className=" lg:bg-slate-50 bg-white">
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <a href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Mon-independant.fr</span>
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=green&shade=700"
                alt="mon-independant.fr"
              />
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Ouvrir le menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12 flex items-center">
            <a
              href="/devenir-auto-entrepreneur"
              className=" leading-6 text-sm under"
            >
              <span
                className={`font-bold ${
                  valueAfterSlash === "devenir-auto-entrepreneur" &&
                  "text-green-700 underContinu"
                }`}
              >
                Devenir
              </span>{" "}
              <br /> auto-entrepreneur
            </a>
            <a href="#" className="text-sm leading-6 under">
              <span className="font-bold">Modification</span> <br /> de votre
              situation
            </a>
            <a href="#" className="text-sm leading-6 under">
              <span className="font-bold">Cession</span> <br /> de votre
              activité
            </a>
            <a href="#" className="text-sm leading-6 under">
              <span className="font-bold">Gestion</span> <br /> de votre
              entreprise
            </a>
            <a href="#" className="text-sm mx-auto">
              Nos tarifs
            </a>
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <a
              href="#"
              className="text-sm font-semibold leading-6 text-green-700 py-1 px-3 border border-green-700 bg-green-50 rounded-full hover:bg-green-700 hover:border-white hover:text-white transition-all duration-300 ease-in-out"
            >
              Mon Espace <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </nav>
        <Dialog
          as="div"
          className="lg:hidden"
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
        >
          <div className="fixed inset-0 z-10" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="/" className="-m-1.5 p-1.5">
                <span className="sr-only">Mon independant</span>
                <img
                  className="h-8 w-auto"
                  src="https://tailwindui.com/img/logos/mark.svg?color=green&shade=700"
                  alt="Mon independant"
                />
              </a>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-slate-700 hover:bg-gray-50"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className="py-6">
                  <a
                    href="#"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-slate-700 hover:bg-gray-50"
                  >
                    Nos tarifs
                  </a>
                  <a
                    href="#"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-green-700 hover:bg-gray-50"
                  >
                    Mon Espace
                  </a>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>
    </>
  );
};

export default NavBar;
