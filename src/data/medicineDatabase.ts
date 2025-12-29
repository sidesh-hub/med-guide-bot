export interface MedicineInfo {
  name: string;
  description: string;
  howToUse: string;
  whenToUse: string;
  sideEffects: string;
  warnings: string;
}

export const medicineDatabase: Record<string, MedicineInfo> = {
  paracetamol: {
    name: "Paracetamol (Acetaminophen)",
    description: "Paracetamol is a commonly used pain reliever and fever reducer. It belongs to the class of analgesics and antipyretics. It works by blocking the production of prostaglandins in the brain that cause pain and fever.",
    howToUse: "Take 500-1000mg every 4-6 hours as needed. Do not exceed 4000mg in 24 hours. Take with or without food. Swallow tablets whole with water.",
    whenToUse: "Use for mild to moderate pain such as headaches, toothaches, muscle aches, and to reduce fever. Effective for cold and flu symptoms.",
    sideEffects: "Generally well-tolerated. Rare side effects include allergic reactions, skin rash, and liver problems with overdose.",
    warnings: "Do not exceed recommended dose. Avoid alcohol while taking this medication. Consult a doctor if you have liver disease. Not recommended for children under 2 years without medical advice.",
  },
  ibuprofen: {
    name: "Ibuprofen",
    description: "Ibuprofen is a nonsteroidal anti-inflammatory drug (NSAID) used to reduce fever and treat pain or inflammation. It works by reducing hormones that cause inflammation and pain in the body.",
    howToUse: "Take 200-400mg every 4-6 hours as needed. Maximum 1200mg in 24 hours for OTC use. Take with food or milk to reduce stomach upset.",
    whenToUse: "Use for headaches, dental pain, menstrual cramps, muscle aches, arthritis, and to reduce fever. Effective for inflammatory conditions.",
    sideEffects: "May cause stomach upset, nausea, dizziness, or headache. Long-term use may increase risk of heart attack or stroke.",
    warnings: "Avoid if you have stomach ulcers, kidney disease, or heart problems. Not recommended during the last trimester of pregnancy. Consult doctor if taking blood thinners.",
  },
  aspirin: {
    name: "Aspirin (Acetylsalicylic Acid)",
    description: "Aspirin is an NSAID used to reduce pain, fever, and inflammation. At low doses, it's used to prevent blood clots. It works by inhibiting cyclooxygenase enzymes.",
    howToUse: "For pain: 325-650mg every 4-6 hours. For heart protection: 75-100mg daily. Take with food to minimize stomach irritation.",
    whenToUse: "Use for headaches, muscle pain, arthritis, and fever. Low-dose aspirin is used for cardiovascular protection in high-risk patients.",
    sideEffects: "May cause stomach irritation, bleeding, tinnitus (ringing in ears), and allergic reactions in sensitive individuals.",
    warnings: "Do not give to children under 16 (risk of Reye's syndrome). Avoid if you have bleeding disorders or stomach ulcers. Stop taking before surgery.",
  },
  amoxicillin: {
    name: "Amoxicillin",
    description: "Amoxicillin is a penicillin-type antibiotic used to treat bacterial infections. It works by stopping the growth of bacteria. It does not work for viral infections.",
    howToUse: "Typical dose: 250-500mg every 8 hours or 500-875mg every 12 hours. Complete the full course even if you feel better. Can be taken with or without food.",
    whenToUse: "Prescribed for ear infections, strep throat, urinary tract infections, skin infections, and certain respiratory infections.",
    sideEffects: "May cause diarrhea, nausea, vomiting, rash, and allergic reactions. Serious allergic reactions require immediate medical attention.",
    warnings: "Inform your doctor if you're allergic to penicillin. Complete the entire course to prevent antibiotic resistance. This is a prescription medication only.",
  },
  omeprazole: {
    name: "Omeprazole",
    description: "Omeprazole is a proton pump inhibitor (PPI) that reduces stomach acid production. It's used to treat acid reflux, heartburn, and stomach ulcers.",
    howToUse: "Take 20-40mg once daily, preferably in the morning before breakfast. Swallow capsules whole, do not crush or chew. Take 30-60 minutes before eating.",
    whenToUse: "Use for gastroesophageal reflux disease (GERD), stomach ulcers, erosive esophagitis, and conditions that cause excess stomach acid.",
    sideEffects: "May cause headache, nausea, diarrhea, stomach pain, and vitamin B12 deficiency with long-term use.",
    warnings: "Long-term use may increase risk of bone fractures and certain infections. Consult doctor if symptoms persist beyond 14 days. May interact with other medications.",
  },
  cetirizine: {
    name: "Cetirizine (Zyrtec)",
    description: "Cetirizine is a second-generation antihistamine used to treat allergic symptoms. It works by blocking histamine, a substance your body makes during an allergic reaction.",
    howToUse: "Take 10mg once daily. Can be taken with or without food. For children 6-12 years: 5-10mg daily. Available as tablets, chewables, and liquid.",
    whenToUse: "Use for seasonal allergies (hay fever), year-round allergies, hives (urticaria), and allergic skin reactions.",
    sideEffects: "May cause drowsiness, dry mouth, fatigue, and headache. Less sedating than first-generation antihistamines.",
    warnings: "Use caution when driving or operating machinery. Consult doctor if pregnant or breastfeeding. Adjust dose for kidney impairment.",
  },
  metformin: {
    name: "Metformin",
    description: "Metformin is an oral diabetes medication that helps control blood sugar levels. It works by decreasing glucose production in the liver and improving insulin sensitivity.",
    howToUse: "Starting dose: 500mg twice daily with meals. Maximum: 2550mg daily in divided doses. Take with food to reduce stomach upset. Swallow whole, do not crush extended-release tablets.",
    whenToUse: "Prescribed for type 2 diabetes to control blood sugar. Often used as first-line treatment along with diet and exercise.",
    sideEffects: "May cause nausea, diarrhea, stomach upset, and metallic taste. Rarely causes lactic acidosis, a serious condition.",
    warnings: "This is a prescription medication. Stop before contrast dye procedures. Avoid excessive alcohol. Not recommended for severe kidney or liver disease.",
  },
  loratadine: {
    name: "Loratadine (Claritin)",
    description: "Loratadine is a non-drowsy antihistamine used to treat allergy symptoms. It blocks histamine receptors without crossing into the brain significantly.",
    howToUse: "Take 10mg once daily. Can be taken with or without food. For children 2-5 years: 5mg daily. Available as tablets, liquid, and dissolvable tablets.",
    whenToUse: "Use for allergic rhinitis, seasonal allergies, chronic hives, and allergic skin conditions.",
    sideEffects: "Generally well-tolerated. May cause headache, dry mouth, fatigue, and rarely drowsiness.",
    warnings: "Safe for most adults and children over 2 years. Consult doctor if pregnant or breastfeeding. Adjust dose for liver impairment.",
  },
};

export const getMedicineInfo = (query: string): MedicineInfo | null => {
  const normalizedQuery = query.toLowerCase().trim();
  
  // Direct match
  if (medicineDatabase[normalizedQuery]) {
    return medicineDatabase[normalizedQuery];
  }
  
  // Partial match
  for (const [key, medicine] of Object.entries(medicineDatabase)) {
    if (key.includes(normalizedQuery) || medicine.name.toLowerCase().includes(normalizedQuery)) {
      return medicine;
    }
  }
  
  return null;
};

export const getAvailableMedicines = (): string[] => {
  return Object.values(medicineDatabase).map(m => m.name.split(" ")[0]);
};