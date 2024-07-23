import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { PageProps } from '@/types';
import { Button } from '@/Components/ui/button';
import { PlusCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/Components/ui/card'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/Components/ui/dropdown-menu'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/ui/table'
import { MoreHorizontal } from "lucide-react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/Components/ui/form"
import { Input } from "@/Components/ui/input"
import { toast } from 'sonner';
import { useEffect, useState } from 'react';
import { columns, FixedExpense } from './Columns';
import { DataTable } from '@/Components/ui/data-table';

const formSchema = z.object({
    description: z.string().min(1).max(50),
    amount: z.string().min(1).max(50),
});

export default function FixedExpenses({ auth, fixedExpenses }: PageProps<{ fixedExpenses: FixedExpense[] }>) {

    const [isDialogOpen, setIsDialogOpen] = useState(false);

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            description: "",
            amount: "",
        },
    })

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        router.post('/fixed-expense', values, {
            onSuccess: () => {
                toast.success('Conta Fixa Criada com Sucesso!');
                // setIsDialogOpen(false);
                form.reset();
            },
            onError: () => {
                toast.error('Erro ao criar conta fixa.');
            }
        });
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Transações</h2>}
        >
            <Head title="Transações" />
            <div className="flex justify-between my-2">
                <div>
                    <h3 className='font-semibold text-xl text-gray-800 leading-tight'>Despesas Fixas</h3>
                    <p className='text-muted-foreground'>Gerencie entradas e saídas registradas na sua conta.</p>
                </div>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger>
                        <Button>
                            <PlusCircle className='h-4 w-4 mr-2'></PlusCircle>
                            Adicionar
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Nova Despesa Fixa</DialogTitle>
                            <DialogDescription>
                                Adicione uma nova Despesa Fixa.
                            </DialogDescription>
                        </DialogHeader>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                <FormField
                                    control={form.control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Descrição</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Ex.: Aluguel" {...field} />
                                            </FormControl>
                                            {/* <FormDescription>
                                                Esse é o nome que aparecerá como título da Despesa Fixa.
                                            </FormDescription> */}
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="amount"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Valor</FormLabel>
                                            <FormControl>
                                                <Input placeholder="00.00" {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit">Criar</Button>
                            </form>
                        </Form>
                    </DialogContent>
                </Dialog>
            </div>
            <DataTable columns={columns} data={fixedExpenses} />
        </AuthenticatedLayout>
    );
}
