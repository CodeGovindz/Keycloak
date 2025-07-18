"use client";

import Header from '@/components/header';
import TodoList from '@/components/todo-list';
import TodoForm from './todo-form';
import { Button } from './ui/button';
import { PlusCircle } from 'lucide-react';
import React from 'react';

export default function Dashboard() {
    const [isFormOpen, setIsFormOpen] = React.useState(false);

    return (
        <div className="flex flex-col min-h-screen bg-background">
            <Header />
            <main className="flex-1 p-4 md:p-8">
                <div className="max-w-6xl mx-auto">
                    <div className="flex items-center justify-between mb-6">
                        <h1 className="text-3xl font-bold font-headline">Your Todos</h1>
                         <Button onClick={() => setIsFormOpen(true)}>
                            <PlusCircle className="w-4 h-4 mr-2" />
                            Add Todo
                        </Button>
                    </div>
                    <TodoList />
                </div>
            </main>
            <TodoForm open={isFormOpen} onOpenChange={setIsFormOpen} />
        </div>
    );
}
