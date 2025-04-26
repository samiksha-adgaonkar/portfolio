import { 
  Project, InsertProject,
  Experience, InsertExperience,
  Education, InsertEducation,
  SkillCategory, InsertSkillCategory,
  ContactMessage, InsertContactMessage,
  Profile, InsertProfile
} from "@shared/schema";

export interface IStorage {
  // Projects
  getProjects(): Promise<Project[]>;
  getProject(id: number): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: number, project: Partial<InsertProject>): Promise<Project | undefined>;
  deleteProject(id: number): Promise<boolean>;

  // Experiences
  getExperiences(): Promise<Experience[]>;
  getExperience(id: number): Promise<Experience | undefined>;
  createExperience(experience: InsertExperience): Promise<Experience>;
  
  // Education
  getEducations(): Promise<Education[]>;
  getEducation(id: number): Promise<Education | undefined>;
  createEducation(education: InsertEducation): Promise<Education>;
  
  // Skills
  getSkillCategories(): Promise<SkillCategory[]>;
  getSkillCategory(id: number): Promise<SkillCategory | undefined>;
  createSkillCategory(skillCategory: InsertSkillCategory): Promise<SkillCategory>;
  
  // Contact Messages
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  getContactMessages(): Promise<ContactMessage[]>;
  
  // Profile
  getProfile(): Promise<Profile | undefined>;
  updateProfile(profile: Partial<InsertProfile>): Promise<Profile | undefined>;
}

export class MemStorage implements IStorage {
  private projects: Map<number, Project>;
  private experiences: Map<number, Experience>;
  private educations: Map<number, Education>;
  private skillCategories: Map<number, SkillCategory>;
  private contactMessages: Map<number, ContactMessage>;
  private profile: Profile | undefined;
  private currentIds: {
    projects: number;
    experiences: number;
    educations: number;
    skillCategories: number;
    contactMessages: number;
    profiles: number;
  };

  constructor() {
    this.projects = new Map();
    this.experiences = new Map();
    this.educations = new Map();
    this.skillCategories = new Map();
    this.contactMessages = new Map();
    this.profile = undefined;
    this.currentIds = {
      projects: 1,
      experiences: 1,
      educations: 1,
      skillCategories: 1,
      contactMessages: 1,
      profiles: 1
    };

    this.seedData();
  }

