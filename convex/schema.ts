import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    members: defineTable({
        profile_id: v.string(),
        room_id: v.string(),
    }),
    messages: defineTable({
        content: v.string(),
        profile_id: v.string(),
        read: v.boolean(),
        room_id: v.string(),
    }),
    profiles: defineTable({
        avatar: v.string(),
        email: v.string(),
        id: v.string(),
        name: v.string(),
    }),
    rooms: defineTable({ name: v.string() }),
});

