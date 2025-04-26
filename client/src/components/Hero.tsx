import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";

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

export default function Hero() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/data/profile.json')
      .then(response => response.json())
      .then(data => {
        setProfile(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error loading profile data:', error);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <section className="pt-32 pb-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <Skeleton className="h-12 w-3/4 mb-4" />
              <Skeleton className="h-8 w-1/2 mb-6" />
              <Skeleton className="h-24 w-full mb-8" />
              <div className="flex flex-wrap gap-4">
                <Skeleton className="h-12 w-36" />
                <Skeleton className="h-12 w-36" />
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <Skeleton className="w-64 h-64 rounded-full" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!profile) return null;

  return (
    <section className="pt-32 pb-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              <span className="text-gray-900">Hello, I'm</span><br />
              <span className="text-primary">{profile.name}</span>
            </h1>
            <h2 className="text-xl md:text-2xl text-gray-500 mb-6">{profile.title}</h2>
            <p className="text-lg mb-8 max-w-xl">
              Transforming complex data into actionable insights and compelling visualizations that drive strategic business decisions.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="rounded-full">
                <a href="#projects">View My Work</a>
              </Button>
              <Button 
                asChild 
                variant="outline" 
                size="lg" 
                className="rounded-full border-primary text-primary hover:bg-primary/5"
              >
                <a href="#about">About Me</a>
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
          <img 
              src={profile.photoUrl} 
              alt={profile.name} 
              className="rounded-full w-64 h-64 object-cover border-4 border-white shadow-xl"
              />
          </div>
        </div>
      </div>
    </section>
  );
}
