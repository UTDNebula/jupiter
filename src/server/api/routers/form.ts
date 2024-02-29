import { z } from 'zod';
import { createTRPCRouter, protectedProcedure } from '../trpc';
import { forms } from '@src/server/db/schema/forms';

export const feedbackFormSchema = z.object({
    rating: z.number().min(1).max(5),
    likes: z.string().default(''),
    dislikes: z.string().default(''),
    features: z.string().default(''),
    submit_on: z.date().default(new Date()),
})

export const formRouter = createTRPCRouter({
    sendForm: protectedProcedure.
        input(feedbackFormSchema).
        mutation( async ( {input, ctx}) => { 
            const { rating, likes, dislikes, features } = input; 

            await ctx.db
                .insert(forms)
                .values({ 
                         rating: rating,
                         likes : likes,
                         dislikes: dislikes,
                         features: features, 
                         submit_on: new Date(),
                        }).catch( (err) => {
                            console.log(err)
                            return { success: false}
                        })

            return { success: true } 
        } )
    })