import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { PageShell } from "@/components/PageShell";
import { store } from "@/lib/store";
import { STEPS } from "@/lib/quiz";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/questionario")({
  head: () => ({ meta: [{ title: "Questionário — Conexão Solidária" }] }),
  beforeLoad: () => {
    if (typeof window !== "undefined" && !store.isAuthed()) {
      throw redirect({ to: "/login" });
    }
  },
  component: QuestionnairePage,
});

function QuestionnairePage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>(
    () => store.getAnswers()
  );

  const total = STEPS.length;
  const current = STEPS[step];
  const progress = ((step + 1) / total) * 100;

  const select = (qId: string, value: string, type: "single" | "multi") => {
    setAnswers((prev) => {
      if (type === "single") return { ...prev, [qId]: value };
      const cur = Array.isArray(prev[qId]) ? (prev[qId] as string[]) : [];
      const next = cur.includes(value) ? cur.filter((v) => v !== value) : [...cur, value];
      return { ...prev, [qId]: next };
    });
  };

  const isSelected = (qId: string, value: string) => {
    const v = answers[qId];
    return Array.isArray(v) ? v.includes(value) : v === value;
  };

  const canProceed = useMemo(
    () => current.questions.every((q) => {
      const v = answers[q.id];
      return Array.isArray(v) ? v.length > 0 : Boolean(v);
    }),
    [current, answers]
  );

  const next = () => {
    store.setAnswers(answers);
    if (step < total - 1) {
      setStep(step + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate({ to: "/resultados" });
    }
  };

  const prev = () => {
    if (step > 0) {
      setStep(step - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <PageShell>
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <header className="mb-6">
          <h1 className="text-2xl font-semibold text-foreground sm:text-3xl">
            Questionário de Preferências
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Responda com calma, no seu tempo. Não existem respostas certas ou erradas.
          </p>
        </header>

        {/* Progress bar */}
        <div className="mb-2 h-2 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-primary transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Steps indicator */}
        <ol className="mb-8 grid grid-cols-5 gap-2 text-center">
          {STEPS.map((s, i) => {
            const done = i < step;
            const active = i === step;
            return (
              <li key={s.id} className="flex flex-col items-center gap-2">
                <span
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full text-xs font-medium transition-colors",
                    done && "bg-primary/15 text-primary",
                    active && "bg-primary text-primary-foreground",
                    !done && !active && "bg-muted text-muted-foreground"
                  )}
                >
                  {done ? <Check className="h-4 w-4" /> : i + 1}
                </span>
                <span
                  className={cn(
                    "text-[11px] sm:text-xs",
                    active ? "font-medium text-foreground" : "text-muted-foreground"
                  )}
                >
                  {s.title.split(" ")[0]}
                </span>
              </li>
            );
          })}
        </ol>

        {/* Card */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
          <h2 className="text-lg font-semibold text-foreground">{current.title}</h2>
          <p className="mt-1 text-sm text-muted-foreground">{current.subtitle}</p>

          <div className="mt-6 space-y-7">
            {current.questions.map((q) => (
              <div key={q.id}>
                <h3 className="mb-3 text-sm font-medium text-foreground">
                  {q.label}
                  {q.type === "multi" && (
                    <span className="ml-2 text-xs font-normal text-muted-foreground">
                      (selecione uma ou mais)
                    </span>
                  )}
                </h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  {q.options.map((o) => {
                    const selected = isSelected(q.id, o.value);
                    return (
                      <button
                        key={o.value}
                        type="button"
                        onClick={() => select(q.id, o.value, q.type)}
                        className={cn(
                          "group flex items-center gap-3 rounded-xl border bg-card px-4 py-3 text-left text-sm transition-all",
                          "hover:border-primary/40 hover:bg-soft",
                          selected
                            ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                            : "border-border"
                        )}
                        aria-pressed={selected}
                      >
                        <span
                          className={cn(
                            "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors",
                            selected
                              ? "border-primary bg-primary text-primary-foreground"
                              : "border-border bg-background"
                          )}
                        >
                          {selected && <Check className="h-3 w-3" />}
                        </span>
                        <span className="text-foreground">{o.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer nav */}
        <div className="mt-6 flex items-center justify-between">
          <Button variant="outline" onClick={prev} disabled={step === 0}>
            <ArrowLeft className="mr-1 h-4 w-4" /> Anterior
          </Button>
          <span className="text-sm text-muted-foreground">
            {step + 1} de {total}
          </span>
          <Button onClick={next} disabled={!canProceed}>
            {step === total - 1 ? "Ver resultados" : "Próximo"}{" "}
            <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </div>
    </PageShell>
  );
}
