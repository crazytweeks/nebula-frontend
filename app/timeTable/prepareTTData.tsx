"use client";

import ClassSectionComponent from "@/components/timeTable/classSection";
import SubjectsComponent from "@/components/timeTable/subject";
import db from "@/lib/pg/ghConnection";
import { ClassSection, Subject } from "@/lib/pg/timeTable";
import { awaitFor, cn } from "@/lib/utils";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import React, { FC, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
  classes: ClassSection[];
  subjects: Subject[];
}

const PrepareTTData: FC<Props> = ({ classes, subjects }) => {
  const router = useRouter();

  const [selectedClass, setSelectedClass] = useState<string | undefined>();
  const [selectedSubject, setSelectedSubject] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      if (selectedClass && selectedSubject) {
        setLoading(true);

        await awaitFor(2000);

        router.push(
          `/timeTable/tt?class=${selectedClass}&sub=${selectedSubject}`
        );
      }
    })();

    return () => {
      setLoading(false);
    };
  }, [selectedClass, selectedSubject]);

  return (
    <div>
      <div
        className={cn(
          "flex w-full items-center justify-between",
          "p-2",
          "gap-2"
        )}
      >
        <ClassSectionComponent
          classes={classes}
          selectedClass={selectedClass}
          setSelectedClass={setSelectedClass}
        />
        <SubjectsComponent
          subjects={subjects}
          selectedSubject={selectedSubject}
          setSelectedSubject={setSelectedSubject}
        />
      </div>

      <Button
        className="m-2"
        size="sm"
        color="primary"
        as={Link}
        isDisabled={!selectedClass || !selectedSubject}
        href={`/timeTable/tt?class=${selectedClass}&sub=${selectedSubject}`}
      >
        Go to Time Table
      </Button>

      {loading && <p>Loading...</p>}
    </div>
  );
};

export default PrepareTTData;
