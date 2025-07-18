"use client";

import { useTodos } from '@/hooks/use-todos';
import TodoItem from './todo-item';

export default function TodoList() {
  const { todos } = useTodos();

  if (todos.length === 0) {
    return (
      <div className="text-center py-16 border-2 border-dashed rounded-lg">
        <h2 className="text-xl font-semibold text-muted-foreground font-headline">No todos yet!</h2>
        <p className="text-muted-foreground">Click "Add Todo" to get started.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
}
