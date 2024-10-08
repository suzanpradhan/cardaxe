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

export const inviteMembersSchema = z.object({
    email: z.string().email(),
    team: z.string().pipe(nonempty)
})

export type InviteMembersType = z.infer<typeof inviteMembersSchema>

export type TeamRequest = {
    id: number,
    email: string,
    team: number
}

export type Member = {
    id: number;
    team: number;
    user: number;
    card: number
}

export type Team = {
    title?: string,
    id?: number,
    name?: string,
    slug?: string,
    logo?: string,
    logoFile?: File,
    bio?: string,
    address?: string,
    founded_at?: string,
    founded_by?: string,
    ceo?: string,
    category?: CategoryType
    // categoryData?: CategoryType
}




