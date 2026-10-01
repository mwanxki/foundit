# FoundIt

A lost and found app that helps people in Nairobi report lost or found items, search reports, see possible matches, and claim items that belong to them.

Built with React (Vite) and React Router. Phase 1 is frontend only and uses mock data plus the Geoapify Geocoding API for locations.

## Setup

```bash
git clone git@github.com:trizahn2002-source/foundit.git
cd foundit
npm install
cp .env.example .env   # then add your Geoapify key
npm run dev
```

## Pages and routes

| Route | Page |
|---|---|
| `/` | Home: browse, search and filter items |
| `/report` | Report a lost or found item |
| `/items/:id` | Item details, possible matches and claims |
| `/dashboard` | User dashboard |
| `/login` | Login / register |

## Mock data

All shared data lives in `src/data/mockData.js` (`items`, `users`, `categories`).
Import what you need, e.g. `import { items } from "../data/mockData";`

## API used

Geoapify Geocoding API (https://apidocs.geoapify.com/docs/geocoding). Endpoints to be documented.

## Team workflow

- Create your own branch: `git checkout -b feature/your-page`
- Commit small and often with clear messages
- Open a pull request to merge into `main`

## Challenges / known bugs

To be added later.