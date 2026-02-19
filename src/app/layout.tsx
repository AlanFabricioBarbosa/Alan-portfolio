import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ContactModalProvider } from "@/components/ContactModalProvider";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://alanfabricio.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Alan | Portfolio",
    template: "%s — Alan",
  },
  description:
    "Desenvolvedor Front-End com experiência em React, Next.js, JavaScript e Fluig. Confira meus projetos, habilidades e trajetória.",
  keywords: [
    "Desenvolvedor Front-End",
    "React",
    "Next.js",
    "JavaScript",
    "Portfolio",
    "Alan",
    "Fluig",
    "TypeScript",
  ],
  authors: [{ name: "Alan" }],
  creator: "Alan",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: siteUrl,
    siteName: "Alan | Portfolio",
    title: "Alan | Portfolio — Desenvolvedor Front-End",
    description:
      "Desenvolvedor Front-End com experiência em React, Next.js, JavaScript e Fluig. Confira meus projetos, habilidades e trajetória.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alan | Portfolio — Desenvolvedor Front-End",
    description:
      "Desenvolvedor Front-End com experiência em React, Next.js, JavaScript e Fluig.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#2563eb" />
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&matchMedia('(prefers-color-scheme:dark)').matches)){document.documentElement.classList.add('dark')}}catch(e){}})();if('serviceWorker'in navigator){window.addEventListener('load',function(){navigator.serviceWorker.register('/sw.js')})}`
          }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
        >
          Pular para o conteúdo
        </a>
        <ThemeProvider>
          <ContactModalProvider>
            <Header />
            <main id="conteudo">{children}</main>
            <Footer />
          </ContactModalProvider>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
