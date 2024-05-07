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
	const [multiDay, setMultiDay] = useState(false);
	const [numHours, setNumHours] = useState(2);

	useEffect(() => {
		// If not multi-day, set end time to start time + numHours
		if (!multiDay && watchStartTime !== undefined) {
			const date = new Date(watchStartTime);
			date.setHours(date.getHours() + numHours);
			setValue("endTime", date);
		}

		// If start time is after end time, set end time to start time
		if (new Date(watchStartTime) > new Date(getValues('endTime'))) {
			setValue('endTime', watchStartTime);
		}
	}, [setValue, getValues, watchStartTime, multiDay, numHours])

	return (<>
		<div className="multi-day flex justify-between w-full">
			<div className="left">
				<h1 className="font-bold mb-2">Multi-Day Event</h1>
				<p className="font-bold text-xs">Does the event last longer than one day?</p>
			</div>
			<div className="right">
				<div className="h-fit flex items-center gap-6">
					<div
					className={`toggle-multi-day relative hover:cursor-pointer ${multiDay ? "bg-[#3361FF] after:bg-white after:translate-x-[20px]" : "bg-white after:bg-[#E1E5ED]"} w-[50px] h-[30px] rounded-2xl transition-colors duration-150 after:top-[2px] after:absolute after:left-[2px] after:transition-tranform after:duration-150 after:rounded-2xl after:content-[''] after:h-[26px] after:w-[26px]`} 
					onClick={() => {
						// If switching to multiDay, clear endTime
						if (!multiDay) {
							setValue('endTime', new Date(NaN));
						}
						setMultiDay(!multiDay);
					}} ></div>
					<p className="font-bold inline-block w-[30px] text-right text-xs">{multiDay ? "Yes" : "No"}</p>
				</div>
			</div>
		</div>
		<div className="event-duration flex gap-32">
			<div className="flex-1 justify-end flex flex-col">
				<h1 className="font-bold mb-2 block">Duration</h1>
				<label htmlFor="startTime" className="text-xs font-bold mb-2">Start Time</label>
				<input {...register("startTime")} type="datetime-local" className="outline-none w-full block p-2 text-xs rounded-md text-[#7D8FB3]" />
			</div>
			{ multiDay ?
			<div className="flex-1 justify-end flex flex-col">
				<label htmlFor="endTime" className="text-xs font-bold mb-2">End Time</label>
				<input {...register("endTime")} type="datetime-local" 
					onInput={(e) => { if (new Date(e.currentTarget.value) < new Date(watchStartTime)) setValue('endTime', watchStartTime); }} 
					min={watchStartTime?.toString()} 
					className="outline-none w-full block p-2 text-xs rounded-md text-[#7D8FB3]" 
					/>
			</div>
			:
			<div className="flex-1 justify-end flex flex-col">
				<label htmlFor="endTime" className="text-xs font-bold mb-2">Number of Hours</label>
				<select className="outline-none p-[9px] text-xs rounded-md" id="endTime" value={numHours} onInput={(e) => {setNumHours(Number(e.currentTarget.value))}}>
					{Array(24).fill(0).map((_, i) => (
						<option className="" value={i+1} key={i}>{i+1} Hour{i+1 > 1 && "s"}</option>
					))}
				</select>
			</div>
			}
		</div>
	</>);
}
export default TimeSelect;