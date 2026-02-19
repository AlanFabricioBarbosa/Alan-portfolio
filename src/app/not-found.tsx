import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[calc(100vh-10rem)] flex-col items-center justify-center px-4 text-center">
      <p className="text-8xl font-extrabold tracking-tighter text-primary sm:text-9xl">
        404
      </p>
      <h1 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">
        Página não encontrada
      </h1>
      <p className="mt-3 max-w-md text-muted-foreground">
        A página que você está procurando não existe ou foi movida.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary/50"
      >
        Voltar ao início
      </Link>
    </section>
  );
}
