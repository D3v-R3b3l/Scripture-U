import express from 'express';
import { GoogleGenAI } from '@google/genai';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// API Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', name: 'Scripture Universe API' });
});

// Theological AI Discovery Route
app.post('/api/theology-explore', async (req, res) => {
  try {
    const { query, passage, theme } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(200).json({
        source: 'local-fallback',
        message: 'Live AI synthesis requires GEMINI_API_KEY. Operating with offline canonical knowledge base.',
      });
    }

    const ai = new GoogleGenAI({ apiKey });
    const prompt = `You are a scholarly biblical theologian and biblical language specialist (Biblical Hebrew, Aramaic, Koine Greek).
Analyze this inquiry within biblical theology, typology, and the Old Testament / New Testament canonical double-helix structure:

User Query: "${query || 'Inter-testament continuity'}"
Passage or Anchor: "${passage || 'Canonical Overview'}"
Theme/Motif: "${theme || 'Redemption & Covenant'}"

Respond with a strictly formatted JSON object with the following schema:
{
  "synthesis": "Scholarly, readable 2-3 paragraph theological exposition examining canonical depth, grammatical-historical nuances, and theological implications.",
  "originalLanguages": [
    { "term": "string in original script + transliteration", "language": "Hebrew/Aramaic/Greek", "definition": "string", "theologicalWeight": "string" }
  ],
  "otConnections": [
    { "passage": "Book Chapter:Verse", "context": "Historical and covenantal setting", "foreshadowing": "What pattern or expectation is established" }
  ],
  "ntFulfillments": [
    { "passage": "Book Chapter:Verse", "christologicalFocus": "How Christ or the Apostolic era realizes this", "exegesis": "Explanatory note" }
  ],
  "covenantalArc": "How this progresses from Edenic -> Noahic -> Abrahamic -> Mosaic -> Davidic -> New Covenant",
  "typologicalInsight": "Specific type and anti-type identification (e.g. shadow to substance)"
}
Return raw JSON only, no markdown markers.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      }
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json({
      source: 'gemini',
      data: parsed
    });
  } catch (error) {
    console.warn('Theology explore using offline fallback:', error instanceof Error ? error.message : error);
    return res.json({
      source: 'fallback',
      message: 'Operating with canonical theology knowledge base.'
    });
  }
});

// Mount Vite middleware in dev or static files in production
const isProd = process.env.NODE_ENV === 'production';
if (!isProd) {
  const { createServer: createViteServer } = await import('vite');
  const vite = await createViteServer({
    server: {
      middlewareMode: true,
      allowedHosts: true,
      hmr: false,
    },
    appType: 'spa',
  });
  app.use(vite.middlewares);
} else {
  app.use(express.static(path.resolve(__dirname, 'dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
  });
}

app.listen(Number(PORT), '0.0.0.0', () => {
  console.log(`Scripture Universe server running on http://0.0.0.0:${PORT}`);
});
