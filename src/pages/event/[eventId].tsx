import Head from "next/head";
import Image from "next/image";
import { EventHeader } from "@src/components/Header";

const EventPage = ({
    eventId
}: InferGetStaticPropsType<typeof getStaticProps>) => {
    const { data: event } = api.event.byId.useQuery({ id: eventId });
    const { data: club } = api.club.byId.useQuery({ id: event ? event.clubId : "" });

    if (!event) {
        return <div>
            Event Not Found.
        </div>
    } else if (!club) {
        return <div>
            Club Does Not Exist.
        </div>
    }

    return <>
        <Head>
            <title>{event.name} - Jupiter</title>
            <meta name="description">{event.name} - Jupiter</meta>
        </Head>
        <main className="w-full md:pl-72">
            <EventHeader />
            <div className="mb-5 flex flex-col space-y-6 px-7">
                <div className="w-full h-full rounded-xl bg-slate-100 p-10 relative">
                    <Image
                        src={club.image}
                        width={100}
                        height={100}
                        alt="club image"
                    />
                    <hr className="border-0 bg-black h-[1px] my-3 mt-5" />
                    <div className="w-full flex justify-between mb-3 text-2xl">
                        <div>
                            <a className="font-bold" href={`/directory/${club.id}`}>{club.name}</a>
                            <p className="font-bold">{event.name}</p>
                        </div>
                        <p className="font-bold text-2xl">{new Date(event.startTime).toString().substring(0, 24)}</p>
                    </div>
                    <p className="text-2xl">
                        {event.description}
                    </p>
                    <div className="float-right mt-24">
                        <button className="py-1 px-3 mr-3 rounded-lg border-black border-[1px] bg-white">
                            Contact Us
                        </button>
                        <button className="py-1 px-3 rounded-lg border-black border-[1px] bg-white">
                            Register
                        </button>
                    </div>
                </div>
            </div>
        </main>
    </>;
};
export default EventPage;

import { api } from "@src/utils/api";
import { db } from "@src/server/db";
import { appRouter } from "@src/server/api/root";
import { createInnerTRPCContext } from "@src/server/api/trpc";
import { createServerSideHelpers } from "@trpc/react-query/server";
import { type GetServerSidePropsContext, type GetStaticPaths, type InferGetStaticPropsType } from "next";

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

export const getStaticProps = (
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

    // Date object provided, causes error
    // await helper.event.byId.prefetch({ id: eventId });
    return {
        props: {
            trpcState: helper.dehydrate(),
            eventId,
        }
    }
}