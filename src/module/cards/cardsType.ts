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
  id: z.number(),
  prefix: z.string(),
  firstName: z.string(),
  middleName: z.string(),
  lastName: z.string(),
  suffix: z.string(),
  bio: z.string(),
  phone: z.string(),
  website: z.string(),
  email: z.string(),
  // isDefault: z.boolean(),
  designation: z.string(),
  department: z.string(),
  company: z.string(),
});

export type ContentFormSchemaType = z.infer<typeof ContentFormSchema>;


export type SnakeCardContentType = {
  id?: number;
  prefix: string;
  first_name: string;
  middle_name?: string;
  last_name: string;
  designation?: string;
  department?: string;
  company?: string;
  suffix: string;
  bio: string;
  website?: string;
  phone: string;
  email: string;
};