import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SiteFooter } from "@/components/SiteHeader";
import { store } from "@/lib/store";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Entrar — Conexão Solidária" },
      { name: "description", content: "Acesse sua conta no Conexão Solidária." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    store.login(email);
    navigate({ to: "/home" });
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="border-b border-border/60 bg-background/85 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center px-4 sm:px-6">
          <Link to="/" className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Heart className="h-4 w-4" />
            </span>
            <span className="text-base font-semibold">Conexão Solidária</span>
          </Link>
        </div>
      </header>

      <main className="flex-1">
        <div className="mx-auto flex max-w-md flex-col px-4 py-16 sm:px-6">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <Tabs defaultValue="entrar" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="entrar">Entrar</TabsTrigger>
                <TabsTrigger value="criar">Criar conta</TabsTrigger>
              </TabsList>

              <TabsContent value="entrar" className="mt-6">
                <p className="mb-5 text-center text-sm text-muted-foreground">
                  Acesse sua conta para continuar sua jornada.
                </p>
                <form className="space-y-4" onSubmit={submit}>
                  <div className="space-y-1.5">
                    <Label htmlFor="email">E-mail</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Digite seu e-mail"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="password">Senha</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Digite sua senha"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Começar agora →
                  </Button>
                  <p className="text-center text-sm text-muted-foreground">
                    Não tem conta?{" "}
                    <button
                      type="button"
                      className="font-medium text-primary hover:underline"
                      onClick={() => {
                        const t = document.querySelector<HTMLButtonElement>(
                          '[data-state][value="criar"]'
                        );
                        t?.click();
                      }}
                    >
                      Criar conta grátis
                    </button>
                  </p>
                </form>
              </TabsContent>

              <TabsContent value="criar" className="mt-6">
                <p className="mb-5 text-center text-sm text-muted-foreground">
                  Crie sua conta gratuita em segundos.
                </p>
                <form className="space-y-4" onSubmit={submit}>
                  <div className="space-y-1.5">
                    <Label htmlFor="email-c">E-mail</Label>
                    <Input
                      id="email-c"
                      type="email"
                      placeholder="Digite seu e-mail"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="password-c">Senha</Label>
                    <Input
                      id="password-c"
                      type="password"
                      placeholder="Crie uma senha"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Criar conta →
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
