import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ThemeToggle } from "@/components/theme-toggle";

export default function ProfilePage() {
  // Mock user data
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "https://placehold.co/100x100",
  };

  return (
    <div className="container mx-auto max-w-4xl py-8 px-4">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={user.avatar} alt={user.name} data-ai-hint="man portrait" />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl font-headline">{user.name}</CardTitle>
              <p className="text-muted-foreground">{user.email}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <h3 className="font-semibold">Profile Settings</h3>
            <Button variant="outline" className="w-full sm:w-auto">
              Edit Profile
            </Button>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Theme</h3>
            <div className="flex items-center justify-between rounded-lg border p-4">
                <p className="text-sm">Appearance</p>
                <ThemeToggle />
            </div>
          </div>
           <div className="space-y-2 pt-4">
            <Button variant="destructive" className="w-full sm:w-auto">
              Log Out
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
