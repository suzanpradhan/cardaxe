import { nonempty } from "@/core/utils/formUtils";
import { z } from "zod";

export type CardTemplatesType = {
  id: number;
  name: string;
  html_code: string;
  cover_image: string;
  version: string;
  card_template_category: {
    id: number;
    name: string;
  };
  default_card_fields: ContentFormSchemaType
};


export const ContentFormSchema = z.object({
  id: z.number().optional(),
  prefix: z.string().pipe(nonempty),
  firstName: z.string().pipe(nonempty),
  middleName: z.string().optional(),
  lastName: z.string().pipe(nonempty),
  suffix: z.string().pipe(nonempty),
  bio: z.string().pipe(nonempty),
  phone: z.string().pipe(nonempty),
  website: z.string().optional(),
  email: z.string().email(),
  // isDefault: z.boolean(),
  designation: z.string().pipe(nonempty),
  department: z.string().pipe(nonempty),
  company: z.string().pipe(nonempty),
});

export const DesignFormSchema = z.object({
  id: z.number().optional(),
  backgroundColor: z.string().pipe(nonempty),
  backgroundImage: z.string().optional(),
  logoUrl: z.string().pipe(nonempty),
  showLogo: z.boolean().optional(),
  showSocialIcons: z.boolean().optional(),
  darkMode: z.boolean().optional(),
})

export type ContentFormSchemaType = z.infer<typeof ContentFormSchema>;
export type DesignFromSchemaType = z.infer<typeof DesignFormSchema>;


