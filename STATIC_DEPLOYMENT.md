# Static Website Deployment Guide

This document provides detailed instructions on how to deploy the static version of your portfolio website to various hosting platforms.

## Building the Static Version

Before deploying, you need to build the static version of the website:

1. Navigate to the static config directory:
   ```
   cd public/static-config
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Build the static site:
   ```
   npm run build
   ```

4. The built files will be located in the `dist` directory.

Alternatively, you can use the build script from the project root:

```
node build-static.js
```

## Deploying to GitHub Pages

GitHub Pages is a free hosting service provided by GitHub. Here's how to deploy your site:

1. Create a new GitHub repository or use an existing one.

2. Initialize Git in your project if not already done:
   ```
   git init
   ```

3. Add the built files to your Git repository:
   ```
   git add public/static-config/dist
   ```

4. Commit the changes:
   ```
   git commit -m "Add built static website"
   ```

5. Add your GitHub repository as a remote:
   ```
   git remote add origin https://github.com/yourusername/your-repo-name.git
   ```

6. Push the changes:
   ```
   git push -u origin main
   ```

7. In your GitHub repository, go to Settings > Pages.

8. Select the branch and folder containing your static files (usually `main` branch and `/dist` folder).

9. Click "Save" and your site will be published at `https://yourusername.github.io/your-repo-name/`.

## Deploying to Netlify

Netlify offers free hosting with many features:

1. Create an account on [Netlify](https://netlify.com) if you don't already have one.

2. From the Netlify dashboard, click "New site from Git".

3. Connect to your GitHub repository.

4. Configure the build settings:
   - Build command: Leave empty (you've already built the site)
   - Publish directory: Enter the path to your dist folder (e.g., `public/static-config/dist`)

5. Click "Deploy site".

6. Your site will be published at a Netlify subdomain (e.g., `your-site-name.netlify.app`).

7. You can configure a custom domain in the Netlify settings.

## Deploying to Vercel

Vercel is another excellent platform for hosting static sites:

1. Create an account on [Vercel](https://vercel.com) if you don't already have one.

2. Install the Vercel CLI:
   ```
   npm install -g vercel
   ```

3. Navigate to your built directory:
   ```
   cd public/static-config/dist
   ```

4. Deploy to Vercel:
   ```
   vercel
   ```

5. Follow the prompts to set up your project.

6. Your site will be published at a Vercel subdomain (e.g., `your-site-name.vercel.app`).

## Using a Custom Domain

Regardless of which hosting provider you choose, you can use a custom domain:

1. Purchase a domain from a domain registrar (e.g., Namecheap, GoDaddy).

2. Follow the instructions provided by your hosting platform to configure your custom domain.

3. Update your DNS settings at your domain registrar to point to your hosting provider.

## Updating Your Site

When you want to update your site:

1. Make changes to your source code.
2. Rebuild the static site.
3. Deploy the updated files to your hosting provider.

For GitHub Pages, Netlify, and Vercel, you can set up continuous deployment so that your site is automatically rebuilt and deployed when you push changes to your repository.

## Troubleshooting

- If images don't load, check the image paths in your JSON files and components. Paths should be relative to the root of your deployed site.
- If the site doesn't work at all, make sure you've properly built the static version and deployed the correct directory.
- Check browser console for errors that might indicate missing files or resources.

## Support

If you need help with your deployment, most hosting providers offer documentation and support:

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Netlify Documentation](https://docs.netlify.com/)
- [Vercel Documentation](https://vercel.com/docs)