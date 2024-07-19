import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import { Alert, AlertDescription, AlertTitle } from "@/Components/ui/alert"
import { AppWindowIcon } from 'lucide-react';

export default function Dashboard({ auth }: PageProps) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <Alert>
                <AppWindowIcon className="h-4 w-4" />
                <AlertTitle>Olá, {auth.user.name}!</AlertTitle>
                <AlertDescription>
                    Seja bem-vindo ao Finanças.
                </AlertDescription>
            </Alert>
        </AuthenticatedLayout>
    );
}
