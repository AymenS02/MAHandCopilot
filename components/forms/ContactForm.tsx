"use client";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReactQueryProvider } from "@/providers/ReactQueryProvider";
import { z } from "zod";
import { phone } from "phone";
import { useForm } from "react-hook-form";
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
import { cn } from "@/lib/utils";
import { Textarea } from "../ui/textarea";
import { useMutation } from "@tanstack/react-query";
import { sendContactUsEmail } from "@/lib/resend/actions";
import toast from "react-hot-toast";

const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email").min(1, "Email is required"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .refine((value) => phone(value).isValid, {
      message: "Invalid phone number",
    }),
  inquiry: z.string().min(1, "Inquiry is required"),
  message: z.string().min(1, "Message is required"),
});

export type FormData = z.infer<typeof formSchema>;
export type SubmitFunction = (values: FormData) => void;

const inquiryOptions = [
  { value: "marriage", label: "Marriage" },
  { value: "imam", label: "Imam & Conselling" },
  { value: "funeral", label: "Funeral" },
  { value: "donations", label: "Donations" },
  // { value: "facility-booking", label: "Facility Booking" },
  { value: "other", label: "Other" },
];

const ContactFormComponent = ({ className }: { className?: string }) => {
  const { mutate, isPending } = useMutation({
    mutationFn: async (values: FormData) => {
      const res = await sendContactUsEmail(values);

      if (res.success) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    },
  });

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      inquiry: "",
      message: "",
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) => mutate(values))}
        className={cn(className, "space-y-4 text-left w-full")}
      >
        <div className="flex justify-between gap-4 w-full">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem className="space-y-1 w-full">
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input className="h-10" placeholder="First name" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem className="space-y-1 w-full">
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input className="h-10" placeholder="Last name" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="space-y-1 w-full">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input className="h-10" placeholder="Email" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem className="space-y-1 w-full">
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input className="h-10" placeholder="Phone" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="inquiry"
          render={({ field }) => (
            <FormItem className="space-y-1 w-full">
              <FormLabel>Inquiry</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-wrap gap-4"
                >
                  {inquiryOptions.map((option) => (
                    <FormItem
                      className="flex items-center space-x-3 space-y-0"
                      key={option.value}
                    >
                      <FormControl>
                        <RadioGroupItem value={option.value} />
                      </FormControl>
                      <FormLabel className="font-normal">
                        {option.label}
                      </FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem className="space-y-1 w-full">
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Message"
                  className="h-[100px]"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isPending} type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export const ContactForm = ({ className }: { className?: string }) => {
  // Use mutation
  return (
    <ReactQueryProvider>
      <ContactFormComponent className={className} />
    </ReactQueryProvider>
  );
};
