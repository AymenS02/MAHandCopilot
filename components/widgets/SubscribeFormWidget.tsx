import { SubscribeForm } from "../forms/SubscribeForm";

export const SubscribeFormWidget = () => {
  return (
    <div className="max-w-md">
      <p className="text-xl font-semibold">Newsletter</p>
      <p className="mt-1 mb-2">
        Subscribe to our newsletter for the latest updates, events, and insights
        straight to your inbox!
      </p>
      <SubscribeForm />
    </div>
  );
};
