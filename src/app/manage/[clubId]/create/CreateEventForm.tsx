'use client'

import { useEffect } from "react";
import { type SelectClub } from "@src/server/db/models";
import { createEventSchema } from "@src/utils/formSchemas";
import { useForm } from "react-hook-form";
import { api } from "@src/trpc/react";
import { type z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { UploadIcon } from "@src/icons/Icons";
import TimeSelect from "./TimeSelect";

const CreateEventForm = ({ clubId, officerClubs }: { clubId: string, officerClubs: SelectClub[]}) => {
	const {
		register,
		handleSubmit,
		watch,
		setValue,
		getValues,
	} = useForm<z.infer<typeof createEventSchema>>({
		resolver: zodResolver(createEventSchema),
		defaultValues: {
			clubId: clubId,
		},
		mode: "onSubmit",
	});
	const router = useRouter();
	const [watchDescription, watchStartTime] = watch(['description', 'startTime']);
	useEffect(() => {
		const subscription = watch((data, {name}) => {
			if (name == "clubId") {
				router.replace(`/manage/${data.clubId}/create`);
			}
		});
		return () => subscription.unsubscribe();
	}, [router, watch]);

	const createMutation = api.event.create.useMutation({
		onSuccess: () => { location.reload(); }
	})

	const onSubmit = handleSubmit((data: z.infer<typeof createEventSchema>) => {
		if (!createMutation.isLoading) {
			createMutation.mutate(data);
		}
	});

	return (<form onSubmit={(e) => void onSubmit(e)} className="w-full flex flex-row flex-wrap justify-between gap-10 overflow-x-clip text-[#4D5E80] pb-4">
		<div className="form-fields flex flex-col flex-1 gap-10 min-w-[320px] max-w-[830px]">
			<div className="create-dropdown text-xl font-bold py-2">
				Create Club Event <span className="text-[#3361FF]">for </span>
				<select {...register("clubId")} className="bg-inherit text-[#3361FF] max-w-xs outline-none text-ellipsis overflow-hidden whitespace-nowrap" defaultValue={clubId}>
					{officerClubs.map((club) => {
						return (<option key={club.id} value={club.id}>{club.name}</option>)
					})}
				</select>
			</div>
			<div className="event-pic w-full">
				<h1 className="font-bold mb-4">Event Picture</h1>
				<p className="upload-label text-xs font-bold mb-11">Drag or choose file to upload</p>
				<div className="upload-box bg-[#E9EAEF] w-full h-48 rounded-md flex items-center flex-col justify-center gap-6">
					<UploadIcon />
					<p className="font-bold text-xs">JPEG, PNG, or SVG</p>
				</div>
			</div>
			<div className="event-details w-full flex flex-col gap-4">
				<h1 className="font-bold">Event Details</h1>
				<div className="event-name">
					<label className="text-xs font-bold mb-2 block" htmlFor="name">Event Name</label>
					<input type="text"
					className="rounded-md shadow-sm placeholder:text-[#7D8FB3] outline-none text-xs w-full p-2"
					placeholder="Event name" {...register("name")} />
				</div>
				<div className="event-location">
					<label className="text-xs font-bold mb-2 block" htmlFor="location">Location</label>
					<input type="text"
					className="rounded-md shadow-sm placeholder:text-[#7D8FB3] outline-none text-xs w-full p-2"
					placeholder="123 Fun Street" {...register("location")} />
				</div>
				<div className="event-description">
					<div className="desc-header flex w-full justify-between">
						<label className="text-xs font-bold mb-2 block" htmlFor="description">Description</label>
						<p className="text-xs">{watchDescription && watchDescription.length} of 1000 Characters used</p>
					</div>
					<textarea {...register("description")}
					className="rounded-md shadow-sm placeholder:text-[#7D8FB3] outline-none text-xs w-full p-2"
					placeholder="Event description" />
				</div>
			</div>
			<TimeSelect register={register} setValue={setValue} getValues={getValues} watchStartTime={watchStartTime} />
			<input className="bg-[#3361FF] text-white py-6 hover:cursor-pointer font-black text-xs rounded-md" type="submit" value="Create Event" />
		</div>
		<div className="form-preview w-64">hi</div>
	</form>)
}
export default CreateEventForm;