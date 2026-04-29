import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Toaster } from "@/components/ui/sonner";
import { SiteFooter } from "@/components/SiteHeader";
import { auth } from "@/lib/store";

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
  const [tab, setTab] = useState<"entrar" | "criar">("entrar");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setLoading(true);
    const { error } = await auth.signIn(email, password);
    setLoading(false);
    if (error) {
      toast.error(
        error.message.toLowerCase().includes("invalid")
          ? "E-mail ou senha incorretos."
          : error.message
      );
      return;
    }
    toast.success("Bem-vindo de volta!");
    navigate({ to: "/home" });
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    if (password.length < 6) {
      toast.error("A senha precisa ter pelo menos 6 caracteres.");
      return;
    }
    setLoading(true);
    const { data, error } = await auth.signUp(email, password);
    setLoading(false);
    if (error) {
      toast.error(
        error.message.toLowerCase().includes("registered")
          ? "Este e-mail já está cadastrado. Tente entrar."
          : error.message
      );
      return;
    }
    if (data.session) {
      toast.success("Conta criada! Vamos começar.");
      navigate({ to: "/home" });
    } else {
      toast.success("Conta criada! Verifique seu e-mail para confirmar.");
      setTab("entrar");
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Toaster />
      <header className="border-b border-border/60 bg-background/85 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center px-4 sm:px-6">
          <Link to="/" className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/15 text-primary">
              <Heart className="h-4 w-4" />
            </span>
            <span className="text-base font-semibold">Conexão Solidária</span>
          </Link>
        </div>
      </header>

      <main className="flex-1">
        <div className="mx-auto flex max-w-md flex-col px-4 py-16 sm:px-6">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <Tabs value={tab} onValueChange={(v) => setTab(v as "entrar" | "criar")} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="entrar">Entrar</TabsTrigger>
                <TabsTrigger value="criar">Criar conta</TabsTrigger>
              </TabsList>

              <TabsContent value="entrar" className="mt-6">
                <p className="mb-5 text-center text-sm text-muted-foreground">
                  Acesse sua conta para continuar sua jornada.
                </p>
                <form className="space-y-4" onSubmit={handleSignIn}>
                  <div className="space-y-1.5">
                    <Label htmlFor="email">E-mail</Label>
                    <Input
                      id="email"
                      type="email"
                      autoComplete="email"
                      placeholder="seu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      onInvalid={(e) => {
                        const t = e.currentTarget;
                        t.setCustomValidity(
                          t.validity.valueMissing
                            ? "Por favor, informe seu e-mail."
                            : "Digite um e-mail válido (ex.: nome@exemplo.com)."
                        );
                      }}
                      onInput={(e) => e.currentTarget.setCustomValidity("")}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="password">Senha</Label>
                    <Input
                      id="password"
                      type="password"
                      autoComplete="current-password"
                      placeholder="Digite sua senha"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      onInvalid={(e) =>
                        e.currentTarget.setCustomValidity("Por favor, informe sua senha.")
                      }
                      onInput={(e) => e.currentTarget.setCustomValidity("")}
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Entrando..." : "Entrar →"}
                  </Button>
                  <p className="text-center text-sm text-muted-foreground">
                    Não tem conta?{" "}
                    <button
                      type="button"
                      className="font-medium text-primary hover:underline"
                      onClick={() => setTab("criar")}
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
                <form className="space-y-4" onSubmit={handleSignUp}>
                  <div className="space-y-1.5">
                    <Label htmlFor="email-c">E-mail</Label>
                    <Input
                      id="email-c"
                      type="email"
                      autoComplete="email"
                      placeholder="seu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      onInvalid={(e) => {
                        const t = e.currentTarget;
                        t.setCustomValidity(
                          t.validity.valueMissing
                            ? "Por favor, informe seu e-mail."
                            : "Digite um e-mail válido (ex.: nome@exemplo.com)."
                        );
                      }}
                      onInput={(e) => e.currentTarget.setCustomValidity("")}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="password-c">Senha</Label>
                    <Input
                      id="password-c"
                      type="password"
                      autoComplete="new-password"
                      placeholder="Mínimo 6 caracteres"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength={6}
                      onInvalid={(e) => {
                        const t = e.currentTarget;
                        t.setCustomValidity(
                          t.validity.valueMissing
                            ? "Por favor, crie uma senha."
                            : "A senha precisa ter pelo menos 6 caracteres."
                        );
                      }}
                      onInput={(e) => e.currentTarget.setCustomValidity("")}
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Criando..." : "Criar conta →"}
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
