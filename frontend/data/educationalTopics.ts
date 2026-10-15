import { EducationalArticle } from '../types/health';

export const EDUCATIONAL_ARTICLES: EducationalArticle[] = [
  {
    id: 'menstrual-health',
    title: 'Menstrual Health Fundamentals',
    subtitle: 'Understanding the normal menstrual cycle and bodily phases',
    category: 'Menstrual Health',
    readingTime: '4 min read',
    summary: 'A comprehensive, clear guide to the four cycle phases, what constitutes a typical cycle, and healthy variations.',
    plainLanguageIntro: 'The menstrual cycle is more than just having a period; it is a monthly sequence of hormonal events coordinated by your brain and ovaries. A typical cycle lasts anywhere from 21 to 35 days, with menstruation usually lasting between 3 and 7 days.',
    commonSymptoms: [
      'Mild pre-menstrual lower abdominal sensation',
      'Gentle breast tenderness 1-2 days before bleeding',
      'Subtle shifts in energy and mood around ovulation',
      'Changes in cervical fluid consistency across cycle phases'
    ],
    educationalOverview: [
      'Follicular Phase: Under the influence of follicle-stimulating hormone (FSH), follicles develop in the ovary, and estrogen rises to rebuild the uterine lining.',
      'Ovulatory Phase: A brief surge in luteinizing hormone (LH) triggers the release of an egg, usually midway through the cycle.',
      'Luteal Phase: The ruptured follicle becomes the corpus luteum, secreting progesterone which stabilizes the endometrium.',
      'Menstruation: If fertilization does not occur, progesterone and estrogen levels decline, prompting the shedding of the endometrial lining.'
    ],
    whenToConsultDoctor: [
      'Cycles consistently shorter than 21 days or longer than 35 days',
      'Bleeding that requires changing a pad or tampon every hour for several consecutive hours',
      'Bleeding or spotting occurring between periods or after sexual intercourse',
      'Periods that completely stop for more than 90 days (amenorrhea)'
    ],
    urgentRedFlags: [
      'Sudden, severe, disabling pelvic or abdominal pain',
      'Dizziness, fainting, or severe weakness accompanying heavy vaginal bleeding',
      'Fever with chills and foul-smelling vaginal discharge'
    ],
    lifestyleAndCare: [
      'Track bleeding start dates, flow intensity, and energy levels in a personal journal',
      'Maintain balanced iron intake through leafy greens, legumes, and protein-rich foods',
      'Gentle movement and hydration support pelvic circulation during menstruation'
    ],
    verifiedSources: [
      {
        title: 'Menstruation and the Menstrual Cycle',
        organization: 'ACOG (American College of Obstetricians and Gynecologists)',
        url: 'https://www.acog.org/womens-health/faqs/menstruation-in-girls-and-women',
        summary: 'Clinical practice guidance explaining normal parameters and healthy variations in cycles.'
      },
      {
        title: 'Periods and What is Normal',
        organization: 'NHS (National Health Service, UK)',
        url: 'https://www.nhs.uk/conditions/periods/',
        summary: 'Public healthcare overview of regular cycle characteristics, hygiene, and when to seek medical advice.'
      }
    ],
    disclaimer: 'This educational guide provides general anatomical information and does not constitute medical advice or diagnosis. Always discuss individual cycle concerns with a qualified healthcare provider.'
  },
  {
    id: 'period-irregularities',
    title: 'Period Irregularities Explained',
    subtitle: 'Why cycles shift, what causes delayed periods, and when to check',
    category: 'Cycle Changes',
    readingTime: '5 min read',
    summary: 'Explore why cycles can become unpredictable, from temporary lifestyle triggers to endocrine conditions.',
    plainLanguageIntro: 'Occasional cycle variations of a few days are very common and often resolve on their own. However, persistent irregularities—such as missed periods, frequent spotting, or cycles that vary widely in length—warrant discussion with a doctor.',
    commonSymptoms: [
      'Cycle lengths that fluctuate by more than 7-9 days between months',
      'Skipping one or more consecutive menstrual cycles',
      'Unexpected mid-cycle spotting or prolonged light bleeding',
      'Heavy periods followed by unusually sparse or absent bleeding'
    ],
    educationalOverview: [
      'Stress and Cortisol: High physiological or emotional stress impacts the hypothalamic-pituitary-ovarian (HPO) axis, delaying or suppressing ovulation.',
      'Thyroid Function: Both underactive (hypothyroidism) and overactive (hyperthyroidism) thyroid glands directly regulate menstrual regularity.',
      'Nutritional and Weight Changes: Rapid weight loss, low energy availability, or intense athletic training can pause ovulation.',
      'Hormonal Imbalance: Conditions such as polycystic ovary syndrome (PCOS) or hyperprolactinemia are common causes of anovulatory cycles.'
    ],
    whenToConsultDoctor: [
      'You have not had a period for 3 consecutive cycles (and pregnancy is ruled out)',
      'Periods occur more frequently than every 21 days or less often than every 35 days',
      'Bleeding lasts longer than 7 days continuously',
      'You experience sudden irregular cycles after years of predictable timing'
    ],
    urgentRedFlags: [
      'Heavy bleeding soaking through two or more pads per hour for over 2 hours',
      'Severe unilateral (one-sided) pelvic pain with a positive pregnancy test (urgent ectopic risk)'
    ],
    lifestyleAndCare: [
      'Log dates and cycle days carefully for 3 months to share with your clinician',
      'Prioritize restorative sleep and balanced meals to support hypothalamic signaling',
      'Avoid unprescribed hormonal supplements or crash diets without clinical evaluation'
    ],
    verifiedSources: [
      {
        title: 'Abnormal Uterine Bleeding',
        organization: 'ACOG',
        url: 'https://www.acog.org/womens-health/faqs/abnormal-uterine-bleeding',
        summary: 'Clinical overview of PALM-COEIN classification for abnormal uterine bleeding patterns.'
      },
      {
        title: 'Irregular Periods',
        organization: 'NHS UK',
        url: 'https://www.nhs.uk/conditions/irregular-periods/',
        summary: 'Comprehensive healthcare portal on causes of irregular menstrual timing.'
      }
    ],
    disclaimer: 'This information is intended solely for educational purposes and should not be used as a substitute for professional clinical evaluation.'
  },
  {
    id: 'menstrual-cramps',
    title: 'Menstrual Cramps (Dysmenorrhea)',
    subtitle: 'Distinguishing typical period pain from secondary dysmenorrhea',
    category: 'Pain & Comfort',
    readingTime: '4 min read',
    summary: 'Learn what causes uterine cramping, non-pharmacological comfort techniques, and warning signs of deeper causes.',
    plainLanguageIntro: 'Menstrual cramps (dysmenorrhea) are caused by prostaglandins—hormone-like compounds that cause the uterine muscles to contract to expel its lining. While mild cramping is common, pain that interferes with work, school, or daily life is not something you have to silently endure.',
    commonSymptoms: [
      'Aching, cramping pain in the lower abdomen starting 1-2 days before or with bleeding',
      'Pain radiating to the lower back and upper thighs',
      'Occasional nausea, mild diarrhea, or fatigue during the first 24-48 hours',
      'Relief within 48 to 72 hours as flow progresses'
    ],
    educationalOverview: [
      'Primary Dysmenorrhea: Cramping linked directly to normal prostaglandin release in the absence of underlying pelvic pathology.',
      'Secondary Dysmenorrhea: Pain resulting from an underlying medical condition, such as endometriosis, adenomyosis, or uterine fibroids.',
      'Prostaglandin Dynamics: Higher prostaglandin levels induce stronger contractions and temporary local blood vessel constriction.',
      'Pain Thresholds: Chronic pain should never be dismissed; medical treatments including targeted anti-inflammatories or hormonal therapies exist.'
    ],
    whenToConsultDoctor: [
      'Pain that is not alleviated by standard over-the-counter anti-inflammatories (NSAIDs)',
      'Cramps that keep you bedridden, miss school, or prevent normal activities',
      'Pain that begins several days before your period and persists after bleeding ends',
      'Pain accompanied by heavy clotting or pain during intercourse or bowel movements'
    ],
    urgentRedFlags: [
      'Sudden onset of agonizing, stabbing pelvic pain that does not improve',
      'High fever accompanied by pelvic tenderness or chills'
    ],
    lifestyleAndCare: [
      'Apply continuous warm heat therapy (heating pad or warm compress at 40°C) to lower abdomen',
      'Stay hydrated and consider magnesium-rich foods to support smooth muscle relaxation',
      'Gentle pelvic tilts and restorative yoga postures help reduce muscle tension'
    ],
    verifiedSources: [
      {
        title: 'Dysmenorrhea: Painful Periods',
        organization: 'ACOG',
        url: 'https://www.acog.org/womens-health/faqs/dysmenorrhea-painful-periods',
        summary: 'Guidelines on clinical evaluation and symptom relief for primary and secondary dysmenorrhea.'
      },
      {
        title: 'Period Pain (Dysmenorrhea)',
        organization: 'Mayo Clinic',
        url: 'https://www.mayoclinic.org/diseases-conditions/period-pain/symptoms-causes/syc-20354707',
        summary: 'In-depth medical library overview of causes, home therapies, and clinical treatments.'
      }
    ],
    disclaimer: 'This educational article does not replace medical advice. Severe or escalating menstrual pain warrants clinical assessment.'
  },
  {
    id: 'pcos-hormonal-health',
    title: 'PCOS & Hormonal Health',
    subtitle: 'Understanding polycystic ovary syndrome, metabolism, and symptoms',
    category: 'Hormonal Health',
    readingTime: '6 min read',
    summary: 'A clear guide to Rotterdam diagnostic criteria, insulin resistance, androgen signs, and holistic management.',
    plainLanguageIntro: 'Polycystic Ovary Syndrome (PCOS) is one of the most common endocrine conditions affecting women of reproductive age. Despite its name, having PCOS does not mean having ovarian cysts; it represents a metabolic and hormonal spectrum involving androgens, insulin, and ovulation.',
    commonSymptoms: [
      'Infrequent, irregular, or missed menstrual cycles',
      'Excess hair growth on the chin, chest, or abdomen (hirsutism)',
      'Persistent hormonal cystic acne along the jawline',
      'Thinning hair on the crown of the scalp (androgenic alopecia)',
      'Difficulty managing weight despite consistent eating habits'
    ],
    educationalOverview: [
      'Diagnostic Criteria (Rotterdam Consensus): Typically diagnosed when at least 2 of 3 features are present: irregular ovulation, signs of excess androgens, and polycystic ovarian morphology on ultrasound.',
      'Insulin Resistance: Up to 70% of women with PCOS have higher circulating insulin levels, which stimulate the ovaries to produce more androgens.',
      'Long-term Health Considerations: Managing PCOS is important for overall cardiovascular health, metabolic balance, and endometrial protection.',
      'Personalized Management: Approaches vary widely depending on personal goals—ranging from cycle regulation, fertility support, to skin care.'
    ],
    whenToConsultDoctor: [
      'Fewer than 8 menstrual cycles in a calendar year',
      'Noticeable new facial hair growth or sudden severe cystic acne',
      'Unexplained difficulty conceiving after 6 to 12 months of timed intercourse',
      'Extreme fatigue and sugar cravings accompanied by irregular cycles'
    ],
    urgentRedFlags: [
      'Sudden excruciating abdominal pain that could signal ovarian torsion (rare but requiring immediate care)',
      'Extremely prolonged, heavy uterine bleeding with dizziness'
    ],
    lifestyleAndCare: [
      'Focus on steady-glucose nutrition pairing fiber, healthy fats, and protein with carbohydrates',
      'Incorporate strength training and regular walking to improve peripheral insulin sensitivity',
      'Consult an endocrinologist or gynecologist for tailored blood panels (FSH, LH, total/free testosterone, fasting insulin, HbA1c)'
    ],
    verifiedSources: [
      {
        title: 'Polycystic Ovary Syndrome (PCOS)',
        organization: 'World Health Organization (WHO)',
        url: 'https://www.who.int/news-room/fact-sheets/detail/polycystic-ovary-syndrome',
        summary: 'Global public health fact sheet on prevalence, pathophysiology, and management of PCOS.'
      },
      {
        title: 'PCOS Symptoms and Treatment',
        organization: 'Office on Women’s Health (OASH / US HHS)',
        url: 'https://www.womenshealth.gov/a-z-topics/polycystic-ovary-syndrome',
        summary: 'Comprehensive public resource covering health risks, diagnosis, and coping strategies.'
      }
    ],
    disclaimer: 'PCOS requires formal laboratory and ultrasound assessment by a licensed physician. This overview is educational only.'
  },
  {
    id: 'endometriosis-awareness',
    title: 'Endometriosis Awareness',
    subtitle: 'Recognizing chronic pelvic pain and understanding inflammatory tissue',
    category: 'Chronic Conditions',
    readingTime: '5 min read',
    summary: 'Understanding how tissue similar to the uterine lining grows outside the uterus, causing pain and inflammation.',
    plainLanguageIntro: 'Endometriosis occurs when tissue similar to the lining of the uterus (endometrium) grows outside the uterus—most commonly on the ovaries, fallopian tubes, and the outer surfaces of pelvic organs. It affects roughly 1 in 10 women globally and is often underdiagnosed.',
    commonSymptoms: [
      'Chronic pelvic pain that worsens leading up to and during periods',
      'Pain during or after sexual intercourse (dyspareunia)',
      'Painful bowel movements or urinary urgency during menstruation',
      'Fatigue, bloating (sometimes called "endo belly"), and nausea'
    ],
    educationalOverview: [
      'Inflammatory Cascade: Like the endometrium, this tissue thickens, breaks down, and bleeds with each cycle. However, with no exit path, trapped blood causes local inflammation, swelling, and scarring (adhesions).',
      'Diagnostic Journey: Because symptoms can mimic irritable bowel syndrome or normal period pain, diagnosis often takes several years.',
      'Symptom Variability: The extent of pain does not always correlate with the anatomical stage of the condition; small implants can cause significant nerve irritation.',
      'Care Pathways: Multidisciplinary care including specialized gynecology, pelvic floor physical therapy, and anti-inflammatory strategies provide meaningful relief.'
    ],
    whenToConsultDoctor: [
      'Pelvic pain that requires recurring missed days from work or school',
      'Severe pain during deep intercourse or bowel movements during menstruation',
      'Pain that remains unresolved despite several months of standard pain relievers'
    ],
    urgentRedFlags: [
      'Acute, unbearable abdominal guarding, rigidity, and vomiting (possible cyst rupture or torsion)'
    ],
    lifestyleAndCare: [
      'Maintain a detailed pain diary logging cycle day, pain location, pain intensity (1-10), and triggers',
      'Consult a pelvic health physical therapist to evaluate pelvic floor muscular tension',
      'Anti-inflammatory dietary patterns rich in omega-3 fatty acids and antioxidants may help support comfort'
    ],
    verifiedSources: [
      {
        title: 'Endometriosis Fact Sheet',
        organization: 'World Health Organization (WHO)',
        url: 'https://www.who.int/news-room/fact-sheets/detail/endometriosis',
        summary: 'Global epidemiological facts, symptom presentation, and call for timely clinical diagnosis.'
      },
      {
        title: 'Endometriosis Clinical Overview',
        organization: 'ACOG',
        url: 'https://www.acog.org/womens-health/faqs/endometriosis',
        summary: 'Clinical practice guidance on surgical evaluation, hormonal suppression, and fertility preservation.'
      }
    ],
    disclaimer: 'This information does not provide a medical diagnosis. If you suspect endometriosis, seek evaluation with a healthcare provider.'
  },
  {
    id: 'fertility-awareness',
    title: 'Fertility & Ovulation Basics',
    subtitle: 'Understanding the fertile window, basal temperature, and biomarkers',
    category: 'Fertility',
    readingTime: '5 min read',
    summary: 'A factual look at how ovulation works, identifying fertile days, and biological markers.',
    plainLanguageIntro: 'Fertility awareness involves observing and tracking physiological biomarkers throughout your menstrual cycle to understand when ovulation is likely to occur. Whether your goal is family planning, conception, or simply understanding your body, learning your biomarkers is empowering.',
    commonSymptoms: [
      'Slight increase in clear, stretchy cervical fluid (similar to raw egg whites)',
      'Subtle one-sided pelvic twinge around mid-cycle (known as mittelschmerz)',
      'Slight sustained rise in resting basal body temperature following ovulation',
      'Heightened sense of smell or increased libido during peak fertile window'
    ],
    educationalOverview: [
      'The Fertile Window: While an unfertilized egg survives for approximately 12 to 24 hours after release, sperm can survive in fertile cervical mucus for up to 5 days.',
      'Basal Body Temperature (BBT): Progesterone produced after ovulation causes a subtle sustained temperature increase (approximately 0.3°C to 0.5°C).',
      'Luteinizing Hormone (LH) Surge: At-home ovulation predictor kits detect the LH surge that typically precedes ovulation by 24 to 36 hours.',
      'Cycle Variability: Ovulation timing can shift from month to month due to illness, travel, or stress, even in regular cycles.'
    ],
    whenToConsultDoctor: [
      'Trying to conceive for 12 months (or 6 months if aged 35 or older) without success',
      'Irregular or absent cycles that make identifying ovulation difficult',
      'History of pelvic inflammatory disease, endometriosis, or prior pelvic surgery'
    ],
    urgentRedFlags: [
      'Severe pelvic pain accompanied by fever or abnormal discharge'
    ],
    lifestyleAndCare: [
      'Record resting temperature immediately upon waking before getting out of bed',
      'Observe cervical fluid qualities throughout the month in a consistent manner',
      'Both partners should consider early pre-conception health evaluations with a primary clinician'
    ],
    verifiedSources: [
      {
        title: 'Evaluating Infertility',
        organization: 'ACOG',
        url: 'https://www.acog.org/womens-health/faqs/evaluating-infertility',
        summary: 'Clinical guidelines on reproductive timelines and when specialist assessment is indicated.'
      },
      {
        title: 'Fertility Awareness-Based Methods',
        organization: 'CDC (Centers for Disease Control and Prevention)',
        url: 'https://www.cdc.gov/reproductivehealth/contraception/index.htm',
        summary: 'Educational materials on tracking methods, efficacy, and biological indicators.'
      }
    ],
    disclaimer: 'Fertility tracking methods require disciplined observation and education. Consult a qualified reproductive specialist for personalized care.'
  },
  {
    id: 'pregnancy-information',
    title: 'Early Pregnancy & Maternal Wellness',
    subtitle: 'Early signs, safety indicators, prenatal care, and healthy expectations',
    category: 'Maternal Care',
    readingTime: '5 min read',
    summary: 'A supportive overview of early pregnancy indicators, prenatal nutrition, and vital safety milestones.',
    plainLanguageIntro: 'Early pregnancy brings rapid hormonal shifts as your body adapts to support embryonic development. Understanding what symptoms are typical, which require discussion, and which need immediate medical review helps you navigate this phase with confidence.',
    commonSymptoms: [
      'Missed menstrual period with a positive urine human chorionic gonadotropin (hCG) test',
      'Nausea with or without vomiting (often called morning sickness, though it can occur any time)',
      'Pronounced breast tenderness and darkening of the areola',
      'Increased urinary frequency and noticeable daytime fatigue'
    ],
    educationalOverview: [
      'Hormonal Drivers: Human chorionic gonadotropin (hCG), progesterone, and estrogen rise dramatically in the first trimester, causing vasodilation and metabolic shifts.',
      'Prenatal Nutrition: Supplementing with folic acid (400 mcg daily) before and during early pregnancy significantly reduces neural tube defects.',
      'Timing First Prenatal Visit: Most obstetricians and midwives schedule the initial comprehensive prenatal intake between 8 and 10 weeks of gestation.',
      'Implantation Bleeding: Some women notice light pink or brownish spotting around the time a period was due, which is usually much lighter than a normal period.'
    ],
    whenToConsultDoctor: [
      'Severe persistent vomiting preventing fluid retention for over 24 hours (hyperemesis gravidarum)',
      'Pain or burning sensation during urination',
      'Vaginal bleeding of any amount during confirmed pregnancy'
    ],
    urgentRedFlags: [
      'Sharp, one-sided lower abdominal or shoulder-tip pain accompanied by dizziness or bleeding (immediate medical emergency for possible ectopic pregnancy)',
      'Heavy bright red bleeding with clots or severe uterine cramping'
    ],
    lifestyleAndCare: [
      'Begin taking a certified prenatal vitamin with folic acid and iron promptly',
      'Stay hydrated with small, frequent sips of water, ginger tea, or electrolyte fluids',
      'Avoid unpasteurized foods, raw seafood, alcohol, tobacco, and non-prescribed medications'
    ],
    verifiedSources: [
      {
        title: 'Routine Tests in Pregnancy',
        organization: 'ACOG',
        url: 'https://www.acog.org/womens-health/faqs/routine-tests-during-pregnancy',
        summary: 'Clinical timetable for ultrasound, blood screens, and first trimester care.'
      },
      {
        title: 'Signs and Symptoms of Pregnancy',
        organization: 'NHS UK',
        url: 'https://www.nhs.uk/pregnancy/trying-to-get-pregnant/signs-and-symptoms-of-pregnancy/',
        summary: 'Patient healthcare guidance on testing timelines and early care.'
      }
    ],
    disclaimer: 'Any potential pregnancy symptoms must be confirmed with clinical tests. Early prenatal guidance with an obstetric clinician is strongly recommended.'
  },
  {
    id: 'menopause-transition',
    title: 'Perimenopause & Menopause',
    subtitle: 'Navigating hormonal changes, vasomotor symptoms, and long-term vitality',
    category: 'Life Transitions',
    readingTime: '5 min read',
    summary: 'Understanding the biological transition into menopause, hot flashes, sleep changes, and modern care options.',
    plainLanguageIntro: 'Menopause marks a natural biological transition, defined clinically as 12 consecutive months without a menstrual period. Perimenopause is the transitional phase leading up to menopause—often lasting several years—as ovarian estrogen production fluctuates before permanently tapering.',
    commonSymptoms: [
      'Hot flashes and night sweats (vasomotor symptoms)',
      'Cycle length irregularities (skipping cycles or having unpredictable flow)',
      'Sleep disturbances, insomnia, and mood fluctuations',
      'Vaginal dryness, discomfort during intimacy, or urinary urgency'
    ],
    educationalOverview: [
      'Ovarian Transition: As the follicle pool diminishes, cycles become increasingly anovulatory, creating erratic estrogen spikes and drops.',
      'Vasomotor Mechanisms: Declining estrogen narrows the brain’s thermoregulatory set-point in the hypothalamus, triggering sudden heat dissipation (flushes).',
      'Bone and Heart Health: Estrogen has protective effects on bone mineral density and arterial elasticity, making bone health discussions pivotal.',
      'Treatment Landscape: Options include non-hormonal lifestyle interventions, evidence-based cognitive behavioral therapy, and Menopausal Hormone Therapy (MHT).'
    ],
    whenToConsultDoctor: [
      'Any vaginal bleeding or spotting that occurs AFTER you have been postmenopausal for 12 months (essential to investigate)',
      'Vasomotor symptoms that severely disrupt your sleep, mental clarity, or daily functioning',
      'Intense mood changes or anxiety that impact your quality of life'
    ],
    urgentRedFlags: [
      'Sudden heavy uterine hemorrhaging post-menopause',
      'Unexplained severe chest pressure or shortness of breath (cardiovascular symptoms)'
    ],
    lifestyleAndCare: [
      'Engage in regular weight-bearing exercise (resistance training, walking) to preserve bone mineral density',
      'Dress in breathable layers and keep sleeping spaces cool with moisture-wicking fabrics',
      'Ensure adequate daily dietary calcium (1200 mg) and vitamin D intake under clinician guidance'
    ],
    verifiedSources: [
      {
        title: 'The Menopause Transition',
        organization: 'The Menopause Society (formerly NAMS)',
        url: 'https://www.menopause.org/for-women/expert-answers-to-frequently-asked-questions-about-menopause',
        summary: 'Evidence-based clinical guidelines on symptom management, hormone therapy safety, and cardiovascular health.'
      },
      {
        title: 'Menopause Overview',
        organization: 'National Institute on Aging (NIH)',
        url: 'https://www.nia.nih.gov/health/menopause',
        summary: 'Public health overview of perimenopause timelines, physical changes, and treatments.'
      }
    ],
    disclaimer: 'This educational summary does not replace individualized gynecological consultation. Post-menopausal bleeding must always be evaluated by a physician.'
  }
];

