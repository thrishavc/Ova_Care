// Frontend adapter: the symptom and chat screens check this before enabling live AI.
export async function GET() {
  return Response.json({
    status: "ok",
    hasApiKey: Boolean(process.env.GEMINI_API_KEY),
    isDemoDefault: false,
    timestamp: new Date().toISOString(),
  });
}
