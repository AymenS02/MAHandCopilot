import { Metadata } from "next";
import { ContactForm } from "@/components/forms/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us | Muslim Association of Hamilton",
  description:
    "Get in touch with the Muslim Association of Hamilton. Book an appointment or send us a message.",
};
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import Link from "next/link";

export default function ContactUs() {
  return (
    <div className="text-center items-center justify-center flex flex-col space-y-8">
      <h1 className="text-5xl font-bold text-primary">Get in touch</h1>
      <p>
        We&#39;d love to hear from you & how we can be of service. Please fill
        out this form.
      </p>
      
      {/* Appointments Section */}
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 max-w-md">
        <div className="flex items-center justify-center gap-2 mb-3">
          <Calendar className="text-primary" size={24} />
          <h2 className="text-xl font-semibold text-primary">Book an Appointment</h2>
        </div>
        <p className="text-gray-600 mb-4 text-sm">
          Need to schedule a meeting with our team? Book an appointment for personalized assistance.
        </p>
        <Link href="https://calendly.com/mah-meetings" target="_blank" rel="noopener noreferrer">
          <Button
            size="lg"
            className="w-full"
            variant="default"
          >
            Schedule Appointment
          </Button>
        </Link>
      </div>

      {/* Connecting text */}
      <div className="flex items-center gap-4 max-w-md">
        <div className="flex-1 h-px bg-gray-300"></div>
        <span className="text-gray-500 text-sm">or</span>
        <div className="flex-1 h-px bg-gray-300"></div>
      </div>
      
      <p className="text-gray-600 -mt-4">
        Contact us through the form below
      </p>

      <ContactForm className="mt-8 max-w-[500px]" />
    </div>
  );
}
