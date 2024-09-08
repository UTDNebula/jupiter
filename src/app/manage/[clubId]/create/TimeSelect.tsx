'use client'
import { useEffect, useState } from "react";
import type { 
	UseFormRegister,
	UseFormSetValue,
	UseFormGetValues,
} from "react-hook-form";
import type { createEventSchema } from "@src/utils/formSchemas";
import type { z } from "zod";

interface Props {
	register: UseFormRegister<z.infer<typeof createEventSchema>>,
	setValue: UseFormSetValue<z.infer<typeof createEventSchema>>,
	getValues: UseFormGetValues<z.infer<typeof createEventSchema>>,
	watchStartTime: Date,
}

const TimeSelect = ({ register, setValue, getValues, watchStartTime }: Props) => {
	useEffect(() => {
		// If start time is after end time, set end time to start time
		console.log(getValues("endTime"));
		if ((new Date(watchStartTime) > new Date(getValues('endTime'))) 
			|| (watchStartTime !== undefined && getValues('endTime').toString() === "")) {
			setValue('endTime', watchStartTime);
		}
	}, [setValue, getValues, watchStartTime])

	return (<>
		<div className="event-duration flex gap-32">
			<div className="flex-1 justify-end flex flex-col">
				<h1 className="font-bold mb-2 block">Duration</h1>
				<label htmlFor="startTime" className="text-xs font-bold mb-2">Start Time</label>
				<input {...register("startTime")} 
					type="datetime-local"
					className="outline-none w-full block p-2 text-xs rounded-md text-[#7D8FB3]"
					/>
			</div>
			<div className="flex-1 justify-end flex flex-col">
				<label htmlFor="endTime" className="text-xs font-bold mb-2">End Time</label>
				<input {...register("endTime")} 
					type="datetime-local" 
					onInput={(e) => { if (new Date(e.currentTarget.value) < new Date(watchStartTime)) setValue('endTime', watchStartTime); }} 
					min={watchStartTime?.toString()}
					className="outline-none w-full block p-2 text-xs rounded-md text-[#7D8FB3]" 
					/>
			</div>
		</div>
	</>);
}
export default TimeSelect;