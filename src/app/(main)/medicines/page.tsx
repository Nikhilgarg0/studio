"use client";

import { useFormState } from "react-dom";
import { Search } from "lucide-react";

import { searchMedicine } from "@/lib/actions";
import type { SearchState } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MedicineResults } from "@/components/medicine-results";
import { SearchSkeleton } from "@/components/search-skeleton";
import { Icons } from "@/components/icons";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";

const initialState: SearchState = {};

export default function MedicinesPage() {
  const [state, formAction] = useFormState(searchMedicine, initialState);
  const { toast } = useToast();
  
  // Note: This is a mock for user health data. In a real app, this would come from a user profile.
  const userHealthData = "User has a history of high blood pressure and is allergic to penicillin.";

  useEffect(() => {
    if (state?.error) {
      toast({
        variant: "destructive",
        title: "An error occurred",
        description: state.error,
      });
    }
  }, [state, toast]);

  return (
    <div className="container mx-auto max-w-4xl py-8 px-4">
      <div className="text-center mb-8">
        <Icons.logo className="h-16 w-16 mx-auto mb-2 text-primary" />
        <h1 className="text-4xl font-headline font-bold text-primary">MediLook</h1>
        <p className="text-muted-foreground">Your guide to safe and affordable medicine.</p>
      </div>

      <form action={formAction} className="flex w-full items-center space-x-2 mb-8">
        <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
            type="search"
            name="medicineName"
            placeholder="Search for a medicine (e.g., Tylenol)"
            className="pl-10"
            required
            />
        </div>
        <input type="hidden" name="userHealthData" value={userHealthData} />
        <Button type="submit">Search</Button>
      </form>

      <main>
        <SearchStatus state={state} />
      </main>
    </div>
  );
}

function SearchStatus({ state }: { state: SearchState }) {
  // `useFormStatus` can only be used inside a form.
  const { pending } = useFormState((s) => s, {pending: false});

  if (pending) {
    return <SearchSkeleton />;
  }

  if (state.message) {
    return (
      <div className="text-center py-10">
        <p className="text-muted-foreground">{state.message}</p>
      </div>
    );
  }
  
  if (state.data) {
    return <MedicineResults result={state.data} />;
  }
  
  return (
    <div className="text-center py-10 border-2 border-dashed rounded-lg">
        <h2 className="text-lg font-semibold">Search for any medicine</h2>
        <p className="text-muted-foreground">Get information, side-effects, alternatives and more.</p>
    </div>
  )
}
