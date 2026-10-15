/**
 * Ova Care - Centralized Multilingual Translations
 * Languages supported:
 * - English ('en')
 * - Hindi ('hi') - हिन्दी
 * - Kannada ('kn') - ಕನ್ನಡ
 */

export type SupportedLanguage = 'en' | 'hi' | 'kn';

export interface TranslationDictionary {
  [key: string]: {
    en: string;
    hi: string;
    kn: string;
  };
}

export const TRANSLATIONS: TranslationDictionary = {
  // Navigation
  'nav.home': {
    en: 'Home',
    hi: 'होम',
    kn: 'ಮುಖಪುಟ',
  },
  'nav.dashboard': {
    en: 'Health Dashboard',
    hi: 'स्वास्थ्य डैशबोर्ड',
    kn: 'ಆರೋಗ್ಯ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
  },
  'nav.chat': {
    en: 'AI Health Chat',
    hi: 'एआई स्वास्थ्य चैट',
    kn: 'ಎಐ ಆರೋಗ್ಯ ಚಾಟ್',
  },
  'nav.assistant': {
    en: 'Symptom Assistant',
    hi: 'लक्षण सहायक',
    kn: 'ರೋಗಲಕ್ಷಣ ಸಹಾಯಕ',
  },
  'nav.tracker': {
    en: 'Period Tracker',
    hi: 'पीरियड ट्रैकर',
    kn: 'ಮುಟ್ಟಿನ ಟ್ರ್ಯಾಕರ್',
  },
  'nav.history': {
    en: 'Cycle History',
    hi: 'मासिक चक्र इतिहास',
    kn: 'ಚಕ್ರದ ಇತಿಹಾಸ',
  },
  'nav.reports': {
    en: 'My Health Reports',
    hi: 'मेरी स्वास्थ्य रिपोर्ट',
    kn: 'ಆರೋಗ್ಯ ವರದಿಗಳು',
  },
  'nav.library': {
    en: 'Explore Health',
    hi: 'स्वास्थ्य जानकारी',
    kn: 'ಆರೋಗ್ಯ ಗ್ರಂಥಾಲಯ',
  },
  'nav.about': {
    en: 'About',
    hi: 'हमारे बारे में',
    kn: 'ನಮ್ಮ ಬಗ್ಗೆ',
  },
  'nav.describeSymptoms': {
    en: 'Describe Symptoms',
    hi: 'लक्षण बताएं',
    kn: 'ಲಕ್ಷಣಗಳನ್ನು ವಿವರಿಸಿ',
  },
  'nav.activeSession': {
    en: 'Active Session',
    hi: 'सक्रिय सत्र',
    kn: 'ಸಕ್ರಿಯ ಅವಧಿ',
  },
  'nav.brandTagline': {
    en: 'Women’s Health & Symptom Guidance',
    hi: 'महिला स्वास्थ्य एवं लक्षण मार्गदर्शन',
    kn: 'ಮಹಿಳೆಯರ ಆರೋಗ್ಯ ಮತ್ತು ಲಕ್ಷಣ ಮಾರ್ಗದರ್ಶನ',
  },

  // Language names
  'lang.en': {
    en: 'English',
    hi: 'English',
    kn: 'English',
  },
  'lang.hi': {
    en: 'हिन्दी (Hindi)',
    hi: 'हिन्दी',
    kn: 'ಹಿಂದಿ (Hindi)',
  },
  'lang.kn': {
    en: 'ಕನ್ನಡ (Kannada)',
    hi: 'कन्नड़ (Kannada)',
    kn: 'ಕನ್ನಡ',
  },
  'lang.selectLanguage': {
    en: 'Language',
    hi: 'भाषा',
    kn: 'ಭಾಷೆ',
  },

  // Hero Section
  'hero.trustBanner': {
    en: 'Your health matters. Your privacy matters.',
    hi: 'आपका स्वास्थ्य महत्वपूर्ण है। आपकी गोपनीयता महत्वपूर्ण है।',
    kn: 'ನಿಮ್ಮ ಆರೋಗ್ಯ ಮುಖ್ಯ. ನಿಮ್ಮ ಗೌಪ್ಯತೆ ಮುಖ್ಯ.',
  },
  'hero.trustDisclaimer': {
    en: 'Educational support, not a medical diagnosis.',
    hi: 'शैक्षिक सहायता, चिकित्सीय निदान नहीं।',
    kn: 'ಶೈಕ್ಷಣಿಕ ನೆರವು, ವೈದ್ಯಕೀಯ ರೋಗನಿರ್ಣಯವಲ್ಲ.',
  },
  'hero.headlineMain': {
    en: 'Your health deserves',
    hi: 'आपके स्वास्थ्य को आवश्यकता है',
    kn: 'ನಿಮ್ಮ ಆರೋಗ್ಯಕ್ಕೆ ಅಗತ್ಯವಿದೆ',
  },
  'hero.headlineHighlight': {
    en: 'to be heard.',
    hi: 'समझे जाने की।',
    kn: 'ಗಮನ ಮತ್ತು ಕಾಳಜಿಯ.',
  },
  'hero.subheadline': {
    en: 'Understand your symptoms, explore reliable health information, and feel more prepared to take the next step in your healthcare journey.',
    hi: 'अपने लक्षणों को समझें, प्रामाणिक स्वास्थ्य जानकारी प्राप्त करें, और अपनी स्वास्थ्य यात्रा में डॉक्टर से परामर्श के लिए पूरी तरह तैयार रहें।',
    kn: 'ನಿಮ್ಮ ರೋಗಲಕ್ಷಣಗಳನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಿ, ವಿಶ್ವಾಸಾರ್ಹ ಆರೋಗ್ಯ ಮಾಹಿತಿಯನ್ನು ಅನ್ವೇಷಿಸಿ ಮತ್ತು ವೈದ್ಯರ ಭೇಟಿಗೆ ಸಿದ್ಧರಾಗಿ.',
  },
  'hero.ctaChat': {
    en: 'AI Health Chat',
    hi: 'एआई स्वास्थ्य चैट',
    kn: 'ಎಐ ಆರೋಗ್ಯ ಚಾಟ್',
  },
  'hero.ctaForm': {
    en: 'Symptom Triage Form',
    hi: 'लक्षण विश्लेषण फॉर्म',
    kn: 'ರೋಗಲಕ್ಷಣ ವಿಶ್ಲೇಷಣೆ ನಮೂನೆ',
  },
  'hero.ctaLibrary': {
    en: 'Health Library',
    hi: 'स्वास्थ्य ग्रಂಥालय',
    kn: 'ಆರೋಗ್ಯ ಗ್ರಂಥಾಲಯ',
  },
  'hero.popularInquiries': {
    en: 'Popular inquiries (click to test immediately):',
    hi: 'सामान्य लक्षण (तुरंत जांचने के लिए क्लिक करें):',
    kn: 'ಸಾಮಾನ್ಯ ವಿಚಾರಣೆಗಳು (ತಕ್ಷಣ ಪರೀಕ್ಷಿಸಲು ಕ್ಲಿಕ್ ಮಾಡಿ):',
  },
  'hero.quickIrregular': {
    en: '🌸 Irregular Cycles',
    hi: '🌸 अनियमित मासिक धर्म',
    kn: '🌸 ಅನಿಯಮಿತ ಮುಟ್ಟು',
  },
  'hero.quickCramps': {
    en: '⚡ Severe Cramps',
    hi: '⚡ गंभीर ऐंठन व दर्द',
    kn: '⚡ ತೀವ್ರ ಹೊಟ್ಟೆ ನೋವು',
  },
  'hero.quickPcos': {
    en: '🌿 PCOS & Acne',
    hi: '🌿 पीसीओएस और मुंहासे',
    kn: '🌿 ಪಿಸಿಒಎಸ್ ಮತ್ತು ಮೊಡವೆ',
  },
  'hero.quickHeavy': {
    en: '💧 Heavy Bleeding',
    hi: '💧 अत्यधिक रक्तस्राव',
    kn: '💧 ಅತಿಯಾದ ರಕ್ತಸ್ರಾವ',
  },
  'hero.pillarLanguageTitle': {
    en: 'Everyday Language',
    hi: 'सरल आम बोलचाल',
    kn: 'ದೈನಂದಿನ ಸರಳ ಭಾಷೆ',
  },
  'hero.pillarLanguageDesc': {
    en: 'English, Hindi & Kannada',
    hi: 'अंग्रेजी, हिन्दी एवं कन्नड़',
    kn: 'ಇಂಗ್ಲಿಷ್, ಹಿಂದಿ ಮತ್ತು ಕನ್ನಡ',
  },
  'hero.pillarSafetyTitle': {
    en: 'Clinical Urgency Triage',
    hi: 'नैदानिक तात्कालिकता मार्गदर्शन',
    kn: 'ತುರ್ತು ಚಿಕಿತ್ಸಾ ಮಾರ್ಗದರ್ಶನ',
  },
  'hero.pillarSafetyDesc': {
    en: 'Identifies red-flag emergency symptoms',
    hi: 'गंभीर आपातकालीन लक्षणों की पहचान करता है',
    kn: 'ಅಪಾಯಕಾರಿ ಲಕ್ಷಣಗಳನ್ನು ಗುರುತಿಸುತ್ತದೆ',
  },
  'hero.pillarDoctorTitle': {
    en: 'Doctor Visit Sheet',
    hi: 'डॉक्टर परामर्श सारांश',
    kn: 'ವೈದ್ಯರ ಸಮಾಲೋಚನೆ ಹಾಳೆ',
  },
  'hero.pillarDoctorDesc': {
    en: 'Export printable clinical notes & questions',
    hi: 'मुद्रण योग्य नोट्स और प्रश्न तैयार करें',
    kn: 'ಮುದ್ರಿಸಬಹುದಾದ ಟಿಪ್ಪಣಿಗಳು ಮತ್ತು ಪ್ರಶ್ನೆಗಳು',
  },

  // Feature Cards
  'features.badge': {
    en: 'Interactive Care Architecture',
    hi: 'संवादात्मक देखभाल प्रणाली',
    kn: 'ಸಂವಾದಾತ್ಮಕ ಆರೈಕೆ ವ್ಯವಸ್ಥೆ',
  },
  'features.heading': {
    en: 'Thoughtfully designed for women at every stage.',
    hi: 'प्रत्येक चरण में महिलाओं के लिए विचारपूर्वक डिज़ाइन किया गया।',
    kn: 'ಪ್ರತಿಯೊಂದು ಹಂತದಲ್ಲೂ ಮಹಿಳೆಯರಿಗಾಗಿ ವಿನ್ಯಾಸಗೊಳಿಸಲಾಗಿದೆ.',
  },
  'features.subtext': {
    en: 'Explore our evidence-based tools designed to support symptom awareness, education, and consultation readiness.',
    hi: 'लक्षण जागरूकता, शिक्षा और डॉक्टर परामर्श तैयारी के लिए हमारे साक्ष्य-आधारित उपकरणों का अन्वेषण करें।',
    kn: 'ರೋಗಲಕ್ಷಣಗಳ ಅರಿವು, ಶಿಕ್ಷಣ ಮತ್ತು ವೈದ್ಯರ ಸಮಾಲೋಚನೆಗೆ ನಮ್ಮ ವಿಶ್ವಾಸಾರ್ಹ ಸಾಧನಗಳನ್ನು ಬಳಸಿ.',
  },
  'features.card1Kicker': {
    en: 'Symptom Assistant',
    hi: 'लक्षण सहायक',
    kn: 'ರೋಗಲಕ್ಷಣ ಸಹಾಯಕ',
  },
  'features.card1Title': {
    en: 'Understand Your Symptoms',
    hi: 'अपने लक्षणों को समझें',
    kn: 'ನಿಮ್ಮ ಲಕ್ಷಣಗಳನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಿ',
  },
  'features.card1Badge': {
    en: 'Multilingual AI',
    hi: 'बहुभाषी एआई',
    kn: 'ಬಹುಭಾಷಾ ಎಐ',
  },
  'features.card1Desc': {
    en: 'Describe your sensations in everyday language or regional phrases. Receive structured educational insights without intimidating jargon.',
    hi: 'अपनी अनुभूतियों को सरल शब्दों या क्षेत्रीय भाषा में बताएं। बिना कठिन चिकित्सीय शब्दों के स्पष्ट स्वास्थ्य जानकारी प्राप्त करें।',
    kn: 'ನಿಮ್ಮ ಅನಿಸಿಕೆಗಳನ್ನು ಸರಳ ಭಾಷೆಯಲ್ಲಿ ವಿವರಿಸಿ. ಕಠಿಣ ವೈದ್ಯಕೀಯ ಪದಗಳಿಲ್ಲದೆ ರಚನಾತ್ಮಕ ಶೈಕ್ಷಣಿಕ ಒಳನೋಟಗಳನ್ನು ಪಡೆಯಿರಿ.',
  },
  'features.card1Action': {
    en: 'Start Symptom Check',
    hi: 'लक्षण जांच शुरू करें',
    kn: 'ಲಕ್ಷಣ ಪರೀಕ್ಷೆ ಪ್ರಾರಂಭಿಸಿ',
  },
  'features.card2Kicker': {
    en: 'Evidence-Based Library',
    hi: 'प्रमाणित स्वास्थ्य पुस्तकालय',
    kn: 'ಸಾಕ್ಷ್ಯಾಧಾರಿತ ಗ್ರಂಥಾಲಯ',
  },
  'features.card2Title': {
    en: "Explore Women's Health",
    hi: 'महिला स्वास्थ्य जानें',
    kn: 'ಮಹಿಳೆಯರ ಆರೋಗ್ಯ ಅನ್ವೇಷಿಸಿ',
  },
  'features.card2Badge': {
    en: 'ACOG & WHO Grounded',
    hi: 'ACOG और WHO आधारित',
    kn: 'ACOG ಮತ್ತು WHO ಆಧಾರಿತ',
  },
  'features.card2Desc': {
    en: 'Browse vetted guides on menstrual health, PCOS, endometriosis, cramps, fertility, and menopause, backed by peer-reviewed literature.',
    hi: 'मासिक धर्म, पीसीओएस, एंडोमेट्रियोसिस, ऐंठन, प्रजनन क्षमता और रजोनिवृत्ति पर प्रमाणित स्वास्थ्य गाइड पढ़ें।',
    kn: 'ಮುಟ್ಟಿನ ಆರೋಗ್ಯ, ಪಿಸಿಒಎಸ್, ಎಂಡೊಮೆಟ್ರಿಯೊಸಿಸ್, ನೋವು, ಫಲವತ್ತತೆ ಮತ್ತು ಋತುಬಂಧದ ಕುರಿತು ಸಾಕ್ಷ್ಯಾಧಾರಿತ ಮಾರ್ಗದರ್ಶಿಗಳನ್ನು ಓದಿ.',
  },
  'features.card2Action': {
    en: 'Browse Health Library',
    hi: 'स्वास्थ्य गाइड पढ़ें',
    kn: 'ಆರೋಗ್ಯ ಗ್ರಂಥಾಲಯ ವೀಕ್ಷಿಸಿ',
  },
  'features.card3Kicker': {
    en: 'Consultation Preparation',
    hi: 'परामर्श तैयारी',
    kn: 'ಸಮಾಲೋಚನೆ ತಯಾರಿ',
  },
  'features.card3Title': {
    en: 'Prepare for a Doctor Visit',
    hi: 'डॉक्टर की मुलाकात की तैयारी',
    kn: 'ವೈದ್ಯರ ಭೇಟಿಗೆ ಸಿದ್ಧರಾಗಿ',
  },
  'features.card3Badge': {
    en: 'Printable PDF Sheet',
    hi: 'प्रिंट करने योग्य पत्रक',
    kn: 'ಮುದ್ರಿಸಬಹುದಾದ ಪಿಡಿಎಫ್ ಹಾಳೆ',
  },
  'features.card3Desc': {
    en: 'Generate a clean, printable summary of your symptoms, duration, and tailored questions to discuss with your healthcare professional.',
    hi: 'अपने लक्षणों, उनकी अवधि और डॉक्टर से पूछने योग्य विशिष्ट प्रश्नों का स्पष्ट, प्रिंट करने योग्य सारांश बनाएं।',
    kn: 'ನಿಮ್ಮ ಲಕ್ಷಣಗಳು, ಕಾಲಾವಧಿ ಮತ್ತು ವೈದ್ಯರೊಂದಿಗೆ ಚರ್ಚಿಸಲು ಸಿದ್ಧಪಡಿಸಿದ ಪ್ರಶ್ನೆಗಳ ಮುದ್ರಿಸಬಹುದಾದ ಸಾರಾಂಶವನ್ನು ಪಡೆಯಿರಿ.',
  },
  'features.card3Action': {
    en: 'View Preparation Tools',
    hi: 'तैयारी उपकरण देखें',
    kn: 'ತಯಾರಿ ಸಾಧನಗಳನ್ನು ವೀಕ್ಷಿಸಿ',
  },

  // How It Works
  'how.badge': {
    en: 'Interactive Patient Journey',
    hi: 'मरीज़ की सहज यात्रा',
    kn: 'ರೋಗಿಯ ಸುಲಭ ಪಯಣ',
  },
  'how.heading': {
    en: 'How Ova Care supports you.',
    hi: 'ओवा केयर आपकी कैसे मदद करता है।',
    kn: 'ಓವಾ ಕೇರ್ ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡುತ್ತದೆ.',
  },
  'how.subtext': {
    en: 'Follow our 4-step compassionate journey from everyday words to an empowered clinical discussion.',
    hi: 'सरल शब्दों में लक्षण बताने से लेकर डॉक्टर के साथ सशक्त चर्चा तक के हमारे 4 चरणों को देखें।',
    kn: 'ದೈನಂದಿನ ಸರಳ ಮಾತುಗಳಿಂದ ವೈದ್ಯರ ಸಮಾಲೋಚನೆಯವರೆಗೆ ನಮ್ಮ 4 ಹಂತಗಳ ಪ್ರಯಾಣವನ್ನು ತಿಳಿಯಿರಿ.',
  },
  'how.step1Title': {
    en: 'Describe your symptoms',
    hi: 'अपने लक्षण बताएं',
    kn: 'ನಿಮ್ಮ ಲಕ್ಷಣಗಳನ್ನು ವಿವರಿಸಿ',
  },
  'how.step1Desc': {
    en: 'Use natural everyday language, whether English, Hindi, or Kannada. Type or speak what you feel in your body without worrying about medical terms.',
    hi: 'अंग्रेजी, हिन्दी या कन्नड़ में अपनी स्वाभाविक भाषा का उपयोग करें। चिकित्सीय शब्दों की चिंता किए बिना टाइप करें या बोलें।',
    kn: 'ಇಂಗ್ಲಿಷ್, ಹಿಂದಿ ಅಥವಾ ಕನ್ನಡದಲ್ಲಿ ಸಾಮಾನ್ಯ ಭಾಷೆಯನ್ನು ಬಳಸಿ. ವೈದ್ಯಕೀಯ ಪದಗಳ ಚಿಂತೆಯಿಲ್ಲದೆ ಬರೆಯಿರಿ ಅಥವಾ ಮಾತನಾಡಿ.',
  },
  'how.step1Tag': {
    en: 'Everyday Words',
    hi: 'सहज शब्द',
    kn: 'ದೈನಂದಿನ ಮಾತುಗಳು',
  },
  'how.step2Title': {
    en: 'Review clear health information',
    hi: 'स्पष्ट स्वास्थ्य जानकारी देखें',
    kn: 'ಸ್ಪಷ್ಟ ಆರೋಗ್ಯ ಮಾಹಿತಿ ಪರಿಶೀಲಿಸಿ',
  },
  'how.step2Desc': {
    en: 'Understand physiological mechanisms in plain terms. See what bodily systems might be involved, along with identified symptoms and missing context.',
    hi: 'शरीर की कार्यप्रणाली को सरल शब्दों में समझें। संभावित कारणों, समझे गए लक्षणों और छूटी हुई जानकारी को जानें।',
    kn: 'ದೇಹದ ಕಾರ್ಯವಿಧಾನವನ್ನು ಸರಳವಾಗಿ ಅರ್ಥಮಾಡಿಕೊಳ್ಳಿ. ಸಂಭವನೀಯ ಕಾರಣಗಳು ಮತ್ತು ಪತ್ತೆಯಾದ ಲಕ್ಷಣಗಳನ್ನು ತಿಳಿಯಿರಿ.',
  },
  'how.step2Tag': {
    en: 'Physiology & Context',
    hi: 'शारीरिक संदर्भ',
    kn: 'ಶಾರೀರಿಕ ಹಿನ್ನೆಲೆ',
  },
  'how.step3Title': {
    en: 'Explore appropriate next steps',
    hi: 'उचित अगले कदम जानें',
    kn: 'ಮುಂದಿನ ಸೂಕ್ತ ಹೆಜ್ಜೆಗಳನ್ನು ತಿಳಿಯಿರಿ',
  },
  'how.step3Desc': {
    en: 'Receive transparent, safety-first clinical urgency guidance—knowing when standard primary care, prompt doctor review, or immediate emergency care is warranted.',
    hi: 'सुरक्षा को प्राथमिकता देते हुए जानें कि कब नियमित देखभाल, कब त्वरित डॉक्टर परामर्श, और कब आपातकालीन सहायता की आवश्यकता है।',
    kn: 'ಸುರಕ್ಷತೆಗೆ ಮೊದಲ ಆದ್ಯತೆ ನೀಡಿ, ಯಾವಾಗ ಸಾಮಾನ್ಯ ತಪಾಸಣೆ, ಯಾವಾಗ ಶೀಘ್ರ ವೈದ್ಯರ ಭೇಟಿ ಅಥವಾ ತಕ್ಷಣದ ತುರ್ತು ಚಿಕಿತ್ಸೆ ಅಗತ್ಯವೆಂದು ತಿಳಿಯಿರಿ.',
  },
  'how.step3Tag': {
    en: 'Safety & Triage',
    hi: 'सुरक्षा और प्राथमिकता',
    kn: 'ಸುರಕ್ಷತೆ ಮತ್ತು ತುರ್ತು ನಿರ್ಧಾರ',
  },
  'how.step4Title': {
    en: 'Prepare a doctor consultation sheet',
    hi: 'डॉक्टर परामर्श शीट तैयार करें',
    kn: 'ವೈದ್ಯರ ಸಮಾಲೋಚನೆ ಹಾಳೆ ತಯಾರಿಸಿ',
  },
  'how.step4Desc': {
    en: 'Export a professional, printable summary detailing your timeline, primary symptoms, and doctor questions to ensure your next visit is focused and productive.',
    hi: 'अपने लक्षणों की समयसीमा, मुख्य बिंदुओं और डॉक्टर से पूछने के प्रश्नों का एक पेशेवर, प्रिंट करने योग्य सारांश प्राप्त करें।',
    kn: 'ನಿಮ್ಮ ಲಕ್ಷಣಗಳು ಮತ್ತು ವೈದ್ಯರನ್ನು ಕೇಳಬೇಕಾದ ಪ್ರಶ್ನೆಗಳ ಮುದ್ರಿಸಬಹುದಾದ ಸಾರಾಂಶವನ್ನು ಪಡೆದು ನಿಮ್ಮ ಭೇಟಿಯನ್ನು ಅರ್ಥಪೂರ್ಣವಾಗಿಸಿ.',
  },
  'how.step4Tag': {
    en: 'Print & PDF Export',
    hi: 'प्रिंट और पीडीएफ',
    kn: 'ಮುದ್ರಣ ಮತ್ತು ಪಿಡಿಎಫ್',
  },
  'how.ctaButton': {
    en: 'Try Symptom Assistant Now',
    hi: 'अभी लक्षण सहायक आज़माएं',
    kn: 'ಈಗಲೇ ರೋಗಲಕ್ಷಣ ಸಹಾಯಕ ಬಳಸಿ',
  },

  // Educational Preview Section
  'edu.badge': {
    en: 'Verified Health Knowledge',
    hi: 'प्रमाणित स्वास्थ्य ज्ञान',
    kn: 'ವಿಶ್ವಾಸಾರ್ಹ ಆರೋಗ್ಯ ಜ್ಞಾನ',
  },
  'edu.heading': {
    en: "Explore Women's Health Topics",
    hi: 'महिला स्वास्थ्य के महत्वपूर्ण विषय',
    kn: 'ಮಹಿಳೆಯರ ಆರೋಗ್ಯ ವಿಷಯಗಳು',
  },
  'edu.subtext': {
    en: 'Grounded, clinical facts explained simply. Understand what is normal, what can cause shifts, and when to seek advice.',
    hi: 'सरल भाषा में चिकित्सीय तथ्य। जानें क्या सामान्य है, किन कारणों से बदलाव होते हैं और कब डॉक्टर की सलाह लेनी चाहिए।',
    kn: 'ಸರಳವಾಗಿ ವಿವರಿಸಲಾದ ವೈದ್ಯಕೀಯ ಸತ್ಯಗಳು. ಯಾವುದು ಸಾಮಾನ್ಯ ಮತ್ತು ಯಾವಾಗ ವೈದ್ಯರನ್ನು ಸಂಪರ್ಕಿಸಬೇಕು ಎಂದು ತಿಳಿಯಿರಿ.',
  },
  'edu.viewAll': {
    en: 'View All Topics in Library',
    hi: 'लाइब्रेरी में सभी विषय देखें',
    kn: 'ಗ್ರಂಥಾಲಯದಲ್ಲಿ ಎಲ್ಲ ವಿಷಯಗಳನ್ನು ವೀಕ್ಷಿಸಿ',
  },
  'edu.readGuide': {
    en: 'Read Guide',
    hi: 'गाइड पढ़ें',
    kn: 'ಮಾರ್ಗದರ್ಶಿ ಓದಿ',
  },
  'edu.disclaimer': {
    en: 'Health information provided is for educational literacy only and should never be taken as a self-diagnosis. Bodily variations are natural, and symptoms must always be evaluated individually by a healthcare clinician.',
    hi: 'प्रदान की गई स्वास्थ्य जानकारी केवल शैक्षिक जागरूकता के लिए है और इसे स्व-निदान न मानें। शारीरिक बदलाव स्वाभाविक हैं, और लक्षणों का मूल्यांकन हमेशा एक स्वास्थ्य विशेषज्ञ द्वारा किया जाना चाहिए।',
    kn: 'ಇಲ್ಲಿ ನೀಡಲಾದ ಮಾಹಿತಿಯು ಶೈಕ್ಷಣಿಕ ಅರಿವಿಗಾಗಿ ಮಾತ್ರ. ಶಾರೀರಿಕ ಬದಲಾವಣೆಗಳು ಸಹಜವಾಗಿದ್ದು, ರೋಗಲಕ್ಷಣಗಳನ್ನು ಯಾವಾಗಲೂ ವೈದ್ಯರಿಂದಲೇ ತಪಾಸಣೆ ಮಾಡಿಸಬೇಕು.',
  },

  // Health Dashboard
  'dashboard.title': {
    en: 'Personal Health Overview',
    hi: 'व्यक्तिगत स्वास्थ्य अवलोकन',
    kn: 'ವೈಯಕ್ತಿಕ ಆರೋಗ್ಯ ವಿವರ',
  },
  'dashboard.subtitle': {
    en: 'Your private, non-tracking wellness hub for organizing symptoms and preparing for medical consultations.',
    hi: 'लक्षणों को व्यवस्थित करने और डॉक्टर परामर्श की तैयारी के लिए आपका निजी, गोपनीयता-सुरक्षित वेलनेस केंद्र।',
    kn: 'ರೋಗಲಕ್ಷಣಗಳನ್ನು ದಾಖಲಿಸಲು ಮತ್ತು ವೈದ್ಯರ ಸಮಾಲೋಚನೆಗೆ ಸಿದ್ಧರಾಗಲು ನಿಮ್ಮ ಖಾಸಗಿ ಆರೋಗ್ಯ ಕೇಂದ್ರ.',
  },
  'dashboard.privacyNotice': {
    en: '100% Client-Side Privacy: No user tracking, cookies, or personal records stored.',
    hi: '100% क्लाइंट-साइड गोपनीयता: कोई उपयोगकर्ता ट्रैकिंग, कुकीज़ या व्यक्तिगत डेटा संग्रहीत नहीं।',
    kn: '100% ಕ್ಲೈಂಟ್ ಗೌಪ್ಯತೆ: ಯಾವುದೇ ಟ್ರ್ಯಾಕಿಂಗ್, ಕುಕೀಸ್ ಅಥವಾ ವೈಯಕ್ತಿಕ ಮಾಹಿತಿ ಸಂಗ್ರಹಿಸಲಾಗುವುದಿಲ್ಲ.',
  },
  'dashboard.statCycleStatus': {
    en: 'Cycle Health Awareness',
    hi: 'मासिक चक्र स्वास्थ्य जागरूकता',
    kn: 'ಮುಟ್ಟಿನ ಚಕ್ರದ ಆರೋಗ್ಯ ಅರಿವು',
  },
  'dashboard.statCycleStatusSub': {
    en: 'Educational baseline guidance',
    hi: 'शैक्षिक आधारभूत मार्गदर्शन',
    kn: 'ಶೈಕ್ಷಣಿಕ ಮೂಲ ಮಾರ್ಗದರ್ಶನ',
  },
  'dashboard.statConsultations': {
    en: 'Symptom Inquiries',
    hi: 'लक्षण विश्लेषण सत्र',
    kn: 'ರೋಗಲಕ್ಷಣ ವಿಚಾರಣೆಗಳು',
  },
  'dashboard.statConsultationsSub': {
    en: 'Completed this session',
    hi: 'इस सत्र में पूर्ण',
    kn: 'ಈ ಅವಧಿಯಲ್ಲಿ ಪೂರ್ಣಗೊಂಡಿದೆ',
  },
  'dashboard.statGuidesRead': {
    en: 'Verified Clinical Guides',
    hi: 'प्रमाणित नैदानिक गाइड',
    kn: 'ಪರಿಶೀಲಿಸಿದ ವೈದ್ಯಕೀಯ ಮಾರ್ಗದರ್ಶಿಗಳು',
  },
  'dashboard.statGuidesReadSub': {
    en: 'Available in Evidence Library',
    hi: 'लाइब्रेरी में उपलब्ध',
    kn: 'ಗ್ರಂಥಾಲಯದಲ್ಲಿ ಲಭ್ಯವಿದೆ',
  },
  'dashboard.quickActionsTitle': {
    en: 'Empowerment Tools',
    hi: 'स्वास्थ्य सशक्तिकरण उपकरण',
    kn: 'ಆರೋಗ್ಯ ಸಶಕ್ತೀಕರಣ ಸಾಧನಗಳು',
  },
  'dashboard.actionChatTitle': {
    en: 'Interactive AI Chat',
    hi: 'संवादात्मक एआई चैट',
    kn: 'ಸಂವಾದಾತ್ಮಕ ಎಐ ಚಾಟ್',
  },
  'dashboard.actionChatDesc': {
    en: 'Have a compassionate, back-and-forth dialogue about your sensations and questions.',
    hi: 'अपनी अनुभूतियों और प्रश्नों पर सहानुभूतिपूर्ण, निरंतर चर्चा करें।',
    kn: 'ನಿಮ್ಮ ಲಕ್ಷಣಗಳು ಮತ್ತು ಪ್ರಶ್ನೆಗಳ ಬಗ್ಗೆ ಸಹಾನುಭೂತಿಯಿಂದ ಸಂವಾದ ನಡೆಸಿ.',
  },
  'dashboard.actionAssistantTitle': {
    en: 'Symptom Triage Form',
    hi: 'लक्षण विश्लेषण फॉर्म',
    kn: 'ರೋಗಲಕ್ಷಣ ವಿಶ್ಲೇಷಣೆ ನಮೂನೆ',
  },
  'dashboard.actionAssistantDesc': {
    en: 'Enter your health experience for structured urgency screening and missing information analysis.',
    hi: 'संरचित तात्कालिकता जांच और छूटी हुई जानकारी के विश्लेषण के लिए अपने लक्षण दर्ज करें।',
    kn: 'ರೋಗಲಕ್ಷಣಗಳ ತುರ್ತು ಮಟ್ಟ ಮತ್ತು ಅಗತ್ಯ ಮಾಹಿತಿ ತಿಳಿಯಲು ನಮೂನೆ ಭರ್ತಿ ಮಾಡಿ.',
  },
  'dashboard.actionLibraryTitle': {
    en: 'Browse Health Library',
    hi: 'स्वास्थ्य गाइड पढ़ें',
    kn: 'ಆರೋಗ್ಯ ಗ್ರಂಥಾಲಯ ವೀಕ್ಷಿಸಿ',
  },
  'dashboard.actionLibraryDesc': {
    en: 'Explore vetted medical articles on menstrual health, PCOS, endometriosis, and fertility.',
    hi: 'मासिक धर्म, पीसीओएस, एंडोमेट्रियोसिस और प्रजनन क्षमता पर प्रमाणित लेख पढ़ें।',
    kn: 'ಮುಟ್ಟಿನ ಆರೋಗ್ಯ, ಪಿಸಿಒಎಸ್, ಎಂಡೊಮೆಟ್ರಿಯೊಸಿಸ್ ಕುರಿತು ವೈದ್ಯಕೀಯ ಲೇಖನಗಳನ್ನು ಓದಿ.',
  },
  'dashboard.wellnessTipTitle': {
    en: 'Clinical Consultation Tip',
    hi: 'डॉक्टर परामर्श सुझाव',
    kn: 'ವೈದ್ಯರ ಭೇಟಿಯ ಉಪಯುಕ್ತ ಸಲಹೆ',
  },
  'dashboard.wellnessTipBody': {
    en: 'When describing pain to your healthcare provider, note: exact location, whether it radiates to your back or legs, how many days it lasts, and whether standard pain relievers make a difference.',
    hi: 'अपने डॉक्टर को दर्द के बारे में बताते समय ध्यान दें: सटीक स्थान, क्या यह पीठ या पैरों तक फैलता है, यह कितने दिन रहता है, और क्या सामान्य दर्दनिवारक दवा से राहत मिलती है।',
    kn: 'ವೈದ್ಯರಿಗೆ ನೋವಿನ ವಿವರ ನೀಡುವಾಗ: ನಿಖರವಾದ ಜಾಗ, ಬೆನ್ನು ಅಥವಾ ಕಾಲಿಗೆ ನೋವು ಹರಡುತ್ತದೆಯೇ, ಎಷ್ಟು ದಿನ ಇರುತ್ತದೆ ಮತ್ತು ಸಾಮಾನ್ಯ ನೋವು ನಿವಾರಕಗಳಿಂದ ಕಡಿಮೆ ಆಗುತ್ತದೆಯೇ ಎಂದು ತಿಳಿಸಿ.',
  },

  // Symptom Assistant Page
  'assistant.badge': {
    en: 'Symptom Assistant',
    hi: 'लक्षण सहायक',
    kn: 'ರೋಗಲಕ್ಷಣ ಸಹಾಯಕ',
  },
  'assistant.title': {
    en: 'Describe what you are feeling.',
    hi: 'बताएं कि आप कैसा महसूस कर रही हैं।',
    kn: 'ನೀವು ಏನನ್ನು ಅನುಭವಿಸುತ್ತಿದ್ದೀರಿ ಎಂದು ವಿವರಿಸಿ.',
  },
  'assistant.subtitle': {
    en: "Tell us about your symptoms in everyday language. We'll help you understand possible physiological patterns, identify missing details, and prepare for your doctor visit.",
    hi: 'अपने लक्षणों को आम बोलचाल में बताएं। हम आपको संभावित शारीरिक कारणों को समझने, छूटी हुई जानकारी पहचानने और डॉक्टर की मुलाकात की तैयारी में मदद करेंगे।',
    kn: 'ನಿಮ್ಮ ಲಕ್ಷಣಗಳನ್ನು ಸರಳ ಭಾಷೆಯಲ್ಲಿ ವಿವರಿಸಿ. ಸಂಭವನೀಯ ಶಾರೀರಿಕ ಕಾರಣಗಳನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಲು ಮತ್ತು ವೈದ್ಯರ ಭೇಟಿಗೆ ಸಿದ್ಧರಾಗಲು ನಾವು ನಿಮಗೆ ನೆರವಾಗುತ್ತೇವೆ.',
  },
  'assistant.switchChat': {
    en: 'Prefer a back-and-forth dialogue? Open AI Health Chat →',
    hi: 'क्या आप बातचीत के रूप में चर्चा करना चाहती हैं? एआई स्वास्थ्य चैट खोलें →',
    kn: 'ನೇರವಾಗಿ ಸಂವಾದ ನಡೆಸಲು ಬಯಸುವಿರಾ? ಎಐ ಆರೋಗ್ಯ ಚಾಟ್ ತೆರೆಯಿರಿ →',
  },
  'assistant.examplesLabel': {
    en: 'Click an example below to auto-fill immediately:',
    hi: 'तुरंत भरने के लिए नीचे दिए गए किसी उदाहरण पर क्लिक करें:',
    kn: 'ತಕ್ಷಣ ಭರ್ತಿ ಮಾಡಲು ಕೆಳಗಿನ ಉದಾಹರಣೆಯನ್ನು ಕ್ಲಿಕ್ ಮಾಡಿ:',
  },
  'assistant.archetypes': {
    en: 'Verified clinical archetypes',
    hi: 'प्रमाणित नैदानिक उदाहरण',
    kn: 'ಪರಿಶೀಲಿಸಿದ ವೈದ್ಯಕೀಯ ಉದಾಹರಣೆಗಳು',
  },
  'assistant.languageLabel': {
    en: 'Language:',
    hi: 'भाषा:',
    kn: 'ಭಾಷೆ:',
  },
  'assistant.loadSampleBtn': {
    en: 'Load Sample',
    hi: 'नमूना लोड करें',
    kn: 'ಮಾದರಿ ತುಂಬಿ',
  },
  'assistant.textareaPlaceholder': {
    en: 'Describe what you are experiencing in your own words (English, Hindi, or Kannada)...',
    hi: 'अपने लक्षणों को अपने शब्दों में यहाँ लिखें (हिन्दी, अंग्रेजी या कन्नड़)...',
    kn: 'ನಿಮ್ಮ ರೋಗಲಕ್ಷಣಗಳನ್ನು ನಿಮ್ಮದೇ ಮಾತುಗಳಲ್ಲಿ ಇಲ್ಲಿ ಬರೆಯಿರಿ (ಕನ್ನಡ, ಹಿಂದಿ ಅಥವಾ ಇಂಗ್ಲಿಷ್)...',
  },
  'assistant.voiceStart': {
    en: 'Speak symptoms',
    hi: 'बोलकर बताएं',
    kn: 'ಮಾತನಾಡಿ ವಿವರಿಸಿ',
  },
  'assistant.voiceStop': {
    en: 'Stop listening',
    hi: 'सुनना बंद करें',
    kn: 'ನಿಲ್ಲಿಸಿ',
  },
  'assistant.safetyNotice': {
    en: 'Safety Boundary: If you are experiencing sudden unbearable abdominal pain, heavy bleeding soaking more than 2 pads per hour, or fainting, please seek emergency medical evaluation immediately.',
    hi: 'सुरक्षा सूचना: यदि आप अचानक असहनीय पेट दर्द, प्रति घंटे 2 से अधिक पैड भीगने जैसा अत्यधिक रक्तस्राव, या बेहोशी महसूस कर रही हैं, तो कृपया तुरंत आपातकालीन चिकित्सा सहायता लें।',
    kn: 'ಸುರಕ್ಷತಾ ಸೂಚನೆ: ನೀವು ಹಠಾತ್ ಅಸಹನೀಯ ಹೊಟ್ಟೆ ನೋವು, ಗಂಟೆಗೆ 2 ಕ್ಕಿಂತ ಹೆಚ್ಚು ಪ್ಯಾಡ್‌ಗಳು ಒದ್ದೆಯಾಗುವಷ್ಟು ಅತಿಯಾದ ರಕ್ತಸ್ರಾವ ಅಥವಾ ತಲೆತಿರುಗುವಿಕೆ ಅನುಭವಿಸುತ್ತಿದ್ದರೆ, ತಕ್ಷಣವೇ ತುರ್ತು ಚಿಕಿತ್ಸೆ ಪಡೆಯಿರಿ.',
  },
  'assistant.analyzeBtn': {
    en: 'Analyze My Symptoms',
    hi: 'मेरे लक्षणों का विश्लेषण करें',
    kn: 'ನನ್ನ ಲಕ್ಷಣಗಳನ್ನು ವಿಶ್ಲೇಷಿಸಿ',
  },
  'assistant.clearBtn': {
    en: 'Clear',
    hi: 'साफ करें',
    kn: 'ಅಳಿಸಿ',
  },
  'assistant.analyzing1': {
    en: 'Reading symptom descriptions...',
    hi: 'लक्षण विवरण का अध्ययन किया जा रहा है...',
    kn: 'ರೋಗಲಕ್ಷಣಗಳ ವಿವರವನ್ನು ಓದಲಾಗುತ್ತಿದೆ...',
  },
  'assistant.analyzing2': {
    en: 'Cross-referencing verified clinical guidelines...',
    hi: 'प्रमाणित नैदानिक दिशानिर्देशों से मिलान किया जा रहा है...',
    kn: 'ವೈದ್ಯಕೀಯ ಮಾರ್ಗದರ್ಶಿಗಳೊಂದಿಗೆ ತಾಳೆ ನೋಡಲಾಗುತ್ತಿದೆ...',
  },
  'assistant.analyzing3': {
    en: 'Structuring your doctor consultation summary...',
    hi: 'आपके डॉक्टर परामर्श सारांश को तैयार किया जा रहा है...',
    kn: 'ನಿಮ್ಮ ವೈದ್ಯರ ಸಮಾಲೋಚನೆ ಹಾಳೆಯನ್ನು ಸಿದ್ಧಪಡಿಸಲಾಗುತ್ತಿದೆ...',
  },

  // AI Health Chat Page
  'chat.title': {
    en: 'Ova Care Health Chat',
    hi: 'ओवा केयर स्वास्थ्य चैट',
    kn: 'ಓವಾ ಕೇರ್ ಆರೋಗ್ಯ ಚಾಟ್',
  },
  'chat.subtitle': {
    en: "Compassionate, verified insights. Designed for women's well-being.",
    hi: 'सहानुभूतिपूर्ण, प्रामाणिक जानकारी। महिलाओं के कल्याण के लिए समर्पित।',
    kn: 'ಸಹಾನುಭೂತಿಯುಳ್ಳ, ವಿಶ್ವಾಸಾರ್ಹ ಮಾಹಿತಿ. ಮಹಿಳೆಯರ ಯೋಗಕ್ಷೇಮಕ್ಕಾಗಿ ವಿನ್ಯಾಸಗೊಳಿಸಲಾಗಿದೆ.',
  },
  'chat.newChat': {
    en: 'New Chat',
    hi: 'नई चैट',
    kn: 'ಹೊಸ ಚಾಟ್',
  },
  'chat.welcome': {
    en: "Hello, I'm **Ova Care AI**. 🌸\n\nI am here to help you understand your symptoms, explain reproductive health concepts in clear, everyday terms, and help you prepare for your next doctor's appointment.\n\n*Please remember that I provide educational information, not a medical diagnosis. If you are experiencing an acute emergency, please contact urgent medical services.*",
    hi: 'नमस्ते, मैं **ओवा केयर एआई** हूँ। 🌸\n\nमैं यहाँ आपके लक्षणों को समझने, प्रजनन स्वास्थ्य से जुड़े विषयों को सरल शब्दों में समझाने और डॉक्टर से परामर्श की तैयारी में आपकी सहायता के लिए उपस्थित हूँ।\n\n*कृपया ध्यान रखें कि मैं केवल शैक्षिक जानकारी प्रदान करती हूँ, चिकित्सीय निदान नहीं। आपात स्थिति में तुरंत नजदीकी अस्पताल से संपर्क करें।*',
    kn: 'ನಮಸ್ಕಾರ, ನಾನು **ಓವಾ ಕೇರ್ ಎಐ**. 🌸\n\nನಿಮ್ಮ ರೋಗಲಕ್ಷಣಗಳನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಲು, ಸ್ತ್ರೀರೋಗ ಆರೋಗ್ಯದ ವಿಷಯಗಳನ್ನು ಸರಳವಾಗಿ ತಿಳಿಸಲು ಮತ್ತು ವೈದ್ಯರ ಭೇಟಿಗೆ ಸಿದ್ಧರಾಗಲು ನಾನು ನಿಮಗೆ ಸಹಾಯ ಮಾಡುತ್ತೇನೆ.\n\n*ದಯವಿಟ್ಟು ನೆನಪಿಡಿ: ನಾನು ಶೈಕ್ಷಣಿಕ ಮಾಹಿತಿಯನ್ನು ಮಾತ್ರ ನೀಡುತ್ತೇನೆ, ರೋಗನಿರ್ಣಯ ಮಾಡುವುದಿಲ್ಲ. ತುರ್ತು ಸಂದರ್ಭದಲ್ಲಿ ತಕ್ಷಣವೇ ವೈದ್ಯಕೀಯ ಚಿಕಿತ್ಸೆ ಪಡೆಯಿರಿ.*',
  },
  'chat.placeholder': {
    en: 'Describe your symptoms in your own words (Enter to send, Shift+Enter for newline)...',
    hi: 'अपने लक्षणों को अपने शब्दों में यहाँ लिखें (भेजने के लिए Enter दबाएं)...',
    kn: 'ನಿಮ್ಮ ರೋಗಲಕ್ಷಣಗಳನ್ನು ನಿಮ್ಮದೇ ಮಾತುಗಳಲ್ಲಿ ಬರೆಯಿರಿ (ಕಳುಹಿಸಲು Enter ಒತ್ತಿ)...',
  },
  'chat.send': {
    en: 'Send',
    hi: 'भेजें',
    kn: 'ಕಳುಹಿಸಿ',
  },
  'chat.latest': {
    en: 'Latest',
    hi: 'नवीनतम',
    kn: 'ಇತ್ತೀಚಿನದು',
  },
  'chat.copied': {
    en: 'Copied',
    hi: 'कॉपी किया',
    kn: 'ನಕಲಿಸಲಾಗಿದೆ',
  },
  'chat.copy': {
    en: 'Copy',
    hi: 'कॉपी',
    kn: 'ನಕಲಿಸಿ',
  },
  'chat.toDoctorSheet': {
    en: 'To Doctor Sheet',
    hi: 'डॉक्टर शीट में जोड़ें',
    kn: 'ವೈದ್ಯರ ಹಾಳೆಗೆ ಸೇರಿಸಿ',
  },
  'chat.browseGuide': {
    en: 'Browse Guide',
    hi: 'गाइड पढ़ें',
    kn: 'ಮಾರ್ಗದರ್ಶಿ ಓದಿ',
  },
  'chat.retry': {
    en: 'Retry Message',
    hi: 'पुनः प्रयास करें',
    kn: 'ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ',
  },

  // Explore Health / Educational Library
  'library.badge': {
    en: 'Evidence-Based Library',
    hi: 'प्रमाणित स्वास्थ्य पुस्तकालय',
    kn: 'ಸಾಕ್ಷ್ಯಾಧಾರಿತ ಗ್ರಂಥಾಲಯ',
  },
  'library.title': {
    en: "Women's Health Knowledge Base",
    hi: 'महिला स्वास्थ्य ज्ञान केंद्र',
    kn: 'ಮಹಿಳೆಯರ ಆರೋಗ್ಯ ಮಾಹಿತಿ ಕೇಂದ್ರ',
  },
  'library.subtitle': {
    en: 'Grounded in peer-reviewed clinical consensus from ACOG, WHO, and FIGO. Written in accessible, empowering language.',
    hi: 'ACOG, WHO और FIGO के प्रमाणित नैदानिक दिशानिर्देशों पर आधारित। सरल और सशक्त भाषा में प्रस्तुत।',
    kn: 'ACOG, WHO ಮತ್ತು FIGO ನ ವೈದ್ಯಕೀಯ ಮಾರ್ಗದರ್ಶಿಗಳನ್ನು ಆಧರಿಸಿದೆ. ಸರಳ ಮತ್ತು ಸ್ಪಷ್ಟ ಭಾಷೆಯಲ್ಲಿ ಲಭ್ಯವಿದೆ.',
  },
  'library.searchPlaceholder': {
    en: 'Search health guides (e.g. cramps, PCOS, irregular cycle, fertility)...',
    hi: 'स्वास्थ्य गाइड खोजें (जैसे: मासिक धर्म, पीसीओएस, ऐंठन, प्रजनन)...',
    kn: 'ಆರೋಗ್ಯ ಮಾರ್ಗದರ್ಶಿಗಳನ್ನು ಹುಡುಕಿ (ಉದಾ: ಮುಟ್ಟು, ಪಿಸಿಒಎಸ್, ನೋವು)...',
  },
  'library.allCategories': {
    en: 'All Topics',
    hi: 'सभी विषय',
    kn: 'ಎಲ್ಲಾ ವಿಷಯಗಳು',
  },
  'library.noResults': {
    en: 'No health guides found matching your query.',
    hi: 'आपकी खोज से मेल खाता कोई गाइड नहीं मिला।',
    kn: 'ನಿಮ್ಮ ಹುಡುಕಾಟಕ್ಕೆ ಯಾವುದೇ ಮಾರ್ಗದರ್ಶಿ ಕಂಡುಬಂದಿಲ್ಲ.',
  },
  'library.clearSearch': {
    en: 'Clear search filter',
    hi: 'खोज फ़िल्टर हटाएं',
    kn: 'ಹುಡುಕಾಟ ತೆರವುಗೊಳಿಸಿ',
  },
  'library.readTime': {
    en: 'read',
    hi: 'पढ़ने का समय',
    kn: 'ಓದುವ ಸಮಯ',
  },
  'library.modalClose': {
    en: 'Close Guide',
    hi: 'गाइड बंद करें',
    kn: 'ಮುಚ್ಚಿ',
  },
  'library.modalTabIntro': {
    en: 'Overview & Symptoms',
    hi: 'अवलोकन और लक्षण',
    kn: 'ವಿವರಣೆ ಮತ್ತು ಲಕ್ಷಣಗಳು',
  },
  'library.modalTabDoctor': {
    en: 'When to Consult a Doctor',
    hi: 'डॉक्टर से कब मिलें',
    kn: 'ವೈದ್ಯರನ್ನು ಯಾವಾಗ ಕಾಣಬೇಕು',
  },
  'library.modalTabCare': {
    en: 'Self-Care & Evidence',
    hi: 'स्व-देखभाल और साक्ष्य',
    kn: 'ಸ್ವಯಂ ಆರೈಕೆ ಮತ್ತು ಪುರಾವೆ',
  },
  'library.urgentRedFlagsTitle': {
    en: 'Urgent Red Flags — Seek Immediate Care',
    hi: 'गंभीर चेतावनी संकेत — तत्काल चिकित्सा सहायता लें',
    kn: 'ಅಪಾಯದ ಮುನ್ನೆಚ್ಚರಿಕೆಗಳು — ತಕ್ಷಣದ ಚಿಕಿತ್ಸೆ ಪಡೆಯಿರಿ',
  },

  // Doctor Consultation Sheet
  'summary.title': {
    en: 'Doctor Consultation Summary',
    hi: 'डॉक्टर परामर्श सारांश',
    kn: 'ವೈದ್ಯರ ಸಮಾಲೋಚನೆ ಸಾರಾಂಶ',
  },
  'summary.subtitle': {
    en: 'Print or save this clinical summary to help guide your discussion with your gynecologist or primary care physician.',
    hi: 'अपनी स्त्री रोग विशेषज्ञ या चिकित्सक के साथ सार्थक चर्चा के लिए इस सारांश को प्रिंट या सुरक्षित करें।',
    kn: 'ನಿಮ್ಮ ಸ್ತ್ರೀರೋಗ ತಜ್ಞರು ಅಥವಾ ವೈದ್ಯರೊಂದಿಗೆ ಸುಲಭವಾಗಿ ಚರ್ಚಿಸಲು ಈ ಸಾರಾಂಶವನ್ನು ಮುದ್ರಿಸಿ ಅಥವಾ ಉಳಿಸಿಕೊಳ್ಳಿ.',
  },
  'summary.print': {
    en: 'Print Consultation Sheet',
    hi: 'परामर्श पत्रक प्रिंट करें',
    kn: 'ಸಮಾಲೋಚನೆ ಹಾಳೆ ಮುದ್ರಿಸಿ',
  },
  'summary.newCheck': {
    en: 'New Symptom Check',
    hi: 'नई लक्षण जांच',
    kn: 'ಹೊಸ ಲಕ್ಷಣ ಪರೀಕ್ಷೆ',
  },
  'summary.originalSymptoms': {
    en: 'Patient Reported Symptoms',
    hi: 'रोगी द्वारा बताए गए लक्षण',
    kn: 'ರೋಗಿಯು ತಿಳಿಸಿದ ಲಕ್ಷಣಗಳು',
  },
  'summary.understoodSymptoms': {
    en: 'Key Physiological Points Identified',
    hi: 'पहचाने गए मुख्य शारीरिक बिंदु',
    kn: 'ಗುರುತಿಸಲಾದ ಮುಖ್ಯ ಶಾರೀರಿಕ ಅಂಶಗಳು',
  },
  'summary.duration': {
    en: 'Reported Timeline & Sensation Details',
    hi: 'लक्षणों की समयसीमा और तीव्रता',
    kn: 'ಕಾಲಾವಧಿ ಮತ್ತು ತೀವ್ರತೆಯ ವಿವರಗಳು',
  },
  'summary.missingInfo': {
    en: 'Important Details to Clarify During Visit',
    hi: 'भेंट के दौरान स्पष्ट करने योग्य महत्वपूर्ण बातें',
    kn: 'ಭೇಟಿಯ ಸಮಯದಲ್ಲಿ ಸ್ಪಷ್ಟಪಡಿಸಬೇಕಾದ ಮುಖ್ಯ ವಿವರಗಳು',
  },
  'summary.questions': {
    en: 'Recommended Questions for Your Doctor',
    hi: 'डॉक्टर से पूछने के लिए अनुशंसित प्रश्न',
    kn: 'ವೈದ್ಯರನ್ನು ಕೇಳಲು ಶಿಫಾರಸು ಮಾಡಿದ ಪ್ರಶ್ನೆಗಳು',
  },
  'summary.notesArea': {
    en: "Clinician's Notes & Next Steps Area",
    hi: 'चिकित्सक के नोट्स और अगले कदम',
    kn: 'ವೈದ್ಯರ ಟಿಪ್ಪಣಿಗಳು ಮತ್ತು ಮುಂದಿನ ಹಂತಗಳು',
  },

  // Urgent Care Emergency Screen
  'urgent.banner': {
    en: 'Please Seek Medical Care Immediately',
    hi: 'कृपया तत्काल चिकित्सा सहायता प्राप्त करें',
    kn: 'ದಯವಿಟ್ಟು ತಕ್ಷಣವೇ ವೈದ್ಯಕೀಯ ಚಿಕಿತ್ಸೆ ಪಡೆಯಿರಿ',
  },
  'urgent.subtitle': {
    en: 'The symptoms described indicate potential high-urgency conditions that require prompt in-person clinical evaluation.',
    hi: 'बताए गए लक्षण गंभीर स्थिति का संकेत दे सकते हैं, जिसके लिए तत्काल व्यक्तिगत चिकित्सीय जांच आवश्यक है।',
    kn: 'ತಿಳಿಸಲಾದ ಲಕ್ಷಣಗಳು ತಕ್ಷಣವೇ ಆಸ್ಪತ್ರೆಗೆ ಭೇಟಿ ನೀಡಿ ಪರೀಕ್ಷಿಸಿಕೊಳ್ಳಬೇಕಾದ ಪರಿಸ್ಥಿತಿಯನ್ನು ಸೂಚಿಸುತ್ತವೆ.',
  },
  'urgent.helplines': {
    en: 'Emergency Contact Helplines',
    hi: 'आपातकालीन संपर्क हेल्पलाइन',
    kn: 'ತುರ್ತು ಸಂಪರ್ಕ ಸಹಾಯವಾಣಿಗಳು',
  },
  'urgent.india': {
    en: 'India: 112 (National Emergency) / 102 (Ambulance)',
    hi: 'भारत: 112 (राष्ट्रीय आपातकाल) / 102 (एम्बुलेंस)',
    kn: 'ಭಾರತ: 112 (ರಾಷ್ಟ್ರೀಯ ತುರ್ತು ಸಂಖ್ಯೆ) / 102 (ಆಂಬ್ಯುಲೆನ್ಸ್)',
  },
  'urgent.us': {
    en: 'United States: 911 (Emergency Services)',
    hi: 'संयुक्त राज्य अमेरिका: 911 (आपातकालीन सेवाएं)',
    kn: 'ಯುಎಸ್: 911 (ತುರ್ತು ಸೇವೆಗಳು)',
  },
  'urgent.uk': {
    en: 'United Kingdom: 999 (Emergency) / 111 (NHS Urgent)',
    hi: 'यूनाइटेड किंगडम: 999 (आपातकाल) / 111 (एनएचएस तत्काल)',
    kn: 'ಯುಕೆ: 999 (ತುರ್ತು ಸೇವೆ) / 111 (ಎನ್‌ಎಚ್‌ಎಸ್ ತುರ್ತು)',
  },
  'urgent.back': {
    en: 'Return to Symptom Analysis',
    hi: 'लक्षण विश्लेषण पर वापस जाएं',
    kn: 'ವಿಶ್ಲೇಷಣೆಗೆ ಹಿಂತಿರುಗಿ',
  },

  // About Section
  'about.badge': {
    en: 'Project Information & Mission',
    hi: 'परियोजना की जानकारी एवं उद्देश्य',
    kn: 'ಯೋಜನೆಯ ಮಾಹಿತಿ ಮತ್ತು ಧ್ಯೇಯ',
  },
  'about.title': {
    en: 'About Ova Care',
    hi: 'ओवा केयर के बारे में',
    kn: 'ಓವಾ ಕೇರ್ ಬಗ್ಗೆ',
  },
  'about.missionHeading': {
    en: 'Empowering women with clear, compassionate health guidance.',
    hi: 'स्पष्ट, सहानुभूतिपूर्ण स्वास्थ्य मार्गदर्शन के साथ महिलाओं का सशक्तिकरण।',
    kn: 'ಸ್ಪಷ್ಟ, ಸಹಾನುಭೂತಿಯುಳ್ಳ ಆರೋಗ್ಯ ಮಾರ್ಗದರ್ಶನದೊಂದಿಗೆ ಮಹಿಳೆಯರ ಸಬಲೀಕರಣ.',
  },
  'about.missionText': {
    en: 'Ova Care was built to bridge the gap between noticing bodily sensations and having an empowered, informed conversation with a physician. By translating everyday vernacular descriptions into structured clinical inquiries, we help women advocate for their health with confidence.',
    hi: 'ओवा केयर का निर्माण शारीरिक परिवर्तनों को महसूस करने और डॉक्टर के साथ आत्मविश्वास भरी चर्चा के बीच की दूरी को कम करने के लिए किया गया है। सामान्य भाषा के लक्षणों को संरचित चिकित्सीय प्रश्नों में बदलकर, हम महिलाओं को अपने स्वास्थ्य की सशक्त देखभाल में मदद करते हैं।',
    kn: 'ಶಾರೀರಿಕ ಬದಲಾವಣೆಗಳನ್ನು ಗುರುತಿಸುವುದು ಮತ್ತು ವೈದ್ಯರೊಂದಿಗೆ ಆತ್ಮವಿಶ್ವಾಸದಿಂದ ಮಾತನಾಡುವುದರ ನಡುವಿನ ಅಂತರವನ್ನು ಕಡಿಮೆ ಮಾಡಲು ಓವಾ ಕೇರ್ ರಚಿಸಲಾಗಿದೆ. ಸಾಮಾನ್ಯ ಭಾಷೆಯ ವಿವರಗಳನ್ನು ವೈದ್ಯಕೀಯ ಪ್ರಶ್ನೆಗಳಾಗಿ ಪರಿವರ್ತಿಸಿ ಮಹಿಳೆಯರಿಗೆ ನೆರವಾಗುತ್ತೇವೆ.',
  },
  'about.privacyTitle': {
    en: 'Our Zero-Tracking Privacy Charter',
    hi: 'हमारा शून्य-ट्रैकिंग गोपनीयता चार्टर',
    kn: 'ನಮ್ಮ ಶೂನ್ಯ-ಟ್ರ್ಯಾಕಿಂಗ್ ಗೌಪ್ಯತೆ ನೀತಿ',
  },
  'about.privacyPoint1': {
    en: 'No account required to analyze symptoms or read clinical guides.',
    hi: 'लक्षणों का विश्लेषण करने या स्वास्थ्य गाइड पढ़ने के लिए किसी खाते की आवश्यकता नहीं है।',
    kn: 'ರೋಗಲಕ್ಷಣಗಳನ್ನು ವಿಶ್ಲೇಷಿಸಲು ಅಥವಾ ಮಾರ್ಗದರ್ಶಿಗಳನ್ನು ಓದಲು ಯಾವುದೇ ಖಾತೆಯ ಅಗತ್ಯವಿಲ್ಲ.',
  },
  'about.privacyPoint2': {
    en: 'No personal health data is saved to external marketing databases.',
    hi: 'कोई भी व्यक्तिगत स्वास्थ्य डेटा मार्केटिंग डेटाबेस में सुरक्षित नहीं किया जाता।',
    kn: 'ಯಾವುದೇ ವೈಯಕ್ತಿಕ ಆರೋಗ್ಯ ಮಾಹಿತಿಯನ್ನು ಬಾಹ್ಯ ಡೇಟಾಬೇಸ್‌ಗಳಲ್ಲಿ ಸಂಗ್ರಹಿಸುವುದಿಲ್ಲ.',
  },
  'about.privacyPoint3': {
    en: 'Printable sheets stay entirely on your local device.',
    hi: 'प्रिंट करने योग्य पत्रक पूरी तरह आपके स्थानीय डिवाइस पर ही रहते हैं।',
    kn: 'ಮುದ್ರಿಸಬಹುದಾದ ಹಾಳೆಗಳು ನಿಮ್ಮ ಸಾಧನದಲ್ಲೇ ಸುರಕ್ಷಿತವಾಗಿರುತ್ತವೆ.',
  },
  'about.disclaimerHeading': {
    en: 'Medical Disclaimer',
    hi: 'चिकित्सीय अस्वीकरण',
    kn: 'ವೈದ್ಯಕೀಯ ಹಕ್ಕುತ್ಯಾಗ',
  },
  'about.disclaimerText': {
    en: 'Ova Care is an educational platform designed for informational and consultation preparation purposes only. It does not provide medical diagnoses, treatment plans, or emergency services.',
    hi: 'ओवा केयर केवल सूचनात्मक और परामर्श तैयारी के उद्देश्यों के लिए डिज़ाइन किया गया एक शैक्षिक मंच है। यह चिकित्सीय निदान, उपचार योजना या आपातकालीन सेवाएं प्रदान नहीं करता है।',
    kn: 'ಓವಾ ಕೇರ್ ಶೈಕ್ಷಣಿಕ ಮತ್ತು ಸಮಾಲೋಚನೆ ತಯಾರಿಗಾಗಿ ಮಾತ್ರ ವಿನ್ಯಾಸಗೊಳಿಸಲಾದ ವೇದಿಕೆಯಾಗಿದೆ. ಇದು ವೈದ್ಯಕೀಯ ರೋಗನಿರ್ಣಯ, ಚಿಕಿತ್ಸೆ ಅಥವಾ ತುರ್ತು ಸೇವೆಗಳನ್ನು ಒದಗಿಸುವುದಿಲ್ಲ.',
  },

  // Footer
  'footer.description': {
    en: 'Compassionate, evidence-based reproductive wellness guidance helping women understand physiological symptoms and prepare for doctor visits.',
    hi: 'सहानुभूतिपूर्ण, साक्ष्य-आधारित प्रजनन स्वास्थ्य मार्गदर्शन जो महिलाओं को शारीरिक लक्षणों को समझने और डॉक्टर परामर्श की तैयारी में मदद करता है।',
    kn: 'ಮಹಿಳೆಯರು ಶಾರೀರಿಕ ಲಕ್ಷಣಗಳನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಲು ಮತ್ತು ವೈದ್ಯರ ಭೇಟಿಗೆ ಸಿದ್ಧರಾಗಲು ಸಹಾನುಭೂತಿಯುಳ್ಳ ಸಾಕ್ಷ್ಯಾಧಾರಿತ ಮಾರ್ಗದರ್ಶನ.',
  },
  'footer.quickLinks': {
    en: 'Platform Navigation',
    hi: 'नेविगेशन',
    kn: 'ನ್ಯಾವಿಗೇಷನ್',
  },
  'footer.emergency': {
    en: 'Emergency Helplines',
    hi: 'आपातकालीन हेल्पलाइन',
    kn: 'ತುರ್ತು ಸಹಾಯವಾಣಿಗಳು',
  },
  'footer.privacyCharter': {
    en: 'Zero-Tracking Privacy Charter',
    hi: 'शून्य-ट्रैकिंग गोपनीयता चार्टर',
    kn: 'ಶೂನ್ಯ-ಟ್ರ್ಯಾಕಿಂಗ್ ಗೌಪ್ಯತೆ ನೀತಿ',
  },
  'footer.disclaimer': {
    en: 'Ova Care does not provide medical diagnoses or replace professional healthcare consultations. Always seek the advice of a qualified physician with any questions regarding a medical condition.',
    hi: 'ओवा केयर चिकित्सीय निदान प्रदान नहीं करता है और न ही पेशेवर स्वास्थ्य परामर्श का स्थान लेता है। किसी भी स्वास्थ्य स्थिति के संबंध में हमेशा किसी योग्य चिकित्सक से परामर्श लें।',
    kn: 'ಓವಾ ಕೇರ್ ವೈದ್ಯಕೀಯ ರೋಗನಿರ್ಣಯವನ್ನು ಒದಗಿಸುವುದಿಲ್ಲ ಅಥವಾ ವೈದ್ಯರ ಸಮಾಲೋಚನೆಗೆ ಬದಲಿಯಾಗಿಲ್ಲ. ಆರೋಗ್ಯ ಸಮಸ್ಯೆಗಳ ಕುರಿತು ಯಾವಾಗಲೂ ಅರ್ಹ ವೈದ್ಯರ ಸಲಹೆ ಪಡೆಯಿರಿ.',
  },
  'footer.copyright': {
    en: 'All rights reserved. Dedicated to women’s health literacy.',
    hi: 'सर्वाधिकार सुरक्षित। महिला स्वास्थ्य साक्षरता को समर्पित।',
    kn: 'ಎಲ್ಲ ಹಕ್ಕುಗಳನ್ನು ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ. ಮಹಿಳೆಯರ ಆರೋಗ್ಯ ಸಾಕ್ಷರತೆಗೆ ಸಮರ್ಪಿತ.',
  },

  // Voice Recording & Transcription
  'voice.weHeard': {
    en: 'We heard',
    hi: 'हमने सुना',
    kn: 'ನಾವು ಕೇಳಿದ್ದು',
  },
  'voice.recording': {
    en: 'Recording audio...',
    hi: 'ऑडियो रिकॉर्ड हो रहा है...',
    kn: 'ಆಡಿಯೋ ರೆಕಾರ್ಡ್ ಆಗುತ್ತಿದೆ...',
  },
  'voice.stop': {
    en: 'Stop Recording',
    hi: 'रिकॉर्डिंग रोकें',
    kn: 'ರೆಕಾರ್ಡಿಂಗ್ ನಿಲ್ಲಿಸಿ',
  },
  'voice.cancel': {
    en: 'Cancel Recording',
    hi: 'रिकॉर्डिंग रद्द करें',
    kn: 'ರೆಕಾರ್ಡಿಂಗ್ ರದ್ದುಮಾಡಿ',
  },
  'voice.processing': {
    en: 'Processing audio and transcribing...',
    hi: 'ऑडियो संसाधित किया जा रहा है...',
    kn: 'ಆಡಿಯೋ ಪ್ರಕ್ರಿಯೆಗೊಳಿಸಲಾಗುತ್ತಿದೆ...',
  },
  'voice.confirm': {
    en: 'Confirm Transcript',
    hi: 'ट्रांसक्रिप्ट की पुष्टि करें',
    kn: 'ಪಠ್ಯವನ್ನು ದೃಢೀಕರಿಸಿ',
  },
  'voice.recordAgain': {
    en: 'Record Again',
    hi: 'फिर से रिकॉर्ड करें',
    kn: 'ಮತ್ತೆ ರೆಕಾರ್ಡ್ ಮಾಡಿ',
  },
  'voice.cancelTranscript': {
    en: 'Discard & Return',
    hi: 'रद्द करें और वापस जाएं',
    kn: 'ರದ್ದುಮಾಡಿ ಹಿಂತಿರುಗಿ',
  },
  'voice.editHint': {
    en: 'You can review and edit the transcribed text below before continuing.',
    hi: 'आगे बढ़ने से पहले आप नीचे दिए गए पाठ की समीक्षा और संपादन कर सकते हैं।',
    kn: 'ಮುಂದುವರಿಯುವ ಮೊದಲು ನೀವು ಕೆಳಗಿನ ಪಠ್ಯವನ್ನು ಪರಿಶೀಲಿಸಬಹುದು ಮತ್ತು ಸಂಪಾದಿಸಬಹುದು.',
  },
  'voice.emptyTranscript': {
    en: 'No speech was detected in the recording. Please try recording again speaking clearly into your microphone.',
    hi: 'रिकॉर्डिंग में कोई आवाज़ नहीं मिली। कृपया माइक्रोफ़ोन के पास आकर स्पष्ट बोलकर पुनः रिकॉर्ड करें।',
    kn: 'ರೆಕಾರ್ಡಿಂಗ್‌ನಲ್ಲಿ ಯಾವುದೇ ಧ್ವನಿ ಕಂಡುಬಂದಿಲ್ಲ. ದಯವಿಟ್ಟು ಮೈಕ್ರೊಫೋನ್ ಹತ್ತಿರ ಸ್ಪಷ್ಟವಾಗಿ ಮಾತನಾಡಿ ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.',
  },
  'voice.permissionDenied': {
    en: 'Microphone access was denied. Please allow microphone permissions in your browser settings to use voice input.',
    hi: 'माइक्रोफ़ोन की अनुमति अस्वीकृत हो गई। वॉइस इनपुट का उपयोग करने के लिए कृपया ब्राउज़र सेटिंग्स में माइक्रोफ़ोन की अनुमति दें।',
    kn: 'ಮೈಕ್ರೊಫೋನ್ ಪ್ರವೇಶವನ್ನು ನಿರಾಕರಿಸಲಾಗಿದೆ. ಧ್ವನಿ ಇನ್ಪುಟ್ ಬಳಸಲು ದಯವಿಟ್ಟು ಬ್ರೌಸರ್ ಸೆಟ್ಟಿಂಗ್‌ಗಳಲ್ಲಿ ಮೈಕ್ರೊಫೋನ್ ಅನುಮತಿಯನ್ನು ನೀಡಿ.',
  },
  'voice.notSupported': {
    en: 'Audio recording is not supported in this browser. You can type freely in the text box.',
    hi: 'इस ब्राउज़र में ऑडियो रिकॉर्डिंग समर्थित नहीं है। आप सीधे टेक्स्ट बॉक्स में लिख सकते हैं।',
    kn: 'ಈ ಬ್ರೌಸರ್‌ನಲ್ಲಿ ಆಡಿಯೋ ರೆಕಾರ್ಡಿಂಗ್ ಲಭ್ಯವಿಲ್ಲ. ನೀವು ನೇರವಾಗಿ ಪಠ್ಯ ಬರೆಯಬಹುದು.',
  },
  'voice.recordingError': {
    en: 'An error occurred during recording. Please try again.',
    hi: 'रिकॉर्डिंग के दौरान कोई समस्या आई। कृपया पुनः प्रयास करें।',
    kn: 'ರೆಕಾರ್ಡಿಂಗ್ ಸಮಯದಲ್ಲಿ ದೋಷ ಸಂಭವಿಸಿದೆ. ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.',
  },
  'voice.transcriptionError': {
    en: 'Transcription failed. Please check your connection and retry.',
    hi: 'ट्रांसक्रिप्शन विफल रहा। कृपया कनेक्शन की जांच करें और पुनः प्रयास करें।',
    kn: 'ಟ್ರಾನ್ಸ್‌ಕ್ರಿಪ್ಷನ್ ವಿಫಲವಾಗಿದೆ. ದಯವಿಟ್ಟು ಸಂಪರ್ಕವನ್ನು ಪರಿಶೀಲಿಸಿ ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.',
  },
  'voice.retryBtn': {
    en: 'Retry Transcription',
    hi: 'पुनः प्रयास करें',
    kn: 'ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ',
  },
  'voice.privacyNote': {
    en: 'Microphone audio is only recorded while you press record and is sent directly to the transcription endpoint for text conversion.',
    hi: 'माइक्रोफ़ोन केवल रिकॉर्ड दबाने पर ही सक्रिय होता है और ऑडियो को केवल ट्रांसक्रिप्शन के लिए भेजा जाता है।',
    kn: 'ನೀವು ರೆಕಾರ್ಡ್ ಒತ್ತಿದಾಗ ಮಾತ್ರ ಮೈಕ್ರೊಫೋನ್ ಆನ್ ಆಗುತ್ತದೆ ಮತ್ತು ಕೇವಲ ಪಠ್ಯ ಪರಿವರ್ತನೆಗೆ ಕಳುಹಿಸಲಾಗುತ್ತದೆ.',
  },
  'voice.combineWithTyped': {
    en: 'You have both typed text and a voice transcription. How would you like to proceed?',
    hi: 'आपके पास टाइप किया हुआ टेक्स्ट और वॉइस ट्रांसक्रिप्शन दोनों हैं। आप कैसे आगे बढ़ना चाहते हैं?',
    kn: 'ನಿಮ್ಮ ಬಳಿ ಟೈಪ್ ಮಾಡಿದ ಪಠ್ಯ ಮತ್ತು ಧ್ವನಿ ಎರಡೂ ಇವೆ. ಹೇಗೆ ಮುಂದುವರಿಯಲು ಬಯಸುತ್ತೀರಿ?',
  },
  'voice.appendToTyped': {
    en: 'Append to Existing Text',
    hi: 'मौजूदा टेक्स्ट में जोड़ें',
    kn: 'ಈಗಿರುವ ಪಠ್ಯಕ್ಕೆ ಸೇರಿಸಿ',
  },
  'voice.replaceTyped': {
    en: 'Replace Existing Text',
    hi: 'मौजूदा टेक्स्ट को बदलें',
    kn: 'ಈಗಿರುವ ಪಠ್ಯವನ್ನು ಬದಲಿಸಿ',
  },
  'voice.useVoiceOnly': {
    en: 'Use Voice Only',
    hi: 'केवल वॉइस का उपयोग करें',
    kn: 'ಧ್ವನಿ ಮಾತ್ರ ಬಳಸಿ',
  },

  // Dual Consultation Summaries (English & Translated)
  'summary.englishTitle': {
    en: 'English Summary',
    hi: 'अंग्रेजी सारांश (English Summary)',
    kn: 'ಇಂಗ್ಲಿಷ್ ಸಾರಾಂಶ (English Summary)',
  },
  'summary.translatedTitle': {
    en: 'Translated Summary',
    hi: 'अनुवादित सारांश (हिन्दी)',
    kn: 'ಅನುವಾದಿತ ಸಾರಾಂಶ (ಕನ್ನಡ)',
  },
  'summary.loadingDual': {
    en: 'Generating consultation summaries in English and your preferred language...',
    hi: 'अंग्रेजी और आपकी चुनी गई भाषा में परामर्श सारांश तैयार किया जा रहा है...',
    kn: 'ಇಂಗ್ಲಿಷ್ ಮತ್ತು ನಿಮ್ಮ ಆಯ್ಕೆಯ ಭಾಷೆಯಲ್ಲಿ ಸಮಾಲೋಚನೆ ಸಾರಾಂಶ ಸಿದ್ಧಪಡಿಸಲಾಗುತ್ತಿದೆ...',
  },
  'summary.fetchError': {
    en: 'Consultation summary could not be retrieved from the service.',
    hi: 'सेवा से परामर्श सारांश प्राप्त नहीं किया जा सका।',
    kn: 'ಸೇವೆಯಿಂದ ಸಮಾಲೋಚನೆ ಸಾರಾಂಶವನ್ನು ಪಡೆಯಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ.',
  },
  'summary.retryFetch': {
    en: 'Retry Summary Service',
    hi: 'पुनः प्रयास करें',
    kn: 'ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ',
  },

  // Results Screen Localizations
  'results.badge': {
    en: 'Clinical Guidance Profile',
    hi: 'नैदानिक मार्गदर्शन प्रोफ़ाइल',
    kn: 'ವೈದ್ಯಕೀಯ ಮಾರ್ಗದರ್ಶನ ವಿವರ',
  },
  'results.breadcrumb': {
    en: 'Symptom Results',
    hi: 'लक्षण परिणाम',
    kn: 'ಲಕ್ಷಣಗಳ ಫಲಿತಾಂಶ',
  },
  'results.urgentBadge': {
    en: 'Urgent Medical Attention Advised',
    hi: 'तत्काल चिकित्सा सहायता आवश्यक',
    kn: 'ತಕ್ಷಣದ ವೈದ್ಯಕೀಯ ಚಿಕಿತ್ಸೆ ಅಗತ್ಯ',
  },
  'results.promptBadge': {
    en: 'Prompt Medical Consultation Recommended',
    hi: 'शीघ्र डॉक्टर परामर्श की सिफारिश',
    kn: 'ಶೀಘ್ರ ವೈದ್ಯರ ಸಮಾಲೋಚನೆಗೆ ಶಿಫಾರಸು',
  },
  'results.routineBadge': {
    en: 'Routine Guidance & Education',
    hi: 'नियमित मार्गदर्शन एवं शिक्षा',
    kn: 'ಸಾಮಾನ್ಯ ಮಾರ್ಗದರ್ಶನ ಮತ್ತು ಮಾಹಿತಿ',
  },
  'results.editSymptoms': {
    en: 'Edit Symptoms',
    hi: 'लक्षण संपादित करें',
    kn: 'ಲಕ್ಷಣಗಳನ್ನು ಬದಲಾಯಿಸಿ',
  },
  'results.prepareSummary': {
    en: 'Prepare Doctor Summary',
    hi: 'डॉक्टर सारांश तैयार करें',
    kn: 'ವೈದ್ಯರ ಸಮಾಲೋಚನೆ ಹಾಳೆ ತಯಾರಿಸಿ',
  },
  'results.originalStatement': {
    en: 'Reported Symptoms',
    hi: 'आपके द्वारा बताए गए लक्षण',
    kn: 'ನೀವು ತಿಳಿಸಿದ ರೋಗಲಕ್ಷಣಗಳು',
  },
  'results.understoodSymptoms': {
    en: 'Identified Sensations & Patterns',
    hi: 'पहचाने गए शारीरिक लक्षण व पैटर्न',
    kn: 'ಗುರುತಿಸಲಾದ ಶಾರೀರಿಕ ಲಕ್ಷಣಗಳು',
  },
  'results.timeline': {
    en: 'Timeline & Sensation Details',
    hi: 'समयसीमा और तीव्रता का विवरण',
    kn: 'ಕಾಲಾವಧಿ ಮತ್ತು ತೀವ್ರತೆಯ ವಿವರ',
  },
  'results.missingContext': {
    en: 'Important Context to Clarify',
    hi: 'स्पष्ट करने योग्य महत्वपूर्ण बातें',
    kn: 'ಸ್ಪಷ್ಟಪಡಿಸಬೇಕಾದ ಮುಖ್ಯ ವಿವರಗಳು',
  },
  'results.physiology': {
    en: 'Physiological Understanding',
    hi: 'शारीरिक कार्यप्रणाली की समझ',
    kn: 'ಶಾರೀರಿಕ ಬದಲಾವಣೆಗಳ ವಿವರಣೆ',
  },
  'results.commonAssociations': {
    en: 'Possible Associations (Not Diagnoses)',
    hi: 'संभावित चिकित्सीय कारण (निदान नहीं)',
    kn: 'ಸಂಭವನೀಯ ಕಾರಣಗಳು (ರೋಗನಿರ್ಣಯವಲ್ಲ)',
  },
  'results.nextSteps': {
    en: 'Recommended Next Steps',
    hi: 'अनुशंसित अगले कदम',
    kn: 'ಮುಂದಿನ ಸೂಕ್ತ ಕ್ರಮಗಳು',
  },
  'results.doctorQuestions': {
    en: 'Suggested Questions for Your Physician',
    hi: 'डॉक्टर से पूछने योग्य प्रश्न',
    kn: 'ವೈದ್ಯರನ್ನು ಕೇಳಲು ಶಿಫಾರಸು ಮಾಡಿದ ಪ್ರಶ್ನೆಗಳು',
  },
  'results.verifiedSources': {
    en: 'Verified Medical Literature Grounding',
    hi: 'प्रमाणित चिकित्सा साहित्य संदर्भ',
    kn: 'ಪರಿಶೀಲಿಸಿದ ವೈದ್ಯಕೀಯ ಆಧಾರಗಳು',
  },
  'results.disclaimer': {
    en: 'Educational Guidance Notice',
    hi: 'शैक्षिक मार्गदर्शन सूचना',
    kn: 'ಶೈಕ್ಷಣಿಕ ಮಾರ್ಗದರ್ಶನ ಸೂಚನೆ',
  },
  'results.emergencyAlert': {
    en: 'High Urgency Symptoms Detected',
    hi: 'गंभीर आपातकालीन लक्षण पाए गए',
    kn: 'ತೀವ್ರ ತುರ್ತು ಲಕ್ಷಣಗಳು ಕಂಡುಬಂದಿವೆ',
  },
  'results.viewUrgent': {
    en: 'View Emergency Instructions',
    hi: 'आपातकालीन निर्देश देखें',
    kn: 'ತುರ್ತು ಸೂಚನೆಗಳನ್ನು ವೀಕ್ಷಿಸಿ',
  },

  // Category Localizations
  'category.all': {
    en: 'All Topics',
    hi: 'सभी विषय',
    kn: 'ಎಲ್ಲಾ ವಿಷಯಗಳು',
  },
  'category.menstrual': {
    en: 'Menstrual Health',
    hi: 'मासिक धर्म स्वास्थ्य',
    kn: 'ಮುಟ್ಟಿನ ಆರೋಗ್ಯ',
  },
  'category.cycle': {
    en: 'Cycle Changes',
    hi: 'चक्र में बदलाव',
    kn: 'ಮುಟ್ಟಿನ ಬದಲಾವಣೆಗಳು',
  },
  'category.pain': {
    en: 'Pain & Comfort',
    hi: 'दर्द और आराम',
    kn: 'ನೋವು ಮತ್ತು ವಿಶ್ರಾಂತಿ',
  },
  'category.hormonal': {
    en: 'Hormonal Health',
    hi: 'हार्मोनल स्वास्थ्य',
    kn: 'ಹಾರ್ಮೋನ್ ಆರೋಗ್ಯ',
  },
  'category.chronic': {
    en: 'Chronic Conditions',
    hi: 'दीर्घकालिक स्थितियां',
    kn: 'ದೀರ್ಘಕಾಲದ ಸಮಸ್ಯೆಗಳು',
  },
  'category.fertility': {
    en: 'Fertility',
    hi: 'प्रजनन क्षमता',
    kn: 'ಫಲವತ್ತತೆ',
  },
  'category.maternal': {
    en: 'Maternal Care',
    hi: 'मातृत्व देखभाल',
    kn: 'ತಾಯ್ತನದ ಆರೈಕೆ',
  },
  'category.transitions': {
    en: 'Life Transitions',
    hi: 'जीवन के पड़ाव',
    kn: 'ಜೀವನ ಹಂತಗಳು',
  },

  // Urgent Care Instructions
  'urgent.step1Title': {
    en: 'Go to the nearest emergency department or hospital.',
    hi: 'नजदीकी अस्पताल के आपातकालीन विभाग में जाएं।',
    kn: 'ಹತ್ತಿರದ ಆಸ್ಪತ್ರೆಯ ತುರ್ತು ಚಿಕಿತ್ಸಾ ವಿಭಾಗಕ್ಕೆ ತೆರಳಿ.',
  },
  'urgent.step1Desc': {
    en: 'Do not wait for a routine appointment if pain or bleeding is acute and severe.',
    hi: 'यदि दर्द या रक्तस्राव बहुत तेज़ है तो नियमित अपॉइंटमेंट का इंतज़ार न करें।',
    kn: 'ನೋವು ಅಥವಾ ರಕ್ತಸ್ರಾವ ತೀವ್ರವಾಗಿದ್ದರೆ ಸಾಮಾನ್ಯ ತಪಾಸಣೆಗೆ ಕಾಯಬೇಡಿ.',
  },
  'urgent.step2Title': {
    en: 'Do not drive yourself.',
    hi: 'स्वयं गाड़ी न चलाएं।',
    kn: 'ಸ್ವತಃ ವಾಹನ ಚಲಾಯಿಸಬೇಡಿ.',
  },
  'urgent.step2Desc': {
    en: 'Have someone accompany you or call emergency ambulance services immediately.',
    hi: 'किसी परिजन को साथ लें या तुरंत एम्बुलेंस को कॉल करें।',
    kn: 'ಯಾರನ್ನಾದರೂ ಜೊತೆಗೆ ಕರೆದೊಯ್ಯಿರಿ ಅಥವಾ ಆಂಬ್ಯುಲೆನ್ಸ್ ಕರೆ ಮಾಡಿ.',
  },
  'urgent.step3Title': {
    en: 'Avoid eating or drinking until evaluated.',
    hi: 'जांच होने तक कुछ भी खाने या पीने से बचें।',
    kn: 'ಪರೀಕ್ಷೆ ಮುಗಿಯುವವರೆಗೆ ಆಹಾರ ಅಥವಾ ನೀರು ಸೇವಿಸಬೇಡಿ.',
  },
  'urgent.step3Desc': {
    en: 'In case urgent pelvic imaging, ultrasound, or medical intervention is required.',
    hi: 'यदि आपातकालीन अल्ट्रासाउंड या प्रक्रिया की आवश्यकता हो।',
    kn: 'ತುರ್ತು ಸ್ಕ್ಯಾನಿಂಗ್ ಅಥವಾ ಚಿಕಿತ್ಸೆ ಅಗತ್ಯವಿರಬಹುದು.',
  },
  'urgent.step4Title': {
    en: 'Tell the triage staff immediately upon arrival:',
    hi: 'पहुंचते ही अस्पताल कर्मचारियों को बताएं:',
    kn: 'ಆಸ್ಪತ್ರೆಗೆ ತಲುಪಿದ ತಕ್ಷಣ ವೈದ್ಯಕೀಯ ಸಿಬ್ಬಂದಿಗೆ ತಿಳಿಸಿ:',
  },

  // Period Tracker Translations
  'tracker.badge': {
    en: 'Menstrual Wellness Tracker',
    hi: 'मासिक धर्म वेलनेस ट्रैकर',
    kn: 'ಮುಟ್ಟಿನ ಕ್ಷೇಮ ಟ್ರ್ಯಾಕರ್',
  },
  'tracker.title': {
    en: 'Period & Menstrual Cycle Tracker',
    hi: 'पीरियड और मासिक धर्म चक्र ट्रैकर',
    kn: 'ಮುಟ್ಟು ಮತ್ತು ಮುಟ್ಟಿನ ಚಕ್ರ ಟ್ರ್ಯಾಕರ್',
  },
  'tracker.subtitle': {
    en: 'Record your actual period dates on the interactive calendar. Review duration, monitor cycle consistency, and plan ahead with privacy.',
    hi: 'कैलेंडर पर अपने पीरियड्स की सही तारीखें दर्ज करें। अवधि और चक्र की स्थिरता को समझें।',
    kn: 'ಕ್ಯಾಲೆಂಡರ್‌ನಲ್ಲಿ ನಿಮ್ಮ ಮುಟ್ಟಿನ ದಿನಾಂಕಗಳನ್ನು ನಮೂದಿಸಿ. ಅವಧಿ ಮತ್ತು ಚಕ್ರದ ಸ್ಥಿರತೆಯನ್ನು ಸುರಕ್ಷಿತವಾಗಿ ಗಮನಿಸಿ.',
  },
  'tracker.recordPeriodBtn': {
    en: 'Record Period',
    hi: 'पीरियड दर्ज करें',
    kn: 'ಮುಟ್ಟು ದಾಖಲಿಸಿ',
  },
  'tracker.viewCycleHistoryBtn': {
    en: 'View Cycle History',
    hi: 'चक्र इतिहास देखें',
    kn: 'ಚಕ್ರದ ಇತಿಹಾಸ ವೀಕ್ಷಿಸಿ',
  },
  'tracker.cardLastPeriod': {
    en: 'Last Recorded Period',
    hi: 'अंतिम दर्ज पीरियड',
    kn: 'ಕೊನೆಯದಾಗಿ ದಾಖಲಿಸಿದ ಮುಟ್ಟು',
  },
  'tracker.cardPeriodDuration': {
    en: 'Period Duration',
    hi: 'पीरियड की अवधि',
    kn: 'ಮುಟ್ಟಿನ ಅವಧಿ',
  },
  'tracker.cardCycleLength': {
    en: 'Estimated Cycle Length',
    hi: 'अनुमानित चक्र अवधि',
    kn: 'ಅಂದಾಜು ಚಕ್ರದ ಅವಧಿ',
  },
  'tracker.cardNextPeriod': {
    en: 'Estimated Next Period',
    hi: 'अनुमानित अगला पीरियड',
    kn: 'ಅಂದಾಜು ಮುಂದಿನ ಮುಟ್ಟು',
  },
  'tracker.daysUnit': {
    en: 'days',
    hi: 'दिन',
    kn: 'ದಿನಗಳು',
  },
  'tracker.endedOn': {
    en: 'Ended on',
    hi: 'समाप्त',
    kn: 'ಮುಕ್ತಾಯ',
  },
  'tracker.noRecordsYet': {
    en: 'No period records yet',
    hi: 'अभी कोई रिकॉर्ड नहीं है',
    kn: 'ಇನ್ನೂ ಯಾವುದೇ ದಾಖಲೆಗಳಿಲ್ಲ',
  },
  'tracker.clickToRecordFirst': {
    en: "Click 'Record Period' to add your dates.",
    hi: "'पीरियड दर्ज करें' पर क्लिक करके तारीखें जोड़ें।",
    kn: "ದಿನಾಂಕಗಳನ್ನು ಸೇರಿಸಲು 'ಮುಟ್ಟು ದಾಖಲಿಸಿ' ಒತ್ತಿರಿ.",
  },
  'tracker.notAvailableYet': {
    en: 'Not recorded yet',
    hi: 'दर्ज नहीं',
    kn: 'ಇನ್ನೂ ದಾಖಲಾಗಿಲ್ಲ',
  },
  'tracker.avgDuration': {
    en: 'Average',
    hi: 'औसत',
    kn: 'ಸರಾಸರಿ',
  },
  'tracker.estimateBadge': {
    en: 'Estimate',
    hi: 'अनुमान',
    kn: 'ಅಂದಾಜು',
  },
  'tracker.basedOnRecordedStarts': {
    en: 'Calculated from consecutive recorded start dates.',
    hi: 'लगातार दर्ज शुरुआत की तारीखों पर आधारित।',
    kn: 'ಸತತ ಆರಂಭಿಕ ದಿನಾಂಕಗಳಿಂದ ಲೆಕ್ಕಹಾಕಲಾಗಿದೆ.',
  },
  'tracker.requiresTwoStarts': {
    en: 'Requires 2+ recorded periods',
    hi: 'कम से कम 2 रिकॉर्ड आवश्यक',
    kn: 'ಕನಿಷ್ಠ ೨ ದಾಖಲೆಗಳು ಅಗತ್ಯ',
  },
  'tracker.cycleLengthExplanation': {
    en: 'Cycle length is calculated as days between one period start and the next period start.',
    hi: 'चक्र की अवधि एक पीरियड के शुरू होने से अगले पीरियड के शुरू होने के दिनों से मापी जाती है।',
    kn: 'ಒಂದು ಮುಟ್ಟಿನ ಆರಂಭದಿಂದ ಮುಂದಿನ ಮುಟ್ಟಿನ ಆರಂಭದವರೆಗಿನ ದಿನಗಳನ್ನು ಚಕ್ರದ ಅವಧಿ ಎನ್ನಲಾಗುತ್ತದೆ.',
  },
  'tracker.noPredictionYet': {
    en: 'Prediction not ready',
    hi: 'पूर्वानुमान उपलब्ध नहीं',
    kn: 'ಅಂದಾಜು ಸಿದ್ಧವಿಲ್ಲ',
  },
  'tracker.expectedWindow': {
    en: 'Estimated Window',
    hi: 'अनुमानित समय',
    kn: 'ಅಂದಾಜು ಸಮಯ',
  },
  'tracker.cyclesVaryNotice': {
    en: 'Cycles naturally vary. At least 2 periods are needed before estimating future cycles.',
    hi: 'मासिक धर्म में स्वाभाविक भिन्नता होती है। अनुमान लगाने के लिए कम से कम 2 रिकॉर्ड जरूरी हैं।',
    kn: 'ಮುಟ್ಟಿನ ಚಕ್ರಗಳಲ್ಲಿ ಸ್ವಾಭಾವಿಕ ವ್ಯತ್ಯಾಸಗಳಿರುತ್ತವೆ. ಕನಿಷ್ಠ ೨ ದಾಖಲೆಗಳಿಲ್ಲದೆ ಅಂದಾಜು ಮಾಡಲು ಸಾಧ್ಯವಿಲ್ಲ.',
  },
  'tracker.todayBtn': {
    en: 'Today',
    hi: 'आज',
    kn: 'ಇಂದು',
  },
  'tracker.legendRecordedPeriod': {
    en: 'Recorded Period',
    hi: 'दर्ज पीरियड',
    kn: 'ದಾಖಲಿಸಿದ ಮುಟ್ಟು',
  },
  'tracker.legendEstimatedNext': {
    en: 'Estimated Next Period',
    hi: 'अनुमानित अगला पीरियड',
    kn: 'ಅಂದಾಜು ಮುಂದಿನ ಮುಟ್ಟು',
  },
  'tracker.legendToday': {
    en: 'Today',
    hi: 'आज',
    kn: 'ಇಂದು',
  },
  'tracker.startBadge': {
    en: 'Start',
    hi: 'शुरू',
    kn: 'ಆರಂಭ',
  },
  'tracker.endBadge': {
    en: 'End',
    hi: 'समाप्त',
    kn: 'ಅಂತ್ಯ',
  },
  'tracker.estimateLabel': {
    en: 'Est.',
    hi: 'अनुमान',
    kn: 'ಅಂದಾಜು',
  },
  'tracker.calendarClickHint': {
    en: 'Click any date to view, record, or edit period dates.',
    hi: 'किसी भी तारीख पर क्लिक करके पीरियड जोड़ें या सुधारें।',
    kn: 'ದಿನಾಂಕಗಳನ್ನು ಸೇರಿಸಲು ಅಥವಾ ಸರಿಪಡಿಸಲು ಯಾವುದೇ ದಿನಾಂಕದ ಮೇಲೆ ಕ್ಲಿಕ್ ಮಾಡಿ.',
  },
  'tracker.addNewEntryAction': {
    en: 'Record Custom Dates',
    hi: 'तारीखें दर्ज करें',
    kn: 'ದಿನಾಂಕಗಳನ್ನು ನಮೂದಿಸಿ',
  },
  'tracker.privacyHeader': {
    en: 'Privacy & Data Handling',
    hi: 'गोपनीयता और डेटा संग्रहण',
    kn: 'ಗೌಪ್ಯತೆ ಮತ್ತು ಮಾಹಿತಿ ಸಂಗ್ರಹ',
  },
  'tracker.privacyBody': {
    en: 'Your period records are stored locally in your private browser session. We never transmit your menstrual dates to third parties or external AI models.',
    hi: 'आपके पीरियड रिकॉर्ड आपके ब्राउज़र के निजी सत्र में सुरक्षित रहते हैं। इन्हें कभी किसी तीसरे पक्ष या एआई को नहीं भेजा जाता।',
    kn: 'ನಿಮ್ಮ ಮುಟ್ಟಿನ ದಾಖಲೆಗಳನ್ನು ನಿಮ್ಮ ಬ್ರೌಸರ್ ಸೆಷನ್‌ನಲ್ಲಿ ಮಾತ್ರ ಇರಿಸಲಾಗುತ್ತದೆ. ಇವುಗಳನ್ನು ಯಾವುದೇ ಮೂರನೇ ವ್ಯಕ್ತಿಗೆ ಅಥವಾ ಎಐಗೆ ಕಳುಹಿಸುವುದಿಲ್ಲ.',
  },
  'tracker.modalAddTitle': {
    en: 'Record Period Dates',
    hi: 'पीरियड की तारीखें दर्ज करें',
    kn: 'ಮುಟ್ಟಿನ ದಿನಾಂಕಗಳನ್ನು ದಾಖಲಿಸಿ',
  },
  'tracker.modalEditTitle': {
    en: 'Edit Period Record',
    hi: 'पीरियड रिकॉर्ड संपादित करें',
    kn: 'ಮುಟ್ಟಿನ ದಾಖಲೆ ತಿದ್ದುಪಡಿ',
  },
  'tracker.modalSubtitle': {
    en: 'Enter accurate period start and end dates. Predictions will update automatically.',
    hi: 'पीरियड शुरू और खत्म होने की सही तारीखें चुनें।',
    kn: 'ಮುಟ್ಟು ಆರಂಭ ಮತ್ತು ಮುಕ್ತಾಯದ ನಿಖರ ದಿನಾಂಕಗಳನ್ನು ನಮೂದಿಸಿ.',
  },
  'tracker.startDateLabel': {
    en: 'Period Start Date',
    hi: 'पीरियड शुरू होने की तारीख',
    kn: 'ಮುಟ್ಟು ಆರಂಭವಾದ ದಿನಾಂಕ',
  },
  'tracker.endDateLabel': {
    en: 'Period End Date',
    hi: 'पीरियड समाप्त होने की तारीख',
    kn: 'ಮುಟ್ಟು ಮುಕ್ತಾಯವಾದ ದಿನಾಂಕ',
  },
  'tracker.flowLabel': {
    en: 'Flow Intensity (Optional)',
    hi: 'प्रवाह की तीव्रता (वैकल्पिक)',
    kn: 'ಹರಿವಿನ ತೀವ್ರತೆ (ಐಚ್ಛಿಕ)',
  },
  'tracker.notesLabel': {
    en: 'Personal Symptoms & Notes (Optional)',
    hi: 'व्यक्तिगत लक्षण और नोट्स (वैकल्पिक)',
    kn: 'ವೈಯಕ್ತಿಕ ಲಕ್ಷಣಗಳು ಮತ್ತು ಟಿಪ್ಪಣಿಗಳು (ಐಚ್ಛಿಕ)',
  },
  'tracker.notesPlaceholder': {
    en: 'e.g., mild cramps on day 1, fatigue, used heating pad',
    hi: 'उदा. पहले दिन हल्की ऐंठन, थकान',
    kn: 'ಉದಾ: ಮೊದಲ ದಿನ ಹೊಟ್ಟೆ ನೋವು, ಆಯಾಸ',
  },
  'tracker.deleteEntryBtn': {
    en: 'Delete Record',
    hi: 'रिकॉर्ड हटाएं',
    kn: 'ದಾಖಲೆ ಅಳಿಸಿ',
  },
  'tracker.saveRecordBtn': {
    en: 'Save Record',
    hi: 'सुरक्षित करें',
    kn: 'ಉಳಿಸಿ',
  },
  'tracker.confirmDeleteTitle': {
    en: 'Delete Period Record?',
    hi: 'क्या यह रिकॉर्ड हटाना चाहते हैं?',
    kn: 'ಈ ದಾಖಲೆಯನ್ನು ಅಳಿಸಬೇಕೇ?',
  },
  'tracker.confirmDeleteBody': {
    en: 'This will remove this recorded period. Associated cycle length calculations will be updated.',
    hi: 'यह रिकॉर्ड हट जाएगा और चक्र गणना अपडेट हो जाएगी।',
    kn: 'ಈ ದಾಖಲೆ ಶಾಶ್ವತವಾಗಿ ತೆಗೆಯಲ್ಪಡುತ್ತದೆ ಮತ್ತು ಚಕ್ರದ ಲೆಕ್ಕಾಚಾರಗಳು ನವೀಕರಣಗೊಳ್ಳುತ್ತವೆ.',
  },
  'tracker.confirmDeleteAction': {
    en: 'Yes, Delete',
    hi: 'हाँ, हटाएं',
    kn: 'ಹೌದು, ಅಳಿಸಿ',
  },

  // Cycle History Translations
  'history.badge': {
    en: 'Menstrual Cycle Log',
    hi: 'मासिक चक्र लॉग',
    kn: 'ಮುಟ್ಟಿನ ಚಕ್ರದ ಲಾಗ್',
  },
  'history.title': {
    en: 'Menstrual Cycle History',
    hi: 'मासिक चक्र का इतिहास',
    kn: 'ಮುಟ್ಟಿನ ಚಕ್ರದ ಇತಿಹಾಸ',
  },
  'history.subtitle': {
    en: 'Review your actual recorded periods, duration, and calculated cycle lengths over time.',
    hi: 'अपने सभी दर्ज पीरियड्स, उनकी अवधि और चक्र की लंबाई की समीक्षा करें।',
    kn: 'ನಿಮ್ಮ ಮುಟ್ಟಿನ ಅವಧಿ ಮತ್ತು ಕಾಲಾವಧಿಯ ಲೆಕ್ಕಾಚಾರಗಳನ್ನು ಕಾಲಕ್ರಮೇಣ ಪರಿಶೀಲಿಸಿ.',
  },
  'history.addPeriodBtn': {
    en: 'Record Period',
    hi: 'पीरियड दर्ज करें',
    kn: 'ಮುಟ್ಟು ದಾಖಲಿಸಿ',
  },
  'history.howCalculatedTitle': {
    en: 'How Cycle Length is Calculated',
    hi: 'चक्र की अवधि कैसे मापी जाती है',
    kn: 'ಚಕ್ರದ ಅವಧಿಯನ್ನು ಹೇಗೆ ಲೆಕ್ಕಹಾಕಲಾಗುತ್ತದೆ',
  },
  'history.howCalculatedBody': {
    en: 'Cycle length is strictly measured as the number of days from the start date of one recorded period to the start date of the next consecutive recorded period. Calculations are never fabricated.',
    hi: 'चक्र की अवधि केवल एक पीरियड की शुरुआत से अगले पीरियड की शुरुआत के बीच के दिनों की सटीक संख्या होती है।',
    kn: 'ಚಕ್ರದ ಅವಧಿಯನ್ನು ಕೇವಲ ಒಂದು ಮುಟ್ಟಿನ ಆರಂಭ ದಿನಾಂಕದಿಂದ ಮುಂದಿನ ಮುಟ್ಟಿನ ಆರಂಭ ದಿನಾಂಕದ ನಡುವಿನ ನಿಖರ ದಿನಗಳಿಂದ ಮಾತ್ರ ಲೆಕ್ಕಹಾಕಲಾಗುತ್ತದೆ.',
  },
  'history.emptyTitle': {
    en: 'No Cycle History Yet',
    hi: 'अभी कोई चक्र इतिहास नहीं है',
    kn: 'ಇನ್ನೂ ಯಾವುದೇ ಚಕ್ರದ ಇತಿಹಾಸವಿಲ್ಲ',
  },
  'history.emptyBody': {
    en: 'Record your first period using the Period Tracker calendar. Once you log multiple periods, cycle lengths will automatically calculate here.',
    hi: 'पीरियड ट्रैकर में अपना पहला पीरियड दर्ज करें। जब आप एकाधिक रिकॉर्ड जोड़ेंगे, तो चक्र अपने आप दिखेगा।',
    kn: 'ಮೊದಲು ನಿಮ್ಮ ಮುಟ್ಟನ್ನು ದಾಖಲಿಸಿ. ನೀವು ಒಂದಕ್ಕಿಂತ ಹೆಚ್ಚು ಅವಧಿಗಳನ್ನು ದಾಖಲಿಸಿದಾಗ, ಚಕ್ರದ ವಿವರಗಳು ಇಲ್ಲಿ ತಾನಾಗಿಯೇ ಕಾಣಿಸುತ್ತವೆ.',
  },
  'history.recordFirstPeriodBtn': {
    en: 'Record First Period',
    hi: 'पहला पीरियड दर्ज करें',
    kn: 'ಮೊದಲ ಮುಟ್ಟು ದಾಖಲಿಸಿ',
  },
  'history.tableHeading': {
    en: 'Recorded Menstrual Cycles',
    hi: 'दर्ज मासिक चक्र',
    kn: 'ದಾಖಲಾದ ಮುಟ್ಟಿನ ಚಕ್ರಗಳು',
  },
  'history.sortOrder': {
    en: 'Sort',
    hi: 'क्रम',
    kn: 'ಕ್ರಮ',
  },
  'history.newestFirst': {
    en: 'Newest First',
    hi: 'नवीनतम पहले',
    kn: 'ಹೊಸತು ಮೊದಲು',
  },
  'history.oldestFirst': {
    en: 'Oldest First',
    hi: 'पुरातन पहले',
    kn: 'ಹಳೆಯದು ಮೊದಲು',
  },
  'history.colCycle': {
    en: 'Cycle',
    hi: 'चक्र',
    kn: 'ಚಕ್ರ',
  },
  'history.colStartDate': {
    en: 'Start Date',
    hi: 'शुरुआत की तारीख',
    kn: 'ಆರಂಭ ದಿನಾಂಕ',
  },
  'history.colEndDate': {
    en: 'End Date',
    hi: 'समाप्ति की तारीख',
    kn: 'ಮುಕ್ತಾಯ ದಿನಾಂಕ',
  },
  'history.colDuration': {
    en: 'Duration',
    hi: 'अवधि',
    kn: 'ಅವಧಿ',
  },
  'history.colCycleLength': {
    en: 'Cycle Length',
    hi: 'चक्र की लंबाई',
    kn: 'ಚಕ್ರದ ಉದ್ದ',
  },
  'history.colStatus': {
    en: 'Status',
    hi: 'स्थिति',
    kn: 'ಸ್ಥಿತಿ',
  },
  'history.colActions': {
    en: 'Actions',
    hi: 'क्रियाएं',
    kn: 'ಕ್ರಮಗಳು',
  },
  'history.statusRecorded': {
    en: 'Completed Cycle',
    hi: 'पूर्ण चक्र',
    kn: 'ಪೂರ್ಣಗೊಂಡ ಚಕ್ರ',
  },
  'history.statusInProgress': {
    en: 'Current / Ongoing',
    hi: 'वर्तमान / जारी',
    kn: 'ಪ್ರಸ್ತುತ / ಚಾಲ್ತಿಯಲ್ಲಿದೆ',
  },
  'history.cycleLengthPending': {
    en: 'Next period start needed',
    hi: 'अगले पीरियड की प्रतीक्षा',
    kn: 'ಮುಂದಿನ ಮುಟ್ಟಿನ ಆರಂಭ ಅಗತ್ಯ',
  },
  'history.editTooltip': {
    en: 'Edit Record',
    hi: 'संपादित करें',
    kn: 'ತಿದ್ದಿ',
  },
  'history.deleteTooltip': {
    en: 'Delete Record',
    hi: 'हटाएं',
    kn: 'ಅಳಿಸಿ',
  },
  'history.totalRecords': {
    en: 'Total Records',
    hi: 'कुल रिकॉर्ड',
    kn: 'ಒಟ್ಟು ದಾಖಲೆಗಳು',
  },
  'history.addAnotherPeriod': {
    en: 'Record Another Period',
    hi: 'अन्य पीरियड दर्ज करें',
    kn: 'ಮತ್ತೊಂದು ಮುಟ್ಟು ದಾಖಲಿಸಿ',
  },

  // Health Reports Translations
  'reports.badge': {
    en: 'Doctor-Ready Health Reports',
    hi: 'डॉक्टर के लिए स्वास्थ्य रिपोर्ट',
    kn: 'ವೈದ್ಯರ ಸಮಾಲೋಚನೆಗಾಗಿ ಆರೋಗ್ಯ ವರದಿಗಳು',
  },
  'reports.title': {
    en: 'My Health Reports',
    hi: 'मेरी स्वास्थ्य रिपोर्ट',
    kn: 'ನನ್ನ ಆರೋಗ್ಯ ವರದಿಗಳು',
  },
  'reports.subtitle': {
    en: 'Review your symptom assessments, consultation summaries, and printable doctor briefs generated during your sessions.',
    hi: 'सत्रों के दौरान तैयार किए गए अपने लक्षण विश्लेषण, परामर्श सारांश और प्रिंट करने योग्य रिपोर्ट देखें।',
    kn: 'ನಿಮ್ಮ ಲಕ್ಷಣಗಳ ವಿಶ್ಲೇಷಣೆ, ಸಮಾಲೋಚನೆ ಸಾರಾಂಶ ಮತ್ತು ಮುದ್ರಿಸಬಹುದಾದ ವೈದ್ಯಕೀಯ ಟಿಪ್ಪಣಿಗಳನ್ನು ಪರಿಶೀಲಿಸಿ.',
  },
  'reports.newAnalysisBtn': {
    en: 'New Symptom Check',
    hi: 'नया लक्षण परीक्षण',
    kn: 'ಹೊಸ ಲಕ್ಷಣ ಪರೀಕ್ಷೆ',
  },
  'reports.privacyNoticeTitle': {
    en: 'Session-Protected Health Information',
    hi: 'सत्र-सुरक्षित स्वास्थ्य जानकारी',
    kn: 'ಸೆಷನ್-ಸುರಕ್ಷಿತ ಆರೋಗ್ಯ ಮಾಹಿತಿ',
  },
  'reports.sessionStorageExplained': {
    en: 'Health reports are stored in your private browser session and are never sent to external tracking databases.',
    hi: 'रिपोर्ट केवल आपके निजी ब्राउज़र सत्र में रहती हैं और किसी बाहरी डेटाबेस में नहीं भेजी जातीं।',
    kn: 'ವರದಿಗಳನ್ನು ಕೇವಲ ನಿಮ್ಮ ಬ್ರೌಸರ್ ಸೆಷನ್‌ನಲ್ಲಿ ಮಾತ್ರ ಇರಿಸಲಾಗುತ್ತದೆ ಮತ್ತು ಯಾವುದೇ ಹೊರಗಿನ ಡೇಟಾಬೇಸ್‌ಗೆ ಕಳುಹಿಸುವುದಿಲ್ಲ.',
  },
  'reports.memoryStorageExplained': {
    en: 'Reports are held in temporary memory and will reset when the page is reloaded.',
    hi: 'रिपोर्ट अस्थायी मेमोरी में हैं और पेज रीलोड होने पर मिट जाएंगी।',
    kn: 'ವರದಿಗಳು ತಾತ್ಕಾಲಿಕ ಮೆಮೊರಿಯಲ್ಲಿದ್ದು ಪುಟ ಮರುಲೋಡ್ ಆದಾಗ ತೆರವಾಗುತ್ತವೆ.',
  },
  'reports.emptyTitle': {
    en: 'No Health Reports Yet',
    hi: 'अभी कोई रिपोर्ट नहीं है',
    kn: 'ಇನ್ನೂ ಯಾವುದೇ ಆರೋಗ್ಯ ವರದಿಗಳಿಲ್ಲ',
  },
  'reports.emptyBody': {
    en: 'Describe your symptoms in the Symptom Assistant to generate structured clinical insights and doctor consultation notes.',
    hi: 'लक्षण सहायक में अपने लक्षणों का वर्णन करके डॉक्टर के लिए संरचित नोट्स तैयार करें।',
    kn: 'ವೈದ್ಯರ ಸಮಾಲೋಚನೆಗೆ ಅಗತ್ಯವಾದ ಟಿಪ್ಪಣಿಗಳನ್ನು ರಚಿಸಲು ರೋಗಲಕ್ಷಣ ಸಹಾಯಕದಲ್ಲಿ ನಿಮ್ಮ ಲಕ್ಷಣಗಳನ್ನು ವಿವರಿಸಿ.',
  },
  'reports.startFirstAnalysisBtn': {
    en: 'Start Symptom Check',
    hi: 'लक्षण परीक्षण शुरू करें',
    kn: 'ಲಕ್ಷಣ ಪರೀಕ್ಷೆ ಆರಂಭಿಸಿ',
  },
  'reports.availableReportsHeading': {
    en: 'Saved Clinical Reports',
    hi: 'सहेजी गई रिपोर्ट',
    kn: 'ಉಳಿಸಲಾದ ವೈದ್ಯಕೀಯ ವರದಿಗಳು',
  },
  'reports.clickToViewOrPrint': {
    en: 'Open any report to review, print, or save as a PDF for your doctor.',
    hi: 'समीक्षा करने, प्रिंट करने या पीडीएफ के रूप में सहेजने के लिए कोई भी रिपोर्ट खोलें।',
    kn: 'ಪರಿಶೀಲಿಸಲು, ಮುದ್ರಿಸಲು ಅಥವಾ ಪಿಡಿಎಫ್ ಆಗಿ ಉಳಿಸಲು ಯಾವುದೇ ವರದಿಯನ್ನು ತೆರೆಯಿರಿ.',
  },
  'reports.dualSummaryAvailableBadge': {
    en: 'English & Translated Summaries Ready',
    hi: 'अंग्रेजी और अनुवादित सारांश तैयार',
    kn: 'ಇಂಗ್ಲಿಷ್ ಮತ್ತು ಅನುವಾದಿತ ಸಾರಾಂಶಗಳು ಸಿದ್ಧವಾಗಿವೆ',
  },
  'reports.viewReportBtn': {
    en: 'Open Report',
    hi: 'रिपोर्ट देखें',
    kn: 'ವರದಿ ತೆರೆಯಿರಿ',
  },
  'reports.printSavePdfBtn': {
    en: 'Print / Save as PDF',
    hi: 'प्रिंट / पीडीएफ सहेजें',
    kn: 'ಮುದ್ರಿಸಿ / ಪಿಡಿಎಫ್ ಉಳಿಸಿ',
  },
  'reports.deleteReportTooltip': {
    en: 'Delete Report',
    hi: 'रिपोर्ट हटाएं',
    kn: 'ವರದಿ ಅಳಿಸಿ',
  },
  'reports.clinicalConsultationNote': {
    en: 'Clinical Consultation Brief',
    hi: 'चिकित्सीय परामर्श नोट',
    kn: 'ವೈದ್ಯಕೀಯ ಸಮಾಲೋಚನಾ ಟಿಪ್ಪಣಿ',
  },
  'reports.doctorFriendlyFormat': {
    en: 'Structured for healthcare provider review',
    hi: 'डॉक्टर की समीक्षा के लिए संरचित',
    kn: 'ವೈದ್ಯರ ಪರಿಶೀಲನೆಗಾಗಿ ಸಿದ್ಧಪಡಿಸಲಾಗಿದೆ',
  },
  'reports.headerPatientNote': {
    en: 'Patient Symptom Brief & Consultation Note',
    hi: 'मरीज़ लक्षण सारांश एवं परामर्श नोट',
    kn: 'ರೋಗಿಯ ಲಕ್ಷಣಗಳ ಸಾರಾಂಶ ಮತ್ತು ಸಮಾಲೋಚನಾ ಟಿಪ್ಪಣಿ',
  },
  'reports.headingReportDate': {
    en: 'Report Generated',
    hi: 'रिपोर्ट दिनांक',
    kn: 'ವರದಿ ದಿನಾಂಕ',
  },
  'reports.headingSymptomsDescribed': {
    en: 'Symptoms Described by User',
    hi: 'उपयोगकर्ता द्वारा बताए गए लक्षण',
    kn: 'ಬಳಕೆದಾರರು ವಿವರಿಸಿದ ಲಕ್ಷಣಗಳು',
  },
  'reports.headingAiInfo': {
    en: 'AI-Generated Educational Health Information',
    hi: 'एआई-जनित स्वास्थ्य जानकारी (शैक्षणिक)',
    kn: 'ಎಐ-ರಚಿತ ಶೈಕ್ಷಣಿಕ ಆರೋಗ್ಯ ಮಾಹಿತಿ',
  },
  'reports.headingNextSteps': {
    en: 'Suggested Next Steps',
    hi: 'सुझाए गए अगले कदम',
    kn: 'ಶಿಫಾರಸು ಮಾಡಿದ ಮುಂದಿನ ಕ್ರಮಗಳು',
  },
  'reports.headingDoctorQuestions': {
    en: 'Questions to Discuss With Your Doctor',
    hi: 'डॉक्टर से पूछने योग्य प्रश्न',
    kn: 'ನಿಮ್ಮ ವೈದ್ಯರನ್ನು ಕೇಳಬೇಕಾದ ಪ್ರಶ್ನೆಗಳು',
  },
  'reports.printSaveHint': {
    en: 'Prints cleanly on A4 paper with navigation and buttons hidden.',
    hi: 'A4 पेपर पर बिना बटन के साफ़ प्रिंट होता है।',
    kn: 'ಎ೪ ಕಾಗದದಲ್ಲಿ ಗುಂಡಿಗಳಿಲ್ಲದೆ ಸ್ಪಷ್ಟವಾಗಿ ಮುದ್ರಣಗೊಳ್ಳುತ್ತದೆ.',
  },
  'reports.confirmDeleteReportTitle': {
    en: 'Delete Health Report?',
    hi: 'स्वास्थ्य रिपोर्ट हटाएं?',
    kn: 'ಆರೋಗ್ಯ ವರದಿಯನ್ನು ಅಳಿಸಬೇಕೇ?',
  },
  'reports.confirmDeleteReportBody': {
    en: 'This will remove this saved report from your session. This action cannot be undone.',
    hi: 'यह रिपोर्ट आपके सत्र से हटा दी जाएगी।',
    kn: 'ಈ ವರದಿಯು ನಿಮ್ಮ ಸೆಷನ್‌ನಿಂದ ಅಳಿಸಲ್ಪಡುತ್ತದೆ.',
  },
  'reports.confirmDeleteReportAction': {
    en: 'Yes, Delete Report',
    hi: 'हाँ, रिपोर्ट हटाएं',
    kn: 'ಹೌದು, ವರದಿ ಅಳಿಸಿ',
  },

  // Dashboard Summary Keys
  'dashboard.statRecordedPeriods': {
    en: 'Recorded Periods',
    hi: 'दर्ज पीरियड्स',
    kn: 'ದಾಖಲಿಸಿದ ಮುಟ್ಟುಗಳು',
  },
  'dashboard.statReportsAvailable': {
    en: 'Health Reports',
    hi: 'स्वास्थ्य रिपोर्ट',
    kn: 'ಆರೋಗ್ಯ ವರದಿಗಳು',
  },
  'dashboard.summaryMetricsTitle': {
    en: 'Your Health & Cycle Overview',
    hi: 'आपका स्वास्थ्य और चक्र अवलोकन',
    kn: 'ನಿಮ್ಮ ಆರೋಗ್ಯ ಮತ್ತು ಮುಟ್ಟಿನ ಅವಲೋಕನ',
  },
  'dashboard.actualDataOnlyNotice': {
    en: 'Based strictly on your recorded dates and analyses',
    hi: 'केवल आपके वास्तविक दर्ज डेटा पर आधारित',
    kn: 'ಕೇವಲ ನಿಮ್ಮ ನೈಜ ದಾಖಲೆಗಳ ಆಧಾರದ ಮೇಲೆ',
  },
  'dashboard.emptyPeriodsPrompt': {
    en: 'Add your first period to track cycle lengths and duration.',
    hi: 'पीरियड जोड़कर चक्र ट्रैक करना शुरू करें।',
    kn: 'ಚಕ್ರ ಮತ್ತು ಅವಧಿಯನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡಲು ನಿಮ್ಮ ಮೊದಲ ಮುಟ್ಟನ್ನು ದಾಖಲಿಸಿ.',
  },
  'dashboard.durationCalculatedNotice': {
    en: 'Recorded period length will display here.',
    hi: 'दर्ज पीरियड की अवधि यहाँ दिखेगी।',
    kn: 'ದಾಖಲಿಸಿದ ಮುಟ್ಟಿನ ಅವಧಿ ಇಲ್ಲಿ ಕಾಣಿಸುತ್ತದೆ.',
  },
};

