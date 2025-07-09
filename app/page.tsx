import React from "react";
import CompanionCard from "@/components/CompanionCard";
import CompanionList from "@/components/CompanionList";
import CTA from "@/components/CTA";
import { recentSessions } from "@/lib/constants";
import { getAllCompanions, getRecentSessions } from "@/lib/actions/companion.actions";
import { getSubjectColor } from "@/lib/utils";
const Page: React.FC = async () => {
  const copanionSessions = await getAllCompanions({ limit: 3 });
  const recentSessions = await getRecentSessions(10);
  return (
    <main>
      <h1 className="">Popular Companions</h1>
      <section className="home-section">
        {copanionSessions.map((companion) => (
          <CompanionCard key={companion.id} {...companion} color={getSubjectColor(companion.subject)} />
        ))}
      </section>

      <section className="home-section">
        <CompanionList title="Recently completed sessions" companions={recentSessions} classNames="lg:w-2/3 w-full" />
        <CTA />
      </section>
    </main>
  );
};
export default Page;
