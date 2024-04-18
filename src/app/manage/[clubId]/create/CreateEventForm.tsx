'use client'

import { useState } from "react";
import { type SelectClub } from "@src/server/db/models";
import { createEventSchema } from "@src/utils/formSchemas";
import { useForm } from "react-hook-form";
import { api } from "@src/trpc/react";
import { type z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

const CreateEventForm = ({ clubId, officerClubs }: { clubId: string, officerClubs: SelectClub[]}) => {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<z.infer<typeof createEventSchema>>({
		resolver: zodResolver(createEventSchema),
		defaultValues: {
			clubId: clubId,
		}
	});

	const router = useRouter();

	const createMutation = api.event.createEvent.useMutation({
		onSuccess: () => { router.refresh() }
	})

	const onSubmit = handleSubmit((data) => {
		if (createMutation.isLoading) return;

		createMutation.mutate(data);
	});
}