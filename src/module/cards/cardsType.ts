import { nonempty } from "@/core/utils/formUtils";
import { z } from "zod";
import { UserType } from "../user/userType";

export interface SocialMediaInfo {
  id: string,
  categoryName: string,
  name: string
}

export type CardTemplatesType = {
  id: number;
  name: string;
  htmlCode: string;
  coverImage: string;
  version: string;
  cardTemplateCategory: {
    id: number;
    name: string;
  };
  defaultCardFields: ContentFormSchemaType
  defaultCardDesign: DesignFromSchemaType
};

export type UpdateCardParams<T> = {
  userId: string;
  cardId?: string;
  cardTemplate: T;
  cardSlug?: string;
  cardFields: ContentFormUpdateSchemaType,
  cardDesign: DesignFormUpdateSchemaType,
  cardInfos: InfosFormsUpdateSchemaType,
  cardBasics: CardBasicsUpdateType,
  isPublished: boolean,
  isDefault: boolean,
}

export type InfosFormStateType = {
  url: string;
  displayText: string;
};

export type ErrorType = { errors: Record<string, string> };

export type CardResponseType<T> = {
  id?: number;
  cardTemplate: T;
  slug?: string;
  title?: string;
  cardFields: ContentFormSchemaType,
  cardDesign: DesignFromSchemaType,
  cardInfos: Array<InfoSchemaType>,
  isPublished: boolean,
  isLiked: boolean,
  isConnected: boolean,
  isDefault: boolean,
  user?: UserType
  likes: number,
  views: number,
}

export type LikeCardResponse = {
  id: number,
  user: number,
  card: number
}

export const likeCardSchema = z.object({
  user: z.number(),
  card: z.number(),
})

export type LikeCardSchemaType = z.infer<typeof likeCardSchema>

export type CardState<T> = {
  id?: number;
  cardFields: { values: ContentFormSchemaType, errors: Record<string, Array<string>> },
  cardDesign: { values: DesignFromSchemaType, errors: Record<string, Array<string>> },
  cardInfos: { values: InfosFormsUpdateSchemaType, errors: Record<string, Record<string, Array<string>>> }
  cardBasics: { values: CardBasicsUpdateType, errors: Record<string, Array<string>> }
  isPublished?: boolean,
  isDefault?: boolean,
  user?: string
  cardTemplate: T
}

export type CreateCardResponseType<T> = {
  id?: number;
  cardFields: { values: ContentFormUpdateSchemaType, errors: Record<string, string> },
  cardDesign: { values: DesignFormUpdateSchemaType, errors: Record<string, string> },
  isPublished?: boolean,
  isDefault?: boolean,
  user?: string
  cardTemplate: T
}

export const ContentFormSchema = z.object({
  id: z.number().optional().nullable(),
  address: z.string().optional().nullable(),
  prefix: z.string().optional().nullable(),
  title: z.string().optional().nullable(),
  firstName: z.string().pipe(nonempty),
  middleName: z.string().optional().nullable(),
  lastName: z.string().pipe(nonempty),
  suffix: z.string().optional().nullable(),
  bio: z.string().optional().nullable(),
  phone: z.string().length(10),
  website: z.string().optional().nullable(),
  email: z.string().email(),
  designation: z.string().optional().nullable(),
  department: z.string().optional().nullable(),
  company: z.string().optional().nullable(),
});


export const ContentFormUpdateSchema = ContentFormSchema.extend({
  firstName: z.string().optional().nullable(),
  lastName: z.string().optional().nullable(),
  phone: z.string().length(10).optional().nullable(),
  email: z.string().email().optional().nullable(),
})

export const DesignFormSchema = z.object({
  id: z.number().optional().nullable(),
  backgroundColor: z.string().pipe(nonempty).optional().nullable(),
  foregroundColor: z.string().pipe(nonempty).optional().nullable(),
  backgroundImage: z.string().optional().nullable(),
  logo: z.string().optional().nullable(),
  showLogo: z.boolean().optional().nullable(),
  showSocialIcons: z.boolean().optional().nullable(),
  darkMode: z.boolean().optional().nullable(),

})

export const DesignFormUpdateSchema = DesignFormSchema.refine((data) => data.backgroundColor || data.backgroundImage, {
  message: "Either backgroundColor or backgroundImage must be provided",
  path: ["backgroundColor", "backgroundImage"],
})

export const InfoSchema = z.object({
  id: z.string().optional().nullable(),
  url: z.string().regex(/^https:\/\/[^\s$.?#].[^\s]*$/),
  displayText: z.string().optional().nullable(),
  cardInfoId: z.string().optional().nullable(),
  cardInfo: z.string().optional().nullable(),

})

export const InfosFormsSchema = z.record(z.string(), InfoSchema)
export const InfosFormsUpdateSchema = z.record(z.string(), InfoSchema.optional())

export const CardBasicsSchema = z.object({
  title: z.string().pipe(nonempty),
  slug: z.string().optional().nullable(),
})

export const CardBasicsUpdateSchema = CardBasicsSchema.extend({ title: z.string().optional().nullable(), })

export type CardBasicsType = z.infer<typeof CardBasicsSchema>
export type CardBasicsUpdateType = z.infer<typeof CardBasicsUpdateSchema>

export type InfoSchemaType = z.infer<typeof InfoSchema>
export type ContentFormSchemaType = z.infer<typeof ContentFormSchema>;
export type InfosFormsSchemaType = z.infer<typeof InfosFormsSchema>;
export type DesignFromSchemaType = z.infer<typeof DesignFormSchema>;

export type ContentFormUpdateSchemaType = z.infer<typeof ContentFormUpdateSchema>;
export type DesignFormUpdateSchemaType = z.infer<typeof DesignFormUpdateSchema>;
export type InfosFormsUpdateSchemaType = z.infer<typeof InfosFormsUpdateSchema>;




