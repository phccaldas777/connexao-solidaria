import { createFileRoute, Link } from "@tanstack/react-router";
import { Sparkles, ShieldCheck, BarChart3, UserRound, Accessibility, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageShell } from "@/components/PageShell";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Conexão Solidária — Encontre o ambiente de trabalho ideal" },
      {
        name: "description",
        content:
          "Sistema acolhedor para pessoas no espectro autista descobrirem ambientes de trabalho compatíveis com seu perfil.",
      },
      { property: "og:title", content: "Conexão Solidária" },
      {
        property: "og:description",
        content: "Inclusão real no mercado de trabalho para pessoas autistas.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <PageShell>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-5xl px-4 py-20 text-center sm:px-6 sm:py-28">
          <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
            <Sparkles className="h-3.5 w-3.5" /> Inclusão no mercado de trabalho
          </span>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Encontre o ambiente de trabalho{" "}
            <span className="text-primary">ideal para você</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Um sistema pensado para pessoas com Transtorno do Espectro Autista que
            desejam descobrir ambientes profissionais mais compatíveis com seu perfil
            e necessidades.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" className="rounded-full px-6">
              <Link to="/login">
                Começar agora <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full px-6">
              <Link to="/sobre">Saiba mais</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Como funciona */}
      <section className="border-t border-border/60 bg-muted/40">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-foreground sm:text-3xl">
              Como funciona
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              Uma experiência simples e acolhedora para ajudar você a entender suas
              preferências profissionais.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: ShieldCheck,
                title: "Ambiente seguro",
                desc: "Questionário sem pressão, no seu tempo e ritmo.",
              },
              {
                icon: BarChart3,
                title: "Análise personalizada",
                desc: "Resultados baseados nas suas preferências reais.",
              },
              {
                icon: UserRound,
                title: "Perfil profissional",
                desc: "Monte seu currículo e identifique seus pontos fortes.",
              },
              {
                icon: Accessibility,
                title: "Acessibilidade",
                desc: "Design pensado para conforto e baixa estimulação.",
              },
            ].map((c) => (
              <div
                key={c.title}
                className="rounded-2xl border border-border bg-card p-6 shadow-sm"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <c.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-base font-semibold text-foreground">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section>
        <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6">
          <h2 className="text-2xl font-semibold text-foreground sm:text-3xl">
            Pronto para descobrir seu perfil?
          </h2>
          <p className="mt-3 text-muted-foreground">
            O questionário leva cerca de 5 minutos e você pode pausar a qualquer
            momento.
          </p>
          <div className="mt-6">
            <Button asChild size="lg" className="rounded-full px-6">
              <Link to="/login">
                Iniciar questionário <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
