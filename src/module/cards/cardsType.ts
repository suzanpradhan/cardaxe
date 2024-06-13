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
  // cardInfos: 
  isPublished: boolean,
  isDefault: boolean,
  user?: string
}

export type CardState<T> = {
  id?: number;
  cardFields: { values: ContentFormSchemaType, errors: Record<string, Array<string>> },
  cardDesign: { values: DesignFromSchemaType, errors: Record<string, Array<string>> },
  cardInfos: { values: InfosFormsSchemaType, errors: Record<string, Array<string>> }
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
  address: z.string().optional(),
  prefix: z.string().optional(),
  firstName: z.string().pipe(nonempty),
  middleName: z.string().optional(),
  lastName: z.string().pipe(nonempty),
  suffix: z.string().optional(),
  bio: z.string().optional().nullable(),
  phone: z.string().length(10),
  website: z.string().optional(),
  email: z.string().email(),
  designation: z.string().optional(),
  department: z.string().optional(),
  company: z.string().optional(),
});


export const ContentFormUpdateSchema = ContentFormSchema.extend({
  prefix: z.string().optional(),
  firstName: z.string().optional(),
  lastName: z.string().pipe(nonempty).optional(),
  suffix: z.string().pipe(nonempty).optional(),
  bio: z.string().pipe(nonempty).optional().nullable(),
  phone: z.string().length(10).optional(),
  email: z.string().email().optional(),
  designation: z.string().pipe(nonempty).optional(),
  department: z.string().pipe(nonempty).optional(),
  company: z.string().pipe(nonempty).optional(),
})

export const DesignFormSchema = z.object({
  id: z.number().optional(),
  backgroundColor: z.string().pipe(nonempty),
  backgroundImage: z.string().optional(),
  logo: z.string().optional(),
  showLogo: z.boolean().optional(),
  showSocialIcons: z.boolean().optional(),
  darkMode: z.boolean().optional(),
})

export const DesignFormUpdateSchema = DesignFormSchema.extend({
  backgroundColor: z.string().pipe(nonempty).optional(),
  logo: z.string().pipe(nonempty).optional(),
})

export const InfosFormsSchema = z.array(z.object({
  id: z.string().optional(),
  url: z.string().pipe(nonempty),
  displayText: z.string().pipe(nonempty),
  cardInfo: z.string().pipe(nonempty),
  card: z.string().optional()
}))

// export const InfosFormsSchema = z.record(
//   z.string().url('The object property name should be a valid URI.'),
//   z.string(),
// ).refine(
//   obj => Object.keys(obj).length <= 1,
//   'The object can contain only one property.'
// ).array()

export type ContentFormSchemaType = z.infer<typeof ContentFormSchema>;
export type InfosFormsSchemaType = z.infer<typeof InfosFormsSchema>;

export type DesignFromSchemaType = z.infer<typeof DesignFormSchema>;
export type ContentFormUpdateSchemaType = z.infer<typeof ContentFormUpdateSchema>;
export type DesignFormUpdateSchemaType = z.infer<typeof DesignFormUpdateSchema>;



