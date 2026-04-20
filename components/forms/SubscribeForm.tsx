"use client";
import { Input } from "@/components/ui/input";
import { subscribeToNewsletter } from "@/lib/mailchimp/actions";
import { ReactQueryProvider } from "@/providers/ReactQueryProvider";
import { useMutation } from "@tanstack/react-query";
import { Send } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export const SubscribeFormComponent = () => {
  const [email, setEmail] = useState("");

  const { mutate, isError, error } = useMutation({
    mutationFn: async (email: string) => {
      const res = await subscribeToNewsletter(email);

      if (!email) {
        return;
      }

      if (res.success) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    },
  });

  useEffect(() => {
    if (isError) {
      setEmail("");
      toast.error(error?.message);
    }
  }, [isError, error?.message]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        mutate(email);
      }}
      className="flex gap-2 p-2 items-center bg-white rounded-xl text-primary"
    >
      <Input
        placeholder="Email Address"
        className="rounded-none shadow-none focus-visible:ring-0 text-lg border-none outline-none focus:outline-none focus:border-none"
        type={"email"}
        // value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button className="text-white bg-primary p-2 rounded-xl">
        <Send />
      </button>
    </form>
  );
};

export const SubscribeForm = () => {
  return (
    <ReactQueryProvider>
      <SubscribeFormComponent />
    </ReactQueryProvider>
  );
};
