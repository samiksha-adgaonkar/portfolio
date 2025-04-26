# Local Hosting Guide for Windows

This guide provides detailed instructions on how to run and host the portfolio website locally on Windows.

## Prerequisites

Before you begin, ensure you have the following software installed on your Windows machine:

1. **Node.js and npm**:
   - Download and install from [Node.js official website](https://nodejs.org/)
   - Choose the LTS (Long Term Support) version for best compatibility
   - Verify installation by opening Command Prompt and typing:
     ```
     node --version
     npm --version
     ```

2. **Git** (optional, for version control):
   - Download and install from [Git for Windows](https://gitforwindows.org/)
   - During installation, select "Use Git from the Windows Command Prompt"
   - Verify installation by opening Command Prompt and typing:
     ```
     git --version
     ```

## Option 1: Running the Development Server

This option runs the website with both frontend and backend (though the backend is not needed for the static version).

1. **Clone or download the repository**:
   - If using Git:
     ```
     git clone https://github.com/yourusername/your-repo-name.git
     cd your-repo-name
     ```
   - If downloaded as ZIP: Extract the ZIP file to a location of your choice

2. **Install dependencies**:
   - Open Command Prompt
   - Navigate to the project directory:
     ```
     cd path\to\your\project
     ```
   - Install the dependencies:
     ```
     npm install
     ```

3. **Start the development server**:
   ```
   npm run dev
   ```

4. **Access the website**:
   - Open a web browser and go to `http://localhost:5000`

## Option 2: Running Only the Static Version

This option runs only the static frontend part of the website without any backend server.

1. **Navigate to the static config directory**:
   ```
   cd path\to\your\project\public\static-config
   ```

2. **Install dependencies**:
   ```
   npm install
   ```

3. **Start the preview server**:
   ```
   npm run preview
   ```

4. **Access the website**:
   - Open a web browser and go to `http://localhost:4000`

## Option 3: Using a Simple HTTP Server

If you just want to serve the static files without using Node.js:

1. **Build the static version first**:
   - Follow steps 1-2 from Option 2
   - Build the static site:
     ```
     npm run build
     ```

2. **Install a simple HTTP server**:
   - There are several options:
   
   a. **Python's built-in HTTP server** (if Python is installed):
      ```
      cd path\to\your\project\public\static-config\dist
      python -m http.server 8000
      ```
      
   b. **Install serve using npm**:
      ```
      npm install -g serve
      cd path\to\your\project\public\static-config\dist
      serve
      ```
      
   c. **Use XAMPP/WAMP/MAMP**:
      - Install any of these local server packages
      - Copy the contents of `dist` folder to the appropriate web directory (e.g., `htdocs` for XAMPP)
      - Access via localhost URL provided by the software

3. **Access the website**:
   - For Python server: `http://localhost:8000`
   - For serve: The URL will be displayed in the command prompt (usually `http://localhost:5000`)
   - For XAMPP/WAMP/MAMP: The URL will depend on your configuration

## Common Issues and Troubleshooting

1. **Port already in use**:
   - If you see an error about the port already being in use, try using a different port:
   ```
   npm run dev -- --port 3000
   ```
   or for serve:
   ```
   serve -l 3000
   ```

2. **Command not found**:
   - If you get "command not found" errors, ensure that:
     - Node.js is properly installed
     - You're in the correct directory
     - The package.json file exists in your current directory
     - You've run `npm install` first

3. **Images or resources not loading**:
   - Check the browser console for 404 errors
   - Ensure all file paths are correctly specified in the JSON data files
   - For absolute URLs in the code, ensure they start with a forward slash (/)

4. **Running as administrator**:
   - Some operations might require administrator privileges
   - Right-click on Command Prompt and select "Run as administrator"

## Modifying the Website Content

Since this is a static website, all content is stored in JSON files:

1. **Locate the data files**:
   - Go to `public\data` directory
   - Edit the JSON files as needed (profile.json, projects.json, etc.)

2. **Replace images**:
   - Place your images in the `public\images` directory
   - Update the image paths in the JSON files to match your new images

3. **Restart the server** after making changes to see the updates

## Making the Website Available on Your Local Network

If you want to make the website available to other devices on your local network:

1. Find your computer's IP address:
   ```
   ipconfig
   ```
   Look for the IPv4 Address entry (e.g., 192.168.1.100)

2. Start the server with the host set to 0.0.0.0:
   ```
   npm run dev -- --host 0.0.0.0
   ```
   or for serve:
   ```
   serve -l 5000 --host 0.0.0.0
   ```

3. Other devices on your network can access the website by entering your IP address followed by the port in their browser:
   ```
   http://192.168.1.100:5000
   ```

4. Make sure your Windows firewall allows connections to the port you're using

## Conclusion

You now have several options for hosting the portfolio website locally on your Windows machine. Choose the option that best suits your needs and technical comfort level.

Remember that this is a local hosting solution. To make the website available on the internet, you'll need to deploy it to a hosting provider as described in the STATIC_DEPLOYMENT.md file.