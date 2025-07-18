"use client";

import { useContext } from 'react';
import { TodoContext } from '@/contexts/todo-context';

export const useTodos = () => {
  const context = useContext(TodoContext);
  if (context === undefined) {
    throw new Error('useTodos must be used within a TodoProvider');
  }
  return context;
};
