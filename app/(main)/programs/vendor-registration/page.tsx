import { Metadata } from "next";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Vendor Registration | Muslim Association of Hamilton",
  description:
    "Register as a vendor to offer your products and services to the Hamilton Muslim community.",
};

export default function ProgramsVendorRegistrationPage() {
  return (
    <div className="w-full justify-center items-center flex flex-col space-y-6">
      <div className="max-w-2xl space-y-2 text-center">
        <p className="text-primary">Vendor Registration</p>
        <h1 className="text-5xl font-bold text-primary">
          We think your business will add a great value to our community!
        </h1>
        <br />
        <br />
        <p>
          We&#39;re always looking to support our community businesses and provide a venue for sharing various products and services.
        </p>
        <br />
        <br />
        Please fill out the below application form for Vendor Registration. 
        
      </div>
      <a href="https://form.jotform.com/243367430900250" target="_blank">
                  <Button
                    size={"lg"}
                    className="w-full rounded-xl mt-8 text-lg p-6"
                    variant={"special"}
                    
                  >
                    Vendor Registration Form
                  </Button>
                </a>
                <br />
                <br />
                For further questions, please visit our Mountain Mosque admin office or email
                admin@hamiltonmosque.com
    </div>
  );
}
