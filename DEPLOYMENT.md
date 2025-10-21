# Deployment Anleitung für IONOS Deploy Now

## Vorbereitung

### 1. Git Repository erstellen

```bash
cd band-setlist-voting
git init
git add .
git commit -m "Initial commit: Band Setlist Voting App"
```

### 2. Zu GitHub pushen

Erstelle ein neues Repository auf GitHub und pushe den Code:

```bash
git remote add origin https://github.com/DEIN-USERNAME/band-setlist-voting.git
git branch -M main
git push -u origin main
```

## IONOS Deploy Now Setup

### 1. Account erstellen

- Gehe zu [IONOS Deploy Now](https://www.ionos.de/hosting/deploy-now)
- Melde dich an oder erstelle einen Account

### 2. Projekt verbinden

1. Klicke auf "New Project"
2. Wähle "From GitHub Repository"
3. Autorisiere IONOS Deploy Now für GitHub
4. Wähle dein `band-setlist-voting` Repository

### 3. Build-Konfiguration

IONOS Deploy Now sollte automatisch folgendes erkennen:

- **Framework**: Astro
- **Build Command**: `npm run build`
- **Output Directory**: `dist/`
- **Install Command**: `npm install`

Falls nicht, stelle diese Werte manuell ein.

### 4. Environment-Variablen konfigurieren

**Wichtig**: In den Projekt-Einstellungen unter "Environment Variables" folgende Variablen hinzufügen:

```
SUPABASE_URL=https://tjzaqozdfjcvswxjufwh.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRqemFxb3pkZmpjdnN3eGp1ZndoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA2NjcyMTEsImV4cCI6MjA3NjI0MzIxMX0.xl4inyWGg9qhsFLqWwXBvsjaehJBW2kOvsv4PzCie-4
```

### 5. Deployment starten

Klicke auf "Deploy" - der erste Deployment-Prozess startet automatisch.

## Nach dem Deployment

### URL konfigurieren

Nach erfolgreichem Deployment erhältst du eine URL wie:
```
https://dein-projekt.deploy.now.sh
```

Diese URL musst du in Supabase als erlaubte Redirect-URL eintragen:

1. Gehe zu deinem [Supabase Dashboard](https://supabase.com/dashboard/project/tjzaqozdfjcvswxjufwh/auth/url-configuration)
2. Unter **Authentication > URL Configuration**
3. Füge hinzu:
   - Redirect URLs: `https://dein-projekt.deploy.now.sh/api/auth/callback`
   - Site URL: `https://dein-projekt.deploy.now.sh`

### Email-Bestätigung (optional)

Standardmäßig erfordert Supabase Email-Bestätigungen. Um dies zu deaktivieren:

1. Gehe zu [Authentication > Providers](https://supabase.com/dashboard/project/tjzaqozdfjcvswxjufwh/auth/providers)
2. Unter **Email** > **Enable email confirmations** deaktivieren

## Automatische Deployments

IONOS Deploy Now deployed automatisch bei jedem Push zu GitHub:

```bash
git add .
git commit -m "Update: Neue Features"
git push
```

## Troubleshooting

### Build schlägt fehl

- Überprüfe die Build-Logs in IONOS Deploy Now
- Stelle sicher, dass alle Dependencies in `package.json` sind
- Überprüfe die Node.js Version (sollte 18+ sein)

### Authentication funktioniert nicht

- Überprüfe die Environment-Variablen
- Stelle sicher, dass die Redirect-URLs in Supabase korrekt sind
- Checke die Browser-Console für Fehler

### 404 Fehler

- Stelle sicher, dass der Output Directory auf `dist/` gesetzt ist
- Überprüfe, ob der Build erfolgreich war

## Monitoring

- **IONOS Deploy Now Dashboard**: Zeigt Deployment-Status und Logs
- **Supabase Dashboard**: Zeigt Database-Aktivität und API-Requests
- **Browser Dev Tools**: Network Tab für API-Debugging

## Performance-Tipps

1. **Caching**: IONOS Deploy Now cached automatisch statische Assets
2. **CDN**: Alle Assets werden über IONOS CDN ausgeliefert
3. **Compression**: Gzip-Compression ist automatisch aktiviert

## Support

Bei Problemen:
- IONOS Deploy Now Docs: https://docs.ionos.space/docs/
- Supabase Docs: https://supabase.com/docs
- GitHub Issues im Repository
