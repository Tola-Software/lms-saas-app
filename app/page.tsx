import React from "react";
import CompanionCard from "@/components/CompanionCard";
import CompanionList from "@/components/CompanionList";
import CTA from "@/components/CTA";

const Page: React.FC = () => {
  return (
    <main>
      <h1 className="">Popular Companions</h1>
      <section className="home-section">
        <CompanionCard
          id="1"
          name="Neura the Brainy Explorer"
          topic="Neural Network of the Brain"
          subject="Science"
          duration={30}
          color="#E5D0FF"
        />
        <CompanionCard
          id="2"
          name="Countsy the Number Wizard"
          topic="Derivatives & Integrals"
          subject="Maths"
          duration={30}
          color="#BDE7FF"
        />
        <CompanionCard
          id="3"
          name="Verba the Vocabulary Builder"
          topic="Topic: English Literature "
          subject="Language"
          duration={30}
          color="#FFDA6E"
        />

      </section>

      <section className="home-section">
        <CompanionList />
        <CTA />
      </section>
    </main>
  );
};
export default Page;
