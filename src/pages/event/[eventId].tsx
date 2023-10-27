const EventPage = ({
    eventId
}: InferGetStaticPropsType<typeof getStaticProps>) => {
    const { data: event } = api.event.byId.useQuery({ id: eventId });

    console.log(event);

    if (!event) {
        return <div>
            Event Not Found.
        </div>
    }

    return <></>;
};
export default EventPage;

import { api } from "@src/utils/api";
import { db } from "@src/server/db";
import { appRouter } from "@src/server/api/root";
import { createInnerTRPCContext } from "@src/server/api/trpc";
import { createServerSideHelpers } from "@trpc/react-query/server";
import { GetServerSidePropsContext, GetStaticPaths, InferGetStaticPropsType } from "next";

export const getStaticPaths: GetStaticPaths = async () => {
    const events = await db.query.events.findMany();

    if (!events) {
        return {
            paths: [],
            fallback: false,
        }
    }

    const paths = events.map(event => ({
        params: {
            eventId: event.id,
        }
    }));

    return {
        paths,
        fallback: false
    };
}

export const getStaticProps = async (
    ctx: GetServerSidePropsContext<{eventId: string}>
) => {
    const helper = createServerSideHelpers({
        router: appRouter,
        ctx: createInnerTRPCContext({ session: null }),
    });

    const eventId = ctx.params?.eventId;
    if (typeof eventId !== 'string') {
        return {
            notFound: true,
        }
    }

    await helper.event.byId.prefetch({ id: eventId });
    return {
        props: {
            trpcState: helper.dehydrate(),
            eventId,
        }
    }
}