import { Link, useNavigate } from "@tanstack/react-router";
import { Menu, Heart, LogOut } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useAuth, auth } from "@/lib/store";

export function SiteHeader() {
  const { isAuthed } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const navItems = isAuthed
    ? [
        { to: "/home", label: "Início" },
        { to: "/questionario", label: "Questionário" },
        { to: "/resultados", label: "Resultados" },
        { to: "/perfil", label: "Meu perfil" },
        { to: "/sobre", label: "Sobre" },
      ]
    : [
        { to: "/", label: "Início" },
        { to: "/sobre", label: "Sobre" },
      ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Abrir menu" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72">
              <SheetHeader>
                <SheetTitle>Navegação</SheetTitle>
              </SheetHeader>
              <nav className="mt-6 flex flex-col gap-1">
                {navItems.map((i) => (
                  <Link
                    key={i.to}
                    to={i.to}
                    onClick={() => setOpen(false)}
                    className="rounded-md px-3 py-2 text-sm text-foreground hover:bg-muted"
                    activeProps={{ className: "rounded-md px-3 py-2 text-sm bg-secondary text-secondary-foreground font-medium" }}
                  >
                    {i.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>

          <Link to="/" className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-sm">
              <Heart className="h-4 w-4" aria-hidden />
            </span>
            <span className="text-base font-semibold text-foreground">
              Conexão Solidária
            </span>
          </Link>
        </div>

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((i) => (
            <Link
              key={i.to}
              to={i.to}
              className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "rounded-md px-3 py-2 text-sm text-foreground font-medium" }}
            >
              {i.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {isAuthed ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={async () => {
                await auth.signOut();
                navigate({ to: "/" });
              }}
            >
              <LogOut className="mr-2 h-4 w-4" /> Sair
            </Button>
          ) : (
            <Button asChild variant="ghost" size="sm">
              <Link to="/login">Entrar</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-muted/40">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-6 text-sm text-muted-foreground sm:flex-row sm:px-6">
        <span>Conexão Solidária</span>
        <span>Inclusão e acessibilidade para todos.</span>
      </div>
    </footer>
  );
}
