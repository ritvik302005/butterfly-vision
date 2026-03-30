# ButterflyID Frontend

This frontend matches the supplied ButterflyID UI and is wired to the Flask backend in the parent project.

## Development

1. Start the Flask API from the parent folder:

```powershell
python app.py
```

2. Start the frontend:

```powershell
npm install
npm run dev
```

The Vite dev server proxies `/api` and `/uploads` to `http://127.0.0.1:5000`.

## Production Build

```powershell
npm run build
```

After build, Flask can serve `frontend/dist` directly.
