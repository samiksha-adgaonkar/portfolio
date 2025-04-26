import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import ProjectCarousel from "./ProjectCarousel";
import { ChevronRight } from "lucide-react";

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

export default function Projects() {
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
      <section id="projects" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Skeleton className="h-10 w-56 mx-auto mb-4" />
            <Skeleton className="w-16 h-1 mx-auto mb-6" />
            <Skeleton className="h-16 w-full max-w-2xl mx-auto" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-80 w-full rounded-xl" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!projects) return null;

  return (
    <section id="projects" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Featured Projects</h2>
          <div className="w-16 h-1 bg-primary mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-gray-500">
            A selection of my recent business intelligence and data analytics projects.
            Click on any project to view details.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {projects.map(project => (
            <div key={project.id} className="project-card bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <ProjectCarousel images={project.thumbnails} />
              <div className="p-5"> 
              <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg font-bold">{project.title}</h3>
                  {project.tags.slice(0, 1).map((tag) => (
                    <img 
                      key={tag}
                      src={`/images/icons/${tag.toLowerCase().replace(/\s+/g, '-')}.png`} 
                      alt={tag}
                      className="w-6 h-6 object-contain"
                    />
                  ))}
                </div>
                <p className="text-gray-500 text-sm mb-4 ml-2"> {/* Added ml-2 for spacing */}
                  {project.shortDescription}
                </p>
                <a href={`#project-${project.id}`} className="text-primary font-medium hover:underline flex items-center ml-auto"> {/* Added ml-auto to push to the right */}
                  View Details
                  <ChevronRight className="ml-1 h-4 w-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
