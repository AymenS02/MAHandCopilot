import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Zakaat Application | Muslim Association of Hamilton",
  description:
    "Apply for Zakaat assistance programs at the Muslim Association of Hamilton.",
};

export default function ZakaatApplication() {
  return (
    <div className="flex flex-col space-y-2 justify-center items-center text-center h-full">
      <h1 className="text-4xl font-bold text-primary">
        We are excited to launch the online applications soon!
      </h1>
      <p>Zakat Applications are currently in person only.</p>
      <p>
        Please visit the Mountain Mosque admin office or email
        admin@hamiltonmosque.com to get a copy of the application and additional
        instructions.
      </p>
    </div>
  );
}
