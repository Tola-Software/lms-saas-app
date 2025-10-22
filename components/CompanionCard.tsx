import React from "react";
import Image from "next/image";
import Link from "next/link";

interface CompanionCardProps {
  id: string;
  name: string;
  topic: string;
  subject: string;
  duration: number;
  color: string;
}
const CompanionCard = ({ id, name, topic, subject, duration, color }: CompanionCardProps) => (
  <article
    className="companion-card group"
    style={{
      background: `linear-gradient(135deg, ${color}15 0%, ${color}08 100%)`,
      borderColor: `${color}30`,
    }}
  >
    <div className="flex justify-between items-center">
      <div className="subject-badge">{subject}</div>
      <button className="companion-bookmark">
        <Image
          src="/icons/bookmark.svg"
          alt="bookmark"
          width={12.5}
          height={15}
          className="dark:invert dark:brightness-0 dark:contrast-200"
        />
      </button>
    </div>

    <h2 className="text-2xl font-bold text-foreground">{name}</h2>
    <p className="text-sm text-muted-foreground">{topic}</p>
    <div className="flex items-center gap-2">
      <Image
        src="/icons/clock.svg"
        alt="duration"
        width={13.5}
        height={13.5}
        className="dark:invert dark:brightness-0 dark:contrast-200"
      />
      <p className="text-sm text-muted-foreground">{duration} minutes</p>
    </div>
    <Link href={`/companions/${id}`}>
      <button className="btn-primary-red w-full justify-center">Launch Lesson</button>
    </Link>
  </article>
);
export default CompanionCard;
