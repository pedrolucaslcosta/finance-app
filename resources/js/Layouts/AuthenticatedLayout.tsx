import { useState, PropsWithChildren, ReactNode } from 'react';
import Dropdown from '@/Components/Dropdown';
import { Link } from '@inertiajs/react';
import { User } from '@/types';
import { Button } from '@/Components/ui/button';
import { Wallet } from 'lucide-react';
import { Toaster } from "@/Components/ui/sonner";
import { CircleUser, Menu, Package2, } from "lucide-react"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu"

import { Sheet, SheetContent, SheetTrigger } from "@/Components/ui/sheet"

export default function Authenticated({ user, children }: PropsWithChildren<{ user: User, header?: ReactNode }>) {

    return (
        <>
            <div className="flex min-h-screen w-full flex-col">
                <header className="sticky z-50 top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
                    <nav className="hidde text-nowrap flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
                        <Link
                            href="#"
                            className="flex items-center gap-2 text-lg font-semibold md:text-base"
                        >
                            <Wallet className="h-6 w-6" />
                            <span className="">Finanças</span>
                        </Link>
                        <Link
                            href={route('dashboard')}
                            className="text-foreground transition-colors hover:text-foreground"
                        >
                            Visão Geral
                        </Link>
                        <Link
                            href={route('fixed-expense.index')}
                            className="text-muted-foreground transition-colors hover:text-foreground"
                        >
                            Despesas Fixas
                        </Link>
                    </nav>
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button
                                variant="outline"
                                size="icon"
                                className="shrink-0 md:hidden"
                            >
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">Toggle navigation menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left">
                            <nav className="grid gap-6 text-lg font-medium">
                                <Link
                                    href="#"
                                    className="flex items-center gap-2 text-lg font-semibold"
                                >
                                    <Package2 className="h-6 w-6" />
                                    <span className="sr-only">Acme Inc</span>
                                </Link>
                                <Link href={route('dashboard')} className="hover:text-foreground">
                                    Visão Geral
                                </Link>
                                <Link
                                    href={route('fixed-expense.index')}
                                    className="text-muted-foreground hover:text-foreground"
                                >
                                    Despesas Fixas
                                </Link>
                            </nav>
                        </SheetContent>
                    </Sheet>
                    <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
                        <form className="ml-auto flex-1 sm:flex-initial">
                            {/* <div className="relative">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    type="search"
                                    placeholder="Pesquisar transações..."
                                    className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
                                />
                            </div> */}
                        </form>

                        <Dropdown.Content contentClasses='ml-auto'>
                            <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                            <Dropdown.Link href={route('logout')} method="post" as="button">
                                Log Out
                            </Dropdown.Link>
                        </Dropdown.Content>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="secondary" size="icon" className="rounded-full">
                                    <CircleUser className="h-5 w-5" />
                                    <span className="sr-only">Toggle user menu</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>{user.name.split(' ')[0]} {user.name.split(' ')[1]}</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <Link href={route('profile.edit')}>Perfil</Link>
                                </DropdownMenuItem>

                                <DropdownMenuItem>Configurações</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <Dropdown.Link href={route('logout')} method="post" as="button">
                                        Sair
                                    </Dropdown.Link>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </header>
                <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 bg-muted/40">
                    <main>{children}</main>
                </main>
            </div>

            <Toaster />
        </>
    );
}
