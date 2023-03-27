import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";

const byNameSchema = z.object({
  name: z.string().default(""),
});

const byIdSchema = z.object({
  id: z.string().default(""),
});

export const clubRouter = createTRPCRouter({
  byName: publicProcedure.input(byNameSchema).query(async ({ input, ctx }) => {
    const { name } = input;
    try {
      return await ctx.dbProvider.getClubsByName(name);
    } catch (e) {
      console.log(e);
      return [];
    }
  }),
  byId: publicProcedure.input(byIdSchema).query(async ({ input, ctx }) => {
    const { id } = input;
    try {
      return await ctx.dbProvider.getClubById(id);
    } catch (e) {
      console.log(e);
      return [];
    }
  }),
});
