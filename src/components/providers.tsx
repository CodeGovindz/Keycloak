"use client";

import { AuthProvider } from '@/contexts/auth-context';
import { TodoProvider } from '@/contexts/todo-context';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <TodoProvider>
        {children}
      </TodoProvider>
    </AuthProvider>
  );
}
