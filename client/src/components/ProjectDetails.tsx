import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface Project {
  id: number;
  title: string;
  shortDescription: string;
  fullDescription: string;
  technicalApproach: string;
  keyAchievements: string[];
  tags: string[];
  thumbnails: string[];
  videoUrl: string;
  screenshots: Array<{
    url: string;
    caption: string;
  }>;
}

export default function ProjectDetails() {
  const [projects, setProjects] = useState<Project[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/data/projects.json')
      .then(response => response.json())
      .then(data => {
        setProjects(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error loading projects data:', error);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Skeleton className="h-10 w-56 mx-auto mb-4" />
            <Skeleton className="w-16 h-1 mx-auto" />
          </div>
          
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="mb-16 h-96 w-full rounded-xl" />
          ))}
        </div>
      </section>
    );
  }

  if (!projects) return null;

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Project Details</h2>
          <div className="w-16 h-1 bg-primary mx-auto"></div>
        </div>
        
        {projects.map(project => (
          <Card 
            key={project.id} 
            id={`project-${project.id}`} 
            className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-16"
          >
                        <div className="flex items-center gap-3 mb-3">
              <h3 className="text-2xl font-bold">{project.title}</h3>
              {project.tags.slice(0, 1).map((tag) => (
                <img 
                  key={tag}
                  src={`/images/icons/${tag.toLowerCase().replace(/\s+/g, '-')}.png`} 
                  alt={tag}
                  className="w-8 h-8 object-contain"
                />
              ))}
            </div>
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags.map((tag, i) => (
                <span key={i} className="px-3 py-1 bg-blue-100 text-primary rounded-full text-sm">
                  {tag}
                </span>
              ))}
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <div>
                <h4 className="text-lg font-semibold mb-4">Project Overview</h4>
                <p className="mb-4">
                  {project.fullDescription}
                </p>
                
                <h4 className="text-lg font-semibold mb-4 mt-8">Key Achievements</h4>
                <ul className="list-disc list-inside space-y-2">
                  {project.keyAchievements.map((achievement, i) => (
                    <li key={i}>{achievement}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <Card className="overflow-hidden shadow-md mb-6">
                  <div className="aspect-w-16 aspect-h-9 bg-gray-100">
                    <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
                    <iframe 
                        src={`${project.videoUrl}?enablejsapi=1&origin=${window.location.origin}`}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        referrerPolicy="strict-origin"
                      />
                    </div>
                  </div>
                  <CardContent className="p-3 bg-gray-50">
                    <p className="text-sm text-gray-500 italic">Project presentation and dashboard demonstration</p>
                  </CardContent>
                </Card>
                
                <div className="grid grid-cols-2 gap-4">
                  {project.screenshots.map((screenshot, i) => (
                    <Card key={i} className="overflow-hidden shadow-sm">
                      <img src={screenshot.url} alt={screenshot.caption} className="w-full h-32 object-cover" />
                      <CardContent className="p-2 bg-gray-50">
                        <p className="text-xs text-gray-500">{screenshot.caption}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
            
            <Separator className="mb-6" />
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Technical Approach</h4>
              <p className="mb-4">
                {project.technicalApproach}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
