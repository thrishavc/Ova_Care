import type { AnalyzeRequest, ApiError } from "@/lib/types";
import { SAMPLE_RESPONSE } from "@/lib/ai/sampleResponse";

const MAX_TEXT_CHARS = 2000;

function badRequest(message: string) {
  const body: ApiError = { error: "bad_request", message };
  return Response.json(body, { status: 400 });
}

export async function POST(request: Request) {
  let body: Partial<AnalyzeRequest>;
  try {
    body = await request.json();
  } catch {
    return badRequest("Please send your symptoms as JSON.");
  }

  const text = typeof body.text === "string" ? body.text.trim() : "";
  if (!text && !body.audioBase64) {
    return badRequest("Please type or record your symptoms.");
  }
  if (text.length > MAX_TEXT_CHARS) {
    return badRequest(`Please keep your message under ${MAX_TEXT_CHARS} characters.`);
  }

  // Phase 1: hard-coded reply so the frontend can be built against the contract.
  return Response.json(SAMPLE_RESPONSE);
}
