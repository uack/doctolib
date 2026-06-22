export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured' });
  }

  const { messages } = req.body;
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Invalid request body' });
  }

  const systemPrompt = `You are a medical intake assistant for Doctolib. Your role is to collect patient-reported information before a medical appointment.

Rules:
- Acknowledge each answer briefly (1 sentence, under 20 words).
- When asked to generate the next question, base it on what the patient has shared so far. Make it relevant and specific.
- Never make clinical inferences, diagnoses, or medical judgements.
- Never say "Patient has..." — always use "Patient reported..."
- If a patient is distressed or mentions an emergency, say: "If this is an emergency, please call 15 (SAMU) or 112 immediately."
- Respond in the same language the patient uses.
- When generating a next question, format your response as: [acknowledgement]\nNEXT_QUESTION: [question]`;

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://doctolib-intake.vercel.app',
        'X-Title': 'Doctolib Waiting Room Intake',
      },
      body: JSON.stringify({
        model: 'deepseek/deepseek-chat',
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages,
        ],
        max_tokens: 200,
        temperature: 0.3,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error('OpenRouter error:', response.status, err);
      return res.status(502).json({ error: 'LLM service unavailable' });
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content ?? '';
    return res.status(200).json({ content });
  } catch (err) {
    console.error('Proxy error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
