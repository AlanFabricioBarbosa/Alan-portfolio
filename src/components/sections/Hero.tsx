import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="flex min-h-[calc(100vh-4rem)] items-center">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-primary">Olá, eu sou</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Alan
          </h1>
          <h2 className="mt-4 text-2xl font-medium text-muted-foreground sm:text-3xl">
            Programador
          </h2>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button href="#projetos">Ver Projetos</Button>
            <Button href="#contato" variant="outline">
              Entrar em Contato
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
