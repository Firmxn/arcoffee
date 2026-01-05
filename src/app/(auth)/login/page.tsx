"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { loginAction } from "@/actions/auth-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Coffee, Loader2 } from "lucide-react";

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button className="w-full" type="submit" disabled={pending}>
            {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            Masuk ke Dashboard
        </Button>
    );
}

export default function LoginPage() {
    const [state, action] = useActionState(loginAction, null);

    return (
        <div className="flex min-h-screen items-center justify-center bg-muted/30 px-4 py-12 dark:bg-muted/10">
            <div className="w-full max-w-sm space-y-6">
                <div className="flex flex-col items-center gap-2 text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                        <Coffee className="h-6 w-6" />
                    </div>
                    <h1 className="text-2xl font-bold">Admin Portal</h1>
                    <p className="text-balance text-sm text-muted-foreground">
                        Masukkan kredensial Anda untuk mengakses dashboard.
                    </p>
                </div>

                <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                    <div className="p-6 pt-0 mt-6">
                        <form action={action} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="admin@arcoffee.com"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                </div>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    placeholder="••••••••"
                                />
                            </div>

                            {state?.error && (
                                <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
                                    {state.error}
                                </div>
                            )}

                            <SubmitButton />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
