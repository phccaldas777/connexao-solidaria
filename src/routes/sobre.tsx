import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, Sparkles, Accessibility, Lock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageShell } from "@/components/PageShell";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "Sobre — Conexão Solidária" },
      {
        name: "description",
        content:
          "Conheça a missão do Conexão Solidária: inclusão real no mercado de trabalho para pessoas autistas.",
      },
      { property: "og:title", content: "Sobre — Conexão Solidária" },
      {
        property: "og:description",
        content: "Como o Conexão Solidária ajuda pessoas autistas no mercado.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <PageShell>
      <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
        <h1 className="text-3xl font-semibold text-foreground sm:text-4xl">
          Sobre o projeto
        </h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Construímos uma experiência simples e acolhedora para apoiar pessoas no
          espectro autista a encontrarem ambientes profissionais mais compatíveis com
          quem elas são.
        </p>

        <section className="mt-10 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-lg font-semibold">Nossa missão</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Promover inclusão real no mercado de trabalho, oferecendo uma ferramenta
            que respeita o tempo, o ritmo e as preferências de cada pessoa, sem
            rótulos ou pressões.
          </p>
        </section>

        <section className="mt-6 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-lg font-semibold">Como funciona</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Um questionário curto explora cinco dimensões — sensorial, comunicação,
            rotina, tarefas e social — e gera uma análise de compatibilidade com
            diferentes áreas profissionais. Você pode revisar, refazer ou pausar a
            qualquer momento.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-lg font-semibold">Nossos valores</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {[
              { icon: Heart, title: "Inclusão", desc: "Pensado por e para pessoas neurodivergentes." },
              { icon: Sparkles, title: "Personalização", desc: "Resultados que refletem você, não estereótipos." },
              { icon: Accessibility, title: "Acessibilidade", desc: "Design calmo, com baixa estimulação visual." },
              { icon: Lock, title: "Privacidade", desc: "Suas respostas ficam no seu navegador." },
            ].map((v) => (
              <div key={v.title} className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <v.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-3 text-base font-semibold">{v.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{v.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-12 flex justify-center">
          <Button asChild size="lg" className="rounded-full px-6">
            <Link to="/login">
              Começar agora <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </PageShell>
  );
}
