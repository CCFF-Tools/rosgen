# rosgen

A minimal full‑stack TypeScript project consisting of an Express API server and a Vite + React client.

## Project structure

- `src/server` – Express server using Sequelize with SQLite for persistence. Exposes CRUD endpoints for "cues" at `/api/cues`.
- `src/client` – React front end built with Vite.

## Development

Install dependencies and start the dev servers:

```bash
npm install
npm run dev
```

This launches the API server on port 3000 and the Vite client on port 5173.

## API overview

The server manages `cues`, each with `time`, `duration`, `title`, optional `description` and `owner` fields.

```
GET    /api/cues       List all cues
POST   /api/cues       Create a new cue
PUT    /api/cues/:id   Update an existing cue
DELETE /api/cues/:id   Remove a cue
```

Data is stored locally in `database.sqlite` via Sequelize.

## Scripts

- `npm run dev` – run server and client concurrently in development mode
- `npm run build` – typecheck and build both server and client
- `npm run lint` – lint all TypeScript sources

