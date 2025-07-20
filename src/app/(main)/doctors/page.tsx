import { Stethoscope } from "lucide-react";

export default function DoctorsPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] text-center p-4">
      <Stethoscope className="w-24 h-24 text-primary/50 mb-4" />
      <h1 className="text-4xl font-bold font-headline text-primary">Doctors Search</h1>
      <p className="mt-2 text-lg text-muted-foreground">This feature is coming soon!</p>
      <p className="mt-1 max-w-md text-sm text-muted-foreground">
        Soon you'll be able to find verified doctors, check their ratings, and see their availability near you. Stay tuned!
      </p>
    </div>
  );
}
