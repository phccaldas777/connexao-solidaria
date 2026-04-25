import { createFileRoute, Link, Navigate } from "@tanstack/react-router";
import { CheckCircle2, ClipboardList, BarChart3, UserRound, ArrowRight, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageShell } from "@/components/PageShell";
import { useAuth, useAnswers } from "@/lib/store";

export const Route = createFileRoute("/home")({
  head: () => ({
    meta: [{ title: "Início — Conexão Solidária" }],
  }),
  component: HomePage,
});

function HomePage() {
  const { user, isAuthed, loading: authLoading } = useAuth();
  const { completed, loading } = useAnswers(user);

  if (authLoading) return <PageShell><LoadingState /></PageShell>;
  if (!isAuthed) return <Navigate to="/login" />;

  return (
    <PageShell>
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="flex items-start gap-3">
          <span className="mt-1 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-sm">
            <Home className="h-5 w-5" />
          </span>
          <div>
            <h1 className="text-2xl font-semibold text-foreground sm:text-3xl">
              Bem-vindo ao Conexão Solidária
            </h1>
            <p className="mt-2 max-w-2xl text-muted-foreground">
              Aqui você pode descobrir ambientes de trabalho mais compatíveis com seu
              perfil, no seu tempo e ritmo.
            </p>
          </div>
        </div>

        {!loading && completed && (
          <div className="mt-8 flex items-start gap-3 rounded-xl border border-success/40 bg-success/15 px-4 py-3 text-sm text-success-foreground">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
            <p>
              Questionário completo! Confira seus resultados ou refaça o questionário
              quando quiser.
            </p>
          </div>
        )}

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <ActionCard
            icon={ClipboardList}
            title="Questionário"
            desc="Responder o questionário para obter a análise."
            cta="Responder questionário"
            to="/questionario"
          />
          <ActionCard
            icon={BarChart3}
            title="Resultados"
            desc="Veja sua análise de compatibilidade."
            cta="Ver resultados"
            to="/resultados"
            disabled={!completed}
          />
          <ActionCard
            icon={UserRound}
            title="Meu perfil"
            desc="Monte seu perfil profissional e currículo."
            cta="Criar perfil"
            to="/perfil"
          />
        </div>
      </div>
    </PageShell>
  );
}

function LoadingState() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-20 text-center text-sm text-muted-foreground">
      Carregando...
    </div>
  );
}

function ActionCard({
  icon: Icon,
  title,
  desc,
  cta,
  to,
  disabled,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
  cta: string;
  to: "/questionario" | "/resultados" | "/perfil";
  disabled?: boolean;
}) {
  return (
    <div className="flex flex-col rounded-2xl border border-border bg-card p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary/15 to-accent/40 text-primary">
        <Icon className="h-5 w-5" />
      </span>
      <h3 className="mt-4 text-base font-semibold text-foreground">{title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
      <div className="mt-5">
        {disabled ? (
          <Button variant="outline" className="w-full" disabled>
            {cta} <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        ) : (
          <Button asChild variant="outline" className="w-full">
            <Link to={to}>
              {cta} <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
}
