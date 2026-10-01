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

**Geoapify Geocoding API** 
(<https://apidocs.geoapify.com/docs/geocoding>)

- **Used for:** location autocomplete on the Report Item page (`/report`)
- **Endpoint:** `GET https://api.geoapify.com/v1/geocode/autocomplete`
- **Parameters:** `text` (what the user types), `filter=countrycode:ke`, `bias=proximity:36.8219,-1.2921`, `limit=5`, `apiKey`
- **Data sent:** the place or address the user types (minimum 3 characters, sent 400ms after they stop typing)
- **Data received:** a list of matching places, each with a formatted address (`formatted`), `lat` and `lon`
- **How it's used:** the user picks a suggestion, and the chosen `{ name, lat, lon }` is saved as the item's `location`, matching the shape in `mockData.js`
- **Loading and error states:** "Searching..." shows while the request runs, and an error message shows if it fails
- **API key:** stored in `.env` as `VITE_GEOAPIFY_KEY` (see `.env.example`). Each developer creates their own free key at <https://myprojects.geoapify.com>. Never commit `.env`.
- **Code:** `src/utils/geoapify.js`
- **Accessibility:** (fill in after testing)

## Team workflow

- Create your own branch: `git checkout -b feature/your-page`
- Commit small and often with clear messages
- Open a pull request to merge into `main`

## Challenges / known bugs

To be added later.