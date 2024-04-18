import Header from "@src/components/BaseHeader";
import { getServerAuthSession } from "@src/server/auth";
import { api } from "@src/trpc/server";
import { signInRoute } from "@src/utils/redirect";
import { redirect, notFound } from "next/navigation";
import CreateDropdown from "./CreateDropdown";

const Page = async ({ params }: { params: { clubId: string } }) => {
	const session = await getServerAuthSession();
	if (!session) {
		redirect(signInRoute(`manage/${params.clubId}/create`));
	}

	const officerClubs = await api.club.getOfficerClubs.query();
	const currentClub = officerClubs.filter(val => {
		return val.id == params.clubId
	})[0];
	if (!currentClub) {
		notFound();
	}

	return (<main className="md:pl-72 h-screen">
		<Header />
		<div className="flex flex-row justify-between gap-20 px-5">
			<div className="flex-1 flex gap-[5.5rem]">
				<CreateDropdown clubId={params.clubId} officerClubs={officerClubs} />
			</div>
			<div className="w-[255px]">hello world</div>
		</div>
		
	</main>)
}
export default Page;