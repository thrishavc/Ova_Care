import { SymptomAnalysisResult } from '../types/health';

export const CURATED_DEMO_CASES: Record<string, SymptomAnalysisResult> = {
  'irregular-pelvic': {
    id: 'demo-irregular-pelvic',
    timestamp: new Date().toISOString(),
    originalInput: 'My periods have been irregular for two months, and sometimes I experience lower abdominal pain.',
    detectedLanguage: 'English',
    urgency: 'prompt',
    urgencyTitle: 'Prompt Medical Consultation Recommended',
    urgencyReason: 'A combination of two consecutive months of cycle irregularity accompanied by recurring lower abdominal pain benefits from a clinical evaluation within the next 1–2 weeks to explore potential hormonal or anatomical factors.',
    understoodSymptoms: [
      'Menstrual cycle irregularity (spanning past 2 months)',
      'Intermittent lower abdominal discomfort / pelvic aching',
      'Recent onset without prior predictable pattern noted'
    ],
    durationAndDetails: 'Duration reported: 2 months of cycle irregularity with intermittent lower abdominal pain.',
    missingInformation: [
      'Exact cycle lengths (e.g., how many days between the start of one period and the next)',
      'Pain characteristics (is it dull, sharp, throbbing, or linked to specific cycle days?)',
      'Bleeding characteristics (heavier than usual, lighter spotting, presence of clots)',
      'Pregnancy test status (if sexually active and of reproductive age)',
      'Recent life changes (elevated stress, significant weight shifts, or new medications)'
    ],
    plainLanguageExplanation: 'Your menstrual cycle is governed by a delicate interplay of hormones produced by the hypothalamus, pituitary gland, and ovaries. When periods shift off schedule for a couple of cycles, it often indicates an anovulatory cycle (a month where an egg was not released on time) or an underlying hormonal transition. Lower abdominal pain may stem from uterine muscle contractions, ovarian follicular activity, mild pelvic congestion, or digestive overlap.',
    commonAssociations: [
      {
        name: 'Hormonal Fluctuation or Stress-Induced Anovulation',
        description: 'Physical or emotional stressors can elevate cortisol, temporarily delaying the ovulatory signal and causing skipped or delayed cycles with mild cramping.',
        prevalenceNote: 'Very common; frequently self-resolves after stress reduction.'
      },
      {
        name: 'Polycystic Ovary Syndrome (PCOS) Tendency',
        description: 'A condition characterized by infrequent ovulation, androgen balance variations, and small immature ovarian follicles that can cause irregular bleeding.',
        prevalenceNote: 'Affects approximately 8-13% of women of reproductive age.'
      },
      {
        name: 'Benign Ovarian Follicular or Functional Cysts',
        description: 'Temporary fluid-filled sacs that can develop during a cycle when a follicle fails to release its egg, sometimes producing mild unilateral pelvic dullness.',
        prevalenceNote: 'Common and usually resolve spontaneously over 1-3 cycles.'
      }
    ],
    nextSteps: [
      'Schedule a routine, non-emergency appointment with a gynecologist or primary care physician for a gentle pelvic exam and hormone panel.',
      'Maintain a written symptom log noting the first day of bleeding, flow intensity, and pain scores on a 1-10 scale.',
      'Take a standard home urine pregnancy test if sexually active, as early pregnancy can present with spotting and mild cramping.',
      'Seek prompt medical care if the pain becomes sudden, sharp, and severe, or if you develop a fever.'
    ],
    suggestedDoctorQuestions: [
      'Based on my symptoms, do you recommend a pelvic ultrasound to examine my ovaries and uterine lining?',
      'Would blood tests for thyroid function (TSH), prolactin, and reproductive hormones (FSH, LH, testosterone) be helpful at this stage?',
      'Could my recent lifestyle factors or stress levels explain this two-month cycle shift?',
      'What specific signs or pain changes should prompt me to seek urgent care before our next follow-up?'
    ],
    verifiedSources: [
      {
        title: 'Abnormal Uterine Bleeding FAQs',
        organization: 'American College of Obstetricians and Gynecologists (ACOG)',
        url: 'https://www.acog.org/womens-health/faqs/abnormal-uterine-bleeding',
        summary: 'Clinical framework for investigating cycle irregularity and common benign pelvic causes.'
      },
      {
        title: 'Irregular Periods Clinical Guidance',
        organization: 'National Health Service (NHS UK)',
        url: 'https://www.nhs.uk/conditions/irregular-periods/',
        summary: 'Patient guide explaining potential hormonal causes and when to visit your family physician.'
      }
    ],
    disclaimer: 'Educational information only. Ova Care provides structured health literacy and does not diagnose disease or replace a clinician consultation.',
    isAiGenerated: false,
    demoModelLabel: 'Verified Clinical Demonstration Profile'
  },
  'hindi-hinglish': {
    id: 'demo-hindi-hinglish',
    timestamp: new Date().toISOString(),
    originalInput: 'Mere periods irregular hain aur kabhi-kabhi lower abdomen mein pain hota hai.',
    detectedLanguage: 'Hindi / Hinglish (हिंदी / हिंग्लिश)',
    urgency: 'prompt',
    urgencyTitle: 'Prompt Medical Consultation Recommended (डॉक्टर से परामर्श की सलाह)',
    urgencyReason: 'लगातार माहवारी (पीरियड्स) में अनियमिता और पेट के निचले हिस्से में दर्द की जांच एक स्त्री रोग विशेषज्ञ (Gynecologist) से कराना उचित है।',
    understoodSymptoms: [
      'Irregular menstrual timing (माहवारी की अनियमितता)',
      'Intermittent lower abdominal discomfort (निचले पेट में रुक-रुक कर दर्द होना)',
      'Subtle pelvic sensation without clear emergency flags'
    ],
    durationAndDetails: 'User reported in Hinglish: Periods are irregular and experiencing occasional lower abdominal pain.',
    missingInformation: [
      'अनियमितता कब से है (महीनों या हफ़्तों की संख्या)?',
      'माहवारी में ब्लीडिंग कम है या बहुत ज़्यादा?',
      'क्या दर्द पीरियड्स से पहले बढ़ता है या हमेशा रहता है?',
      'क्या हाल ही में तनाव, वज़न में बदलाव या थायरॉइड की समस्या हुई है?'
    ],
    plainLanguageExplanation: 'माहवारी का समय शरीर के हॉर्मोन्स (एस्ट्रोजन और प्रोजेस्टेरोन) पर निर्भर करता है। जब ओवुलेशन (अंडे का बनना और फूटना) समय पर नहीं होता, तो पीरियड्स आगे-पीछे हो सकते हैं। पेट के निचले हिस्से में हल्का दर्द गर्भाशय की मांसपेशियों में खिंचाव या ओवरी में छोटे सिस्ट की वजह से हो सकता है। यह आमतौर पर सामान्य हॉर्मोनल बदलाव या तनाव से जुड़ा होता है, लेकिन डॉक्टर से जांच कराना सुरक्षित रहता है।',
    commonAssociations: [
      {
        name: 'Hormonal Imbalance / PCOD / PCOS संभावना',
        description: 'हॉर्मोनल असंतुलन के कारण ओवरी में समय पर अंडा नहीं बन पाता, जिससे पीरियड्स देर से आते हैं।',
        prevalenceNote: 'युवा महिलाओं में काफ़ी सामान्य (8-15%)'
      },
      {
        name: 'Stress and Lifestyle Shifts (तनाव व खानपान में बदलाव)',
        description: 'मानसिक या शारीरिक तनाव से मस्तिष्क के हॉर्मोन चक्र प्रभावित होते हैं।',
        prevalenceNote: 'बहुत सामान्य'
      }
    ],
    nextSteps: [
      'एक स्त्री रोग विशेषज्ञ (Gynecologist) से मिलकर अल्ट्रासाउंड और थायरॉइड/हॉर्मोन टेस्ट की चर्चा करें।',
      'अपने पीरियड्स की तारीखें और दर्द का समय एक डायरी या ऐप में दर्ज करें।',
      'यदि दर्द अचानक बहुत तेज़ हो जाए या चक्कर आएं, तो तुरंत आपातकालीन चिकित्सा सहायता लें।'
    ],
    suggestedDoctorQuestions: [
      'क्या मुझे पेल्विक अल्ट्रासाउंड या हॉर्मोन ब्लड टेस्ट कराने की आवश्यकता है?',
      'क्या यह PCOD/PCOS या थायरॉइड की वजह से हो सकता है?',
      'जीवनशैली और खानपान में क्या बदलाव करने चाहिए?'
    ],
    verifiedSources: [
      {
        title: 'Women Health & Menstrual Care',
        organization: 'World Health Organization (WHO) South-East Asia',
        url: 'https://www.who.int/southeastasia/health-topics/maternal-health',
        summary: 'सार्वजनिक स्वास्थ्य दिशा-निर्देश महिलाओं के प्रजनन स्वास्थ्य के लिए।'
      },
      {
        title: 'Irregular Periods Guidance',
        organization: 'NHS UK Health Info',
        url: 'https://www.nhs.uk/conditions/irregular-periods/',
        summary: 'पीरियड्स की अनियमितता और कारणों की संपूर्ण जानकारी।'
      }
    ],
    disclaimer: 'यह केवल शैक्षणिक जानकारी है और किसी डॉक्टर के परामर्श या बीमारी के निदान (Diagnosis) का विकल्प नहीं है।',
    isAiGenerated: false,
    demoModelLabel: 'Verified Multilingual Demonstration Profile'
  },
  'kannada': {
    id: 'demo-kannada',
    timestamp: new Date().toISOString(),
    originalInput: 'ನನ್ನ ಮುಟ್ಟು ಕಳೆದ ೨ ತಿಂಗಳುಗಳಿಂದ ಸರಿ ಇಲ್ಲ ಮತ್ತು ಹೊಟ್ಟೆಯ ಕೆಳಭಾಗದಲ್ಲಿ ನೋವು ಬರುತ್ತಿದೆ.',
    detectedLanguage: 'Kannada (ಕನ್ನಡ)',
    urgency: 'prompt',
    urgencyTitle: 'Prompt Medical Consultation Recommended (ವೈದ್ಯರ ಭೇಟಿಯ ಶಿಫಾರಸು)',
    urgencyReason: 'ಕಳೆದ ಎರಡು ತಿಂಗಳುಗಳಿಂದ ಋತುಚಕ್ರದ ವ್ಯತ್ಯಾಸ ಹಾಗೂ ಕೆಳಹೊಟ್ಟೆ ನೋವಿನ ಲಕ್ಷಣಗಳಿರುವುದರಿಂದ ವೈದ್ಯರನ್ನು ಭೇಟಿಯಾಗಿ ಪರೀಕ್ಷಿಸಿಕೊಳ್ಳುವುದು ಸೂಕ್ತ.',
    understoodSymptoms: [
      'Menstrual irregularity for past 2 months (ಕಳೆದ 2 ತಿಂಗಳಿಂದ ಮುಟ್ಟಿನ ಅಸ್ತವ್ಯಸ್ತತೆ)',
      'Lower abdominal pelvic ache (ಕೆಳಹೊಟ್ಟೆ ನೋವು)',
      'Recurrent pattern requiring clinical review'
    ],
    durationAndDetails: 'ಕಳೆದ 2 ತಿಂಗಳುಗಳಿಂದ ಮುಟ್ಟಿನ ಅಸ್ಥಿರತೆ ಮತ್ತು ಮಧ್ಯಂತರ ಕೆಳಹೊಟ್ಟೆ ನೋವು ಕಾಣಿಸಿಕೊಂಡಿದೆ.',
    missingInformation: [
      'ರಕ್ತಸ್ರಾವದ ಪ್ರಮಾಣ (ಅತಿಯಾದ ರಕ್ತಸ್ರಾವವೇ ಅಥವಾ ಕಡಿಮೆ ರಕ್ತಸ್ರಾವವೇ?)',
      'ನೋವಿನ ಸ್ವರೂಪ ಮತ್ತು ಸಮಯ',
      'ಇತ್ತೀಚಿನ ತೂಕದ ಬದಲಾವಣೆ ಅಥವಾ ಮಾನಸಿಕ ಒತ್ತಡವಿದೆಯೇ?'
    ],
    plainLanguageExplanation: 'ಋತುಚಕ್ರವು ಹಾರ್ಮೋನ್ ಸಮತೋಲನದ ಮೇಲೆ ಅವಲಂಬಿತವಾಗಿರುತ್ತದೆ. ಅಂಡೋತ್ಪತ್ತಿ (Ovulation) ಸರಿಯಾದ ಸಮಯಕ್ಕೆ ಆಗದಿದ್ದಾಗ ಋತುಚಕ್ರವು ಮುಂದೂಡಲ್ಪಡಬಹುದು ಅಥವಾ ಅಸ್ಥಿರವಾಗಬಹುದು. ಕೆಳಹೊಟ್ಟೆಯ ನೋವು ಹಾರ್ಮೋನ್ ಏರಿಳಿತ, ಗರ್ಭಾಶಯದ ಸಂಕೋಚನ ಅಥವಾ ಅಂಡಾಶಯದ ಸಣ್ಣ ನೀರಿನ ಗುಳ್ಳೆಗಳಿಂದ (Cysts) ಉಂಟಾಗಬಹುದು.',
    commonAssociations: [
      {
        name: 'Hormonal Imbalance / PCOS (ಹಾರ್ಮೋನ್ ಏರುಪೇರು)',
        description: 'ಹಾರ್ಮೋನುಗಳ ಅಸಮತೋಲನದಿಂದ ಮುಟ್ಟು ಸಮಯಕ್ಕೆ ಸರಿಯಾಗಿ ಬಾರದಿರುವುದು.',
        prevalenceNote: 'ಮಹಿಳೆಯರಲ್ಲಿ ಸಾಮಾನ್ಯವಾಗಿ ಕಂಡುಬರುವ ಸಮಸ್ಯೆ'
      },
      {
        name: 'Stress and Diet Factors (ಒತ್ತಡ ಮತ್ತು ಆಹಾರ ಕ್ರಮ)',
        description: 'ಮಾನಸಿಕ ಒತ್ತಡ ಅಥವಾ ಪೌಷ್ಟಿಕಾಂಶದ ಕೊರತೆಯಿಂದ ಹಾರ್ಮೋನ್ ಬದಲಾವಣೆ.'
      }
    ],
    nextSteps: [
      'ಸ್ತ್ರೀರೋಗ ತಜ್ಞರನ್ನು (Gynecologist) ಭೇಟಿ ಮಾಡಿ ಅಲ್ಟ್ರಾಸೌಂಡ್ ಸ್ಕ್ಯಾನ್ ಮತ್ತು ರಕ್ತ ಪರೀಕ್ಷೆ ಮಾಡಿಸಿಕೊಳ್ಳಿ.',
      'ಪ್ರತಿತಿಂಗಳ ಮುಟ್ಟಿನ ದಿನಾಂಕಗಳನ್ನು ಬರೆದಿಟ್ಟುಕೊಳ್ಳಿ.',
      'ತೀವ್ರ ನೋವು ಅಥವಾ ಅಧಿಕ ರಕ್ತಸ್ರಾವವಿದ್ದರೆ ತಕ್ಷಣ ವೈದ್ಯಕೀಯ ಚಿಕಿತ್ಸೆ ಪಡೆಯಿರಿ.'
    ],
    suggestedDoctorQuestions: [
      'ನನ್ನ ಸಮಸ್ಯೆಗೆ ಪೆಲ್ವಿಕ್ ಸ್ಕ್ಯಾನ್ ಅಥವಾ ಥೈರಾಯ್ಡ್ ಪರೀಕ್ಷೆ ಅಗತ್ಯವಿದೆಯೇ?',
      'ಇದು ಪಿಸಿಓಎಸ್ (PCOS) ಲಕ್ಷಣವೇ?',
      'ಆಹಾರದಲ್ಲಿ ಯಾವ ಮುನ್ನೆಚ್ಚರಿಕೆಗಳನ್ನು ವಹಿಸಬೇಕು?'
    ],
    verifiedSources: [
      {
        title: 'Menstrual Health & Gynecology Guidelines',
        organization: 'World Health Organization (WHO)',
        url: 'https://www.who.int/news-room/fact-sheets/detail/polycystic-ovary-syndrome',
        summary: 'ಮಹಿಳೆಯರ ಋತುಚಕ್ರ ಮತ್ತು ಹಾರ್ಮೋನ್ ಆರೋಗ್ಯದ ವೈದ್ಯಕೀಯ ಮಾಹಿತಿ.'
      }
    ],
    disclaimer: 'ಇದು ಕೇವಲ ಶೈಕ್ಷಣಿಕ ಮಾಹಿತಿಯಾಗಿದೆ. ಯಾವುದೇ ರೋಗನಿರ್ಣಯ ಅಥವಾ ಔಷಧೋಪಚಾರಕ್ಕಾಗಿ ವೈದ್ಯರನ್ನೇ ಸಂಪರ್ಕಿಸಿ.',
    isAiGenerated: false,
    demoModelLabel: 'Verified Kannada Regional Profile'
  },
  'urgent-emergency': {
    id: 'demo-urgent-emergency',
    timestamp: new Date().toISOString(),
    originalInput: 'I have sudden, severe, sharp pain in my lower right abdomen, feeling dizzy and lightheaded, and faint with a slight fever.',
    detectedLanguage: 'English',
    urgency: 'urgent',
    urgencyTitle: 'Emergency Medical Care Required Immediately',
    urgencyReason: 'Sudden, acute, severe lower abdominal pain accompanied by dizziness, faintness (presyncope), and fever is a high-priority red flag that requires immediate emergency evaluation to rule out conditions such as ectopic pregnancy, appendicitis, or ovarian torsion.',
    understoodSymptoms: [
      'Sudden onset of severe, sharp right lower abdominal / pelvic pain',
      'Systemic weakness: dizziness and feeling faint (hemodynamic compromise risk)',
      'Fever with localized abdominal guarding'
    ],
    durationAndDetails: 'Sudden acute onset; severe localized pain with systemic instability flags.',
    missingInformation: [
      'Possibility of current pregnancy (last menstrual period date)',
      'Exact temperature if measured',
      'Presence of unexpected vaginal bleeding'
    ],
    plainLanguageExplanation: 'Sudden, severe, unilateral lower abdominal pain combined with lightheadedness or feeling faint is a critical medical sign. It suggests acute peritoneal irritation or internal bleeding, which can happen with a ruptured ovarian cyst, ectopic pregnancy, pelvic infection, or appendicitis. This requires immediate hands-on clinical assessment, not watchful waiting.',
    commonAssociations: [
      {
        name: 'Acute Ectopic Pregnancy (If Sexually Active)',
        description: 'A fertilized egg implanting outside the uterus (usually in the fallopian tube), which can rupture and cause internal bleeding and collapse.',
        prevalenceNote: 'Immediate surgical/medical emergency.'
      },
      {
        name: 'Ovarian Torsion or Ruptured Hemorrhagic Cyst',
        description: 'Twisting of the ovary on its vascular pedicle cutting off blood supply, or a bleeding cyst causing rapid peritoneal irritation.',
        prevalenceNote: 'Requires urgent pelvic ultrasound and emergency management.'
      },
      {
        name: 'Acute Appendicitis or Pelvic Abscess',
        description: 'Inflammation of the appendix (often lower right quadrant) or severe pelvic infection presenting with fever and acute tenderness.',
        prevalenceNote: 'Urgent medical evaluation essential.'
      }
    ],
    nextSteps: [
      'DO NOT DELAY. Go immediately to the nearest hospital Emergency Room (A&E) or call emergency services (112 in India, 911 in US, 999 in UK).',
      'Do not eat or drink anything until assessed by a surgeon or emergency physician, in case emergency procedures are required.',
      'Have someone accompany or drive you; do not attempt to drive yourself while dizzy or faint.',
      'Clearly tell the emergency triage nurse: "I have sudden severe pelvic pain, dizziness, and fever."'
    ],
    suggestedDoctorQuestions: [
      'Is my hemodynamic status (blood pressure and heart rate) stable?',
      'Can you perform a stat pelvic and abdominal ultrasound and quantitative hCG blood test?',
      'Is there any evidence of free peritoneal fluid or internal bleeding?'
    ],
    verifiedSources: [
      {
        title: 'Emergency Pelvic Pain Management',
        organization: 'American College of Emergency Physicians (ACEP)',
        url: 'https://www.emergencyphysicians.org/article/know-when-to-go/abdominal-pain',
        summary: 'Emergency indicators for acute abdominal and pelvic pain requiring immediate hospitalization.'
      },
      {
        title: 'Ectopic Pregnancy Emergency Notice',
        organization: 'ACOG',
        url: 'https://www.acog.org/womens-health/faqs/ectopic-pregnancy',
        summary: 'Signs of life-threatening fallopian tube rupture and acute pain red flags.'
      }
    ],
    disclaimer: 'CRITICAL SAFETY NOTICE: This system provides health literacy only and is NOT an emergency response service. Please seek in-person emergency medical care immediately.',
    isAiGenerated: false,
    demoModelLabel: 'Verified Emergency Triage Demonstration Profile'
  },
  'cramps-endometriosis': {
    id: 'demo-cramps-endometriosis',
    timestamp: new Date().toISOString(),
    originalInput: 'I have severe, debilitating menstrual cramps every month that leave me bedridden for two to three days, along with heavy bleeding, extreme fatigue, and pain during bowel movements.',
    detectedLanguage: 'English',
    urgency: 'prompt',
    urgencyTitle: 'Prompt Specialist Consultation Recommended',
    urgencyReason: 'Menstrual pain that is debilitating, requires days in bed, and is accompanied by bowel pain or heavy bleeding is not standard primary dysmenorrhea and warrants a thorough evaluation by a gynecologist for secondary causes such as endometriosis.',
    understoodSymptoms: [
      'Severe, debilitating dysmenorrhea (incapacitating period cramps lasting 2-3 days)',
      'Heavy menstrual bleeding (menorrhagia)',
      'Catamenial dyschezia (painful bowel movements during menses)',
      'Severe chronic fatigue'
    ],
    durationAndDetails: 'Occurs recurringly each month, lasting 2 to 3 days per cycle.',
    missingInformation: [
      'Number of pads/tampons soaked through during heaviest days',
      'Whether over-the-counter NSAIDs (like ibuprofen) provide any meaningful relief',
      'Whether pelvic pain occurs outside of menstrual days or during intercourse',
      'Family history of endometriosis, adenomyosis, or uterine fibroids'
    ],
    plainLanguageExplanation: 'While mild cramping is common during menstruation due to uterine prostaglandins, severe pain that disrupts daily functioning or causes bowel pain is known as secondary dysmenorrhea. This frequently points to conditions where tissue similar to the uterine lining is present outside the uterus, causing localized inflammation, nerve irritation, and cyclical pain.',
    commonAssociations: [
      {
        name: 'Endometriosis',
        description: 'Endometrial-like tissue growing outside the uterus on ovaries, uterosacral ligaments, or bowel surfaces, causing chronic cyclical inflammation.',
        prevalenceNote: 'Affects roughly 10% of reproductive-aged women globally.'
      },
      {
        name: 'Adenomyosis',
        description: 'Endometrial glands and stroma growing directly into the muscular wall of the uterus (myometrium), leading to enlarged, intensely tender uterine contractions.',
        prevalenceNote: 'Common in women between ages 30-50, especially with heavy bleeding.'
      },
      {
        name: 'Uterine Fibroids (Leiomyomas)',
        description: 'Benign smooth muscle tumors in the uterus that can amplify menstrual cramping and bleeding volume.',
        prevalenceNote: 'Very common, occurring in up to 70% of women by age 50.'
      }
    ],
    nextSteps: [
      'Book a focused consultation with a gynecologist, preferably one with experience in chronic pelvic pain and endometriosis.',
      'Begin a symptom diary recording pain intensity (1-10), pain relationship to bowel movements, and medication response.',
      'Discuss a trial of targeted first-line therapies (such as scheduled NSAIDs started 24h before menses or continuous hormonal options).',
      'Request high-resolution pelvic ultrasound or pelvic MRI with an endometriosis protocol.'
    ],
    suggestedDoctorQuestions: [
      'Given that my period pain keeps me in bed and causes bowel pain, could endometriosis or adenomyosis be present?',
      'Do you recommend a specialized pelvic ultrasound or MRI to check for deep infiltrating lesions or adhesions?',
      'What are our medical options for pain suppression, and when should we consider laparoscopic exploration?'
    ],
    verifiedSources: [
      {
        title: 'Endometriosis Clinical Guidance',
        organization: 'World Health Organization (WHO)',
        url: 'https://www.who.int/news-room/fact-sheets/detail/endometriosis',
        summary: 'Global recommendations on early recognition of chronic debilitating pelvic pain.'
      },
      {
        title: 'Dysmenorrhea and Chronic Pelvic Pain',
        organization: 'ACOG Practice Bulletin',
        url: 'https://www.acog.org/womens-health/faqs/dysmenorrhea-painful-periods',
        summary: 'Distinguishing primary from secondary dysmenorrhea and treatment protocols.'
      }
    ],
    disclaimer: 'Educational information only. Severe menstrual pain is a real medical symptom that deserves personalized physician care.',
    isAiGenerated: false,
    demoModelLabel: 'Verified Clinical Demonstration Profile'
  }
};

