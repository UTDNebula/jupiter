'use client'

import { useState, useMemo } from "react"
import { type SelectClub } from "@src/server/db/models"

const CreateDropdown = ({ clubId, officerClubs }: { clubId: string, officerClubs: SelectClub[] }) => {
	const [showDropdown, setShowDropdown] = useState(false);
	const selected = useMemo(() => {
		return officerClubs.filter((club) => club.id == clubId)[0];
	}, [clubId])
	
	return (<div className="create-dropdown relative">
		<button onClick={() => setShowDropdown(!showDropdown)} className="create-dropdown relative text-3xl font-bold text-[#4D5E80] py-2">
			Create Club Event <span className="text-[#3361FF]">for {selected?.name}</span>
			<span className="text-[#C3CAD9] inline-block scale-y-50 origin-center translate-x-5 align-middle">&#709;</span>
		</button>
	</div>);
}
export default CreateDropdown