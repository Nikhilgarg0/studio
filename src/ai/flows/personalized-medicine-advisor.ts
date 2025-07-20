'use server';

/**
 * @fileOverview An AI agent that provides personalized medicine suggestions based on user health data.
 *
 * - providePersonalizedSuggestions - A function that provides personalized medicine suggestions.
 * - PersonalizedSuggestionsInput - The input type for the providePersonalizedSuggestions function.
 * - PersonalizedSuggestionsOutput - The return type for the providePersonalizedSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedSuggestionsInputSchema = z.object({
  medicineName: z.string().describe('The name of the medicine the user is considering.'),
  userHealthData: z.string().describe('The user health data, including diseases and disorders.'),
});
export type PersonalizedSuggestionsInput = z.infer<typeof PersonalizedSuggestionsInputSchema>;

const PersonalizedSuggestionsOutputSchema = z.object({
  suggestion: z.string().describe('A suggestion about whether the user should take the medicine, based on their health data.'),
  reason: z.string().describe('The reason for the suggestion, based on potential interactions or contraindications.'),
});
export type PersonalizedSuggestionsOutput = z.infer<typeof PersonalizedSuggestionsOutputSchema>;

export async function providePersonalizedSuggestions(
  input: PersonalizedSuggestionsInput
): Promise<PersonalizedSuggestionsOutput> {
  return personalizedSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedSuggestionsPrompt',
  input: {schema: PersonalizedSuggestionsInputSchema},
  output: {schema: PersonalizedSuggestionsOutputSchema},
  prompt: `You are a medical advisor that provides personalized medicine suggestions.

You will receive the name of medicine the user is considering and the user health data.
Based on the user's health data, you will suggest whether the user should take the medicine or not.
If the medicine may be dangerous for the user, you MUST suggest that the user should NOT take the medicine, and explain why.

Medicine Name: {{{medicineName}}}
User Health Data: {{{userHealthData}}}

Suggestion:`,
});

const personalizedSuggestionsFlow = ai.defineFlow(
  {
    name: 'personalizedSuggestionsFlow',
    inputSchema: PersonalizedSuggestionsInputSchema,
    outputSchema: PersonalizedSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
