// Vercel serverless proxy for the Anthropic Messages API.
// Keeps the API key server-side — the browser never sees it.
//
// SETUP: add ANTHROPIC_API_KEY to the Vercel project's Environment Variables
// (Production + Preview), then redeploy. The client posts an Anthropic-shaped
// body ({ model, max_tokens, messages }) and gets the raw Anthropic JSON back.
//
// CommonJS (no package.json "type": module in this repo); `fetch` is a global on
// the Vercel Node runtime (Node 18+).

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.status(405).json({ error: { type: 'method_not_allowed', message: 'Use POST.' } });
    return;
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    res.status(500).json({ error: { type: 'config_error', message: 'ANTHROPIC_API_KEY is not set on the server.' } });
    return;
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
    const { model = 'claude-sonnet-4-6', max_tokens = 1024, messages = [], system } = body;

    const payload = { model, max_tokens, messages };
    if (system) payload.system = system;

    const upstream = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify(payload),
    });

    // Pass the Anthropic response (and status) straight through. On error the
    // body is already { type: "error", error: {...} }, which the client reads.
    const data = await upstream.json();
    res.status(upstream.status).json(data);
  } catch (err) {
    res.status(502).json({ error: { type: 'proxy_error', message: (err && err.message) || 'Upstream request failed.' } });
  }
};
