import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { PageProps } from '@/types';
import { Button } from '@/Components/ui/button';
import { Plus, PlusCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/Components/ui/card'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/Components/ui/dropdown-menu'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/ui/table'
import { MoreHorizontal } from "lucide-react"
import { Badge } from "@/Components/ui/badge";
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

    // useEffect(() => {
    //     const handleSuccessToast = () => {
    //         setIsDialogOpen(false);
    //     };

    //     handleSuccessToast();
    // }, [toast.success]);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Transações</h2>}
        >
            <Head title="Transações" />
            <div className="flex justify-end my-2">
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
            <Card>
                <CardHeader>
                    <CardTitle>Despesas Fixas

                    </CardTitle>
                    <CardDescription>
                        Gerencie entradas e saídas registradas na sua conta.
                    </CardDescription>

                </CardHeader>
                <CardContent>
                    <DataTable columns={columns} data={fixedExpenses}/>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>Descrição</TableHead>
                                <TableHead>Valor</TableHead>
                                <TableHead>
                                    <span className="sr-only">Actions</span>
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                fixedExpenses && fixedExpenses.length > 0 ? (
                                    fixedExpenses.map((fixedExpense) => (
                                        <TableRow key={fixedExpense.id}>
                                            <TableCell>
                                                {fixedExpense.id}
                                            </TableCell>
                                            <TableCell className="font-medium">
                                                {fixedExpense.description}
                                            </TableCell>
                                            <TableCell>
                                                R${fixedExpense.amount}
                                            </TableCell>
                                            <TableCell>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button aria-haspopup="true" size="icon" variant="ghost">
                                                            <MoreHorizontal className="h-4 w-4" />
                                                            <span className="sr-only">Toggle menu</span>
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                        <DropdownMenuItem>Edit</DropdownMenuItem>
                                                        <DropdownMenuItem>Delete</DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={5}>
                                            <div className="text-center">
                                                <p className="text-sm text-muted-foreground">
                                                    Nenhuma Despesa Fixa
                                                </p>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )
                            }
                        </TableBody>
                    </Table>
                </CardContent>
                <CardFooter>
                    <div className="text-xs text-muted-foreground">
                        Showing <strong>1-10</strong> of <strong>32</strong> products
                    </div>
                </CardFooter>
            </Card>
        </AuthenticatedLayout>
    );
}
