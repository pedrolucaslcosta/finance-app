import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { Button } from "@/Components/ui/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu"

export type FixedExpense = {
	id: number;
	description: string;
	amount: number;
};

export const columns: ColumnDef<FixedExpense>[] = [
	{
		accessorKey: "id",
		header: "ID",
	},
	{
		accessorKey: "description",
		// header: "Descrição",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Descrição
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			)
		},
	},
	{
		accessorKey: "amount",
		// header: () => <div className="text-right">Valor</div>,
		header: ({ column }) => {
			return (
				<div className="text-right">
					<Button
						variant="ghost"
						onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					>
						Valor
						<ArrowUpDown className="ml-2 h-4 w-4" />
					</Button>
				</div>
			)
		},
		cell: ({ row }) => {
			const amount = parseFloat(row.getValue("amount"))
			const formatted = new Intl.NumberFormat("pt-BR", {
				style: "currency",
				currency: "BRL",
			}).format(amount)

			return <div className="text-right font-medium">{formatted}</div>
		},
	},
	{
		id: "actions",
		cell: () => {
			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" className="h-8 w-8 p-0">
							<span className="sr-only">Open menu</span>
							<MoreHorizontal className="h-4 w-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuLabel>Ações</DropdownMenuLabel>
						<DropdownMenuItem>Editar</DropdownMenuItem>
						<DropdownMenuItem>Apagar</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			)
		},
	}
]
