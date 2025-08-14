# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal academic website built with Eleventy (11ty), a static site generator. The site showcases Parth's research projects, publications, and academic work in computing education, AI ethics, and digital humanities.

## Architecture

- **Static Site Generator**: Eleventy (11ty) with minimal configuration
- **Templates**: Nunjucks templates in `_includes/main.njk` for the base layout
- **Content**: Markdown files (`.md`) are transformed into HTML pages
- **Styling**: Single CSS file (`style.css`) with custom purple theme and orange link colors
- **Build Output**: Generated site files go to `_site/` directory

## Development Commands

### Building the Site
```bash
npx @11ty/eleventy
```

### Development Server with Live Reload
```bash
npx @11ty/eleventy --serve
```
This starts a development server on port 8080 with automatic rebuilding when files change.

### Watch Mode (No Server)
```bash
npx @11ty/eleventy --watch
```

## Site Structure

- `index.md` - Main homepage with projects timeline, bio, and contact info
- `cs-values.md` - Research study recruitment page with custom blue theme override
- `style.css` - Global styles with purple background (#8161c5) and orange links (#FFB366)
- `_includes/main.njk` - Base HTML template with Roboto font from Google Fonts
- `projects/` - Static project files (e.g., gibberish React app)
- `files/` - PDF documents and other downloadable files
- `img/` - Images and media assets

## Key Styling Notes

The site uses a distinctive color scheme:
- Background: Purple (#8161c5)
- Text: White
- Links: Bright orange (#FFB366) with thick underlines
- Link hover: White text and underline

The projects section uses CSS Grid layout with time ranges in the left column and descriptions in the right column.

## Content Management

- Projects are listed chronologically with time ranges (most recent first)
- Each project entry includes dates and descriptive text with relevant links
- The cs-values page overrides the main purple theme with blue for distinction