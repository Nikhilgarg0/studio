'use server';
/**
 * @fileOverview This file defines a Genkit flow for suggesting cheaper alternatives to a given medicine.
 *
 * - suggestCheaperAlternatives - A function that takes a medicine name and returns a list of cheaper alternatives.
 * - CheaperAlternativeSuggestionInput - The input type for the suggestCheaperAlternatives function.
 * - CheaperAlternativeSuggestionOutput - The return type for the suggestCheaperAlternatives function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CheaperAlternativeSuggestionInputSchema = z.object({
  medicineName: z.string().describe('The name of the medicine to find alternatives for.'),
});
export type CheaperAlternativeSuggestionInput = z.infer<typeof CheaperAlternativeSuggestionInputSchema>;

const CheaperAlternativeSuggestionOutputSchema = z.object({
  alternatives: z.array(
    z.object({
      name: z.string().describe('The name of the cheaper alternative.'),
      price: z.string().describe('The price of the cheaper alternative.'),
      description: z.string().describe('A description of the cheaper alternative.'),
    })
  ).describe('A list of cheaper alternatives to the medicine.'),
});
export type CheaperAlternativeSuggestionOutput = z.infer<typeof CheaperAlternativeSuggestionOutputSchema>;

export async function suggestCheaperAlternatives(
  input: CheaperAlternativeSuggestionInput
): Promise<CheaperAlternativeSuggestionOutput> {
  return suggestCheaperAlternativesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'cheaperAlternativeSuggestionPrompt',
  input: {schema: CheaperAlternativeSuggestionInputSchema},
  output: {schema: CheaperAlternativeSuggestionOutputSchema},
  prompt: `You are a helpful assistant that suggests cheaper alternatives to medicines.

  Given the medicine name, find cheaper alternatives available in the market.

  Medicine Name: {{{medicineName}}}

  Provide a list of cheaper alternatives with their name, price, and a brief description.
  Format the price with the currency symbol.
  Do not suggest alternatives that are not related to the medicine.
  Do not suggest alternatives that are more expensive than the original medicine.
  Alternatives must have similar compositions to the original medicine.
  Suggest at least 3 alternatives if available.
  `,
});

const suggestCheaperAlternativesFlow = ai.defineFlow(
  {
    name: 'suggestCheaperAlternativesFlow',
    inputSchema: CheaperAlternativeSuggestionInputSchema,
    outputSchema: CheaperAlternativeSuggestionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
