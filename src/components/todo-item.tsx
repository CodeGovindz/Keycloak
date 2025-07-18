"use client";

import React from 'react';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Edit, Trash2, Clock, Image as ImageIcon } from 'lucide-react';
import { useTodos } from '@/hooks/use-todos';
import TodoForm from './todo-form';
import { type Todo } from '@/lib/types';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface TodoItemProps {
  todo: Todo;
}

export default function TodoItem({ todo }: TodoItemProps) {
  const { deleteTodo } = useTodos();
  const [isEditing, setIsEditing] = React.useState(false);

  const formattedDate = new Date(todo.createdAt).toLocaleString();

  return (
    <>
      <Card className="flex flex-col h-full shadow-lg hover:shadow-xl transition-shadow duration-300">
        {todo.image && (
          <div className="relative w-full h-48">
            <Image src={todo.image} alt={todo.title} fill className="rounded-t-lg object-cover" data-ai-hint="task abstract"/>
          </div>
        )}
        <CardHeader>
          <CardTitle className="flex items-center justify-between font-headline">
            {todo.title}
            {!todo.image && <ImageIcon className="w-5 h-5 text-muted-foreground" />}
          </CardTitle>
          <CardDescription className="flex items-center text-xs text-muted-foreground pt-1">
            <Clock className="w-3 h-3 mr-1.5" />
            {formattedDate}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-sm">{todo.description}</p>
        </CardContent>
        <CardFooter className="flex justify-end space-x-2">
          <Button variant="ghost" size="icon" onClick={() => setIsEditing(true)}>
            <Edit className="w-4 h-4" />
            <span className="sr-only">Edit</span>
          </Button>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive hover:bg-destructive/10">
                <Trash2 className="w-4 h-4" />
                <span className="sr-only">Delete</span>
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your todo.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => deleteTodo(todo.id)} className="bg-destructive hover:bg-destructive/90">
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardFooter>
      </Card>
      <TodoForm open={isEditing} onOpenChange={setIsEditing} todoToEdit={todo} />
    </>
  );
}
