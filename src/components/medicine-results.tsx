import type { MedicineSearchResult } from "@/lib/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, DollarSign, Lightbulb, Stethoscope } from "lucide-react";

type MedicineResultsProps = {
  result: MedicineSearchResult;
};

export function MedicineResults({ result }: MedicineResultsProps) {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-3xl font-headline font-bold text-primary">{result.generalInfo.brandName[0]}</CardTitle>
        {result.generalInfo.genericName.length > 0 && (
          <CardDescription className="text-lg">
            Generic Name: {result.generalInfo.genericName.join(', ')}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent>
        <div className="mb-6">
            <h3 className="font-semibold text-lg mb-2 flex items-center gap-2"><Stethoscope className="w-5 h-5" /> General Information</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{result.generalInfo.description.join(' ')}</p>
        </div>
        
        <Tabs defaultValue="advice" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="advice">Personal Advice</TabsTrigger>
            <TabsTrigger value="alternatives">Alternatives</TabsTrigger>
            <TabsTrigger value="risks">Side Effects</TabsTrigger>
          </TabsList>

          <TabsContent value="advice" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary"><Lightbulb className="w-5 h-5" /> Personal Advice</CardTitle>
                <CardDescription>{result.suggestion.suggestion}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{result.suggestion.reason}</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="alternatives" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><DollarSign className="w-5 h-5" /> Cheaper Alternatives</CardTitle>
                <CardDescription>Pocket-friendly options with similar composition.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {result.alternatives.length > 0 ? (
                  result.alternatives.map((alt, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start">
                        <h4 className="font-semibold">{alt.name}</h4>
                        <Badge variant="secondary">{alt.price}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{alt.description}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">No cheaper alternatives found.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="risks" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-destructive"><AlertCircle className="w-5 h-5" /> Risks & Side Effects</CardTitle>
                <CardDescription>Potential red flags and common side effects to be aware of.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-1">Red Flags</h4>
                  <p className="text-sm text-destructive/90">{result.analysis.redFlags}</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Side Effects</h4>
                  <p className="text-sm text-muted-foreground">{result.analysis.sideEffects}</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

        </Tabs>
      </CardContent>
    </Card>
  );
}
