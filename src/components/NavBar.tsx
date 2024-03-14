"use client";

const NavBar = ({
  nav = true,
  connexion = true,
}: {
  nav?: boolean;
  connexion?: boolean;
}) => {
  const path = window.location.pathname; // '/ma-page'
  const pathParts = path.split("/"); // ['','ma-page']
  const valueAfterSlash = pathParts[1];

  console.log(valueAfterSlash);

  return (
    <>
      <style jsx>{`
        .under {
          position: relative;
        }
        .under::after {
          position: absolute;
          bottom: -20px;
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
          bottom: -20px;
          left: 0;
          content: "";
          display: block;
          width: 100%;
          height: 3px;
          background: #15803d;
        }
      `}</style>
      <nav className="max-w-6xl mx-auto flex justify-between items-center py-4 text-slate-700">
        <a className="text-green-700 text-lg" href="/">
          Mon
          <br />
          independant.fr
        </a>
        {nav && (
          <>
            <ul className="flex justify-between items-center">
              <li className="mr-7 under">
                <a href="/devenir-auto-entrepreneur">
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
              </li>
              <li className="mr-7 under">
                <a href="#">
                  <span className="font-bold">Modification</span> <br /> de
                  votre situation
                </a>
              </li>
              <li className="mr-7 under">
                <a href="#">
                  <span className="font-bold">Cession</span> <br /> de votre
                  activité
                </a>
              </li>
              <li className=" under">
                <a href="#">
                  <span className="font-bold">Gestion</span> <br /> de votre
                  entreprise
                </a>
              </li>
            </ul>
            <a href="#" className="">
              Nos tarifs
            </a>
          </>
        )}
        {connexion && (
          <a
            href="#"
            className="py-1 px-5 border border-green-700 text-green-700 bg-green-50 rounded-full hover:bg-green-700 hover:border-white hover:text-white transition-all duration-300 ease-in-out"
          >
            Mon Espace
          </a>
        )}
      </nav>
    </>
  );
};

export default NavBar;
