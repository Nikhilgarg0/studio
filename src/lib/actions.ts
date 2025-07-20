"use server"

import { analyzeMedicineInformation } from "@/ai/flows/medicine-information-analyzer";
import { suggestCheaperAlternatives } from "@/ai/flows/cheaper-alternative-suggestor";
import { providePersonalizedSuggestions } from "@/ai/flows/personalized-medicine-advisor";
import type { SearchState, MedicineSearchResult } from "./types";

export async function searchMedicine(prevState: SearchState, formData: FormData): Promise<SearchState> {
  const medicineName = formData.get("medicineName") as string;
  const userHealthData = formData.get("userHealthData") as string;

  if (!medicineName) {
    return { error: "Please enter a medicine name." };
  }

  try {
    // 1. Fetch data from openFDA
    const response = await fetch(`https://api.fda.gov/drug/label.json?search=openfda.brand_name:"${medicineName}"&limit=1`);
    if (!response.ok) {
        if (response.status === 404) {
            return { message: `Sorry, we couldn't find any information for "${medicineName}". Please check the spelling or try another name.` };
        }
        throw new Error(`FDA API request failed with status: ${response.status}`);
    }

    const fdaData = await response.json();

    if (!fdaData.results || fdaData.results.length === 0) {
      return { message: `Sorry, we couldn't find any information for "${medicineName}". Please check the spelling or try another name.` };
    }

    const medicineInfo = fdaData.results[0];

    // Prepare a concise string of information for the AI models
    const medicineInformationString = `
      Description: ${medicineInfo.description?.join(' ') || 'N/A'}
      Indications and Usage: ${medicineInfo.indications_and_usage?.join(' ') || 'N/A'}
      Warnings: ${medicineInfo.warnings?.join(' ') || 'N/A'}
      Adverse Reactions: ${medicineInfo.adverse_reactions?.join(' ') || 'N/A'}
      Drug Interactions: ${medicineInfo.drug_interactions?.join(' ') || 'N/A'}
      Contraindications: ${medicineInfo.contraindications?.join(' ') || 'N/A'}
    `;

    // 2. Call AI flows in parallel
    const [analysis, alternatives, suggestion] = await Promise.all([
      analyzeMedicineInformation({ medicineName, medicineInformation: medicineInformationString }),
      suggestCheaperAlternatives({ medicineName }),
      providePersonalizedSuggestions({ medicineName, userHealthData }),
    ]);

    // 3. Assemble the result
    const result: MedicineSearchResult = {
      generalInfo: {
        brandName: medicineInfo.openfda?.brand_name || [medicineName],
        genericName: medicineInfo.openfda?.generic_name || [],
        description: medicineInfo.description || [],
        indicationsAndUsage: medicineInfo.indications_and_usage || [],
      },
      analysis,
      alternatives: alternatives.alternatives,
      suggestion,
    };

    return { data: result };

  } catch (error) {
    console.error("Error in searchMedicine action:", error);
    return { error: "Failed to process the request. Please try again later." };
  }
}
