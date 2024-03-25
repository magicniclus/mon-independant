"use client";

import Banner from "@/components/Banner";
import NavBarLanding from "@/components/NavBarLanding";
import Step from "@/components/Step";
import StepManager from "@/components/StepManager";

const page = () => {
  return (
    <>
      <NavBarLanding />
      <main>
        <Banner />
        <div className="w-screen">
          <div className="max-w-6xl mx-auto mt-10 flex justify-between px-6 lg:px-8 mb-20">
            <Step />
            <StepManager />
          </div>
        </div>
      </main>
    </>
  );
};

export default page;
