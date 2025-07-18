"use client";

import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { type Todo } from '@/lib/types';
import { useAuth } from '@/hooks/use-auth';

interface TodoContextType {
  todos: Todo[];
  addTodo: (todo: Omit<Todo, 'id' | 'createdAt'>) => void;
  updateTodo: (id: string, updates: Partial<Omit<Todo, 'id' | 'createdAt'>>) => void;
  deleteTodo: (id: string) => void;
}

const initialTodos: Todo[] = [
    {
        id: '1',
        title: 'Welcome to Keycloak Todo',
        description: 'This is a sample todo to get you started. You can edit or delete it.',
        createdAt: new Date().toISOString(),
    },
    {
        id: '2',
        title: 'Upgrade to Pro',
        description: 'Click the "Upgrade to Pro" button in the header to unlock image attachments for your todos!',
        createdAt: new Date().toISOString(),
    },
];

export const TodoContext = createContext<TodoContextType | undefined>(undefined);

export function TodoProvider({ children }: { children: ReactNode }) {
  const [todos, setTodos] = useState<Todo[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
        try {
            const storedTodos = localStorage.getItem('todos');
            if (storedTodos) {
                setTodos(JSON.parse(storedTodos));
            } else {
                setTodos(initialTodos);
            }
        } catch (error) {
            console.error("Failed to parse todos from localStorage", error);
            localStorage.removeItem('todos');
            setTodos(initialTodos);
        }
    } else {
      setTodos([]);
    }
  }, [user]);

  useEffect(() => {
    if(user && todos.length > 0){
        localStorage.setItem('todos', JSON.stringify(todos));
    }
  }, [todos, user]);

  const addTodo = (todo: Omit<Todo, 'id' | 'createdAt'>) => {
    const newTodo: Todo = {
      ...todo,
      id: new Date().getTime().toString(),
      createdAt: new Date().toISOString(),
    };
    setTodos(prev => [newTodo, ...prev]);
  };

  const updateTodo = (id: string, updates: Partial<Omit<Todo, 'id' | 'createdAt'>>) => {
    setTodos(prev => prev.map(t => (t.id === id ? { ...t, ...updates } : t)));
  };

  const deleteTodo = (id: string) => {
    setTodos(prev => prev.filter(t => t.id !== id));
  };
  
  const value = { todos, addTodo, updateTodo, deleteTodo };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
}
