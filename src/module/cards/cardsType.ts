import { nonempty } from "@/core/utils/formUtils";
import { z } from "zod";

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
  cardId: string;
  cardTemplate: T;
  cardFields: ContentFormUpdateSchemaType,
  cardDesign: DesignFormUpdateSchemaType,
  cardInfos: InfosFormsUpdateSchemaType,
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
  cardFields: ContentFormSchemaType,
  cardDesign: DesignFromSchemaType,
  cardInfos: Array<InfoSchemaType>,
  isPublished: boolean,
  isDefault: boolean,
  user?: string
}

export type CardState<T> = {
  id?: number;
  cardFields: { values: ContentFormSchemaType, errors: Record<string, Array<string>> },
  cardDesign: { values: DesignFromSchemaType, errors: Record<string, Array<string>> },
  cardInfos: { values: InfosFormsUpdateSchemaType, errors: Record<string, Record<string, string>> }
  isPublished?: boolean,
  isDefault?: boolean,
  user?: string
  cardTemplate: T
}

export type UpdateCardState<T> = {
  id?: number;
  cardFields: { values: ContentFormUpdateSchemaType, errors: Record<string, string> },
  cardDesign: { values: DesignFormUpdateSchemaType, errors: Record<string, string> },
  isPublished?: boolean,
  isDefault?: boolean,
  user?: string
  cardTemplate: T
}

export const ContentFormSchema = z.object({
  id: z.number().optional(),
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
  id: z.number().optional().nullable(),
  prefix: z.string().optional().nullable(),
  title: z.string().optional().nullable(),
  firstName: z.string().optional().nullable(),
  lastName: z.string().pipe(nonempty).optional().nullable(),
  suffix: z.string().pipe(nonempty).optional().nullable(),
  bio: z.string().pipe(nonempty).optional().nullable().nullable(),
  phone: z.string().length(10).optional().nullable(),
  email: z.string().email().optional().nullable(),
  designation: z.string().optional().nullable(),
  department: z.string().optional().nullable(),
  company: z.string().optional().nullable(),
})

export const DesignFormSchema = z.object({
  id: z.number().optional().nullable(),
  backgroundColor: z.string().pipe(nonempty).optional().nullable(),
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
  id: z.string().optional(),
  url: z.string().optional(),
  displayText: z.string().optional(),
  cardInfoId: z.string().optional(),
  cardInfo: z.string().optional(),

})

export const InfosFormsSchema = z.record(z.string(), InfoSchema)
export const InfosFormsUpdateSchema = z.record(z.string(), InfoSchema.optional())

export type InfoSchemaType = z.infer<typeof InfoSchema>
export type ContentFormSchemaType = z.infer<typeof ContentFormSchema>;
export type InfosFormsSchemaType = z.infer<typeof InfosFormsSchema>;
export type DesignFromSchemaType = z.infer<typeof DesignFormSchema>;

export type ContentFormUpdateSchemaType = z.infer<typeof ContentFormUpdateSchema>;
export type DesignFormUpdateSchemaType = z.infer<typeof DesignFormUpdateSchema>;
export type InfosFormsUpdateSchemaType = z.infer<typeof InfosFormsUpdateSchema>;




