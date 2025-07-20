export type MedicineSearchResult = {
  generalInfo: {
    brandName: string[];
    genericName: string[];
    description: string[];
    indicationsAndUsage: string[];
  };
  analysis: {
    sideEffects: string;
    redFlags: string;
  };
  alternatives: {
    name: string;
    price: string;
    description: string;
  }[];
  suggestion: {
    suggestion: string;
    reason: string;
  };
}

export type SearchState = {
  data?: MedicineSearchResult;
  error?: string;
  message?: string;
}
