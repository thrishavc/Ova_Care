// Frontend adapter: the chat screen. Each message goes through the same safety pipeline
// as /api/analyze, so the chat never answers outside our rules or sources.
import { analyzeWithDeadline, toFrontendUrgency, toVerifiedSources } from "@/lib/ai/frontendAdapter";

const MAX_TEXT_CHARS = 2000;

export async function POST(request: Request) {
  let body: { message?: unknown; conversationId?: unknown };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Please send a message." }, { status: 400 });
  }
  const message = typeof body.message === "string" ? body.message.trim() : "";
  const conversationId = typeof body.conversationId === "string" ? body.conversationId : crypto.randomUUID();
  if (!message || message.length > MAX_TEXT_CHARS) {
    return Response.json({ error: "Please send a message under 2000 characters." }, { status: 400 });
  }

  try {
    const a = await analyzeWithDeadline(message);
    if (!a) return Response.json({ error: "This is taking longer than usual." }, { status: 504 });
    const care =
      a.urgency === "urgent" ? "" : `\n\nWho to see: ${a.careRecommendation.type}, ${a.careRecommendation.when}.`;
    return Response.json({
      reply: `${a.explanation}${care}\n\n${a.disclaimer}`,
      conversationId,
      suggestions: a.followUpQuestions,
      urgencyLevel: toFrontendUrgency(a.urgency),
      sources: toVerifiedSources(a).map(({ title, organization, url }) => ({ title, organization, url })),
      detectedLanguage: a.detectedLanguage,
      isFallback: false,
    });
  } catch (err) {
    console.error("[chat] failed:", err instanceof Error ? err.message : err);
    return Response.json({ error: "Please try again in a moment." }, { status: 503 });
  }
}
