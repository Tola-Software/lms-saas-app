import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn, getSubjectColor } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

interface CompanionsListProps {
  title: string;
  companions?: Companion[];
  classNames?: string;
}

const CompanionsList = ({ title, companions, classNames }: CompanionsListProps) => {
  return (
    <article className={cn("companion-list", classNames)}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-bold text-3xl">{title}</h2>
        {companions && companions.length > 0 && (
          <span className="text-sm text-muted-foreground">
            {companions.length} {companions.length === 1 ? "session" : "sessions"}
          </span>
        )}
      </div>

      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent border-b-2">
            <TableHead className="text-base font-semibold w-2/3">Lessons</TableHead>
            <TableHead className="text-base font-semibold">Subject</TableHead>
            <TableHead className="text-base font-semibold text-right">Duration</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {companions?.map(({ id, subject, name, topic, duration }, index) => (
            <TableRow key={id || `companion-${index}`} className="group hover:bg-secondary/30 transition-colors">
              <TableCell className="py-4">
                <Link href={`/companions/${id}`} className="block">
                  <div className="flex items-center gap-4">
                    <div
                      className="size-[72px] flex items-center justify-center rounded-lg max-md:hidden"
                      style={{ backgroundColor: getSubjectColor(subject) }}
                    >
                      <Image src={`/icons/${subject}.svg`} alt={subject} width={35} height={35} />
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="font-bold text-xl group-hover:text-accent transition-colors">{name}</p>
                      <p className="text-base text-muted-foreground line-clamp-1">{topic}</p>
                    </div>
                  </div>
                </Link>
              </TableCell>
              <TableCell className="py-4">
                <div className="subject-badge w-fit max-md:hidden">{subject}</div>
                <div
                  className="flex items-center justify-center rounded-lg w-fit p-2 md:hidden"
                  style={{ backgroundColor: getSubjectColor(subject) }}
                >
                  <Image src={`/icons/${subject}.svg`} alt={subject} width={18} height={18} />
                </div>
              </TableCell>
              <TableCell className="py-4">
                <div className="flex items-center gap-2 w-full justify-end">
                  <p className="text-xl font-semibold">
                    {duration} <span className="max-md:hidden">mins</span>
                  </p>
                  <Image src="/icons/clock.svg" alt="minutes" width={14} height={14} className="md:hidden" />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </article>
  );
};

export default CompanionsList;
