"use client";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { ReactQueryProvider } from "@/providers/ReactQueryProvider";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { subscribeToNewsletter } from "@/lib/mailchimp/actions";
import { useState } from "react";

const formSchema = z.object({
  email: z.string().email("Invalid email").min(1, "Email is required"),
});

export const SubscribeToNewsletterFormComponent = ({
  className,
}: {
  className?: string;
}) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (email: string) => {
      const res = await subscribeToNewsletter(email);

      if (res.success) {
        toast.success(res.message);
        setIsSubmitted(true);
      } else {
        toast.error(res.message);
      }
    },
  });

  return (
    <>
      {!isSubmitted ? (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((values) => mutate(values.email))}
            className={cn(
              className,
              "space-y-4 items-center justify-center flex flex-col w-full"
            )}
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isPending} className="w-full">
              Subscribe
            </Button>
          </form>
        </Form>
      ) : (
        <p>Thank you for subscribing!</p>
      )}
    </>
  );
};

export const SubscribeToNewsletterForm = ({
  className,
}: {
  className?: string;
}) => {
  return (
    <ReactQueryProvider>
      <SubscribeToNewsletterFormComponent className={className} />
    </ReactQueryProvider>
  );
};
