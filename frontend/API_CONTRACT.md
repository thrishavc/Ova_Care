# Ova Care — Backend Integration API Contract

This document provides the API specifications for the backend team implementing the AI and chat microservices for Ova Care.

---

## 1. Chat Endpoint

**Method & Path**: `POST /api/chat`  
**Base URL**: Configured via `VITE_API_BASE_URL` in the frontend (defaults to current origin).  
**Content-Type**: `application/json`

### Request Body Schema

```json
{
  "message": "I have been experiencing irregular periods for two months with mild cramping.",
  "conversationId": "ova-conv-1713401234",
  "language": "en",
  "history": [
    {
      "role": "user",
      "content": "Hello, I wanted to ask about cycle irregularity."
    },
    {
      "role": "assistant",
      "content": "Hello. I am here to help you understand your symptoms..."
    }
  ],
  "metadata": {
    "platform": "web",
    "clientTimestamp": "2026-10-15T10:30:00.000Z"
  }
}
```

#### Request Fields

| Field | Type | Required | Description |
|---|---|---|---|
| `message` | `string` | **Yes** | The user's typed or spoken message. Trimmed, min 1 character. |
| `conversationId` | `string` | **Yes** | Unique session ID. Maintained across active conversation. |
| `language` | `string` | No | Target or detected language code (`en`, `hi`, `kn`, `auto`). |
| `history` | `Array<{role: string, content: string}>` | No | Context of prior messages in the active thread. |
| `metadata` | `object` | No | Optional client telemetry / timestamp. |

---

### Response Body Schema (Success `200 OK`)

```json
{
  "reply": "Thank you for sharing that. Irregular periods can have several possible causes, ranging from normal hormonal fluctuations to polycystic ovary syndrome (PCOS)...",
  "conversationId": "ova-conv-1713401234",
  "urgencyLevel": "routine",
  "suggestions": [
    "What tests might my doctor order?",
    "How can I track my cycle better?",
    "Generate printable doctor consultation sheet"
  ],
  "sources": [
    {
      "title": "ACOG Abnormal Uterine Bleeding Guidelines",
      "organization": "American College of Obstetricians and Gynecologists",
      "url": "https://www.acog.org"
    }
  ],
  "detectedLanguage": "en"
}
```

#### Response Fields

| Field | Type | Required | Description |
|---|---|---|---|
| `reply` | `string` | **Yes** | Markdown-formatted empathetic, non-diagnostic response. |
| `conversationId` | `string` | **Yes** | Same or updated session identifier. |
| `urgencyLevel` | `string` | No | `'routine'` \| `'prompt'` \| `'urgent'` for visual indicator badges. |
| `suggestions` | `string[]` | No | 2–4 quick follow-up prompt chips for the user. |
| `sources` | `Array<{title: string, organization: string, url?: string}>` | No | Verified medical source citations. |
| `detectedLanguage` | `string` | No | Detected or responded language (`en`, `hi`, `kn`). |

---

## 2. Health Check Endpoint

**Method & Path**: `GET /api/health-check`  
**Purpose**: Frontend checks if the backend server and AI service are live.

### Response `200 OK`
```json
{
  "status": "ok",
  "hasApiKey": true,
  "service": "ova-care-api",
  "timestamp": "2026-10-15T10:30:00.000Z"
}
```

---

## 3. Frontend Fallback Guarantee
- If the endpoint returns a `404`, `500`, or times out after 12 seconds, the frontend automatically serves a **realistic, clinically grounded fallback response** in English, Hindi, or Kannada.
- The UI never crashes or shows a blank screen.
- An inline "Backend Live" / "Demo Fallback" indicator is available in the chat header so teammates and judges can immediately verify the active backend connection.
