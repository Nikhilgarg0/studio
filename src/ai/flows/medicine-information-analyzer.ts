'use server';

/**
 * @fileOverview Analyzes medicine information extracted from openFDA, including side effects and red flags.
 *
 * - analyzeMedicineInformation - A function that handles the medicine information analysis process.
 * - AnalyzeMedicineInformationInput - The input type for the analyzeMedicineInformation function.
 * - AnalyzeMedicineInformationOutput - The return type for the analyzeMedicineInformation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeMedicineInformationInputSchema = z.object({
  medicineName: z.string().describe('The name of the medicine to analyze.'),
  medicineInformation: z.string().describe('The information about the medicine extracted from openFDA.'),
});
export type AnalyzeMedicineInformationInput = z.infer<typeof AnalyzeMedicineInformationInputSchema>;

const AnalyzeMedicineInformationOutputSchema = z.object({
  sideEffects: z.string().describe('A summary of the potential side effects of the medicine.'),
  redFlags: z.string().describe('A summary of any red flags or warnings associated with the medicine.'),
});
export type AnalyzeMedicineInformationOutput = z.infer<typeof AnalyzeMedicineInformationOutputSchema>;

export async function analyzeMedicineInformation(input: AnalyzeMedicineInformationInput): Promise<AnalyzeMedicineInformationOutput> {
  return analyzeMedicineInformationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeMedicineInformationPrompt',
  input: {schema: AnalyzeMedicineInformationInputSchema},
  output: {schema: AnalyzeMedicineInformationOutputSchema},
  prompt: `You are a medical expert analyzing medicine information to identify potential risks.

  Analyze the following information about the medicine: {{{medicineInformation}}}

  Identify and summarize the potential side effects and red flags associated with the medicine.

  Medicine Name: {{{medicineName}}}

  Side Effects:
  Red Flags:`, 
});

const analyzeMedicineInformationFlow = ai.defineFlow(
  {
    name: 'analyzeMedicineInformationFlow',
    inputSchema: AnalyzeMedicineInformationInputSchema,
    outputSchema: AnalyzeMedicineInformationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
