# Business Intelligence Analyst Portfolio Website

A professional portfolio website for a business intelligence analyst showcasing projects with descriptions, videos, and screenshots.

## Project Overview

This portfolio website was designed to showcase the work and skills of a business intelligence analyst. It features:

- Professional introduction and bio
- Project gallery with thumbnails
- Detailed project pages with descriptions, videos, and screenshots
- Resume and professional experience section
- Responsive design for all devices

The site has been converted to a static website for easier hosting and maintenance.

## Running the Project on Replit

1. Click the "Run" button in Replit to start the application
2. The site will be available at the provided Replit URL

## Local Development (Windows)

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS version recommended)
- [Git](https://git-scm.com/downloads) (optional, for version control)

### Steps to Run Locally

1. Clone or download this repository to your local machine
2. Open Command Prompt or PowerShell and navigate to the project directory
3. Install dependencies:
   ```
   npm install
   ```
4. Run the development server:
   ```
   npm run dev
   ```
5. Open your browser and navigate to `http://localhost:5000`

## Static Website Deployment

The project has been converted to a static website for simpler hosting. Follow these steps to build and deploy the static version:

### Building the Static Version

1. Navigate to the `public/static-config` directory
2. Install dependencies:
   ```
   npm install
   ```
3. Build the static site:
   ```
   npm run build
   ```
4. The built files will be in the `dist` directory

### Hosting Options

You can host the static website on various platforms:

#### GitHub Pages
1. Create a GitHub repository
2. Push your code to the repository
3. Enable GitHub Pages in the repository settings
4. Set the source to the `dist` folder

#### Netlify
1. Create a Netlify account
2. Connect your GitHub repository or drag-and-drop the `dist` folder
3. Configure the build settings if deploying from the repository

#### Vercel
1. Create a Vercel account
2. Connect your GitHub repository
3. Configure the build settings

## Project Structure

- `/client/src`: Frontend React components
  - `/components`: UI components for the website
  - `/pages`: Page components
- `/public/data`: JSON data files for the static website
  - `profile.json`: Portfolio owner information
  - `projects.json`: Project showcase data
  - `experiences.json`: Work experience data
  - `educations.json`: Education history
  - `skill-categories.json`: Skills and expertise
- `/public/static-config`: Configuration for static website build

## Technologies Used

- React
- TypeScript
- Tailwind CSS
- Shadcn UI Components
- Vite

## Customization

To customize the portfolio for your own use:

1. Update the JSON files in the `/public/data` directory with your information
2. Replace the images in the `/public/images` directory with your own
3. Customize the colors and theme in `theme.json`
4. Update the meta tags in `/public/static-config/index.html` for SEO