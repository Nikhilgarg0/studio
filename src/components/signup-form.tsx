"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import React, { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Icons } from "@/components/icons"

const accountFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
  confirmPassword: z.string(),
  terms: z.boolean().default(false).refine(val => val === true, {
    message: "You must accept the terms and conditions."
  }),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match.",
  path: ["confirmPassword"],
})

const healthFormSchema = z.object({
  healthData: z.string().optional(),
})

export function SignupForm() {
  const router = useRouter()
  const [step, setStep] = useState(1)

  const accountForm = useForm<z.infer<typeof accountFormSchema>>({
    resolver: zodResolver(accountFormSchema),
    defaultValues: {
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  })

  const healthForm = useForm<z.infer<typeof healthFormSchema>>({
    resolver: zodResolver(healthFormSchema),
    defaultValues: {
      healthData: "",
    },
  })

  function onAccountSubmit(values: z.infer<typeof accountFormSchema>) {
    console.log("Account data:", values)
    setStep(2)
  }

  function onHealthSubmit(values: z.infer<typeof healthFormSchema>) {
    console.log("Health data:", values)
    // NOTE: This is a mock signup. In a real app, you'd save all data.
    router.push("/medicines")
  }
  
  function handleSkip() {
    router.push("/medicines");
  }

  return (
    <Card>
      <CardHeader className="text-center">
        <div className="mx-auto mb-4">
          <Icons.logo className="h-12 w-12" />
        </div>
        <CardTitle className="font-headline">
          {step === 1 ? 'Create an account' : 'Personalize your experience'}
        </CardTitle>
        <CardDescription>
          {step === 1 ? 'Start your journey with MediLook' : 'This helps us provide tailored advice.'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {step === 1 && (
          <Form {...accountForm}>
            <form onSubmit={accountForm.handleSubmit(onAccountSubmit)} className="space-y-4">
              <FormField control={accountForm.control} name="email" render={({ field }) => (
                <FormItem><FormLabel>Email</FormLabel><FormControl><Input placeholder="your.email@example.com" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={accountForm.control} name="phone" render={({ field }) => (
                <FormItem><FormLabel>Contact Number</FormLabel><FormControl><Input placeholder="+91 12345 67890" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={accountForm.control} name="password" render={({ field }) => (
                <FormItem><FormLabel>Password</FormLabel><FormControl><Input type="password" placeholder="••••••••" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={accountForm.control} name="confirmPassword" render={({ field }) => (
                <FormItem><FormLabel>Confirm Password</FormLabel><FormControl><Input type="password" placeholder="••••••••" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={accountForm.control} name="terms" render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4"><FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl><div className="space-y-1 leading-none"><FormLabel>Accept terms and conditions</FormLabel><FormDescription>You agree to our Terms of Service and Privacy Policy.</FormDescription></div><FormMessage /></FormItem>
              )} />
              <Button type="submit" className="w-full">Create Account</Button>
            </form>
          </Form>
        )}
        {step === 2 && (
          <Form {...healthForm}>
            <form onSubmit={healthForm.handleSubmit(onHealthSubmit)} className="space-y-6">
              <FormField control={healthForm.control} name="healthData" render={({ field }) => (
                <FormItem>
                  <FormLabel>Diseases or Disorders</FormLabel>
                  <FormControl>
                    <Textarea placeholder="e.g., Diabetes, High Blood Pressure, Asthma..." className="resize-none" {...field} />
                  </FormControl>
                  <FormDescription>Please list any pre-existing conditions. This is optional.</FormDescription>
                  <FormMessage />
                </FormItem>
              )} />
              <div className="flex flex-col sm:flex-row gap-2">
                  <Button type="button" variant="outline" onClick={handleSkip} className="w-full">Skip for now</Button>
                  <Button type="submit" className="w-full">Save and Continue</Button>
              </div>
            </form>
          </Form>
        )}
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link href="/" className="underline text-primary">
            Sign in
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
