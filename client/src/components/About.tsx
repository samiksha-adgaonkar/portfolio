import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  BarChart2, 
  Database, 
  Network, 
  Brain,
  Code, 
  MessageSquare,
  Mail,
  Phone,
  MapPin,
  Download,
  FileSpreadsheet,
  LayoutDashboard
} from "lucide-react";

interface Profile {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  photoUrl: string;
  bio: string;
  approach: string;
  resumeUrl: string;
  socialLinks: Array<{
    platform: string;
    url: string;
  }>;
}

interface SkillCategory {
  id: number;
  name: string;
  skills: string[];
}

export default function About() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [skillCategories, setSkillCategories] = useState<SkillCategory[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/data/profile.json').then(res => res.json()),
      fetch('/data/skill-categories.json').then(res => res.json())
    ])
    .then(([profileData, skillCategoriesData]) => {
      setProfile(profileData);
      setSkillCategories(skillCategoriesData);
      setIsLoading(false);
    })
    .catch(error => {
      console.error('Error loading data:', error);
      setIsLoading(false);
    });
  }, []);

  // Map icon names to components
  const getIcon = (index: number) => {
    const icons = [BarChart2, Database, FileSpreadsheet, Network, Brain, LayoutDashboard, MessageSquare];
    const Icon = icons[index % icons.length];
    return <Icon className="text-primary mr-3" />;
  };

  if (isLoading) {
    return (
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Skeleton className="h-10 w-40 mx-auto mb-4" />
            <Skeleton className="w-16 h-1 mx-auto" />
          </div>
          
          <div className="flex flex-col md:flex-row items-center md:items-start gap-12">
            <div className="md:w-1/3">
              <Skeleton className="h-64 w-full rounded-xl" />
            </div>
            <div className="md:w-2/3">
              <Skeleton className="h-8 w-48 mb-4" />
              <Skeleton className="h-24 w-full mb-4" />
              <Skeleton className="h-24 w-full mb-6" />
              
              <Skeleton className="h-8 w-48 mb-4" />
              <Skeleton className="h-32 w-full mb-4" />
              
              <div className="flex flex-wrap gap-3 mt-8">
                {[...Array(8)].map((_, i) => (
                  <Skeleton key={i} className="h-8 w-24" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!profile || !skillCategories) return null;

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">About Me</h2>
          <div className="w-16 h-1 bg-primary mx-auto"></div>
        </div>
        
        <div className="flex flex-col md:flex-row items-center md:items-start gap-12">
          <div className="md:w-1/3">
            <div className="bg-gray-50 rounded-xl p-6 shadow-md mb-4">
              <h3 className="text-xl font-semibold mb-4">My Expertise</h3>
              <ul className="space-y-3">
                {skillCategories[0]?.skills.map((skill, index) => (
                  <li key={index} className="flex items-center">
                    {getIcon(index)}
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
              </div>

<div className="bg-gray-50 rounded-xl p-6 shadow-md mb-4">
  <h3 className="text-xl font-semibold mb-4">Contact Info</h3>
  <ul className="space-y-3">
    <li className="flex items-center">
      <Mail className="text-primary mr-3" />
      <a href={`mailto:${profile?.email}`} className="hover:text-primary">{profile?.email}</a>
    </li>
    <li className="flex items-center">
      <Phone className="text-primary mr-3" />
      <span>{profile?.phone}</span>
    </li>
    <li className="flex items-center">
      <MapPin className="text-primary mr-3" />
      <span>{profile?.location}</span>
    </li>
  </ul>
</div>

<div className="bg-gray-50 rounded-xl p-6 shadow-md">
  <h3 className="text-xl font-semibold mb-4">Resume</h3>
  <a 
    href={profile?.resumeUrl} 
    target="_blank" 
    rel="noopener noreferrer" 
    className="inline-flex items-center text-primary hover:underline"
  >
    <Download className="mr-2 h-4 w-4" />
    Download Resume
  </a>
            </div>
          </div>
          
          <div className="md:w-2/3">
            <h3 className="text-2xl font-semibold mb-4">Who I Am</h3>
            <p className="mb-4 text-lg">
              {profile.bio}
            </p>
            <p className="mb-6 text-lg">
              With a background in both data science and business administration, I bridge the gap between technical analysis and strategic business needs. I'm proficient in various BI tools including Tableau, Power BI, and SQL, and I have a strong foundation in statistical analysis and data modeling.
            </p>
            
            <h3 className="text-2xl font-semibold mb-4">My Approach</h3>
            <p className="mb-4 text-lg">
              {profile.approach}
            </p>
            
            <div className="flex flex-wrap gap-3 mt-8">
              {skillCategories.flatMap(category => 
                category.skills.map((skill, index) => (
                  <span key={`${category.name}-${index}`} className="px-3 py-1 bg-blue-100 text-primary rounded-full text-sm">
                    {skill}
                  </span>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
