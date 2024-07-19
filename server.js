import dotenv from 'dotenv';
import express from 'express';
import { google } from 'googleapis';
import open from 'open';

dotenv.config();
const app = express();
const port = 3000;

const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.REDIRECT_URI
);

const scopes = ['https://www.googleapis.com/auth/calendar'];

// Generate the url that will be used for the consent dialog.
const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
});

// Endpoint to initiate OAuth2 flow
app.get('/auth', (req, res) => {
    console.log("testing in auth");
    res.redirect(authUrl);
});

// OAuth2 callback endpoint
app.get('/oauth2callback', async (req, res) => {
    console.log("testing in outh2callback");
    const { code } = req.query;
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    res.redirect('/events');
});
app.get('/google/redirect', async (req, res) => {
    res.send("it is working fine google redicect");
    console.log("testing in outh2callback");
    const { code } = req.query;
    console.log("code", code);

    const { tokens } = await oauth2Client.getToken(code);
    console.log("tokens", tokens);
    oauth2Client.setCredentials(tokens);
    res.redirect('/events');
}   
);

// Endpoint to fetch calendar events
app.get('/events', async (req, res) => {
    console.log("testing in events");
    // const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
    // try {
    //     const response = await calendar.events.list({
    //         calendarId: 'primary',
    //         timeMin: new Date().toISOString(),
    //         maxResults: 10,
    //         singleEvents: true,
    //         orderBy: 'startTime',
    //     });

    //     const events = response.data.items;
    //     res.json(events);
    // } catch (error) {
    //     console.error('Error fetching events:', error);
    //     res.status(500).send('Error fetching events');
    // }

    console.log("testing to create events");

    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
    const event = {
        summary: 'Sample Event',
        location: '800 Howard St., San Francisco, CA 94103',
        description: 'A chance to hear more about Google\'s developer products.',
        start: {
            dateTime: '2024-07-18T09:00:00-07:00',
            timeZone: 'America/Los_Angeles',
        },
        end: {
            dateTime: '2024-07-18T17:00:00-07:00',
            timeZone: 'America/Los_Angeles',
        },
        recurrence: ['RRULE:FREQ=DAILY;COUNT=2'],
        attendees: [{ email: 'lpage@example.com' }, { email: 'sbrin@example.com' }],
        reminders: {
            useDefault: false,
            overrides: [
                { method: 'email', minutes: 24 * 60 },
                { method: 'popup', minutes: 10 },
            ],
        },
    };

    try {
        const eventResponse = await calendar.events.insert({
            calendarId: 'primary',
            resource: event,
        });

        res.json({
            message: 'Event created successfully',
            event: eventResponse.data,
        });
    } catch (error) {
        console.error('Error creating event:', error);
        res.status(500).send('Error creating event');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    // Automatically open the browser to start the OAuth2 flow
    open(`http://localhost:${port}/auth`);
});
