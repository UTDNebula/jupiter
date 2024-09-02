
import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '../trpc';
import { and, eq } from 'drizzle-orm';
import { accounts } from '@src/server/db/schema/users';


const byUserID = z.object({
    userId: z.string(),
    provider: z.string()
})

export const accountRouter = createTRPCRouter({
  getToken: publicProcedure
    .input(byUserID)
    .query( async({input, ctx}) => {
        
        const { userId, provider } = input;
        
        try {
            const account = await ctx.db.query.accounts.findFirst({
                where: and( 
                    eq( accounts.provider, provider ),
                    eq( accounts.userId, userId ),
                )
            })

            if ( ! account ) { 
                console.error("Unable to find account in the database!")
                throw new Error("Unable to find Acccount in database!")
            }
            if ( ! account.access_token ) {
                console.log("Access token for user is empty!")
                account.access_token = ""
            }
            
            const token = {
                access_token:  account.access_token,
                refresh_token: account.refresh_token,
                id_token:      account.id_token,
            }

            return token
        } catch ( error ) {
            console.error("Error when trying to grab account from database: ", error)
            throw error
        }
    }),
});
