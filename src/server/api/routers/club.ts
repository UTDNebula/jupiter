import { eq, ilike, sql, and} from 'drizzle-orm';
import { createTRPCRouter, protectedProcedure, publicProcedure } from '../trpc';
import { z } from 'zod';
import { selectClub } from '@src/server/db/models';
import { userMetadataToClubs } from '@src/server/db/schema';
import { club } from '@src/server/db/schema';
const byNameSchema = z.object({
  name: z.string().default(''),
});

const byIdSchema = z.object({
  id: z.string().default(''),
});

const  joinLeaveSchema = z.object({
  clubid: z.string().default(''),
});


const allSchema = z.object({
  tag: z.string().nullish(),
});

export const clubRouter = createTRPCRouter({
  byName: publicProcedure.input(byNameSchema).query(async ({ input, ctx }) => {
    const { name } = input;
    const clubs = await ctx.db.query.club.findMany({
      where: (club) => ilike(club.name, `%${name}%`),
    });

    if (name === '') return clubs;

    return clubs.slice(0, 5);
  }),
  byId: publicProcedure.input(byIdSchema).query(async ({ input, ctx }) => {
    const { id } = input;
    try {
      const byId = await ctx.db.query.club.findFirst({
        where: (club) => eq(club.id, id),
        with: { contacts: true },
      });

      return byId;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }),
  all: publicProcedure.input(allSchema).query(async ({ ctx, input }) => {
    try {
      let query = ctx.db.select().from(club);
      if (input.tag && typeof input.tag == 'string' && input.tag !== 'All')
        query = query.where(sql`${input.tag} = ANY(tags)`);
      query = query.orderBy(sql`RANDOM()`).limit(20);
      const res = await query;
      return res;
    } catch (e) {
      console.error(e);
      return [];
    }
  }),
  distinctTags: publicProcedure.query(async ({ ctx }) => {
    try {
      const tags = await ctx.db.selectDistinct({ tags: club.tags }).from(club);
      const tagSet = new Set<string>(['All']);
      tags.forEach((club) => {
        club.tags.forEach((tag) => {
          tagSet.add(tag);
        });
      });
      return Array.from(tagSet);
    } catch (e) {
      console.error(e);
      return [];
    }
  }),
  joinLeave: protectedProcedure.input(joinLeaveSchema).mutation(async ({ctx, input}) =>{
    const joinuserID = ctx.session.user.id;
    const {clubid} = input;
    const dataExists = await ctx.db.query.userMetadataToClubs.findFirst({
      where: (userMetadataToClubs) => and(eq(userMetadataToClubs.userId, joinuserID),eq(userMetadataToClubs.clubId, clubid))
    }); 
    if(dataExists){
      await ctx.db.delete(userMetadataToClubs).where(and(eq(userMetadataToClubs.userId,joinuserID),eq(userMetadataToClubs.clubId, clubid)));
    } else{
      await ctx.db.insert(userMetadataToClubs).values({userId: joinuserID, clubId:clubid});
      
    }
    return dataExists;
  }),
  alreadyJoined: protectedProcedure.input(joinLeaveSchema).query(async ({ctx, input}) =>{
    const joinuserID = ctx.session.user.id;
    const {clubid} = input;
      const isJoined = await ctx.db.query.userMetadataToClubs.findFirst({
        where: (userMetadataToClubs) => and(eq(userMetadataToClubs.userId, joinuserID),eq(userMetadataToClubs.clubId, clubid))
      }); 
      if(isJoined){
        return true;
      } else{
        return false;
      }



    /*
    const dataExists = await ctx.db.query.userMetadataToClubs.findFirst({
      where: (userMetadataToClubs) => and(eq(userMetadataToClubs.userId, joinuserID),eq(userMetadataToClubs.clubId, clubid))
    }); 
    if(dataExists){
      return dataExists;
    }*/
  }),
    

});
