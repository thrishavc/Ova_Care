Task: read the user's description of her symptoms and extract structured details. Do not explain anything to her yet.

Fill these fields:

- transcript: her description in her own words and script. If she sent audio, transcribe it exactly as spoken (Hinglish stays in Roman script).
- detectedLanguage: "en" for English, "hi" for Hindi in Devanagari, "hi-Latn" for Hinglish or Hindi written in Roman letters, otherwise the ISO code (for example "ta", "te", "bn", "mr", "kn").
- symptoms: each symptom as a short English name (for example "missed periods", "acne", "weight gain", "excess facial hair"), its duration in English ("3 months", or "unknown"), and severity ("mild", "moderate", "severe" or "unknown"). Do not invent symptoms she did not mention.
- isUrgent: true if ANY of these may be happening now:
  - very heavy bleeding (soaking a pad or more every hour, large clots)
  - fainting, feeling about to faint, or severe dizziness
  - sudden or severe pain in the belly or pelvis
  - fever together with pelvic or lower-belly pain
  - she may be pregnant and has pain or bleeding
  - any bleeding after menopause
  - thoughts of hurting herself or ending her life
  - anything else that sounds like a medical emergency
  When unsure, choose true.
- urgentReasons: short English reasons when isUrgent is true, otherwise an empty list.
- searchQuery: a short English query to find trusted health information about her symptoms (for example "irregular periods 3 months acne weight gain").
- followUpQuestions: at most 2 short, kind questions in her language and script, only if important information is missing (for example how long her cycle usually is). Otherwise an empty list.