export interface LocalizedArticleMeta {
  title: string;
  subtitle: string;
  category: string;
  summary: string;
  plainLanguageIntro: string;
}

export const ARTICLE_LOCALIZATIONS: Record<string, Record<'hi' | 'kn', LocalizedArticleMeta>> = {
  'menstrual-health': {
    hi: {
      title: 'मासिक धर्म स्वास्थ्य की बुनियादी बातें',
      subtitle: 'सामान्य मासिक धर्म चक्र और शारीरिक चरणों को समझें',
      category: 'मासिक धर्म स्वास्थ्य',
      summary: 'मासिक चक्र के चार चरणों, सामान्य लक्षणों और स्वस्थ शारीरिक परिवर्तनों पर एक स्पष्ट, संपूर्ण गाइड।',
      plainLanguageIntro: 'मासिक धर्म चक्र केवल ब्लीडिंग तक सीमित नहीं है; यह मस्तिष्क और अंडाशय द्वारा संचालित मासिक हार्मोनल घटनाओं का एक क्रम है। सामान्य चक्र 21 से 35 दिनों का होता है।',
    },
    kn: {
      title: 'ಮುಟ್ಟಿನ ಆರೋಗ್ಯದ ಮೂಲಭೂತ ಅಂಶಗಳು',
      subtitle: 'ಸಾಮಾನ್ಯ ಮುಟ್ಟಿನ ಚಕ್ರ ಮತ್ತು ಹಂತಗಳನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಿ',
      category: 'ಮುಟ್ಟಿನ ಆರೋಗ್ಯ',
      summary: 'ಮುಟ್ಟಿನ ಚಕ್ರದ ನಾಲ್ಕು ಹಂತಗಳು ಮತ್ತು ಆರೋಗ್ಯಕರ ಶಾರೀರಿಕ ಬದಲಾವಣೆಗಳ ಕುರಿತು ಸಮಗ್ರ ಮಾರ್ಗದರ್ಶಿ.',
      plainLanguageIntro: 'ಮುಟ್ಟಿನ ಚಕ್ರವು ಕೇವಲ ರಕ್ತಸ್ರಾವವಲ್ಲ; ಇದು ಮೆದುಳು ಮತ್ತು ಅಂಡಾಶಯಗಳ ಹಾರ್ಮೋನ್ ಪ್ರಕ್ರಿಯೆ. ಸಾಮಾನ್ಯ ಚಕ್ರವು ೨೧ ರಿಂದ ೩೫ ದಿನಗಳವರೆಗೆ ಇರುತ್ತದೆ.',
    },
  },
  'period-irregularities': {
    hi: {
      title: 'अनियमित मासिक धर्म के कारण और समाधान',
      subtitle: 'मासिक चक्र में बदलाव क्यों होते हैं और कब जांच करवानी चाहिए',
      category: 'मासिक चक्र में बदलाव',
      summary: 'छूटे हुए पीरियड्स, अनियमित अंतराल, तनाव के प्रभाव और हार्मोनल असंतुलन की पूरी जानकारी।',
      plainLanguageIntro: 'यदि आपका चक्र अप्रत्याशित रूप से बदलता है, तो यह तनाव, वजन में उतार-चढ़ाव, थायरॉइड या पीसीओएस के कारण हो सकता है।',
    },
    kn: {
      title: 'ಅನಿಯಮಿತ ಮುಟ್ಟಿನ ಕಾರಣಗಳು ಮತ್ತು ವಿವರಣೆ',
      subtitle: 'ಮುಟ್ಟಿನ ದಿನಾಂಕಗಳು ಏಕೆ ಬದಲಾಗುತ್ತವೆ ಮತ್ತು ಯಾವಾಗ ತಪಾಸಣೆ ಮಾಡಿಸಬೇಕು',
      category: 'ಮುಟ್ಟಿನ ಬದಲಾವಣೆಗಳು',
      summary: 'ತಡವಾದ ಮುಟ್ಟು, ಅಂತರದ ವ್ಯತ್ಯಾಸಗಳು, ಒತ್ತಡ ಮತ್ತು ಹಾರ್ಮೋನ್ ಏರುಪೇರುಗಳ ಕುರಿತು ಮಾಹಿತಿ.',
      plainLanguageIntro: 'ನಿಮ್ಮ ಮುಟ್ಟಿನ ಚಕ್ರ ಅನಿರೀಕ್ಷಿತವಾಗಿ ಬದಲಾಗುತ್ತಿದ್ದರೆ, ಅದು ಒತ್ತಡ, ತೂಕದ ಬದಲಾವಣೆ ಅಥವಾ ಹಾರ್ಮೋನ್ ಏರುಪೇರಿನಿಂದ ಇರಬಹುದು.',
    },
  },
  'menstrual-cramps': {
    hi: {
      title: 'मासिक धर्म की ऐंठन (डिसमेनोरिया) को समझें',
      subtitle: 'सामान्य दर्द और एंडोमेट्रियोसिस के बीच का अंतर जानें',
      category: 'दर्द प्रबंधन',
      summary: 'प्रोस्टाग्लैंडीन की भूमिका, घरेलू प्राथमिक उपचार और डॉक्टर को कब दिखाना चाहिए।',
      plainLanguageIntro: 'मासिक धर्म के दौरान गर्भाशय संकुचित होता है। लेकिन यदि दर्द आपको बिस्तर पर रहने को मजबूर कर दे, तो जांच आवश्यक है।',
    },
    kn: {
      title: 'ಮುಟ್ಟಿನ ಹೊಟ್ಟೆ ನೋವು (ಡಿಸ್ಮೆನೊರಿಯಾ) ವಿವರ',
      subtitle: 'ಸಾಮಾನ್ಯ ನೋವು ಮತ್ತು ತೀವ್ರ ನೋವಿನ ನಡುವಿನ ವ್ಯತ್ಯಾಸ ತಿಳಿಯಿರಿ',
      category: 'ನೋವು ನಿರ್ವಹಣೆ',
      summary: 'ಹೊಟ್ಟೆ ನೋವಿನ ಕಾರಣಗಳು, ಮನೆಮದ್ದುಗಳು ಮತ್ತು ವೈದ್ಯರನ್ನು ಕಾಣಬೇಕಾದ ಸಮಯ.',
      plainLanguageIntro: 'ಮುಟ್ಟಿನ ಸಮಯದಲ್ಲಿ ಗರ್ಭಾಶಯದ ಸಂಕೋಚನದಿಂದ ನೋವು ಬರುತ್ತದೆ. ಆದರೆ ಅತಿಯಾದ ನೋವು ಇದ್ದರೆ ವೈದ್ಯರ ತಪಾಸಣೆ ಮುಖ್ಯ.',
    },
  },
  'pcos': {
    hi: {
      title: 'पॉलीसिस्टिक ओवरी सिंड्रोम (PCOS) की संपूर्ण जानकारी',
      subtitle: 'लक्षण, हार्मोनल संतुलन, खानपान और जीवनशैली प्रबंधन',
      category: 'हार्मोनल स्वास्थ्य',
      summary: 'अनियमित चक्र, मुंहासे, इंसुलिन संवेदनशीलता और पीसीओएस के वैज्ञानिक प्रबंधन पर विस्तृत गाइड।',
      plainLanguageIntro: 'पीसीओएस प्रजनन आयु की 8-13% महिलाओं को प्रभावित करता है। जीवनशैली और सही मार्गदर्शन से इसे प्रबंधित किया जा सकता है।',
    },
    kn: {
      title: 'ಪಾಲಿಸಿಸ್ಟಿಕ್ ಓವರಿ ಸಿಂಡ್ರೋಮ್ (PCOS) ಮಾಹಿತಿ',
      subtitle: 'ಲಕ್ಷಣಗಳು, ಹಾರ್ಮೋನ್ ಸಮತೋಲನ ಮತ್ತು ಜೀವನಶೈಲಿ ನಿರ್ವಹಣೆ',
      category: 'ಹಾರ್ಮೋನ್ ಆರೋಗ್ಯ',
      summary: 'ಅನಿಯಮಿತ ಮುಟ್ಟು, ಮೊಡವೆ, ತೂಕ ಹೆಚ್ಚಳ ಮತ್ತು ಪಿಸಿಒಎಸ್ ನಿರ್ವಹಣೆಯ ವಿವರಗಳು.',
      plainLanguageIntro: 'ಪಿಸಿಒಎಸ್ ಮಹಿಳೆಯರಲ್ಲಿ ಸಾಮಾನ್ಯವಾಗಿ ಕಂಡುಬರುವ ಹಾರ್ಮೋನ್ ಸಮಸ್ಯೆಯಾಗಿದೆ. ಉತ್ತಮ ಜೀವನಶೈಲಿಯಿಂದ ಇದನ್ನು ನಿಯಂತ್ರಿಸಬಹುದು.',
    },
  },
  'endometriosis': {
    hi: {
      title: 'एंडोमेट्रियोसिस: लक्षण और जागरूकता',
      subtitle: 'गंभीर पेल्विक दर्द, प्रारंभिक जांच और उपचार के विकल्प',
      category: 'दीर्घकालिक पेल्विक स्वास्थ्य',
      summary: 'जब गर्भाशय के अस्तर जैसे ऊतक बाहर बढ़ते हैं, तो दर्द होता है। शुरुआती पहचान और विशेषज्ञ सलाह आवश्यक है।',
      plainLanguageIntro: 'एंडोमेट्रियोसिस में गंभीर दर्द, भारी रक्तस्राव और थकान हो सकती है। इसे नजरअंदाज न करें।',
    },
    kn: {
      title: 'ಎಂಡೊಮೆಟ್ರಿಯೊಸಿಸ್ ಅರಿವು ಮತ್ತು ವಿವರಣೆ',
      subtitle: 'ತೀವ್ರ ಸೊಂಟ ನೋವು ಮತ್ತು ಆರಂಭಿಕ ತಪಾಸಣೆಯ ಮಾರ್ಗಗಳು',
      category: 'ದೀರ್ಘಕಾಲದ ಆರೋಗ್ಯ',
      summary: 'ಗರ್ಭಾಶಯದ ಹೊರಗೆ ಅಂಗಾಂಶಗಳು ಬೆಳೆದಾಗ ಉಂಟಾಗುವ ನೋವು ಮತ್ತು ಚಿಕಿತ್ಸೆಯ ಮಾಹಿತಿ.',
      plainLanguageIntro: 'ಎಂಡೊಮೆಟ್ರಿಯೊಸಿಸ್ ತೀವ್ರ ನೋವು ಉಂಟುಮಾಡಬಹುದು. ಆರಂಭಿಕ ಹಂತದಲ್ಲೇ ತಜ್ಞರ ಭೇಟಿ ಅಗತ್ಯ.',
    },
  },
  'fertility-awareness': {
    hi: {
      title: 'प्रजनन जागरूकता और ओव्यूलेशन',
      subtitle: 'अपने फर्टाइल विंडो, सर्वाइकल म्यूकस और शरीर के संकेतों को पहचानें',
      category: 'प्रजनन स्वास्थ्य',
      summary: 'ओव्यूलेशन के लक्षण, बेसल बॉडी टेम्परेचर और गर्भधारण की योजना बनाने के प्राकृतिक तरीके।',
      plainLanguageIntro: 'ओव्यूलेशन महीने का वह समय होता है जब अंडाशय से अंडा निकलता है। इसके संकेतों को समझना सशक्त बनाता है।',
    },
    kn: {
      title: 'ಫಲವತ್ತತೆಯ ಅರಿವು ಮತ್ತು ಅಂಡೋತ್ಪತ್ತಿ',
      subtitle: 'ಫಲವತ್ತಾದ ದಿನಗಳು ಮತ್ತು ಶಾರೀರಿಕ ಸಂಕೇತಗಳನ್ನು ಗುರುತಿಸಿ',
      category: 'ಫಲವತ್ತತೆ',
      summary: 'ಅಂಡೋತ್ಪತ್ತಿಯ ಲಕ್ಷಣಗಳು ಮತ್ತು ಗರ್ಭಧಾರಣೆಗೆ ಸಿದ್ಧತೆ ಕುರಿತ ವೈಜ್ಞಾನಿಕ ಮಾಹಿತಿ.',
      plainLanguageIntro: 'ಅಂಡೋತ್ಪತ್ತಿಯ ಸಮಯವನ್ನು ತಿಳಿಯುವುದು ಸಂತಾನೋತ್ಪತ್ತಿ ಆರೋಗ್ಯಕ್ಕೆ ತುಂಬಾ ಮುಖ್ಯವಾಗಿದೆ.',
    },
  },
  'pregnancy-early-signs': {
    hi: {
      title: 'गर्भावस्था के शुरुआती लक्षण और संकेत',
      subtitle: 'पीरियड मिस होने से लेकर शुरुआती शारीरिक बदलावों तक',
      category: 'मातृत्व और प्रजनन',
      summary: 'थकान, मतली, इम्प्लांटेशन स्पॉटिंग और होम प्रेग्नेंसी टेस्ट कब और कैसे करें।',
      plainLanguageIntro: 'गर्भावस्था के पहले कुछ हफ्तों में शरीर में प्रोजेस्टेरोन और एचसीजी हार्मोन तेजी से बढ़ते हैं।',
    },
    kn: {
      title: 'ಗರ್ಭಧಾರಣೆಯ ಆರಂಭಿಕ ಲಕ್ಷಣಗಳು',
      subtitle: 'ಮುಟ್ಟು ತಪ್ಪಿದ ದಿನಗಳಿಂದ ಹಿಡಿದು ಆರಂಭಿಕ ಬದಲಾವಣೆಗಳವರೆಗೆ',
      category: 'ಗರ್ಭಧಾರಣೆ',
      summary: 'ಆಯಾಸ, ವಾಕರಿಕೆ ಮತ್ತು ಪ್ರೆಗ್ನೆನ್ಸಿ ಟೆಸ್ಟ್ ಮಾಡುವ ಸರಿಯಾದ ಸಮಯ.',
      plainLanguageIntro: 'ಗರ್ಭಧಾರಣೆಯ ಆರಂಭಿಕ ಹಂತಗಳಲ್ಲಿ ಹಾರ್ಮೋನುಗಳ ಬದಲಾವಣೆಯಿಂದ ದೇಹದಲ್ಲಿ ಹಲವು ಸಂಕೇತಗಳು ಕಾಣಿಸಿಕೊಳ್ಳುತ್ತವೆ.',
    },
  },
  'menopause-perimenopause': {
    hi: {
      title: 'पेरीमेनोपॉज़ और मेनोपॉज़ का सफर',
      subtitle: 'हॉट फ्लैश, मूड में बदलाव और जीवन के नए चरण में स्वास्थ्य देखभाल',
      category: 'जीवन के पड़ाव',
      summary: 'एस्ट्रोजन में गिरावट, हड्डियों का स्वास्थ्य, नींद की गुणवत्ता और चिकित्सा विकल्पों पर मार्गदर्शन।',
      plainLanguageIntro: 'मेनोपॉज़ जीवन का एक स्वाभाविक और गरिमापूर्ण पड़ाव है। सही पोषण और देखभाल से इसे सुखद बनाया जा सकता है।',
    },
    kn: {
      title: 'ಋತುಬಂಧ ಮತ್ತು ಪೆರಿಮೆನೋಪಾಸ್ ಮಾಹಿತಿ',
      subtitle: 'ಶಾರೀರಿಕ ಬದಲಾವಣೆಗಳು ಮತ್ತು ಜೀವನದ ಈ ಹಂತದಲ್ಲಿ ಆರೋಗ್ಯ ರಕ್ಷಣೆ',
      category: 'ಋತುಬಂಧ',
      summary: 'ಹಾರ್ಮೋನ್ ಇಳಿಕೆ, ಮೂಳೆಗಳ ಆರೋಗ್ಯ ಮತ್ತು ಈ ಹಂತದಲ್ಲಿ ತೆಗೆದುಕೊಳ್ಳಬೇಕಾದ ಮುನ್ನೆಚ್ಚರಿಕೆಗಳು.',
      plainLanguageIntro: 'ಋತುಬಂಧವು ಮಹಿಳೆಯರ ಜೀವನದ ಸಹಜ ಹಂತವಾಗಿದೆ. ಸರಿಯಾದ ಆರೈಕೆಯು ಯೋಗಕ್ಷೇಮವನ್ನು ಕಾಪಾಡುತ್ತದೆ.',
    },
  },
};

export function getLocalizedArticle(article: EducationalArticle, lang: string): EducationalArticle {
  if (lang === 'hi' || lang === 'kn') {
    const meta = ARTICLE_LOCALIZATIONS[article.id]?.[lang];
    if (meta) {
      return {
        ...article,
        title: meta.title,
        subtitle: meta.subtitle,
        category: meta.category,
        summary: meta.summary,
        plainLanguageIntro: meta.plainLanguageIntro,
      };
    }
  }
  return article;
}

