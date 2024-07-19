# Google Calendar API Service

This service provides endpoints to create events and list all events in your Google Calendar using the Google Calendar API.

## Prerequisites

Before you can use this service, you'll need the following:

1. **Google Cloud Project**:
   - Create a project in the [Google Cloud Console](https://console.cloud.google.com/).
   - Enable the Google Calendar API for your project.
   - Create OAuth 2.0 credentials (Client ID and Client Secret) and download the JSON file.

2. **Node.js Environment**:
   - Ensure you have Node.js installed.
   - Install the required packages by running:
     ```bash
     npm install
     ```

3. **Set Up Your Environment**:
   - Create a `.env` file in the root directory of your project with the following content:
     ```plaintext
     GOOGLE_CLIENT_ID=your-client-id
     GOOGLE_CLIENT_SECRET=your-client-secret
     GOOGLE_REDIRECT_URI=your-redirect-uri
     ```

## Installation

Clone the repository and navigate to the project directory:

```bash
git clone https://github.com/Tapas071/gCalenderApiServer.git
cd gCalenderApiServer
