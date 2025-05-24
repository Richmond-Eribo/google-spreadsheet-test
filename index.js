import { z } from "zod";
// import { google } from "googleapis";
import dotenv from "dotenv";
import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";

dotenv.config();

const serviceAccountAuth = new JWT({
  email: process.env.GOOGLE_CLIENT_EMAIL,
  key: process.env.GOOGLE_PRIVATE_KEY,
  clientId: process.env.GOOGLE_CLIENT_ID,
  projectId: process.env.GOOGLE_PROJECT_ID,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const doc = new GoogleSpreadsheet(
  process.env.GOOGLE_SHEET_ID,
  serviceAccountAuth
);

const waitlistSchema = z.object({
  phone: z.number({ message: "must be a valid phone number" }),
});

async function addToWaitlist(phoneNumber) {
  await doc.loadInfo();
  const sheet = doc.sheetsByIndex[1];

  try {
    const validatedData = waitlistSchema.safeParse({
      phone: Number(phoneNumber),
    });

    if (!validatedData.success) {
      throw new Error(
        "Invalid phone number: " + validatedData.error.errors[0].message
      );
    }

    const res = await sheet.addRow({ "PHONE NUMBER": phoneNumber });

    return { success: true, message: "Successfully joined the waitlist" };
  } catch (error) {
    console.error("Failed to join waitlist:", error);
    return {
      success: false,
      message: "Failed to join waitlist",
      error: error.message,
    };
  }
}

addToWaitlist("1234567890").then(console.log);
