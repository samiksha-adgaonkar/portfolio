/**
 * Static Build Script
 * 
 * This script helps automate the process of building the static version of the portfolio website.
 * 
 * Usage:
 * 1. Make sure you have Node.js installed
 * 2. Run this script with: node build-static.js
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const rootDir = dirname(__filename);

const staticConfigDir = path.join(rootDir, 'public', 'static-config');
const distDir = path.join(staticConfigDir, 'dist');
const dataDir = path.join(rootDir, 'public', 'data');
// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m'
};

console.log(`${colors.bright}${colors.blue}=== Portfolio Static Website Builder ===${colors.reset}\n`);

try {
  // Step 1: Check if necessary directories exist
  console.log(`${colors.yellow}Checking directory structure...${colors.reset}`);
  
  if (!fs.existsSync(staticConfigDir)) {
    throw new Error(`Static config directory does not exist: ${staticConfigDir}`);
  }
  
  if (!fs.existsSync(dataDir)) {
    throw new Error(`Data directory does not exist: ${dataDir}`);
  }
  
  // Step 2: Install dependencies
  console.log(`\n${colors.yellow}Installing dependencies...${colors.reset}`);
  try {
    process.chdir(staticConfigDir);
    execSync('npm install', { stdio: 'inherit' });
    console.log(`${colors.green}Dependencies installed successfully!${colors.reset}`);
  } catch (err) {
    throw new Error(`Failed to install dependencies: ${err.message}`);
  }
  
  // Step 3: Build the static site
  console.log(`\n${colors.yellow}Building static website...${colors.reset}`);
  try {
    execSync('npm run build', { stdio: 'inherit' });
    console.log(`${colors.green}Static website built successfully!${colors.reset}`);
  } catch (err) {
    throw new Error(`Failed to build static website: ${err.message}`);
  }
  
  // Step 4: Copy data files to the dist directory
  console.log(`\n${colors.yellow}Copying data files...${colors.reset}`);
  
  if (!fs.existsSync(path.join(distDir, 'data'))) {
    fs.mkdirSync(path.join(distDir, 'data'), { recursive: true });
  }
  
  fs.readdirSync(dataDir).forEach(file => {
    const source = path.join(dataDir, file);
    const dest = path.join(distDir, 'data', file);
    fs.copyFileSync(source, dest);
    console.log(`Copied: ${file}`);
  });
  
  console.log(`${colors.green}Data files copied successfully!${colors.reset}`);
  
  // Step 5: Success message
  console.log(`\n${colors.bright}${colors.green}✅ Static website built successfully!${colors.reset}`);
  console.log(`\n${colors.yellow}The built files are located at:${colors.reset} ${distDir}`);
  console.log(`\n${colors.yellow}To preview the website, run:${colors.reset}`);
  console.log(`  cd ${path.relative(rootDir, staticConfigDir)}`);
  console.log(`  npm run preview\n`);
  
} catch (error) {
  console.error(`\n${colors.red}Error: ${error.message}${colors.reset}\n`);
  process.exit(1);
}