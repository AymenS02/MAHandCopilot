import { Metadata } from "next";
import { ProgramEventsSection } from "@/components/sections/ProgramEventsSection";
import { PROGRAMS } from "@/lib/const";
import { ProgramId, ProgramType } from "@/lib/types";

export function generateMetadata({ params }: { params: { id: string } }): Metadata {
  const program = PROGRAMS[params.id as ProgramId] as ProgramType | undefined;
  if (!program) {
    return { title: "Program Not Found | Muslim Association of Hamilton" };
  }
  return {
    title: `${program.name} | Muslim Association of Hamilton`,
    description: program.description,
  };
}

export function generateStaticParams() {
  return Object.keys(PROGRAMS).map((id) => ({ id }));
}

export default function ProgramPage({ params }: { params: { id: string } }) {
  const id = params.id as ProgramId;

  const pageDetails = PROGRAMS[id] as ProgramType | undefined;

  if (!pageDetails) {
    return <div>Program not found.</div>;
  }

  return (
    <div className="w-full justify-center items-center flex flex-col space-y-8">
      <h1 className="text-5xl font-bold text-primary">{pageDetails.name}</h1>
      <p>{pageDetails.description}</p>
      <ProgramEventsSection programId={id} />
    </div>
  );
}
