"use client";

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuth } from '@/hooks/use-auth';
import { useTodos } from '@/hooks/use-todos';
import { type Todo } from '@/lib/types';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  title: z.string().min(2, { message: 'Title must be at least 2 characters.' }).max(50),
  description: z.string().min(5, { message: 'Description must be at least 5 characters.' }).max(200),
  image: z.any().optional(),
});

interface TodoFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  todoToEdit?: Todo;
}

export default function TodoForm({ open, onOpenChange, todoToEdit }: TodoFormProps) {
  const { isPro } = useAuth();
  const { addTodo, updateTodo } = useTodos();
  const { toast } = useToast();
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
    },
  });

  React.useEffect(() => {
    if (open) {
      if (todoToEdit) {
        form.reset({
          title: todoToEdit.title,
          description: todoToEdit.description,
        });
      } else {
        form.reset({
          title: '',
          description: '',
        });
      }
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  }, [todoToEdit, open, form]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const imageFile = values.image?.[0];
    
    const processSubmit = (imageDataUrl?: string) => {
        const finalValues = { title: values.title, description: values.description, image: imageDataUrl };
        if (todoToEdit) {
            updateTodo(todoToEdit.id, finalValues);
            toast({ title: 'Success', description: 'Todo updated successfully.' });
        } else {
            addTodo(finalValues);
            toast({ title: 'Success', description: 'Todo added successfully.' });
        }
        onOpenChange(false);
    };

    if (imageFile) {
        const reader = new FileReader();
        reader.onloadend = () => {
            processSubmit(reader.result as string);
        };
        reader.readAsDataURL(imageFile);
    } else {
        processSubmit(todoToEdit?.image);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-headline">{todoToEdit ? 'Edit Todo' : 'Add a new Todo'}</DialogTitle>
          <DialogDescription>
            {todoToEdit ? 'Update your task details.' : 'Fill in the details for your new task.'}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Finish project report" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Describe your task..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {isPro && (
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image (Pro feature)</FormLabel>
                    <FormControl>
                      <Input type="file" accept="image/*" {...form.register('image')} ref={fileInputRef} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <DialogFooter>
              <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>Cancel</Button>
              <Button type="submit" disabled={form.formState.isSubmitting}>Save</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
