export interface FixedExpense {
    id: number;
    description: string;
    billing_day: number;
    amount: string;
    status: 'pending' | 'paid';
    created_at: string;
    updated_at: string;
}