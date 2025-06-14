import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  try {
    const { text } = await req.json();

    const prompt = `
You are a helpful assistant. Extract the following job info from the text:

- Job Title
- Location
- Deadline (if any)
- Application Link (if present)

Only reply with a valid JSON object in this structure:
{
  "title": "...",
  "location": "...",
  "deadline": "...",
  "link": "..."
}

If a field is missing, use an empty string. Here's the text:
"""${text}"""
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
    });

    const reply = completion.choices[0]?.message?.content;
    const data = JSON.parse(reply);

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (err) {
    console.error("❌ Extraction Error:", err);
    return new Response(
      JSON.stringify({ error: "Failed to extract job info" }),
      { status: 500 }
    );
  }
}
