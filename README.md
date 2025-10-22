# Band Setlist Voting

Eine Web-Anwendung für Bands, um gemeinsam über Songs abzustimmen, die in die Setliste aufgenommen werden sollen.

## Features

- **Benutzer-Authentifizierung**: Sichere Anmeldung mit Supabase Auth
- **Song-Vorschläge**: Bandmitglieder können Songs mit YouTube-Links vorschlagen
- **Abstimmungssystem**: 5-Sterne-Rating-System für jeden Song
- **YouTube-Integration**: Videos werden direkt in der Abstimmungsansicht angezeigt
- **Top 20 Setliste**: Die besten Songs landen automatisch in der Setliste

## Tech Stack

- **Frontend**: Astro (Server-Side Rendering)
- **Backend**: Supabase (Postgres Database + Auth)
- **Styling**: Tailwind CSS
- **Deployment**: Vercel

## Setup

### Voraussetzungen

- Node.js 18+ installiert
- Ein Supabase-Account und Projekt
- Git installiert

### Installation

1. Repository klonen oder Dateien herunterladen

2. Abhängigkeiten installieren:
```bash
npm install
```

3. Environment-Variablen konfigurieren:
Erstelle eine `.env` Datei im Root-Verzeichnis mit:
```
SUPABASE_URL=deine_supabase_url
SUPABASE_ANON_KEY=dein_supabase_anon_key
```

4. Development-Server starten:
```bash
npm run dev
```

Die App läuft dann auf `http://localhost:4321`

## Deployment auf Vercel

### Automatisches Deployment

1. Repository auf GitHub pushen
2. Bei [Vercel](https://vercel.com) anmelden
3. Projekt mit deinem GitHub-Repository verbinden
4. Environment-Variablen in den Vercel-Projekteinstellungen hinzufügen:
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
5. Deploy-Prozess startet automatisch bei jedem Push

### Build-Konfiguration

Vercel erkennt Astro automatisch. Falls manuelle Konfiguration nötig:
- **Framework Preset**: Astro
- **Build Command**: `npm run build`
- **Output Directory**: `dist/`
- **Node Version**: 18+

## Projektstruktur

```
band-setlist-voting/
├── src/
│   ├── components/
│   │   └── Navigation.astro      # Wiederverwendbare Navigation
│   ├── layouts/
│   │   └── Layout.astro          # Haupt-Layout mit Styling
│   ├── lib/
│   │   └── supabase.ts           # Supabase Client
│   ├── pages/
│   │   ├── api/
│   │   │   ├── auth/             # Auth-Endpoints
│   │   │   └── songs/            # Song-Endpoints
│   │   ├── index.astro           # Landing Page
│   │   ├── register.astro        # Registrierung
│   │   ├── signin.astro          # Anmeldung
│   │   ├── dashboard.astro       # Dashboard
│   │   ├── suggest.astro         # Song vorschlagen
│   │   ├── vote.astro            # Abstimmen
│   │   └── setlist.astro         # Top 20 Setliste
│   ├── types/
│   │   └── index.ts              # TypeScript-Interfaces
│   ├── middleware.ts             # Auth-Middleware
│   └── env.d.ts                  # TypeScript-Typen
├── .env                          # Environment-Variablen (nicht in Git)
├── .env.example                  # Environment-Variablen Template
├── astro.config.mjs              # Astro-Konfiguration
└── package.json
```

## Datenbank-Schema

### Tables

**songs**
- `id` (UUID, Primary Key)
- `title` (TEXT) - Song-Titel
- `youtube_url` (TEXT) - YouTube-Link
- `suggested_by` (UUID) - User-ID des Vorschlagenden
- `created_at` (TIMESTAMPTZ)

**votes**
- `id` (UUID, Primary Key)
- `song_id` (UUID, Foreign Key)
- `user_id` (UUID, Foreign Key)
- `rating` (INTEGER, 1-5)
- `created_at` (TIMESTAMPTZ)
- `updated_at` (TIMESTAMPTZ)
- UNIQUE Constraint: (song_id, user_id)

**song_rankings** (View)
- Berechnet automatisch durchschnittliche Bewertungen und Ranking

## Verwendung

1. **Registrieren**: Erstelle ein Konto für deine Band
2. **Song vorschlagen**: Füge Songs mit YouTube-Links hinzu
3. **Abstimmen**: Bewerte Songs mit 1-5 Sternen während du das Video anschaust
4. **Setliste ansehen**: Die Top 20 Songs basierend auf den Bewertungen

## Architektur & Best Practices

### Authentifizierung
- **Zentrale Middleware**: Auth-Logik in `src/middleware.ts` für alle geschützten Routen
- **Session Management**: User-Daten über `Astro.locals` verfügbar
- **Cookie Security**: HttpOnly, Secure (Production), SameSite-Flags

### Code-Organisation
- **Wiederverwendbare Komponenten**: Navigation als separate Komponente
- **TypeScript**: Strikte Typisierung mit Interfaces für Song, Vote, User
- **DRY-Prinzip**: Keine Code-Duplikation durch zentralisierte Logik

## Sicherheit

- Row Level Security (RLS) ist auf allen Tabellen aktiviert
- Benutzer können nur ihre eigenen Votes bearbeiten
- Authentifizierung erforderlich für alle geschützten Routen
- Auth-Cookies mit HttpOnly-Flag gegen XSS geschützt
- Secure-Flag in Production für HTTPS-only
- SameSite-Protection gegen CSRF-Angriffe

## Commands

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |

## Support

Bei Fragen oder Problemen öffne ein Issue im Repository oder kontaktiere den Entwickler.
