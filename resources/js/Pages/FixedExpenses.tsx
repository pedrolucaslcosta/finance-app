import { Button } from '@/Components/ui/button';
import { Card, CardContent } from '@/Components/ui/card';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { z } from 'zod';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Ellipsis, Menu, PlusCircle } from 'lucide-react';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { FixedExpenseForm } from './FixedExpenseForm';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu"
import { useEffect, useState } from 'react';

interface Props {
    fixed_expenses: any;
}

interface Expense {
    id: number;
    description: string;
    billing_day: number;
    amount: number;
    status: string;
}

export default function FixedExpenses({ fixed_expenses }: Props) {

    const [isFixedExpensesDialogOpen, setIsFixedExpensesDialogOpen] = useState(false);
    const [initialData, setInitialData] = useState<any>(null); // Estado para dados iniciais (para edição)

    // Função para abrir o formulário no modo de criação
    const openCreateFEDialog = () => {
        setInitialData(null); // Limpa dados anteriores quando criando
        setIsFixedExpensesDialogOpen(true);
    };

    // Função para abrir o formulário no modo de edição
    const openEditFEDialog = (expense: any) => {
        setInitialData(expense); // Preenche com os dados da despesa
        setIsFixedExpensesDialogOpen(true);
    };

    const openFixedExpensesDialog = () => setIsFixedExpensesDialogOpen(true);
    const closeFixedExpensesDialog = () => setIsFixedExpensesDialogOpen(false);

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Despesas Fixas
                </h2>
            }
        >
            <Head title="Despesas Fixas" />

            <div className="flex justify-end">
                <Dialog open={isFixedExpensesDialogOpen} onOpenChange={setIsFixedExpensesDialogOpen}>
                    <DialogTrigger asChild>
                        <Button onClick={openCreateFEDialog}><PlusCircle /> Nova</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>{initialData ? "Editar Despesa Fixa" : "Nova Despesa Fixa"}</DialogTitle>
                            <DialogDescription>
                                {initialData ? "Edite os dados da despesa fixa." : "Preencha os dados da nova despesa fixa."}
                            </DialogDescription>
                        </DialogHeader>
                        <FixedExpenseForm initialData={initialData} />
                    </DialogContent>
                </Dialog>
            </div>



            <Table>
                <TableCaption>Lista das transações mais recentes.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Dia de pagamento</TableHead>
                        <TableHead>Descrição</TableHead>
                        <TableHead>Valor</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {fixed_expenses.length === 0 ? (
                        <TableRow>
                            <TableCell className="font-medium" colSpan={4}>
                                <p className="text-center">Nenhuma despesa fixa encontrada.</p>
                            </TableCell>
                        </TableRow>
                    ) : (
                        fixed_expenses.map((expense: any) => (
                            <TableRow key={expense.id}>
                                <TableCell>{expense.billing_day}</TableCell>
                                <TableCell className="font-medium">{expense.description}</TableCell>
                                <TableCell>{expense.amount}</TableCell>
                                <TableCell className="text-right">{expense.status}</TableCell>
                                <TableCell className='text-right'>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger>
                                            <Button variant={'ghost'} size={'icon'}>
                                                <Ellipsis />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>

                                            <DropdownMenuItem onClick={() => openEditFEDialog(expense)}>
                                                Editar
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem>Apagar</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>

        </AuthenticatedLayout>
    );
}
