import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { RotateCcw, BarChart3 } from "lucide-react";
import { useMemo } from "react";
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from "recharts";
import { Button } from "@/components/ui/button";
import { PageShell } from "@/components/PageShell";
import { store, useStoreSync } from "@/lib/store";
import { computeResults } from "@/lib/quiz";

export const Route = createFileRoute("/resultados")({
  head: () => ({ meta: [{ title: "Resultados — Conexão Solidária" }] }),
  beforeLoad: () => {
    if (typeof window !== "undefined" && !store.isAuthed()) {
      throw redirect({ to: "/login" });
    }
  },
  component: ResultsPage,
});

function ResultsPage() {
  const answers = useStoreSync(() => store.getAnswers());
  const completed = Object.keys(answers).length >= 12;
  const { areas, radar } = useMemo(() => computeResults(answers), [answers]);

  if (!completed) {
    return (
      <PageShell>
        <div className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-primary">
            <BarChart3 className="h-6 w-6" />
          </span>
          <h1 className="mt-5 text-2xl font-semibold">Sem resultados ainda</h1>
          <p className="mt-2 text-muted-foreground">
            Responda o questionário para gerar sua análise de compatibilidade.
          </p>
          <Button asChild className="mt-6">
            <Link to="/questionario">Responder questionário</Link>
          </Button>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        <header className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <h1 className="text-2xl font-semibold text-foreground sm:text-3xl">
              Sua análise de compatibilidade
            </h1>
            <p className="mt-1 text-muted-foreground">
              Resumo do seu perfil e áreas profissionais mais alinhadas.
            </p>
          </div>
          <Button asChild variant="outline">
            <Link to="/questionario">
              <RotateCcw className="mr-2 h-4 w-4" /> Refazer questionário
            </Link>
          </Button>
        </header>

        <section className="mt-8 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-base font-semibold">Seu perfil em 5 dimensões</h2>
          <p className="text-sm text-muted-foreground">
            Quanto mais alto cada eixo, maior sua afinidade com aquele aspecto.
          </p>
          <div className="mt-4 h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radar} outerRadius="75%">
                <PolarGrid stroke="oklch(0.92 0.012 245)" />
                <PolarAngleAxis dataKey="axis" tick={{ fill: "oklch(0.42 0.04 250)", fontSize: 12 }} />
                <PolarRadiusAxis
                  angle={90}
                  domain={[0, 100]}
                  tick={{ fill: "oklch(0.55 0.03 250)", fontSize: 10 }}
                  stroke="oklch(0.9 0.012 245)"
                />
                <Radar
                  name="Perfil"
                  dataKey="value"
                  stroke="oklch(0.48 0.09 255)"
                  fill="oklch(0.48 0.09 255)"
                  fillOpacity={0.25}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="mt-8">
          <h2 className="mb-3 text-base font-semibold">Áreas profissionais compatíveis</h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {areas.map((a) => (
              <li
                key={a.name}
                className="rounded-2xl border border-border bg-card p-5 shadow-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-sm font-semibold text-foreground">{a.name}</h3>
                  <span className="text-sm font-semibold text-primary">{a.score}%</span>
                </div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{ width: `${a.score}%` }}
                  />
                </div>
                <p className="mt-3 text-sm text-muted-foreground">{a.description}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </PageShell>
  );
}
