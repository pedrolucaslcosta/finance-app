'use client'

import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { signIn } from "next-auth/react"

export function AuthForm() {
    const form = useForm();

    const handleSubmit = form.handleSubmit(async (data) => {
        console.log(data);
        await signIn('email', { email: data.email })
    })

    return (
        <div className="mx-auto max-w-sm flex flex-col justify-center min-h-[50vh]">
            <Card className="mx-auto max-w-sm">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold">Login</CardTitle>
                    <CardDescription>Enter your email below to login to your account</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" placeholder="m@example.com" required type="email" {... form.register('email')}/>
                        </div>
                        <Button className="w-full">Send Magic Link</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

