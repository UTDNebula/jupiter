'use client'
import type { 
	UseFormSetValue,
	UseFormGetValues,
	Control
} from "react-hook-form";
import {
	Controller
} from "react-hook-form";
import type { createEventSchema } from "@src/utils/formSchemas";
import type { z } from "zod";

interface Props {
	setValue: UseFormSetValue<z.infer<typeof createEventSchema>>,
	getValues: UseFormGetValues<z.infer<typeof createEventSchema>>,
	watchStartTime: Date,
	control: Control<z.infer<typeof createEventSchema>>,
}

const TimeSelect = ({ setValue, getValues, watchStartTime, control }: Props) => {
	return (<>
		<div className="event-duration flex gap-32">
			<div className="flex-1 justify-end flex flex-col">
				<h1 className="font-bold mb-2 block">Duration</h1>
				<label htmlFor="startTime" className="text-xs font-bold mb-2">Start Time</label>
				<Controller
					control={control}
					name="startTime"
					render={({ field: { value, ref, onChange } }) => (
						<input 
							ref={ref}
							type="datetime-local"
							value={value ? new Date(value.getTime() - value.getTimezoneOffset() * 60 * 1000).toISOString().slice(0, 16) : ""}
							onChange={(e) => {
								if (!getValues("endTime") || new Date(e.currentTarget.value) > getValues("endTime")) {
									// Add 1 hr to new start time
									setValue("endTime", new Date(new Date(e.currentTarget.value).getTime() + 60 * 60 * 1000));
								}
								onChange(new Date(e.currentTarget.value));
							}}
							className="outline-none w-full block p-2 text-xs rounded-md text-[#7D8FB3]" />
					)}
					rules={{
						required: true,
					}} />
			</div>
			<div className="flex-1 justify-end flex flex-col">
				<label htmlFor="endTime" className="text-xs font-bold mb-2">End Time</label>
				<Controller
					control={control}
					name="endTime"
					render={({ field: { value, ref, onChange } }) => (
						<input 
							ref={ref}
							type="datetime-local"
							min={watchStartTime ? new Date(new Date(watchStartTime).getTime() - new Date(watchStartTime).getTimezoneOffset() * 60 * 1000).toISOString().slice(0, 16) : ""}
							value={value ? new Date(value.getTime() - value.getTimezoneOffset() * 60 * 1000).toISOString().slice(0, 16) : ""}
							onChange={(e) => onChange(new Date(e.currentTarget.value))}
							className="outline-none w-full block p-2 text-xs rounded-md text-[#7D8FB3]" />
					)}
					rules={{
						required: true,
					}} />
			</div>
		</div>
	</>);
}
export default TimeSelect;