// import NavBar from "../../../components/NavBar";
import Hero from "@/components/Hero";
import NavBar from "../../../components/TailwindUi/NavBar";

const page = () => {
  return (
    <>
      <NavBar />
      {/* <NavBar nav={true} connexion={true} /> */}
      <main>
        <Hero />
      </main>
    </>
  );
};

export default page;
