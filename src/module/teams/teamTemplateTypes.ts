import { z } from "zod";
import { Team } from "../teams/teamTypes";

export interface TeamTemplateState<T> {
    design: DesignType;
    details?: Team;
    otherValues: {
        template: T;
        title: string;
    }

}

export const designSchema = z.object(({
    backgroundColor: z.string().optional().nullable(),
    showLogo: z.boolean().optional().nullable(),
    // showSocialIcons: z.boolean().optional().nullable(),
    // darkMode: z.boolean().optional().nullable(),
    logo: z.string().optional().optional()

}))

export type DesignType = z.infer<typeof designSchema>