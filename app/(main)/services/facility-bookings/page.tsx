import { Metadata } from "next";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Facility Bookings | Muslim Association of Hamilton",
  description:
    "Book facilities at the Muslim Association of Hamilton for your events and gatherings.",
};

export default function FacilitybookingApplication() {
  return (
    <div className="flex flex-col space-y-2 justify-center items-center text-center h-full">
      <h1 className="text-4xl font-bold text-primary">
         Book your preferred facility for your event!
      </h1>
      <br />
      <br />
      <p>
        Please fill out the below application form for facility bookings. 
        <br />
        <br />
        For further questions, please visit our Mountain Mosque admin office or email
        admin@hamiltonmosque.com
      </p>
      <a href="https://form.jotform.com/243337632265255" target="_blank">
                  <Button
                    size={"lg"}
                    className="w-full rounded-xl mt-8 text-lg p-6"
                    variant={"special"}
                    
                  >
                    Facility Booking Application Form
                  </Button>
                </a>
    </div>
    
  );
}
