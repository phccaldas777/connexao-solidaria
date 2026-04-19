import { createFileRoute, redirect } from "@tanstack/react-router";
import { Plus, Trash2, Save } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageShell } from "@/components/PageShell";
import { store, type Profile } from "@/lib/store";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/perfil")({
  head: () => ({ meta: [{ title: "Meu perfil — Conexão Solidária" }] }),
  beforeLoad: () => {
    if (typeof window !== "undefined" && !store.isAuthed()) {
      throw redirect({ to: "/login" });
    }
  },
  component: ProfilePage,
});

function ProfilePage() {
  const [profile, setProfile] = useState<Profile>(() => store.getProfile());
  const [skill, setSkill] = useState("");

  const update = <K extends keyof Profile>(k: K, v: Profile[K]) =>
    setProfile((p) => ({ ...p, [k]: v }));

  const save = () => {
    store.setProfile(profile);
    toast.success("Perfil salvo com sucesso");
  };

  return (
    <PageShell>
      <Toaster />
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        <header className="mb-6">
          <h1 className="text-2xl font-semibold text-foreground sm:text-3xl">Meu perfil</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Suas informações ficam salvas localmente, no seu navegador.
          </p>
        </header>

        <Tabs defaultValue="dados" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="dados">Dados pessoais</TabsTrigger>
            <TabsTrigger value="curriculo">Currículo</TabsTrigger>
          </TabsList>

          <TabsContent value="dados" className="mt-6">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Nome" value={profile.name} onChange={(v) => update("name", v)} />
                <Field label="Telefone" value={profile.phone} onChange={(v) => update("phone", v)} />
                <Field label="Cidade" value={profile.city} onChange={(v) => update("city", v)} />
                <Field label="Estado" value={profile.state} onChange={(v) => update("state", v)} />
                <Field
                  label="Data de nascimento"
                  type="date"
                  value={profile.birthdate}
                  onChange={(v) => update("birthdate", v)}
                />
              </div>
              <div className="mt-4">
                <Label htmlFor="about">Sobre você</Label>
                <Textarea
                  id="about"
                  rows={4}
                  className="mt-1.5"
                  value={profile.about}
                  onChange={(e) => update("about", e.target.value)}
                  placeholder="Conte um pouco sobre você, no seu tempo."
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="curriculo" className="mt-6 space-y-6">
            {/* Formação */}
            <Section
              title="Formação"
              onAdd={() =>
                update("education", [
                  ...profile.education,
                  { course: "", institution: "", year: "" },
                ])
              }
            >
              {profile.education.length === 0 && (
                <Empty text="Nenhuma formação adicionada." />
              )}
              {profile.education.map((ed, i) => (
                <div
                  key={i}
                  className="grid gap-3 rounded-xl border border-border bg-background p-4 sm:grid-cols-3"
                >
                  <Input
                    placeholder="Curso"
                    value={ed.course}
                    onChange={(e) => {
                      const next = [...profile.education];
                      next[i] = { ...ed, course: e.target.value };
                      update("education", next);
                    }}
                  />
                  <Input
                    placeholder="Instituição"
                    value={ed.institution}
                    onChange={(e) => {
                      const next = [...profile.education];
                      next[i] = { ...ed, institution: e.target.value };
                      update("education", next);
                    }}
                  />
                  <div className="flex gap-2">
                    <Input
                      placeholder="Ano"
                      value={ed.year}
                      onChange={(e) => {
                        const next = [...profile.education];
                        next[i] = { ...ed, year: e.target.value };
                        update("education", next);
                      }}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      aria-label="Remover"
                      onClick={() =>
                        update(
                          "education",
                          profile.education.filter((_, idx) => idx !== i)
                        )
                      }
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </Section>

            {/* Experiências */}
            <Section
              title="Experiências"
              onAdd={() =>
                update("experiences", [
                  ...profile.experiences,
                  { role: "", company: "", period: "", description: "" },
                ])
              }
            >
              {profile.experiences.length === 0 && (
                <Empty text="Nenhuma experiência adicionada." />
              )}
              {profile.experiences.map((ex, i) => (
                <div
                  key={i}
                  className="space-y-3 rounded-xl border border-border bg-background p-4"
                >
                  <div className="grid gap-3 sm:grid-cols-3">
                    <Input
                      placeholder="Cargo"
                      value={ex.role}
                      onChange={(e) => {
                        const next = [...profile.experiences];
                        next[i] = { ...ex, role: e.target.value };
                        update("experiences", next);
                      }}
                    />
                    <Input
                      placeholder="Empresa"
                      value={ex.company}
                      onChange={(e) => {
                        const next = [...profile.experiences];
                        next[i] = { ...ex, company: e.target.value };
                        update("experiences", next);
                      }}
                    />
                    <div className="flex gap-2">
                      <Input
                        placeholder="Período"
                        value={ex.period}
                        onChange={(e) => {
                          const next = [...profile.experiences];
                          next[i] = { ...ex, period: e.target.value };
                          update("experiences", next);
                        }}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        aria-label="Remover"
                        onClick={() =>
                          update(
                            "experiences",
                            profile.experiences.filter((_, idx) => idx !== i)
                          )
                        }
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <Textarea
                    rows={2}
                    placeholder="Descrição breve"
                    value={ex.description}
                    onChange={(e) => {
                      const next = [...profile.experiences];
                      next[i] = { ...ex, description: e.target.value };
                      update("experiences", next);
                    }}
                  />
                </div>
              ))}
            </Section>

            {/* Habilidades */}
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <h2 className="text-base font-semibold">Habilidades</h2>
              <p className="text-sm text-muted-foreground">Adicione uma por vez.</p>
              <div className="mt-4 flex gap-2">
                <Input
                  placeholder="Ex.: Atenção a detalhes"
                  value={skill}
                  onChange={(e) => setSkill(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      if (skill.trim()) {
                        update("skills", [...profile.skills, skill.trim()]);
                        setSkill("");
                      }
                    }
                  }}
                />
                <Button
                  type="button"
                  onClick={() => {
                    if (skill.trim()) {
                      update("skills", [...profile.skills, skill.trim()]);
                      setSkill("");
                    }
                  }}
                >
                  <Plus className="mr-1 h-4 w-4" /> Adicionar
                </Button>
              </div>
              {profile.skills.length > 0 && (
                <ul className="mt-4 flex flex-wrap gap-2">
                  {profile.skills.map((s, i) => (
                    <li
                      key={i}
                      className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-sm text-secondary-foreground"
                    >
                      {s}
                      <button
                        type="button"
                        aria-label={`Remover ${s}`}
                        className="text-muted-foreground hover:text-foreground"
                        onClick={() =>
                          update(
                            "skills",
                            profile.skills.filter((_, idx) => idx !== i)
                          )
                        }
                      >
                        ×
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-8 flex justify-end">
          <Button onClick={save}>
            <Save className="mr-2 h-4 w-4" /> Salvar
          </Button>
        </div>
      </div>
    </PageShell>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <div>
      <Label>{label}</Label>
      <Input
        type={type}
        className="mt-1.5"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

function Section({
  title,
  onAdd,
  children,
}: {
  title: string;
  onAdd: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold">{title}</h2>
        <Button type="button" variant="outline" size="sm" onClick={onAdd}>
          <Plus className="mr-1 h-4 w-4" /> Adicionar
        </Button>
      </div>
      <div className="mt-4 space-y-3">{children}</div>
    </div>
  );
}

function Empty({ text }: { text: string }) {
  return (
    <p className="rounded-xl border border-dashed border-border px-4 py-6 text-center text-sm text-muted-foreground">
      {text}
    </p>
  );
}
