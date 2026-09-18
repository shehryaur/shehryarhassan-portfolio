# shehryarhassan.me

Personal portfolio for Shehryar Hassan, built with Next.js 14 App Router and Tailwind CSS. The site collects projects, experience, writing, tools, and contact information in one fast, maintainable codebase.

## Highlights

- App Router structure with dedicated pages for home, projects, experience, blogs, about, tools, and contact.
- Centralized content in `lib/data.ts` for easier updates.
- Reusable UI components for navigation, cards, timelines, and contribution-style sections.
- Responsive layout with desktop sidebar and mobile top navigation.
- Deployed at `shehryarhassan.me`.

## Tech Stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 14 |
| Styling | Tailwind CSS |
| Language | TypeScript |
| Deployment | Vercel |

## Structure

```text
app/          Routes and pages
components/   Sidebar, mobile nav, cards, timeline, ambient UI pieces
lib/data.ts   Portfolio content source of truth
public/       Static assets
```

## Run Locally

```bash
npm install
npm run dev
```

Build and start:

```bash
npm run build
npm start
```

## Content Updates

Most visible portfolio content should be updated in:

```text
lib/data.ts
```

Use that file for project entries, experience items, links, and display copy so the rest of the interface can stay component-driven.
