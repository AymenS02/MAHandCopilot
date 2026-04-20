import { Metadata } from "next";
import { SubscribeToNewsletterForm } from "@/components/forms/SubscribeToNewsletterForm";

export const metadata: Metadata = {
  title: "Subscribe | Muslim Association of Hamilton",
  description:
    "Subscribe to the MAH newsletter for the latest news, events, and community updates.",
};

export default function Subscribe() {
  return (
    <div className="w-full justify-center items-center flex flex-col space-y-4">
      <h1 className="text-5xl font-bold text-primary">Subscribe</h1>
      <p>
        Subscribe to our newsletter to stay up to date with our latest news and
        events.
      </p>

      <SubscribeToNewsletterForm className="mt-12 max-w-[500px]" />
    </div>
  );
}
