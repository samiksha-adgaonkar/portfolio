import { pgTable, text, serial, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Projects schema
export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  shortDescription: text("short_description").notNull(),
  fullDescription: text("full_description").notNull(),
  technicalApproach: text("technical_approach").notNull(),
  keyAchievements: jsonb("key_achievements").notNull().$type<string[]>(),
  tags: jsonb("tags").notNull().$type<string[]>(),
  thumbnails: jsonb("thumbnails").notNull().$type<string[]>(),
  videoUrl: text("video_url"),
  screenshots: jsonb("screenshots").notNull().$type<{url: string, caption: string}[]>(),
});

export const insertProjectSchema = createInsertSchema(projects).omit({
  id: true,
});

export type InsertProject = z.infer<typeof insertProjectSchema>;
export type Project = typeof projects.$inferSelect;

// Experience schema
export const experiences = pgTable("experiences", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  company: text("company").notNull(),
  period: text("period").notNull(),
  responsibilities: jsonb("responsibilities").notNull().$type<string[]>(),
});

export const insertExperienceSchema = createInsertSchema(experiences).omit({
  id: true,
});

export type InsertExperience = z.infer<typeof insertExperienceSchema>;
export type Experience = typeof experiences.$inferSelect;

// Education schema
export const educations = pgTable("educations", {
  id: serial("id").primaryKey(),
  degree: text("degree").notNull(),
  institution: text("institution").notNull(),
  period: text("period").notNull(),
});

export const insertEducationSchema = createInsertSchema(educations).omit({
  id: true,
});

export type InsertEducation = z.infer<typeof insertEducationSchema>;
export type Education = typeof educations.$inferSelect;

// Skills category schema
export const skillCategories = pgTable("skill_categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  skills: jsonb("skills").notNull().$type<string[]>(),
});

export const insertSkillCategorySchema = createInsertSchema(skillCategories).omit({
  id: true,
});

export type InsertSkillCategory = z.infer<typeof insertSkillCategorySchema>;
export type SkillCategory = typeof skillCategories.$inferSelect;

// Contact messages schema
export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  createdAt: text("created_at").notNull().default("NOW()"),
});

export const insertContactMessageSchema = createInsertSchema(contactMessages).omit({
  id: true,
  createdAt: true,
});

export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;
export type ContactMessage = typeof contactMessages.$inferSelect;

// Profile schema
export const profiles = pgTable("profiles", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  title: text("title").notNull(),
  bio: text("bio").notNull(),
  approach: text("approach").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  location: text("location").notNull(),
  photoUrl: text("photo_url").notNull(),
  resumeUrl: text("resume_url").notNull(),
  socialLinks: jsonb("social_links").notNull().$type<{platform: string, url: string}[]>(),
});

export const insertProfileSchema = createInsertSchema(profiles).omit({
  id: true,
});

export type InsertProfile = z.infer<typeof insertProfileSchema>;
export type Profile = typeof profiles.$inferSelect;
