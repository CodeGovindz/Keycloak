"use client";

import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, ShieldCheck } from 'lucide-react';

export default function LoginPage() {
  const { login } = useAuth();

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <Card className="w-full max-w-md shadow-2xl animate-fade-in-up">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <ShieldCheck className="w-16 h-16 text-primary" />
          </div>
          <CardTitle className="text-3xl font-bold font-headline">Keycloak Todo</CardTitle>
          <CardDescription className="text-muted-foreground">
            Secure your tasks. Achieve your goals.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
           <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start">
              <Check className="w-4 h-4 mr-2 mt-1 shrink-0 text-primary" />
              <span>Manage your daily tasks with a simple and intuitive interface.</span>
            </li>
            <li className="flex items-start">
              <Check className="w-4 h-4 mr-2 mt-1 shrink-0 text-primary" />
              <span>(Simulated) Keycloak authentication for secure access.</span>
            </li>
            <li className="flex items-start">
              <Check className="w-4 h-4 mr-2 mt-1 shrink-0 text-primary" />
              <span>Upgrade to Pro to attach images to your todos.</span>
            </li>
          </ul>
        </CardContent>
        <CardFooter>
          <Button onClick={() => login({ name: 'Demo User' })} className="w-full text-lg">
            Login with Keycloak
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
