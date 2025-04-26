import type { Express } from "express";
import { createServer, type Server } from "http";
import path from "path";
import fs from "fs";
import { storage } from "./storage";
import { insertContactMessageSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Add route to serve static data files directly
  app.get("/data/:filename", (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(process.cwd(), "public", "data", filename);
    
    if (fs.existsSync(filePath)) {
      res.sendFile(filePath);
    } else {
      res.status(404).json({ message: "File not found" });
    }
  });
  // API routes for projects
  app.get("/api/projects", async (req, res) => {
    try {
      const projects = await storage.getProjects();
      res.json(projects);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch projects" });
    }
  });

  app.get("/api/projects/:id", async (req, res) => {
    try {
      const projectId = parseInt(req.params.id);
      if (isNaN(projectId)) {
        return res.status(400).json({ message: "Invalid project ID" });
      }

      const project = await storage.getProject(projectId);
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }

      res.json(project);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch project" });
    }
  });

  // API routes for experiences
  app.get("/api/experiences", async (req, res) => {
    try {
      const experiences = await storage.getExperiences();
      res.json(experiences);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch experiences" });
    }
  });

  // API routes for education
  app.get("/api/educations", async (req, res) => {
    try {
      const educations = await storage.getEducations();
      res.json(educations);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch educations" });
    }
  });

  // API routes for skill categories
  app.get("/api/skill-categories", async (req, res) => {
    try {
      const skillCategories = await storage.getSkillCategories();
      res.json(skillCategories);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch skill categories" });
    }
  });

  // API route for contact form submissions
  app.post("/api/contact", async (req, res) => {
    try {
      // Validate the request body
      const result = insertContactMessageSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ 
          message: "Invalid contact message data", 
          errors: result.error.errors 
        });
      }

      // Create the contact message
      const message = await storage.createContactMessage(result.data);
      res.status(201).json(message);
    } catch (error) {
      res.status(500).json({ message: "Failed to save contact message" });
    }
  });

  // API route for profile
  app.get("/api/profile", async (req, res) => {
    try {
      const profile = await storage.getProfile();
      if (!profile) {
        return res.status(404).json({ message: "Profile not found" });
      }
      res.json(profile);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch profile" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
