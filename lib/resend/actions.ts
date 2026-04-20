"use server";
import { FormData } from "@/components/forms/ContactForm";
import { resend } from ".";
import { ActionsResponse } from "../types";
//import { VolunteerSignupFormData } from "@/components/forms/VolunteerSignupForm";

const contactEmail = "contactus@hamiltonmosque.com";

export async function sendContactUsEmail(
  values: FormData
): Promise<ActionsResponse> {
  const { error } = await resend.emails.send({
    to: contactEmail,
    from: contactEmail,
    subject: "MAH Contact Form",
    replyTo: values.email,
    text: `
          First Name: ${values.firstName}
          Last Name: ${values.lastName}
          Email: ${values.email}
          Phone: ${values.phone}
          Inquiry: ${values.inquiry}
          Message: ${values.message}
          `,
  });

  if (error) {
    console.error({ error });
    return {
      message: "Something went wrong",
      success: false,
    };
  }

  return {
    message: "Email sent successfully",
    success: true,
  };
}

// export async function sendVolunteerInquiryEmail(
//   values: VolunteerSignupFormData
// ): Promise<ActionsResponse> {
//   const { error } = await resend.emails.send({
//     to: contactEmail,
//     from: contactEmail,
//     replyTo: values.email,
//     subject: "MAH Volunteer Inquiry Form",
//     text: `
//           Name: ${values.name}
//           Email: ${values.email}
//           Message: ${values.message}
//           `,
//   });

//   if (error) {
//     console.error({ error });
//     return {
//       message: "Something went wrong",
//       success: false,
//     };
//   }

//   return {
//     message: "Email sent successfully",
//     success: true,
//   };
//}
