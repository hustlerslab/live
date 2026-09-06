# Aether Frontend — Allure Walkthrough

The standalone walkthrough product. Three routes:

| Route | What | Backend |
|---|---|---|
| `/` | Walkthrough Studio — the homeowner journey (project → moodboard → 3D space → share → designer) | Aether engine |
| `/3d` | Interactive 3D viewer — orbit, first-person walk, guided tour, AI design proposals, real furniture | Aether engine |
| `/cinematic` | Photo → cinematic film studio | RE Walkthrough Pro engine (optional) |

## Run

Backend first (from `../aether-backend`):

```bash
.venv/Scripts/python -m uvicorn app.main:app --port 8000
```

Then this app:

```bash
npm install
npm run dev
```

Open http://localhost:3001. Port 3001 is deliberate so it can run beside the
Allure demo site on 3000.

## Configuration

Copy `.env.example` to `.env.local` if the engines run somewhere other than
localhost. No API keys belong here — they live in the backend's `.env`.

## Layout

```
src/
├── app/                      routes + shell (layout.tsx) + tokens (globals.css)
├── features/
│   ├── walkthrough-studio/   the step-based journey
│   ├── walkthrough3d/        R3F viewer, Aether API client, camera rigs, materials
│   └── walkthrough/          cinematic film client (port 4000 engine)
├── components/shared/        Button, StatusPill
├── components/portal/        PageHeader
└── lib/                      format (INR), utils (cn), mock data used by the studio
```
