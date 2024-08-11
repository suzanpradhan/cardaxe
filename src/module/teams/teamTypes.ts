import { nonempty } from "@/core/utils/formUtils";
import { z } from "zod";

const imageFile = z.instanceof(File).refine(
    (file) => {
        const acceptedImageTypes = [
            'image/jpeg',
            'image/png',
            'image/gif',
            'image/bmp',
            'image/webp',
        ];
        return acceptedImageTypes.includes(file.type);
    },
    {
        message: 'Invalid file type. Only image files are allowed.',
    }
);

export const TeamFormSchema = z.object({
    name: z.string().pipe(nonempty),
    category: z.object({
        label: z.string().pipe(nonempty),
        value: z.string().pipe(nonempty),
    }),
    logo: imageFile.nullable(),
    bio: z.string().optional().nullable(),
    founders: z.string().optional().nullable(),
    ceo: z.string().optional().nullable(),
    foundedAt: z.date().optional().nullable(),

    headquater: z.string().optional().nullable(),
})

export type TeamFormType = z.infer<typeof TeamFormSchema>

export type CategoryType = {
    id: number,
    title: string
}




