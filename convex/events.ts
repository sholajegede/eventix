import { v } from "convex/values";
import { ConvexError } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getAll = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("events").order("desc").collect();
  },
});

export const getEventById = query({
  args: { id: v.id("events") },
  handler: async (ctx, args) => {
    const event = await ctx.db.get(args.id);
    if (!event) {
      throw new ConvexError("Event not found");
    }
    return event;
  },
});

export const createEvent = mutation({
  args: {
    name: v.string(),
    date: v.string(),
    description: v.string(),
    location: v.string(),
    organizer: v.string(),
  },
  handler: async (ctx, args) => {
    const event = {
      name: args.name,
      date: args.date,
      description: args.description,
      location: args.location,
      organizer: args.organizer,
    };
    const newEvent = await ctx.db.insert("events", event);

    return await ctx.db.get(newEvent);
  },
});

export const updateEvent = mutation({
  args: {
    id: v.id("events"),
    name: v.string(),
    date: v.string(),
    description: v.string(),
    location: v.string(),
    organizer: v.string(),
  },
  handler: async (ctx, args) => {
    const event = await ctx.db.get(args.id);

    if (!event) {
      throw new ConvexError("Event not found");
    }

    const updateEvent = {
      ...(args.name !== undefined && { name: args.name }),
      ...(args.date !== undefined && { date: args.date }),
      ...(args.description !== undefined && { description: args.description }),
      ...(args.location !== undefined && { location: args.location }),
      ...(args.organizer !== undefined && { organizer: args.organizer }),
    };

    await ctx.db.patch(args.id, updateEvent);

    return args.id;
  },
});

export const deleteEvent = mutation({
  args: { id: v.id("events") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});