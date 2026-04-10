import Link from "next/link";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[calc(100vh-10rem)] flex-col items-center justify-center overflow-hidden px-4 text-center">
      {/* Decorative gradient orbs */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />

      {/* Large 404 as background */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <span className="select-none text-[12rem] font-black tracking-tighter text-primary/[0.04] sm:text-[16rem] lg:text-[20rem]">
          404
        </span>
      </div>

      <div className="relative">
        <p className="gradient-text text-8xl font-extrabold tracking-tighter sm:text-9xl">
          404
        </p>
        <h1 className="mt-6 text-2xl font-bold tracking-tight sm:text-3xl">
          Página não encontrada
        </h1>
        <p className="mt-3 max-w-md text-muted-foreground">
          A página que você está procurando não existe ou foi movida.
        </p>
        <Link
          href="/"
          className="group relative mt-8 inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-all duration-300 hover:bg-[position:100%_0] hover:shadow-xl hover:shadow-primary/30 focus:outline-none focus:ring-2 focus:ring-primary/50"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="m12 19-7-7 7-7" />
            <path d="M19 12H5" />
          </svg>
          Voltar ao início
          {/* Shine effect */}
          <span
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            aria-hidden="true"
          >
            <span className="absolute inset-0 -translate-x-full skew-x-[-15deg] bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-[shine_0.6s_ease-out_forwards]" />
          </span>
        </Link>
      </div>
    </section>
  );
}