/**
 * Intelligent heuristic fallback parser for custom user queries when offline or without API key
 */
export function analyzeSymptomLocally(input: string, preferredLanguage = 'en'): SymptomAnalysisResult {
  const lower = input.toLowerCase();

  // Check for Kannada language or script
  if (/[\u0C80-\u0CFF]/.test(input) || preferredLanguage === 'kn') {
    return {
      ...CURATED_DEMO_CASES['kannada'],
      id: `analysis-${Date.now()}`,
      timestamp: new Date().toISOString(),
      originalInput: input,
      isAiGenerated: false,
      demoModelLabel: 'Kannada Regional Model (Demonstration Mode)'
    };
  }

  // Check for Hindi/Hinglish language or script
  if (lower.includes('hai') || lower.includes('mein') || lower.includes('kabhi') || lower.includes('dard') || /[\u0900-\u097F]/.test(input) || preferredLanguage === 'hi') {
    return {
      ...CURATED_DEMO_CASES['hindi-hinglish'],
      id: `analysis-${Date.now()}`,
      timestamp: new Date().toISOString(),
      originalInput: input,
      isAiGenerated: false,
      demoModelLabel: 'Multilingual Clinical Model (Demonstration Mode)'
    };
  }

  // Check for severe emergency red flags
  const isEmergency =
    lower.includes('severe') &&
    (lower.includes('sharp') || lower.includes('faint') || lower.includes('dizzy') || lower.includes('unbearable') || lower.includes('bleeding heavily') || lower.includes('pregnant') || lower.includes('vomiting blood'));

  if (isEmergency) {
    return {
      ...CURATED_DEMO_CASES['urgent-emergency'],
      id: `analysis-${Date.now()}`,
      timestamp: new Date().toISOString(),
      originalInput: input,
      detectedLanguage: 'English',
      isAiGenerated: false,
      demoModelLabel: 'Rule-Based Safety Classifier (Offline Demonstration Mode)'
    };
  }

  // Check for cramping/endometriosis/heavy periods
  if (lower.includes('cramp') || lower.includes('heavy') || lower.includes('painful period') || lower.includes('bedridden') || lower.includes('clot')) {
    return {
      ...CURATED_DEMO_CASES['cramps-endometriosis'],
      id: `analysis-${Date.now()}`,
      timestamp: new Date().toISOString(),
      originalInput: input,
      detectedLanguage: 'English',
      isAiGenerated: false,
      demoModelLabel: 'Clinical Heuristic Parser (Offline Demonstration Mode)'
    };
  }

  // Default to irregular/pelvic archetype customized with user's words
  return {
    ...CURATED_DEMO_CASES['irregular-pelvic'],
    id: `analysis-${Date.now()}`,
    timestamp: new Date().toISOString(),
    originalInput: input,
    understoodSymptoms: [
      'Reported symptom description: "' + input.slice(0, 100) + (input.length > 100 ? '...' : '') + '"',
      'Pelvic or cycle changes noted',
      'Individual variation requiring timeline tracking'
    ],
    durationAndDetails: 'Extracted from user input: ' + input,
    isAiGenerated: false,
    demoModelLabel: 'General Educational Engine (Demonstration Mode)'
  };
}
