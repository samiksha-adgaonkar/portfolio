import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Download, Briefcase, GraduationCap, Code } from "lucide-react";

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

interface Experience {
  id: number;
  title: string;
  company: string;
  period: string;
  responsibilities: string[];
}

interface Education {
  id: number;
  degree: string;
  institution: string;
  period: string;
}

interface SkillCategory {
  id: number;
  name: string;
  skills: string[];
}

export default function Resume() {
  const [experiences, setExperiences] = useState<Experience[] | null>(null);
  const [educations, setEducations] = useState<Education[] | null>(null);
  const [skillCategories, setSkillCategories] = useState<SkillCategory[] | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/data/experiences.json').then(res => res.json()),
      fetch('/data/educations.json').then(res => res.json()),
      fetch('/data/skill-categories.json').then(res => res.json()),
      fetch('/data/profile.json').then(res => res.json())
    ])
    .then(([experiencesData, educationsData, skillCategoriesData, profileData]) => {
      setExperiences(experiencesData);
      setEducations(educationsData);
      setSkillCategories(skillCategoriesData);
      setProfile(profileData);
      setIsLoading(false);
    })
    .catch(error => {
      console.error('Error loading resume data:', error);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return (
      <section id="resume" className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Skeleton className="h-10 w-36 mx-auto mb-4" />
            <Skeleton className="w-16 h-1 mx-auto mb-6" />
            <Skeleton className="h-16 w-full max-w-2xl mx-auto mb-8" />
            <Skeleton className="h-12 w-48 mx-auto" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <Skeleton className="h-10 w-48 mb-6" />
              <div className="space-y-8">
                {[...Array(3)].map((_, i) => (
                  <Skeleton key={i} className="h-48 w-full" />
                ))}
              </div>
            </div>
            
            <div>
              <Skeleton className="h-10 w-48 mb-6" />
              <div className="space-y-8 mb-12">
                {[...Array(2)].map((_, i) => (
                  <Skeleton key={i} className="h-32 w-full" />
                ))}
              </div>
              
              <Skeleton className="h-10 w-48 mb-6" />
              <div className="space-y-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i}>
                    <Skeleton className="h-8 w-48 mb-2" />
                    <div className="flex flex-wrap gap-2">
                      {[...Array(5)].map((_, j) => (
                        <Skeleton key={j} className="h-8 w-24" />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!experiences || !educations || !skillCategories || !profile) return null;

  return (
    <section id="resume" className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Resume</h2>
          <div className="w-16 h-1 bg-primary mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-gray-500 mb-8">
            My professional journey and qualifications
          </p>
          <Button size="lg" className="rounded-full" asChild>
            <a href={profile.resumeUrl} target="_blank" rel="noopener noreferrer">
              <Download className="mr-2 h-4 w-4" />
              Resume
            </a>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Experience */}
          <div>
            <h3 className="text-2xl font-bold mb-6 flex items-center">
              <Briefcase className="text-primary mr-3" />
              Experience
            </h3>
            
            <div className="space-y-8">
              {experiences.map((experience, index) => (
                <div key={index} className="relative pl-8 pb-8 border-l-2 border-primary/20">
                  <div className="absolute -left-2 top-0 w-5 h-5 rounded-full bg-primary"></div>
                  <div className="mb-1">
                    <span className="bg-blue-100 text-primary text-xs px-2 py-1 rounded-full">{experience.period}</span>
                  </div>
                  <h4 className="text-lg font-semibold">{experience.title}</h4>
                  <p className="text-gray-500 mb-2">{experience.company}</p>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    {experience.responsibilities.map((responsibility, i) => (
                      <li key={i}>{responsibility}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          
          {/* Education & Skills */}
          <div>
            {/* Education */}
            <h3 className="text-2xl font-bold mb-6 flex items-center">
              <GraduationCap className="text-primary mr-3" />
              Education
            </h3>
            
            <div className="space-y-8 mb-12">
              {educations.map((education, index) => (
                <div key={index} className="relative pl-8 pb-8 border-l-2 border-primary/20">
                  <div className="absolute -left-2 top-0 w-5 h-5 rounded-full bg-primary"></div>
                  <div className="mb-1">
                    <span className="bg-blue-100 text-primary text-xs px-2 py-1 rounded-full">{education.period}</span>
                  </div>
                  <h4 className="text-lg font-semibold">{education.degree}</h4>
                  <p className="text-gray-500">{education.institution}</p>
                </div>
              ))}
            </div>
            
            {/* Skills */}
            <h3 className="text-2xl font-bold mb-6 flex items-center">
              <Code className="text-primary mr-3" />
              Technical Skills
            </h3>
            
            <div className="space-y-4">
              {skillCategories.map((category, index) => (
                <div key={index}>
                  <h4 className="font-semibold mb-2">{category.name}</h4>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, i) => (
                      <span key={i} className="px-3 py-1 bg-blue-100 text-primary rounded-full text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
