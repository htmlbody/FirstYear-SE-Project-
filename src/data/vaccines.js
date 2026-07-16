// Indian Universal Immunisation Programme (UIP) Vaccine Catalog
// For normal babies (0–5 years)

export const VACCINE_CATALOG = [
  {
    id: 'bcg',
    name: 'BCG',
    fullName: 'Bacillus Calmette-Guérin',
    dose: 1,
    doseLabel: 'Single Dose',
    recommendedAge: 'At Birth',
    recommendedDays: 0,
    disease: 'Tuberculosis (TB)',
    description: 'BCG vaccine protects against severe forms of tuberculosis, particularly TB meningitis and miliary TB in children. It is one of the most widely used vaccines worldwide.',
    importance: 'Tuberculosis remains one of the leading causes of death in India. BCG vaccination at birth provides crucial protection during the most vulnerable period of a child\'s life.',
    sideEffects: [
      'Small red bump at injection site',
      'Bump may become a small ulcer',
      'Leaves a small scar (normal)',
      'Mild fever in some cases'
    ],
    precautions: [
      'Do not apply any ointment on the injection site',
      'Do not cover the injection site with bandage',
      'The scar formation is normal and expected',
      'Consult doctor if swelling is larger than expected'
    ],
    governmentRecommendation: 'Recommended by the Government of India under UIP. Should be given at birth or as early as possible. Can be given up to 1 year of age if missed at birth.',
    route: 'Intradermal (left upper arm)',
    category: 'birth'
  },
  {
    id: 'opv-0',
    name: 'OPV-0',
    fullName: 'Oral Polio Vaccine (Birth Dose)',
    dose: 0,
    doseLabel: 'Birth Dose',
    recommendedAge: 'At Birth',
    recommendedDays: 0,
    disease: 'Poliomyelitis',
    description: 'OPV is an oral vaccine that protects against poliomyelitis, a highly infectious viral disease that can cause irreversible paralysis. The birth dose provides early mucosal immunity.',
    importance: 'India was declared polio-free in 2014, but continued vaccination is essential to prevent re-emergence. The birth dose provides early gut immunity against the poliovirus.',
    sideEffects: [
      'Generally very safe',
      'Rare mild diarrhea',
      'Very rare allergic reaction'
    ],
    precautions: [
      'Can be given even if the child has mild illness',
      'Breastfeeding can continue normally',
      'No need to delay feeding after administration',
      'Report any unusual symptoms to doctor'
    ],
    governmentRecommendation: 'Mandatory under UIP. Birth dose (OPV-0) should be given within 15 days of birth. India follows a combination of OPV and IPV strategy for polio eradication.',
    route: 'Oral (2 drops)',
    category: 'birth'
  },
  {
    id: 'hep-b-birth',
    name: 'Hepatitis B',
    fullName: 'Hepatitis B Vaccine (Birth Dose)',
    dose: 0,
    doseLabel: 'Birth Dose',
    recommendedAge: 'At Birth',
    recommendedDays: 0,
    disease: 'Hepatitis B',
    description: 'Hepatitis B birth dose prevents mother-to-child transmission of the Hepatitis B virus, which can cause chronic liver disease and liver cancer.',
    importance: 'Hepatitis B virus can be transmitted from an infected mother to her baby during birth. The birth dose within 24 hours is crucial to prevent chronic infection.',
    sideEffects: [
      'Mild pain at injection site',
      'Low-grade fever',
      'Mild fatigue',
      'Generally very well tolerated'
    ],
    precautions: [
      'Should be given within 24 hours of birth',
      'Safe for premature babies',
      'Can be given alongside other birth vaccines',
      'Store vaccine at recommended temperature'
    ],
    governmentRecommendation: 'Recommended by Government of India under UIP. Birth dose should be administered within 24 hours of birth, preferably as soon as possible.',
    route: 'Intramuscular (thigh)',
    category: 'birth'
  },
  {
    id: 'penta-1',
    name: 'Pentavalent-1',
    fullName: 'Pentavalent Vaccine (1st Dose)',
    dose: 1,
    doseLabel: '1st Dose',
    recommendedAge: '6 Weeks',
    recommendedDays: 42,
    disease: 'Diphtheria, Pertussis, Tetanus, Hepatitis B, Haemophilus Influenzae type B',
    description: 'Pentavalent vaccine is a combination vaccine that protects against five major diseases in a single shot. It combines DPT, Hepatitis B, and Hib vaccines.',
    importance: 'This single injection protects against five life-threatening diseases, reducing the number of injections needed and improving vaccination compliance.',
    sideEffects: [
      'Pain and swelling at injection site',
      'Fever (may last 1–2 days)',
      'Irritability and crying',
      'Loss of appetite temporarily'
    ],
    precautions: [
      'Paracetamol can be given for fever',
      'Cold compress for injection site swelling',
      'Monitor for high fever (above 102°F)',
      'Seek medical attention if fever persists beyond 48 hours'
    ],
    governmentRecommendation: 'Part of the routine immunization under UIP. Three doses at 6, 10, and 14 weeks of age. Minimum interval of 4 weeks between doses.',
    route: 'Intramuscular (outer thigh)',
    category: '6weeks'
  },
  {
    id: 'opv-1',
    name: 'OPV-1',
    fullName: 'Oral Polio Vaccine (1st Dose)',
    dose: 1,
    doseLabel: '1st Dose',
    recommendedAge: '6 Weeks',
    recommendedDays: 42,
    disease: 'Poliomyelitis',
    description: 'First primary dose of the oral polio vaccine, continuing the protection initiated by the birth dose against all three types of poliovirus.',
    importance: 'Sequential doses of OPV build stronger and longer-lasting immunity against poliovirus. Each dose significantly boosts protection.',
    sideEffects: [
      'Generally very safe',
      'Rare mild diarrhea',
      'Very rare allergic reaction'
    ],
    precautions: [
      'Can be given even with mild illness',
      'No need to restrict feeding',
      'Can be given alongside injectable vaccines',
      'Report persistent vomiting to doctor'
    ],
    governmentRecommendation: 'Mandatory under UIP at 6, 10, and 14 weeks. Additional doses during pulse polio campaigns as announced by the government.',
    route: 'Oral (2 drops)',
    category: '6weeks'
  },
  {
    id: 'rota-1',
    name: 'Rotavirus-1',
    fullName: 'Rotavirus Vaccine (1st Dose)',
    dose: 1,
    doseLabel: '1st Dose',
    recommendedAge: '6 Weeks',
    recommendedDays: 42,
    disease: 'Rotavirus Diarrhea',
    description: 'Rotavirus vaccine protects against severe diarrhea caused by rotavirus, which is the leading cause of severe diarrhea and dehydration in infants and young children.',
    importance: 'Rotavirus is the most common cause of severe diarrheal disease in children under 5 years in India. The vaccine significantly reduces hospitalizations and deaths from rotavirus diarrhea.',
    sideEffects: [
      'Mild irritability',
      'Mild diarrhea',
      'Mild fever',
      'Vomiting (rare)'
    ],
    precautions: [
      'Oral vaccine — do not inject',
      'Can be given with other vaccines',
      'Delay if child has severe diarrhea or vomiting',
      'Complete all doses for full protection'
    ],
    governmentRecommendation: 'Introduced in UIP in select states. Three doses at 6, 10, and 14 weeks of age.',
    route: 'Oral',
    category: '6weeks'
  },
  {
    id: 'ipv-1',
    name: 'fIPV-1',
    fullName: 'Fractional Inactivated Polio Vaccine (1st Dose)',
    dose: 1,
    doseLabel: '1st Dose',
    recommendedAge: '6 Weeks',
    recommendedDays: 42,
    disease: 'Poliomyelitis',
    description: 'Fractional IPV is an injectable polio vaccine given as a smaller intradermal dose. It provides systemic immunity complementing the mucosal immunity from OPV.',
    importance: 'IPV provides an additional layer of protection against polio. The combination of OPV and IPV provides both mucosal and systemic immunity for comprehensive protection.',
    sideEffects: [
      'Mild redness at injection site',
      'Small hard lump that resolves',
      'Mild fever',
      'Generally very well tolerated'
    ],
    precautions: [
      'Intradermal injection — requires trained personnel',
      'Can be given alongside OPV',
      'No contraindication with other vaccines',
      'Report any severe reaction immediately'
    ],
    governmentRecommendation: 'Added to UIP. Two fractional doses of IPV at 6 and 14 weeks alongside OPV.',
    route: 'Intradermal (right upper arm)',
    category: '6weeks'
  },
  {
    id: 'penta-2',
    name: 'Pentavalent-2',
    fullName: 'Pentavalent Vaccine (2nd Dose)',
    dose: 2,
    doseLabel: '2nd Dose',
    recommendedAge: '10 Weeks',
    recommendedDays: 70,
    disease: 'Diphtheria, Pertussis, Tetanus, Hepatitis B, Haemophilus Influenzae type B',
    description: 'Second dose of the pentavalent combination vaccine, boosting immunity against all five diseases covered.',
    importance: 'The second dose significantly boosts the immune response initiated by the first dose, building stronger and longer-lasting protection.',
    sideEffects: [
      'Pain and swelling at injection site',
      'Fever',
      'Irritability',
      'Similar to first dose reactions'
    ],
    precautions: [
      'Minimum 4-week gap from first dose',
      'Same precautions as Pentavalent-1',
      'Monitor for fever',
      'Paracetamol for symptomatic relief'
    ],
    governmentRecommendation: 'Second dose under UIP at 10 weeks. Must maintain minimum 4-week interval from first dose.',
    route: 'Intramuscular (outer thigh)',
    category: '10weeks'
  },
  {
    id: 'opv-2',
    name: 'OPV-2',
    fullName: 'Oral Polio Vaccine (2nd Dose)',
    dose: 2,
    doseLabel: '2nd Dose',
    recommendedAge: '10 Weeks',
    recommendedDays: 70,
    disease: 'Poliomyelitis',
    description: 'Second primary dose of the oral polio vaccine, further strengthening mucosal immunity against poliovirus.',
    importance: 'Continuing the OPV schedule is essential for maintaining India\'s polio-free status and protecting individual children.',
    sideEffects: [
      'Generally very safe',
      'Rare mild diarrhea'
    ],
    precautions: [
      'Same as previous OPV doses',
      'Can be given with Injectable vaccines'
    ],
    governmentRecommendation: 'Mandatory under UIP at 10 weeks.',
    route: 'Oral (2 drops)',
    category: '10weeks'
  },
  {
    id: 'rota-2',
    name: 'Rotavirus-2',
    fullName: 'Rotavirus Vaccine (2nd Dose)',
    dose: 2,
    doseLabel: '2nd Dose',
    recommendedAge: '10 Weeks',
    recommendedDays: 70,
    disease: 'Rotavirus Diarrhea',
    description: 'Second dose of the rotavirus vaccine, boosting protection against severe rotavirus diarrhea.',
    importance: 'Sequential doses are needed for optimal protection against rotavirus gastroenteritis.',
    sideEffects: [
      'Mild irritability',
      'Mild diarrhea',
      'Same as first dose'
    ],
    precautions: [
      'Minimum 4-week gap from first dose',
      'Delay if severe diarrhea or vomiting'
    ],
    governmentRecommendation: 'Second dose under UIP at 10 weeks in applicable states.',
    route: 'Oral',
    category: '10weeks'
  },
  {
    id: 'penta-3',
    name: 'Pentavalent-3',
    fullName: 'Pentavalent Vaccine (3rd Dose)',
    dose: 3,
    doseLabel: '3rd Dose',
    recommendedAge: '14 Weeks',
    recommendedDays: 98,
    disease: 'Diphtheria, Pertussis, Tetanus, Hepatitis B, Haemophilus Influenzae type B',
    description: 'Third and final dose of the pentavalent combination vaccine, completing the primary vaccination series.',
    importance: 'The third dose completes the primary series and provides robust long-term protection against all five diseases.',
    sideEffects: [
      'Pain and swelling at injection site',
      'Fever',
      'Irritability',
      'May be slightly stronger reaction than earlier doses'
    ],
    precautions: [
      'Minimum 4-week gap from second dose',
      'Complete the series for full protection',
      'Monitor for fever and treat symptomatically'
    ],
    governmentRecommendation: 'Third and final primary dose under UIP at 14 weeks.',
    route: 'Intramuscular (outer thigh)',
    category: '14weeks'
  },
  {
    id: 'opv-3',
    name: 'OPV-3',
    fullName: 'Oral Polio Vaccine (3rd Dose)',
    dose: 3,
    doseLabel: '3rd Dose',
    recommendedAge: '14 Weeks',
    recommendedDays: 98,
    disease: 'Poliomyelitis',
    description: 'Third primary dose of OPV, completing the primary polio vaccination series through oral route.',
    importance: 'Completes the primary OPV series, providing strong mucosal (gut) immunity against poliovirus.',
    sideEffects: [
      'Generally very safe',
      'Same as previous doses'
    ],
    precautions: [
      'Same as previous OPV doses'
    ],
    governmentRecommendation: 'Third primary dose under UIP at 14 weeks. Booster doses to follow.',
    route: 'Oral (2 drops)',
    category: '14weeks'
  },
  {
    id: 'ipv-2',
    name: 'fIPV-2',
    fullName: 'Fractional Inactivated Polio Vaccine (2nd Dose)',
    dose: 2,
    doseLabel: '2nd Dose',
    recommendedAge: '14 Weeks',
    recommendedDays: 98,
    disease: 'Poliomyelitis',
    description: 'Second dose of fractional IPV to complement OPV and ensure comprehensive polio protection.',
    importance: 'Completes the IPV schedule, ensuring both mucosal and systemic immunity against polio.',
    sideEffects: [
      'Mild redness at injection site',
      'Mild fever',
      'Generally well tolerated'
    ],
    precautions: [
      'Can be given on the same day as OPV',
      'Different injection sites from other vaccines'
    ],
    governmentRecommendation: 'Second fractional IPV dose under UIP at 14 weeks.',
    route: 'Intradermal (right upper arm)',
    category: '14weeks'
  },
  {
    id: 'rota-3',
    name: 'Rotavirus-3',
    fullName: 'Rotavirus Vaccine (3rd Dose)',
    dose: 3,
    doseLabel: '3rd Dose',
    recommendedAge: '14 Weeks',
    recommendedDays: 98,
    disease: 'Rotavirus Diarrhea',
    description: 'Third and final dose of the rotavirus vaccine, completing the vaccination series for maximum protection.',
    importance: 'Completes the rotavirus vaccination series, providing optimal and long-lasting protection against severe diarrhea.',
    sideEffects: [
      'Same as previous doses',
      'Generally well tolerated'
    ],
    precautions: [
      'Complete the series for full protection',
      'Delay if child has acute gastroenteritis'
    ],
    governmentRecommendation: 'Third dose under UIP at 14 weeks in applicable states.',
    route: 'Oral',
    category: '14weeks'
  },
  {
    id: 'mr-1',
    name: 'MR-1',
    fullName: 'Measles-Rubella Vaccine (1st Dose)',
    dose: 1,
    doseLabel: '1st Dose',
    recommendedAge: '9 Months',
    recommendedDays: 270,
    disease: 'Measles, Rubella',
    description: 'MR vaccine protects against measles, a highly contagious viral disease that can cause serious complications, and rubella (German measles) which can cause birth defects.',
    importance: 'Measles is still a leading cause of childhood deaths globally. Rubella during pregnancy causes Congenital Rubella Syndrome. Vaccination protects both the child and future pregnancies.',
    sideEffects: [
      'Mild fever (5–12 days after vaccination)',
      'Mild rash',
      'Joint pain (rare, more common in adults)',
      'Temporary swelling of glands'
    ],
    precautions: [
      'Wait 30 minutes at clinic after vaccination',
      'Fever may appear 5–12 days after vaccination (normal)',
      'Paracetamol for fever management',
      'Report any severe allergic reaction'
    ],
    governmentRecommendation: 'Under UIP, MR vaccine replaced standalone measles vaccine. First dose at 9 months, second dose at 16–24 months.',
    route: 'Subcutaneous (right upper arm)',
    category: '9months'
  },
  {
    id: 'je-1',
    name: 'JE-1',
    fullName: 'Japanese Encephalitis Vaccine (1st Dose)',
    dose: 1,
    doseLabel: '1st Dose',
    recommendedAge: '9 Months',
    recommendedDays: 270,
    disease: 'Japanese Encephalitis',
    description: 'JE vaccine protects against Japanese Encephalitis, a viral brain infection spread by mosquitoes that can cause severe neurological damage.',
    importance: 'Japanese Encephalitis is endemic in many parts of India, especially rural areas. It can cause permanent brain damage or death. Vaccination is the most effective prevention.',
    sideEffects: [
      'Mild pain at injection site',
      'Low-grade fever',
      'Mild headache',
      'Generally well tolerated'
    ],
    precautions: [
      'Given in JE-endemic districts as per government schedule',
      'Can be given alongside MR vaccine',
      'Monitor for allergic reactions',
      'Complete both doses for full protection'
    ],
    governmentRecommendation: 'Under UIP in endemic districts. First dose at 9 months with MR-1, second dose at 16–24 months with MR-2.',
    route: 'Subcutaneous (left upper arm)',
    category: '9months'
  },
  {
    id: 'vita-1',
    name: 'Vitamin A-1',
    fullName: 'Vitamin A Supplementation (1st Dose)',
    dose: 1,
    doseLabel: '1st Dose',
    recommendedAge: '9 Months',
    recommendedDays: 270,
    disease: 'Vitamin A Deficiency',
    description: 'Vitamin A supplementation prevents blindness and boosts immune function. Given alongside measles vaccination at 9 months.',
    importance: 'Vitamin A deficiency is a leading cause of preventable blindness in children and increases susceptibility to severe infections.',
    sideEffects: [
      'Rarely causes nausea',
      'Mild headache in some cases',
      'Generally very safe'
    ],
    precautions: [
      'Given with measles/MR vaccine',
      'Age-appropriate dosing is important',
      'Follow-up doses every 6 months'
    ],
    governmentRecommendation: 'Under UIP. First dose at 9 months, then every 6 months up to 5 years of age. Total of 9 doses.',
    route: 'Oral (1 ml / 1 lakh IU)',
    category: '9months'
  },
  {
    id: 'mr-2',
    name: 'MR-2',
    fullName: 'Measles-Rubella Vaccine (2nd Dose)',
    dose: 2,
    doseLabel: '2nd Dose',
    recommendedAge: '16–24 Months',
    recommendedDays: 480,
    disease: 'Measles, Rubella',
    description: 'Second dose of MR vaccine ensures children who did not respond to the first dose are protected and boosts immunity in those who did respond.',
    importance: 'A single dose of measles vaccine is about 85% effective. The second dose raises effectiveness to over 95%, providing robust community-level protection.',
    sideEffects: [
      'Same as first dose',
      'Usually milder reactions',
      'Fever and rash less common'
    ],
    precautions: [
      'Minimum 3-month gap from first MR dose',
      'Same precautions as MR-1',
      'Can be given with DPT booster'
    ],
    governmentRecommendation: 'Second dose under UIP at 16–24 months of age. Critical for achieving measles elimination targets.',
    route: 'Subcutaneous (right upper arm)',
    category: '16months'
  },
  {
    id: 'je-2',
    name: 'JE-2',
    fullName: 'Japanese Encephalitis Vaccine (2nd Dose)',
    dose: 2,
    doseLabel: '2nd Dose',
    recommendedAge: '16–24 Months',
    recommendedDays: 480,
    disease: 'Japanese Encephalitis',
    description: 'Second dose of JE vaccine completes the primary vaccination series, providing long-lasting protection against Japanese Encephalitis.',
    importance: 'The second dose is essential for long-term protection. Single dose protection may wane over time.',
    sideEffects: [
      'Same as first dose',
      'Mild and self-limiting'
    ],
    precautions: [
      'Same as JE-1',
      'Complete both doses for full protection'
    ],
    governmentRecommendation: 'Second dose under UIP at 16–24 months in endemic districts.',
    route: 'Subcutaneous (left upper arm)',
    category: '16months'
  },
  {
    id: 'dpt-b1',
    name: 'DPT Booster-1',
    fullName: 'Diphtheria, Pertussis, Tetanus (1st Booster)',
    dose: 4,
    doseLabel: '1st Booster',
    recommendedAge: '16–24 Months',
    recommendedDays: 480,
    disease: 'Diphtheria, Pertussis, Tetanus',
    description: 'First booster dose of DPT to maintain and boost immunity against diphtheria, pertussis (whooping cough), and tetanus established during primary series.',
    importance: 'Immunity from the primary pentavalent series wanes over time. The booster dose is essential to maintain protection during the toddler years.',
    sideEffects: [
      'Pain and swelling at injection site',
      'Fever',
      'Irritability',
      'May cause a hard lump at injection site'
    ],
    precautions: [
      'Minimum 6-month gap from Pentavalent-3',
      'Cold compress for injection site',
      'Paracetamol for fever',
      'Report severe reactions immediately'
    ],
    governmentRecommendation: 'First booster under UIP at 16–24 months. Essential for maintaining protection.',
    route: 'Intramuscular (outer thigh)',
    category: '16months'
  },
  {
    id: 'opv-booster',
    name: 'OPV Booster',
    fullName: 'Oral Polio Vaccine (Booster)',
    dose: 4,
    doseLabel: 'Booster',
    recommendedAge: '16–24 Months',
    recommendedDays: 480,
    disease: 'Poliomyelitis',
    description: 'Booster dose of OPV to reinforce immunity against poliovirus and maintain India\'s polio-free status.',
    importance: 'The booster dose strengthens mucosal immunity and helps maintain herd immunity in the community.',
    sideEffects: [
      'Generally very safe',
      'Same as previous doses'
    ],
    precautions: [
      'Same as previous OPV doses',
      'Can be given with DPT booster'
    ],
    governmentRecommendation: 'OPV booster under UIP at 16–24 months.',
    route: 'Oral (2 drops)',
    category: '16months'
  },
  {
    id: 'vita-2',
    name: 'Vitamin A-2',
    fullName: 'Vitamin A Supplementation (2nd Dose)',
    dose: 2,
    doseLabel: '2nd Dose',
    recommendedAge: '16 Months',
    recommendedDays: 480,
    disease: 'Vitamin A Deficiency',
    description: 'Second dose of Vitamin A supplementation, continuing the biannual supplementation schedule.',
    importance: 'Regular Vitamin A supplementation reduces child mortality by up to 24% in areas where deficiency is common.',
    sideEffects: [
      'Generally very safe',
      'Rare nausea'
    ],
    precautions: [
      'Age-appropriate dosing (2 lakh IU from 12 months)',
      'Follow-up every 6 months'
    ],
    governmentRecommendation: 'Vitamin A supplementation every 6 months from 9 months to 5 years under UIP.',
    route: 'Oral (2 ml / 2 lakh IU)',
    category: '16months'
  },
  {
    id: 'dpt-b2',
    name: 'DPT Booster-2',
    fullName: 'Diphtheria, Pertussis, Tetanus (2nd Booster)',
    dose: 5,
    doseLabel: '2nd Booster',
    recommendedAge: '5–6 Years',
    recommendedDays: 1825,
    disease: 'Diphtheria, Pertussis, Tetanus',
    description: 'Second booster dose of DPT vaccine, given before school entry to ensure continued protection throughout childhood.',
    importance: 'School-going children are at higher risk of transmission. This pre-school booster ensures protection during the school years.',
    sideEffects: [
      'Pain at injection site',
      'Fever',
      'Fatigue',
      'Mild swelling'
    ],
    precautions: [
      'Given at school entry (5–6 years)',
      'Monitor for allergic reactions',
      'Same general precautions as earlier DPT doses'
    ],
    governmentRecommendation: 'Second booster under UIP at 5–6 years (school entry). Important for maintaining immunity during school years.',
    route: 'Intramuscular (upper arm)',
    category: '5years'
  }
];

// Vaccine schedule grouped by age for timeline display
export const VACCINE_SCHEDULE_GROUPS = [
  { key: 'birth', label: 'At Birth', days: 0 },
  { key: '6weeks', label: '6 Weeks', days: 42 },
  { key: '10weeks', label: '10 Weeks', days: 70 },
  { key: '14weeks', label: '14 Weeks', days: 98 },
  { key: '9months', label: '9 Months', days: 270 },
  { key: '16months', label: '16–24 Months', days: 480 },
  { key: '5years', label: '5–6 Years', days: 1825 }
];

export const TOTAL_VACCINES = VACCINE_CATALOG.length;
