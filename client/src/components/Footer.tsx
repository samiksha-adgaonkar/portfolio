import { useState, useEffect } from "react";
import { Linkedin, Twitter, Github, Bookmark } from "lucide-react";

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

export default function Footer() {
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    fetch('/data/profile.json')
      .then(response => response.json())
      .then(data => {
        setProfile(data);
      })
      .catch(error => {
        console.error('Error loading profile data:', error);
      });
  }, []);

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h2 className="text-xl font-bold mb-2">{profile?.name || "Samiksha Adgaonkar"}</h2>
            <p className="text-gray-400">{profile?.title || "Business Intelligence Analyst"}</p>
          </div>
          
          <div className="flex space-x-6">
            <a href="#about" className="text-gray-400 hover:text-white transition-colors">About</a>
            <a href="#projects" className="text-gray-400 hover:text-white transition-colors">Projects</a>
            <a href="#resume" className="text-gray-400 hover:text-white transition-colors">Resume</a>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; {currentYear} {profile?.name || "Samiksha Adgaonkar"}. All rights reserved.
          </p>
          
          <div className="flex space-x-4 mt-4 md:mt-0">
            {profile?.socialLinks?.map((link, index) => {
              let Icon = Bookmark;
              if (link.platform === "linkedin") Icon = Linkedin;
              if (link.platform === "twitter") Icon = Twitter;
              if (link.platform === "github") Icon = Github;
              
              return (
                <a 
                  key={index}
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Icon className="h-5 w-5" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
