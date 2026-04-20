"use server";
import { ActionsResponse } from "../types";
import mailchimp from "@mailchimp/mailchimp_marketing";

export async function subscribeToNewsletter(
  email: string
): Promise<ActionsResponse> {
  if (!process.env.MAILCHIMP_AUDIENCE_ID) {
    return {
      message: "MAILCHIMP_AUDIENCE_ID is not set",
      success: false,
    };
  }

  mailchimp.setConfig({
    apiKey: process.env.MAILCHIMP_API_KEY,
    server: process.env.MAILCHIMP_SERVER_PREFIX,
  });

  try {
    await mailchimp.lists.addListMember(process.env.MAILCHIMP_AUDIENCE_ID!, {
      email_address: email,
      status: "subscribed",
    });

    return {
      message: "Successfully subscribed to newsletter",
      success: true,
    };
  } catch (error) {
    // @ts-expect-error Mailchimp API returns 400 status code
    if (error.status === 400) {
      return {
        message: "Email already subscribed",
        success: false,
      };
    }

    console.error(error);
    return {
      message: "Error subscribing to newsletter",
      success: false,
    };
  }
}