  private seedData() {
    // Seed Profile
    const profile: InsertProfile = {
      name: "Samiksha Adgaonkar",
      title: "Business Intelligence Analyst",
      bio: "I'm a passionate Business Intelligence Analyst with over 5 years of experience helping organizations leverage their data to make better decisions. My expertise lies in transforming complex datasets into clear, actionable insights that drive business growth.",
      approach: "I believe that effective data analysis goes beyond just numbers and charts. It's about telling a compelling story that resonates with stakeholders and inspires action. My approach focuses on understanding the business context first, then designing analytics solutions that directly address key challenges and opportunities.",
      email: "sarah.johnson@example.com",
      phone: "(555) 123-4567",
      location: "San Francisco, California",
      photoUrl: "https://images.unsplash.com/photo-1573497491765-dccce02b29df?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      resumeUrl: "/sample-resume.pdf",
      socialLinks: [
        {platform: "linkedin", url: "https://linkedin.com"},
        {platform: "twitter", url: "https://twitter.com"},
        {platform: "github", url: "https://github.com"},
        {platform: "medium", url: "https://medium.com"}
      ]
    };
    this.updateProfile(profile);

    // Seed Projects
    const projects: InsertProject[] = [
      {
        title: "Retail Analytics Dashboard",
        shortDescription: "Comprehensive sales performance analytics for a national retail chain",
        fullDescription: "Designed and implemented a comprehensive retail analytics dashboard for a national retail chain with over 500 locations. The solution provided real-time insights into sales performance, inventory levels, and customer behavior patterns. The dashboard served as a central hub for store managers and executives to track KPIs, identify trends, and make data-driven decisions to optimize operations and increase profitability.",
        technicalApproach: "I implemented an ETL pipeline using SQL Server Integration Services to consolidate data from point-of-sale systems, inventory management, and CRM databases. The data was then transformed and loaded into a star schema data warehouse optimized for analytical queries. The frontend visualization was built with Tableau, featuring interactive dashboards with drill-down capabilities, custom calculations, and automated alerts. The solution was deployed to Tableau Server for enterprise-wide access with role-based permissions.",
        keyAchievements: [
          "Unified data from 5 disparate systems into a single dashboard",
          "Reduced weekly reporting time by 75% through automation",
          "Identified $2.3M in potential revenue opportunities",
          "Improved inventory turnover by 18% across all locations",
          "Implemented anomaly detection to flag unusual sales patterns"
        ],
        tags: ["Tableau", "SQL", "Data Visualization", "Retail Analytics"],
        thumbnails: [
          "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1543286386-713bdd548da4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        ],
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        screenshots: [
          {
            url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            caption: "Dashboard Overview"
          },
          {
            url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            caption: "Sales Analysis"
          }
        ]
      },
      {
        title: "Financial Predictive Model",
        shortDescription: "Market trend forecasting model for investment portfolio optimization",
        fullDescription: "Developed a predictive model for a financial services firm to forecast market trends and optimize investment portfolio allocation. The solution combined traditional time series analysis with machine learning techniques to identify patterns and anomalies in financial data. The model integrated macroeconomic indicators, market sentiment analysis, and historical performance data to generate forward-looking insights with confidence intervals.",
        technicalApproach: "I implemented a hybrid modeling approach using Python's scikit-learn and statsmodels libraries. The solution integrated ARIMA models for trend analysis, with gradient boosting algorithms to capture non-linear relationships between variables. Feature engineering included sentiment analysis of financial news using NLP techniques, technical indicators derived from price action, and economic factors. The model was validated using walk-forward testing to simulate real-world deployment conditions.",
        keyAchievements: [
          "Achieved 87% accuracy in 3-month market trend predictions",
          "Outperformed baseline models by 23% on risk-adjusted returns",
          "Reduced false positive signals by 65% compared to previous system",
          "Implemented adaptive learning algorithm that improves over time",
          "Created interactive visualization tool for portfolio managers"
        ],
        tags: ["Python", "Machine Learning", "Time Series Analysis", "Financial Modeling"],
        thumbnails: [
          "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        ],
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        screenshots: [
          {
            url: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            caption: "Model Interface"
          },
          {
            url: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            caption: "Forecast Visualization"
          }
        ]
      },
      {
        title: "Supply Chain Optimization",
        shortDescription: "End-to-end logistics optimization achieving 23% cost reduction",
        fullDescription: "Led the development of an end-to-end supply chain analytics solution for a manufacturing company with international operations. The project focused on optimizing inventory levels, reducing transportation costs, and improving order fulfillment rates. The solution provided visibility across the entire supply chain, from raw material sourcing to last-mile delivery, enabling data-driven decisions that balanced cost efficiency with service levels.",
        technicalApproach: "I developed a Power BI solution with custom DAX measures to calculate key supply chain metrics and KPIs. The data model integrated ERP data, warehouse management systems, transportation management, and third-party logistics information. For optimization, I implemented algorithms to determine economic order quantities, safety stock levels, and optimal distribution center allocation. The solution included what-if analysis tools for scenario planning and risk assessment.",
        keyAchievements: [
          "Reduced overall logistics costs by 23% within 6 months",
          "Improved inventory turnover ratio from 6 to 9 times annually",
          "Decreased stockout incidents by 42% while reducing safety stock",
          "Created dynamic route optimization saving $1.2M in transportation",
          "Implemented supplier performance scorecards improving quality"
        ],
        tags: ["Power BI", "DAX", "Logistics Analytics", "Optimization Algorithms"],
        thumbnails: [
          "https://images.unsplash.com/photo-1542744094-3a31f272c490?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1494412519320-aa613dfb7738?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        ],
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        screenshots: [
          {
            url: "https://images.unsplash.com/photo-1542744094-3a31f272c490?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            caption: "Logistics Dashboard"
          },
          {
            url: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            caption: "Route Optimization"
          }
        ]
      },
      {
        title: "Customer Segmentation Analysis",
        shortDescription: "Data-driven customer personas for targeted marketing campaigns",
        fullDescription: "Created a sophisticated customer segmentation model for an e-commerce company to identify distinct customer personas based on purchasing behavior, demographics, and engagement patterns. The analysis supported targeted marketing campaigns and personalized customer experiences. The solution went beyond traditional RFM (Recency, Frequency, Monetary) analysis to incorporate product affinity, channel preferences, and lifetime value predictions.",
        technicalApproach: "I used R for statistical analysis and implemented a combination of K-means clustering and hierarchical clustering to identify customer segments. The feature selection was based on correlation analysis and principal component analysis to reduce dimensionality. The segments were visualized in Looker, with interactive dashboards allowing marketers to explore characteristics of each segment. I also built predictive models to classify new customers and anticipate their future behavior based on early interactions.",
        keyAchievements: [
          "Identified 6 distinct customer segments with unique behaviors",
          "Increased email campaign conversion rates by 34%",
          "Developed targeted retention strategies for high-value segments",
          "Reduced customer acquisition costs by 27% through precision targeting",
          "Created an automated system to classify new customers"
        ],
        tags: ["R", "Clustering Algorithms", "Looker", "Marketing Analytics"],
        thumbnails: [
          "https://images.unsplash.com/photo-1550547660-d9450f859349?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        ],
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        screenshots: [
          {
            url: "https://images.unsplash.com/photo-1550547660-d9450f859349?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            caption: "Segments Dashboard"
          },
          {
            url: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            caption: "Journey Mapping"
          }
        ]
      }
    ];

    projects.forEach(project => {
      this.createProject(project);
    });

    // Seed Experiences
    const experiences: InsertExperience[] = [
      {
        title: "Senior Business Intelligence Analyst",
        company: "Global Tech Solutions Inc.",
        period: "2021 - Present",
        responsibilities: [
          "Lead a team of 4 analysts in developing enterprise-wide dashboards",
          "Implemented predictive analytics models resulting in 18% revenue growth",
          "Redesigned ETL processes reducing data processing time by 35%",
          "Presented quarterly insights to C-level executives"
        ]
      },
      {
        title: "Business Intelligence Analyst",
        company: "DataDrive Analytics",
        period: "2018 - 2021",
        responsibilities: [
          "Developed customer behavior analysis dashboards for retail clients",
          "Created automated reporting solutions saving 20+ hours weekly",
          "Collaborated with data engineering team to optimize data warehouse",
          "Conducted training sessions on data visualization best practices"
        ]
      },
      {
        title: "Data Analyst",
        company: "Insight Financial Services",
        period: "2016 - 2018",
        responsibilities: [
          "Analyzed customer transaction data to identify fraud patterns",
          "Built monthly performance scorecards for branch operations",
          "Created SQL queries and stored procedures for recurring analyses",
          "Assisted in migration from legacy reporting to modern BI platform"
        ]
      }
    ];

    experiences.forEach(experience => {
      this.createExperience(experience);
    });

    // Seed Educations
    const educations: InsertEducation[] = [
      {
        degree: "Master of Science in Business Analytics",
        institution: "Stanford University",
        period: "2014 - 2016"
      },
      {
        degree: "Bachelor of Science in Statistics",
        institution: "University of California, Berkeley",
        period: "2010 - 2014"
      }
    ];

    educations.forEach(education => {
      this.createEducation(education);
    });

    // Seed Skill Categories
    const skillCategories: InsertSkillCategory[] = [
      {
        name: "Data Analysis & Visualization",
        skills: ["Tableau", "Power BI", "Looker", "Qlik", "Excel"]
      },
      {
        name: "Programming & Databases",
        skills: ["SQL", "Python", "R", "DAX", "PostgreSQL", "MongoDB"]
      },
      {
        name: "Statistical & ML Methods",
        skills: ["Regression Analysis", "Clustering", "Time Series", "A/B Testing", "Random Forest"]
      },
      {
        name: "Other Skills",
        skills: ["Data Modeling", "ETL", "Data Governance", "Agile Methodology", "Project Management"]
      }
    ];

    skillCategories.forEach(category => {
      this.createSkillCategory(category);
    });
  }

  // Project Methods
  async getProjects(): Promise<Project[]> {
    return Array.from(this.projects.values());
  }

  async getProject(id: number): Promise<Project | undefined> {
    return this.projects.get(id);
  }

  async createProject(project: InsertProject): Promise<Project> {
    const id = this.currentIds.projects++;
    const newProject: Project = { ...project, id };
    this.projects.set(id, newProject);
    return newProject;
  }

  async updateProject(id: number, project: Partial<InsertProject>): Promise<Project | undefined> {
    const existingProject = this.projects.get(id);
    if (!existingProject) return undefined;
    
    const updatedProject = { ...existingProject, ...project };
    this.projects.set(id, updatedProject);
    return updatedProject;
  }

  async deleteProject(id: number): Promise<boolean> {
    return this.projects.delete(id);
  }

  // Experience Methods
  async getExperiences(): Promise<Experience[]> {
    return Array.from(this.experiences.values());
  }

  async getExperience(id: number): Promise<Experience | undefined> {
    return this.experiences.get(id);
  }

  async createExperience(experience: InsertExperience): Promise<Experience> {
    const id = this.currentIds.experiences++;
    const newExperience: Experience = { ...experience, id };
    this.experiences.set(id, newExperience);
    return newExperience;
  }

  // Education Methods
  async getEducations(): Promise<Education[]> {
    return Array.from(this.educations.values());
  }

  async getEducation(id: number): Promise<Education | undefined> {
    return this.educations.get(id);
  }

  async createEducation(education: InsertEducation): Promise<Education> {
    const id = this.currentIds.educations++;
    const newEducation: Education = { ...education, id };
    this.educations.set(id, newEducation);
    return newEducation;
  }

  // Skill Category Methods
  async getSkillCategories(): Promise<SkillCategory[]> {
    return Array.from(this.skillCategories.values());
  }

  async getSkillCategory(id: number): Promise<SkillCategory | undefined> {
    return this.skillCategories.get(id);
  }

  async createSkillCategory(skillCategory: InsertSkillCategory): Promise<SkillCategory> {
    const id = this.currentIds.skillCategories++;
    const newSkillCategory: SkillCategory = { ...skillCategory, id };
    this.skillCategories.set(id, newSkillCategory);
    return newSkillCategory;
  }

  // Contact Message Methods
  async createContactMessage(message: InsertContactMessage): Promise<ContactMessage> {
    const id = this.currentIds.contactMessages++;
    const newMessage: ContactMessage = { 
      ...message, 
      id, 
      createdAt: new Date().toISOString() 
    };
    this.contactMessages.set(id, newMessage);
    return newMessage;
  }

  async getContactMessages(): Promise<ContactMessage[]> {
    return Array.from(this.contactMessages.values());
  }

  // Profile Methods
  async getProfile(): Promise<Profile | undefined> {
    return this.profile;
  }

  async updateProfile(profile: Partial<InsertProfile>): Promise<Profile | undefined> {
    if (!this.profile) {
      const id = this.currentIds.profiles++;
      this.profile = { ...profile as InsertProfile, id };
    } else {
      this.profile = { ...this.profile, ...profile };
    }
    return this.profile;
  }
}

export const storage = new MemStorage();
