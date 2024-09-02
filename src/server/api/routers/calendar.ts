
import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '../trpc';
import { google } from 'googleapis';
import { type OAuth2Client } from 'google-auth-library';
import { env } from '@src/env.mjs';

const byEventDetails = z.object({
    eventName: z.string(),
    startTime: z.date(),
    endTime: z.date(), 
    location: z.string().nullable(),
    description: z.string(), 
    tokens: z.object({
        access_token: z.string(),
        refresh_token: z.string().nullable(),
        id_token: z.string().nullable(),
    })

})

export const calendarRouter = createTRPCRouter({
  addEvent: publicProcedure
    .input(byEventDetails)
    .mutation( ( {input} ) => {
        const { eventName, startTime, endTime, location, tokens, description } = input;

        const oauth2Client : OAuth2Client = new google.auth.OAuth2({
            clientId: env.GOOGLE_CLIENT_ID ,
            clientSecret: env.GOOGLE_CLIENT_SECRET,
            redirectUri: env.NEXTAUTH_URL,
        })

        
        oauth2Client.setCredentials( {access_token: tokens.access_token, refresh_token: tokens.refresh_token, id_token: tokens.id_token });

        const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

        try {
            const response =  calendar.events.insert({
                calendarId: 'primary', 
                resource: {
                    summary: eventName,
                    description: description,
                    location: location, 
                    start: {
                        dateTime: startTime
                    },
                    end: {
                        dateTime: endTime
                    },
                }
            })

            return response
        } catch( error) {
            console.error("Recieved an error when trying to add event to calendar: ", error)
            throw error
        }



    }),
});
