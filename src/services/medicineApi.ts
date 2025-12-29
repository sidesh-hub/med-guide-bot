export interface MedicineInfo {
  name: string;
  description: string;
  howToUse: string;
  whenToUse: string;
  sideEffects: string;
  warnings: string;
}

interface OpenFDAResult {
  openfda?: {
    brand_name?: string[];
    generic_name?: string[];
    manufacturer_name?: string[];
  };
  purpose?: string[];
  indications_and_usage?: string[];
  dosage_and_administration?: string[];
  warnings?: string[];
  adverse_reactions?: string[];
  drug_interactions?: string[];
  description?: string[];
  active_ingredient?: string[];
}

interface OpenFDAResponse {
  results?: OpenFDAResult[];
  error?: {
    message: string;
  };
}

const cleanText = (text: string | undefined): string => {
  if (!text) return "";
  // Remove excessive whitespace and clean up the text
  return text
    .replace(/\s+/g, " ")
    .replace(/•/g, "\n• ")
    .trim()
    .slice(0, 500); // Limit length for readability
};

const extractFirstParagraph = (text: string | undefined, maxLength: number = 300): string => {
  if (!text) return "";
  const cleaned = cleanText(text);
  if (cleaned.length <= maxLength) return cleaned;
  
  // Try to cut at a sentence boundary
  const truncated = cleaned.slice(0, maxLength);
  const lastPeriod = truncated.lastIndexOf(".");
  if (lastPeriod > maxLength * 0.5) {
    return truncated.slice(0, lastPeriod + 1);
  }
  return truncated + "...";
};

export const searchMedicine = async (query: string): Promise<MedicineInfo | null> => {
  try {
    // Search by brand name or generic name
    const searchTerm = encodeURIComponent(query.toLowerCase());
    const url = `https://api.fda.gov/drug/label.json?search=(openfda.brand_name:"${searchTerm}"+openfda.generic_name:"${searchTerm}")&limit=1`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      // Try a broader search if exact match fails
      const broadUrl = `https://api.fda.gov/drug/label.json?search=openfda.brand_name:${searchTerm}+openfda.generic_name:${searchTerm}&limit=1`;
      const broadResponse = await fetch(broadUrl);
      
      if (!broadResponse.ok) {
        return null;
      }
      
      const broadData: OpenFDAResponse = await broadResponse.json();
      return parseOpenFDAResult(broadData, query);
    }
    
    const data: OpenFDAResponse = await response.json();
    return parseOpenFDAResult(data, query);
    
  } catch (error) {
    console.error("Error fetching medicine data:", error);
    return null;
  }
};

const parseOpenFDAResult = (data: OpenFDAResponse, originalQuery: string): MedicineInfo | null => {
  if (!data.results || data.results.length === 0) {
    return null;
  }
  
  const result = data.results[0];
  
  // Get the medicine name
  const brandName = result.openfda?.brand_name?.[0];
  const genericName = result.openfda?.generic_name?.[0];
  const name = brandName 
    ? `${brandName}${genericName ? ` (${genericName})` : ""}`
    : genericName || originalQuery;
  
  // Build description from available fields
  let description = "";
  if (result.description?.[0]) {
    description = extractFirstParagraph(result.description[0]);
  } else if (result.purpose?.[0]) {
    description = extractFirstParagraph(result.purpose[0]);
  } else if (result.active_ingredient?.[0]) {
    description = `Active ingredient: ${extractFirstParagraph(result.active_ingredient[0])}`;
  } else {
    description = `${name} is a medication. Please consult a healthcare provider for detailed information.`;
  }
  
  // How to use
  let howToUse = "Follow the dosing instructions on the label or as prescribed by your healthcare provider.";
  if (result.dosage_and_administration?.[0]) {
    howToUse = extractFirstParagraph(result.dosage_and_administration[0], 400);
  }
  
  // When to use (indications)
  let whenToUse = "Use as directed by your healthcare provider.";
  if (result.indications_and_usage?.[0]) {
    whenToUse = extractFirstParagraph(result.indications_and_usage[0], 400);
  } else if (result.purpose?.[0]) {
    whenToUse = extractFirstParagraph(result.purpose[0], 400);
  }
  
  // Side effects
  let sideEffects = "Side effects may occur. Consult a healthcare provider if you experience any adverse reactions.";
  if (result.adverse_reactions?.[0]) {
    sideEffects = extractFirstParagraph(result.adverse_reactions[0], 400);
  }
  
  // Warnings
  let warnings = "Read all warnings on the product label. Consult a healthcare provider before use if you have any medical conditions or are taking other medications.";
  if (result.warnings?.[0]) {
    warnings = extractFirstParagraph(result.warnings[0], 400);
  }
  if (result.drug_interactions?.[0]) {
    const interactions = extractFirstParagraph(result.drug_interactions[0], 200);
    if (interactions) {
      warnings += ` Drug interactions: ${interactions}`;
    }
  }
  
  return {
    name,
    description,
    howToUse,
    whenToUse,
    sideEffects,
    warnings,
  };
};

// Get suggestions for autocomplete (optional feature)
export const getMedicineSuggestions = async (query: string): Promise<string[]> => {
  try {
    if (query.length < 2) return [];
    
    const searchTerm = encodeURIComponent(query.toLowerCase());
    const url = `https://api.fda.gov/drug/label.json?search=openfda.brand_name:${searchTerm}*&limit=5`;
    
    const response = await fetch(url);
    if (!response.ok) return [];
    
    const data: OpenFDAResponse = await response.json();
    
    if (!data.results) return [];
    
    const suggestions = new Set<string>();
    data.results.forEach((result) => {
      if (result.openfda?.brand_name?.[0]) {
        suggestions.add(result.openfda.brand_name[0]);
      }
      if (result.openfda?.generic_name?.[0]) {
        suggestions.add(result.openfda.generic_name[0]);
      }
    });
    
    return Array.from(suggestions).slice(0, 5);
  } catch {
    return [];
  }
};