import NavBar from "../../../components/NavBar";

const page = () => {
  return (
    <>
      <header className="w-full bg-slate-100">
        <NavBar nav={true} connexion={true} />
      </header>
      <main></main>
    </>
  );
};

export default page;
