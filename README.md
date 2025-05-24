# THIS IS A TEST

# Google Sheets Waitlist Integration

Provides functionality to add phone numbers to a Google Sheets waitlist. It uses Google's API services to interact with Google Sheets and includes data validation using Zod.

## Features

- Connects to Google Sheets using service account authentication
- Validates phone numbers before adding them to the waitlist
- Handles errors gracefully with appropriate error messages
- Uses environment variables for secure configuration

## Prerequisites

- Node.js installed
- Google Cloud Project with Google Sheets API enabled
- Service account credentials from Google Cloud Console

## Environment Variables

Create a `.env` file with the following variables:
