# shehryarhassan.me

Personal portfolio for Shehryar Hassan, built with Next.js 14 (App Router) and Tailwind CSS, deployed on Vercel.

## Pages

| Route | What it shows |
| --- | --- |
| `/` | Intro, photo with highlight polaroids, and a "catch me" robot that shares recent wins |
| `/projects` | Projects filterable by tech stack; the arrow opens details inline |
| `/highlights` | Leadership, research and awards, with inline details |
| `/experience` | Roles as a timeline of paper cards |
| `/contact` | Contact form (Web3Forms) |

Old URLs such as `/projects/<slug>`, `/highlights/<slug>`, `/about`, `/blogs` and `/tools` redirect (see `next.config.mjs`).

## Structure

```text
app/          Routes and pages
components/   Sidebar, mobile nav, project and highlight lists, timeline, home collage, robot, cursor
lib/data.ts   Profile, projects, skill filters and experience
lib/highlights.ts   Highlights
public/       Photo, project screenshots, highlight images, PDFs
```

## Updating content

- **Projects:** add an entry to `projects` in `lib/data.ts`. Its `skills` drive the filter; to show a skill as a filter, add it to `skillGroups`.
- **Experience:** edit `experience` in `lib/data.ts`.
- **Highlights:** edit `lib/highlights.ts` (`shortTitle` is the handwritten polaroid caption on Home).
- **Recent wins in the robot's note:** edit `recently` in `components/RecentlyBot.tsx`.

## Run locally

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
npm start
```
