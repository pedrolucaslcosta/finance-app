import { Button } from '@/Components/ui/button';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { toast } from "sonner"
import { Badge } from "@/Components/ui/badge";
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
import { Dot, Ellipsis, HandCoins, PlusCircle } from 'lucide-react';
import { FixedExpenseForm } from './FixedExpenseForm';

import { deleteFixedExpense } from "@/api/fixedExpenses";
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
} from "@/Components/ui/alert-dialog"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu"
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';

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

    const [isDeleteFEDialogOpen, setIsDeleteFEDialogOpen] = useState(false);
    const [confirmDeletion, setConfirmDeletion] = useState(false);

    console.log('confirmDeletion: ', confirmDeletion);
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

    const csrfToken = document.querySelector('meta[name="csrf-token"]').content;

    const openDeleteFEDialog = (id: number) => setIsDeleteFEDialogOpen(true);
    const closeDeleteFEDialog = () => setIsDeleteFEDialogOpen(false);

    const openFixedExpensesDialog = () => setIsFixedExpensesDialogOpen(true);
    const closeFixedExpensesDialog = () => setIsFixedExpensesDialogOpen(false);

    const [expenseIdToDelete, setExpenseIdToDelete] = useState<number | null>(null);

    const handleDelete = async (id: number) => {

        openDeleteFEDialog(id);

        if (!confirmDeletion) return;

        deleteFixedExpense(id);
    };

    // Verifica se a exclusão foi confirmada e então executa a função handleDelete
    useEffect(() => {
        if (confirmDeletion && expenseIdToDelete) {
            handleDelete(expenseIdToDelete);
            setIsDeleteFEDialogOpen(false);  // Fecha o modal de confirmação após excluir
        }
    }, [confirmDeletion, expenseIdToDelete]);

    function getFEStatus(status: string) {
        switch (status) {
            case 'paid':
                return 'Pago'
            case 'pending':
                return 'Pendente'
            default:
                return ''
        }
    }

    const [expenses, setExpenses] = useState([]);

    const fetchExpenses = async () => {
        try {
            const response = await fetch("/fixed-expenses/list");
            const data = await response.json();
            setExpenses(data);
        } catch (error) {
            console.error("Erro ao buscar despesas:", error);
        }
    };


    // Buscar despesas ao montar o componente
    useEffect(() => {
        fetchExpenses();
    }, []);

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Despesas Fixas
                </h2>
            }
        >
            <Head title="Despesas Fixas" />

            {/* CONFIRMATION DIALOG */}
            <AlertDialog open={isDeleteFEDialogOpen} onOpenChange={setIsDeleteFEDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Deseja excluir esta despesa?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Esta ação não pode ser desfeita.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() => {
                                if (expenseIdToDelete) {
                                    setConfirmDeletion(true);  // Confirma a exclusão
                                }
                            }}>
                            Apagar
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <Dialog open={isFixedExpensesDialogOpen} onOpenChange={setIsFixedExpensesDialogOpen}>
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

            <div className="flex items-center justify-between space-y-2">
                <div>
                    <div className='flex items-center gap-1 text-gray-800'>
                        <div>
                            <h1 className='text-3xl font-semibold vertical-align-middle leading-tight text-gray-800'>
                                Despesas Fixas
                            </h1>
                        </div>
                    </div>
                </div>
                <Button onClick={openCreateFEDialog}><PlusCircle /> Nova</Button>
            </div>


            <Card className='shadow-none'>
                <CardContent className='p-0'>

                    <Table>
                        {/* <TableCaption>Lista das transações mais recentes.</TableCaption> */}
                        <TableHeader>
                            <TableRow>
                                <TableHead className='w-10 text-center'>Dia</TableHead>
                                <TableHead className=''>Descrição</TableHead>
                                <TableHead className='text-right'>Valor</TableHead>
                                <TableHead className="text-center hidden block-md">Status</TableHead>
                                <TableHead className="text-right hidden block-md">Ações</TableHead>
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
                                        <TableCell className='text-center'>{expense.billing_day}</TableCell>
                                        <TableCell className="font-medium">{expense.description}</TableCell>
                                        <TableCell className='text-right'>R$ {expense.amount}</TableCell>
                                        <TableCell className="text-center">
                                            <span className='block-md'>
                                                <Dot size={40} className='text-red-500'></Dot>
                                            </span>
                                            <Badge variant="outline" className='hidden'>
                                                {getFEStatus(expense.status)}
                                            </Badge>
                                        </TableCell>
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
                                                    <DropdownMenuItem
                                                        onClick={() => {
                                                            setExpenseIdToDelete(expense.id);  // Define o id da despesa a ser excluída
                                                            setIsDeleteFEDialogOpen(true);  // Abre o modal de confirmação
                                                        }}>
                                                        Apagar
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

        </AuthenticatedLayout>
    );
}
