"use client";

import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import Cookies from 'js-cookie';
import { useState } from "react";
import { supabase } from "@/supabase";
import { LoadingButton } from "./button/loading-button";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [loading, setLoading] = useState(false);
  const [credencial, setCredencial] = useState({
    email: '',
    password: ''
  });

  const navigate = useRouter();

  const setAuth = useAuthStore((state) => state.setAuth);

  const onSubmit = async () => {
    setLoading(true);
    const { data } = await supabase.auth.signInWithPassword({
      email: credencial.email,
      password: credencial.password,
    })
    setLoading(false);

    if (!data) {
      return
    }

    const token = data.session?.access_token ?? ''

    setAuth({
      user: data.user!,
      session: data.session!,
      weakPassword: data.weakPassword!
    });

    Cookies.set('auth_token', token, {
      secure: process.env.NODE_ENV === 'production',
      expires: 1, // Exemplo: expira em 1 dia
    });

    navigate.push('/dashboard');
  }

  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Fazer autenticação</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Forneca a sua senha ou email para entrar na plataforma
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" value={credencial.email} onChange={(evt) => setCredencial({ ...credencial, email: evt.target.value })} required />
        </div>
        <div className="grid gap-3">
          <div className=" items-center hidden">
            <Label htmlFor="password">Senha</Label>
            <Link
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Esqueci minha senha?
            </Link>
          </div>
          <Input id="password" type="password" value={credencial.password} onChange={(evt) => setCredencial({ ...credencial, password: evt.target.value })} required />
        </div>
        <LoadingButton loading={loading} type="submit" className="w-full" onClick={onSubmit}>
          Entrar
        </LoadingButton>
      </div>
    </form>
  )
}
