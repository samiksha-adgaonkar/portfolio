/**
 * Copy Public Assets Script
 * 
 * This script copies the necessary public assets (images, files, data) 
 * to the dist directory after building the static website.
 */

import { promises as fs, existsSync, mkdirSync, readdirSync, copyFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve, join } from 'path';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Define paths
const rootDir = resolve(__dirname, '../..');
const publicDir = resolve(rootDir, 'public');
const distDir = resolve(__dirname, 'dist');

// Directories to copy
const dirsToCopy = [
  'data',
  'images',
  'files'
];

// Create the directories if they don't exist
for (const dir of dirsToCopy) {
  const targetDir = join(distDir, dir);
  if (!existsSync(targetDir)) {
    mkdirSync(targetDir, { recursive: true });
    console.log(`Created directory: ${targetDir}`);
  }
}

// Function to copy files recursively
function copyDir(src, dest) {
  // Check if source directory exists
  if (!existsSync(src)) {
    console.warn(`Source directory does not exist: ${src}`);
    return;
  }

  // Create destination directory if it doesn't exist
  if (!existsSync(dest)) {
    mkdirSync(dest, { recursive: true });
  }

  // Read all files and directories in the source
  const entries = readdirSync(src, { withFileTypes: true });
  
  // Copy each entry
  for (const entry of entries) {
    const srcPath = join(src, entry.name);
    const destPath = join(dest, entry.name);
    
    if (entry.isDirectory()) {
      // Recursively copy directories
      copyDir(srcPath, destPath);
    } else {
      // Copy files
      copyFileSync(srcPath, destPath);
      console.log(`Copied: ${srcPath} -> ${destPath}`);
    }
  }
}

// Copy each directory
for (const dir of dirsToCopy) {
  const sourceDir = join(publicDir, dir);
  const targetDir = join(distDir, dir);
  
  if (existsSync(sourceDir)) {
    copyDir(sourceDir, targetDir);
    console.log(`\nCopied directory: ${dir}`);
  } else {
    console.warn(`Warning: Source directory does not exist: ${sourceDir}`);
  }
}

console.log('\nAssets copy complete!');