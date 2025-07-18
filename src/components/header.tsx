"use client";

import { useAuth } from '@/hooks/use-auth';
import { Button } from './ui/button';
import { LogOut, ShieldCheck, Star } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { useToast } from '@/hooks/use-toast';


export default function Header() {
  const { user, logout, isPro, upgradeToPro } = useAuth();
  const { toast } = useToast();

  const handleUpgrade = () => {
    upgradeToPro();
    toast({
      title: "Congratulations!",
      description: "You've upgraded to Pro. You can now add images to your todos.",
    });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex items-center">
          <ShieldCheck className="w-6 h-6 mr-2 text-primary" />
          <span className="font-bold font-headline">Keycloak Todo</span>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2 md:space-x-4">
          {!isPro && (
            <Button onClick={handleUpgrade}>
              <Star className="w-4 h-4 mr-2" />
              Upgrade to Pro
            </Button>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-9 w-9">
                        <AvatarImage src={`https://i.pravatar.cc/150?u=${user?.name}`} alt={user?.name || ''} />
                        <AvatarFallback>{user?.name?.[0].toUpperCase()}</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user?.name}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {isPro ? "Pro Member" : "Standard Member"}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout}>
                <LogOut className="w-4 h-4 mr-2" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
