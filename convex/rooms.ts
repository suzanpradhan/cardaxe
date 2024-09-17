import { v } from "convex/values";
import { internalQuery, mutation, query } from "./_generated/server";

export const createRoom = mutation({
    args: {
        name: v.string()
    },
    handler: async (ctx, args) => {
        const roomId = await getRoomId(ctx, { name: args.name })
        if (roomId != undefined && roomId != null && roomId != "null") return;
        await ctx.db.insert("rooms", {
            name: args.name
        })


    }
})

export const sendMessage = mutation({
    args: {
        content: v.string(),
        profile_id: v.string(),
        read: v.boolean(),
        room_id: v.string(),
    },
    handler: async (ctx, args) => {
        await ctx.db.insert("messages", {
            content: args.content,
            profile_id: args.profile_id,
            read: args.read,
            room_id: args.room_id
        })
    }
})


export const getRoomId = internalQuery(
    {
        args: {
            name: v.string()
        },
        handler: async (ctx, args) => {
            const rooms = await ctx.db.query("rooms").filter(q => q.eq(q.field('name'), args.name)).collect()
            if (rooms.length > 0) return rooms[0]._id; else return undefined;
        }
    }
)

export const getUserProfile = internalQuery(
    {
        args: {
            profileId: v.string()
        },
        handler: async (ctx, args) => {
            const rooms = await ctx.db.query("profiles").filter(q => q.eq(q.field('id'), args.profileId)).collect()
            if (rooms.length > 0) return rooms[0]._id; else return undefined;
        }
    }
)


export const addMembers = mutation({
    args: {
        profileId: v.string(),
        roomName: v.string()
    },
    handler: async (ctx, args) => {
        const roomId = await getRoomId(ctx, { name: args.roomName })
        if (roomId) {
            const members = await checkMemberInRoom(ctx, { profileId: args.profileId, roomId: roomId })

            if (members && members.length > 0) return;
            await ctx.db.insert("members", {
                profile_id: args.profileId,
                room_id: roomId
            })
        }
    }
})



export const checkUser = internalQuery(
    {
        args: {
            uuid: v.string()
        },
        handler: async (ctx, args) => {
            const members = await ctx.db.query("profiles").filter(q => q.eq(q.field('id'), args.uuid)).collect()
            if (members.length > 0) return true; else return false;
        }
    }
)

export const saveUser = mutation(
    {
        args: {
            uuid: v.string(),
            name: v.string(),
            email: v.string(),
            avatar: v.optional(v.string()),
        },
        handler: async (ctx, args) => {
            const userExists = await checkUser(ctx, { uuid: args.uuid })
            if (userExists) return;
            await ctx.db.insert("profiles", {
                id: args.uuid,
                email: args.email,
                name: args.name,
                avatar: args.avatar ?? "null"
            })
        }
    }
)

export const getMyRoomIds = query({
    args: {
        uuid: v.string()
    },
    handler: async (ctx, args) => {
        const userExists = await checkUser(ctx, args);
        if (userExists) {
            const myRooms = await ctx.db.query("members").filter(q => q.eq(q.field('profile_id'), args.uuid)).collect();
            return myRooms.map((rooms) => rooms.room_id);
        }
    }
})

export const getMessages = query({
    args: {
        roomId: v.string()
    },
    handler: async (ctx, args) => {
        const messages = await ctx.db.query("messages").filter(q => q.eq(q.field('room_id'), args.roomId)).collect();
        return messages;
    }
})

export const getRoomMembers = query({
    args: {
        roomId: v.string(),
        uuid: v.string()
    },
    handler: async (ctx, args) => {
        // const members = await ctx.db.query("members").filter(q => q.eq(q.field("room_id"), args.roomId) && q.neq(q.field('profile_id'), args.uuid)).collect();
        const members = await ctx.db.query("members").filter(q => q.eq(q.field("room_id"), args.roomId)).filter(q => q.neq(q.field("profile_id"), args.uuid)).collect();
        const membersProfile = await Promise.all(members.map((item, index) => ctx.db.query("profiles").filter(q => q.eq(q.field("id"), item.profile_id)).first()))
        return membersProfile


    }
})

export const checkMemberInRoom = internalQuery({
    args: {
        profileId: v.string(),
        roomId: v.string()
    }, handler: async (ctx, args) => {
        const members = await ctx.db.query("members").filter(q => q.eq(q.field("room_id"), args.roomId)).filter(q => q.eq(q.field('profile_id'), args.profileId)).collect();
        return members;
    }
})