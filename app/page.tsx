import React from "react";
import CompanionCard from "@/components/CompanionCard";
import CompanionList from "@/components/CompanionList";
import CTA from "@/components/CTA";
import { getAllCompanions, getRecentSessions } from "@/lib/actions/companion.actions";
import { getSubjectColor } from "@/lib/utils";
const Page: React.FC = async () => {
  const companionSessions = await getAllCompanions({ limit: 3 });
  const recentSessions = await getRecentSessions(10);
  return (
    <main>
      <h1 className="">Popular Companions</h1>
      <section className="home-section">
        {companionSessions && companionSessions.length > 0 ? (
          companionSessions.map((companion) => (
            <CompanionCard key={companion.id} {...companion} color={getSubjectColor(companion.subject)} />
          ))
        ) : (
          <p className="text-muted-foreground">No companions available yet.</p>
        )}
      </section>

      <section className="home-section">
        <CompanionList title="Recently completed sessions" companions={recentSessions} classNames="lg:w-2/3 w-full" />
        <CTA />
      </section>
    </main>
  );
};
export default Page;
