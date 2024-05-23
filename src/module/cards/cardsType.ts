import { nonempty } from "@/core/utils/formUtils";
import { z } from "zod";

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
};

export type UpdateCardParams = {
  userId: string;
  cardId: string;
}

export type InfosFormStateType = {
  url: string;
  displayText: string;
};

export type ErrorType = { errors: Record<string, string> };

export type CardState<T> = {
  card: {
    id?: number;
    cardFields: ContentFormSchemaType,
    cardDesign: DesignFromSchemaType,
    isPublished?: boolean,
    isDefault?: boolean,
    user?: string
    cardTemplate: T
  }
  errors?: boolean;
};

export type UpdateCardState<T> = {
  card: {
    id?: string;
    cardFields: ContentFormUpdateSchemaType,
    cardDesign: DesignFormUpdateSchemaType,
    isPublished?: boolean,
    isDefault?: boolean,
    user?: string
    cardTemplate?: T
  }
}


export const ContentFormSchema = z.object({
  id: z.number().optional(),
  prefix: z.string().pipe(nonempty),
  firstName: z.string().pipe(nonempty),
  middleName: z.string().optional(),
  lastName: z.string().pipe(nonempty),
  suffix: z.string().pipe(nonempty),
  bio: z.string().pipe(nonempty),
  phone: z.string().length(10),
  website: z.string().optional(),
  email: z.string().email(),
  // isDefault: z.boolean(),
  designation: z.string().pipe(nonempty),
  department: z.string().pipe(nonempty),
  company: z.string().pipe(nonempty),
});

export const ContentFormUpdateSchema = ContentFormSchema.extend({
  prefix: z.string().optional(),
  firstName: z.string().optional(),
  lastName: z.string().pipe(nonempty).optional(),
  suffix: z.string().pipe(nonempty).optional(),
  bio: z.string().pipe(nonempty).optional(),
  phone: z.string().length(10).optional(),
  email: z.string().email().optional(),
  // isDefault: z.boolean(),
  designation: z.string().pipe(nonempty).optional(),
  department: z.string().pipe(nonempty).optional(),
  company: z.string().pipe(nonempty).optional(),
})

export const DesignFormSchema = z.object({
  id: z.number().optional(),
  backgroundColor: z.string().pipe(nonempty),
  backgroundImage: z.string().optional(),
  logoUrl: z.string().pipe(nonempty),
  showLogo: z.boolean().optional(),
  showSocialIcons: z.boolean().optional(),
  darkMode: z.boolean().optional(),
})

export const DesignFormUpdateSchema = DesignFormSchema.extend({
  backgroundColor: z.string().pipe(nonempty).optional(),
  logoUrl: z.string().pipe(nonempty).optional(),
})

export type ContentFormSchemaType = z.infer<typeof ContentFormSchema>;
export type DesignFromSchemaType = z.infer<typeof DesignFormSchema>;
export type ContentFormUpdateSchemaType = z.infer<typeof ContentFormUpdateSchema>;
export type DesignFormUpdateSchemaType = z.infer<typeof DesignFormUpdateSchema>;



