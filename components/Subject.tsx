"use client";
import React, { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { subjects } from "@/lib/constants";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery, removeKeysFromUrlQuery } from "@jsmastery/utils";

const SubjectFilter = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [subject, setSubject] = useState("");

  useEffect(() => {
    if (subject) {
      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "subject",
        value: subject,
      });
      router.push(newUrl, { scroll: false });
    } else {
      if (subject === "all") {
        const newUrl = removeKeysFromUrlQuery({
          params: searchParams.toString(),
          keysToRemove: ["subject"],
        });
        router.push(newUrl, { scroll: false });
      }
    }
  }, [subject, router, searchParams, pathname]);

  return (
    <section>
      <Select onValueChange={setSubject} value={subject} defaultValue="all">
        <SelectTrigger className="input capitalize">
          <SelectValue placeholder="Subject" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Subjects</SelectItem>
          {subjects.map((subject, index) => (
            <SelectItem value={subject} key={index} className="capitalize">
              {subject}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </section>
  );
};
export default SubjectFilter;
