import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  events: defineTable({
    name: v.string(),
    date: v.string(),
    description: v.string(),
    location: v.string(),
    organizer: v.string(),
  }),
})