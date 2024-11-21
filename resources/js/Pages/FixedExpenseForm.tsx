
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/Components/ui/button"
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
import { DialogFooter } from "@/Components/ui/dialog"

const formSchema = z.object({
    description: z.string().min(2).max(50),
    billing_day: z.number(),
    amount: z.string().transform((val) => Number(val)),
})

const csrfToken = document.querySelector('meta[name="csrf-token"]').content;

export function FixedExpenseForm({ initialData = null }) {

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            description: '',
            billing_day: 1,
            amount: 0,
        },
    })

    // 2. Define a submit handler.
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const url = initialData?.id ? `/fixed-expenses/${initialData.id}` : "/fixed-expenses";
            console.log('url', url);

            const method = initialData?.id ? "PUT" : "POST";
            console.log('method', method);

            const response = await fetch(url, {
                method: method,
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": csrfToken,
                },
                body: JSON.stringify(values),
            });

            if (response.ok) {
                alert("Dados atualizados com sucesso!");
            } else {
                const errorData = await response.json();
                alert(`Erro ao enviar os dados: ${errorData.message || "Erro desconhecido"}`);
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
            alert("Ocorreu um erro inesperado. Tente novamente mais tarde.");
        }
    };


    return (
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
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="billing_day"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Dia do pagamento</FormLabel>
                            <FormControl>
                                <Input type="number" placeholder="Ex.: 5" {...field} max={31} min={1} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Valor (R$)</FormLabel>
                            <FormControl>
                                <Input placeholder="Ex.: 5,40" {...field} type="number" step={0.01} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <DialogFooter>
                    <Button type="submit">
                        {initialData ? "Atualizar" : "Salvar"}
                    </Button>
                </DialogFooter>
            </form>
        </Form>
    )
}
