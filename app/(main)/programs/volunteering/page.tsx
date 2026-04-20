import { Metadata } from "next";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Volunteering | Muslim Association of Hamilton",
  description:
    "Join our team of volunteers and help serve the Hamilton Muslim community through programs and events.",
};

export default function ProgramsVolunteerPage() {
  return (
    <div className="w-full justify-center items-center flex flex-col space-y-6">
      <div className="max-w-2xl space-y-2 text-center">
        <p className="text-primary">Volunteer Inquiry</p>
        <h1 className="text-5xl font-bold text-primary">
          We think you&#39;re a great fit!
        </h1>
        <br />
        <br />
        <p>
          We&#39;re always looking for dedicated volunteers to help us with our
          programs and events. If you&#39;re interested in volunteering, please
          fill out the form below and we&#39;ll get back to you as soon as
          possible.
        </p>
      </div>
      <a href="https://chat.whatsapp.com/GiC49gcgTl0B9qCcPJsHUL" target="_blank">
                  <Button
                    size={"lg"}
                    className="w-full rounded-xl mt-8 text-lg p-6"
                    variant={"special"}
                    
                  >
                    Join Us! 
                  </Button>
                </a>
    </div>
  );
}
