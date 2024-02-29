'use server';
import { api } from "@src/trpc/react";
import { feedbackFormSchema } from "@src/server/api/routers/form";

export async function handleForm( formData: FormData ) { 
    
    const data = feedbackFormSchema.parse({
        rating: formData.get('rating'),
        likes: formData.get('likes'),
        dislikes: formData.get('dislikes'),
        features: formData.get('features'),
        submit_on: new Date(),
    });

    const createForm = api.form.sendForm.useMutation( );
    
    const result = await createForm.mutate(data)
    
}