import Banner from "@/components/Banner";
import NavBarLanding from "@/components/NavBarLanding";
import Step from "@/components/Step";

const page = () => {
  return (
    <>
      <NavBarLanding />
      <main>
        <Banner />
        <div className="w-screen">
          <div className="max-w-6xl mx-auto mt-10">
            <Step />
          </div>
        </div>
      </main>
    </>
  );
};

export default page;
