"use client";

import { useAuth } from '@/hooks/use-auth';
import LoginPage from '@/components/login-page';
import Dashboard from '@/components/dashboard';
import { Skeleton } from '@/components/ui/skeleton';

export default function Home() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center space-y-4">
          <Skeleton className="h-16 w-16 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <main>
      {user ? <Dashboard /> : <LoginPage />}
    </main>
  );
}
