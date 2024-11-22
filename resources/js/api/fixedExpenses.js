// api/fixedExpenses.js

import { toast } from "sonner"

const csrfToken = document.querySelector('meta[name="csrf-token"]').content;

// -----------------------------------------------------------------------------

// export const fetchFixedExpenses = async () => {
//     const response = await fetch("/fixed-expenses");
//     if (!response.ok) {
//         throw new Error("Erro ao buscar despesas");
//     }
//     return response.json();
// };


export const createOrUpdateFixedExpense = async (fixedExpense, initialData) => {

    try {
        const url = initialData?.id ? `/fixed-expenses/${initialData.id}` : "/fixed-expenses";

        const method = initialData?.id ? "PUT" : "POST";

        const response = await fetch(url, {
            method: method,
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": csrfToken,
            },
            body: JSON.stringify(fixedExpense),
        });

        if (response.ok) { 
            toast("Dados atualizados com sucesso!");
        } else {
            const errorData = await response.json();
            toast(`Erro ao enviar os dados: ${errorData.message || "Erro desconhecido"}`);
        }

        return response.json();
    } catch (error) {
        console.error("Erro na requisição:", error);
        toast("Ocorreu um erro inesperado. Tente novamente mais tarde.");
    }

};


export const deleteFixedExpense = async (id) => {

    try {
        const response = await fetch(`/fixed-expenses/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": csrfToken,
            },
        });

        if (response.ok) {
            toast("Despesa excluída com sucesso!");
            // Você pode atualizar a lista de despesas ou fechar o modal, se necessário.
        } else {
            const errorData = await response.json();
            toast(`Erro ao excluir despesa: ${errorData.message || "Erro desconhecido"}`);
        }
        return response.json();
        
    } catch (error) {
        console.error("Erro ao excluir despesa:", error);
        toast("Ocorreu um erro inesperado. Tente novamente.");
    }   
};
