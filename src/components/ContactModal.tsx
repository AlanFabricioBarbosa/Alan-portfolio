"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

type FieldErrors = {
  from_name?: string;
  from_email?: string;
  subject?: string;
  message?: string;
};

type ContactModalProps = {
  open: boolean;
  onClose: () => void;
};

export function ContactModal({ open, onClose }: ContactModalProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) {
      document.addEventListener("keydown", handler);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  // Reset status when modal opens + auto-focus
  useEffect(() => {
    if (open) {
      setStatus("idle");
      setErrors({});
      setTouched({});
      // Move focus into the modal
      requestAnimationFrame(() => {
        modalRef.current?.focus();
      });
    }
  }, [open]);

  function validateField(name: string, value: string): string | undefined {
    const trimmed = value.trim();
    switch (name) {
      case "from_name":
        if (!trimmed) return "Nome é obrigatório";
        if (trimmed.length < 2) return "Nome deve ter ao menos 2 caracteres";
        return undefined;
      case "from_email":
        if (!trimmed) return "Email é obrigatório";
        if (!EMAIL_REGEX.test(trimmed)) return "Informe um email válido";
        return undefined;
      case "subject":
        if (!trimmed) return "Assunto é obrigatório";
        if (trimmed.length < 3) return "Assunto deve ter ao menos 3 caracteres";
        return undefined;
      case "message":
        if (!trimmed) return "Mensagem é obrigatória";
        if (trimmed.length < 10) return "Mensagem deve ter ao menos 10 caracteres";
        return undefined;
      default:
        return undefined;
    }
  }

  function validateAll(): boolean {
    if (!formRef.current) return false;
    const data = new FormData(formRef.current);
    const newErrors: FieldErrors = {};
    let valid = true;
    for (const field of ["from_name", "from_email", "subject", "message"]) {
      const err = validateField(field, (data.get(field) as string) || "");
      if (err) {
        newErrors[field as keyof FieldErrors] = err;
        valid = false;
      }
    }
    setErrors(newErrors);
    setTouched({ from_name: true, from_email: true, subject: true, message: true });
    return valid;
  }

  function handleBlur(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const err = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: err }));
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    if (touched[name]) {
      const err = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: err }));
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!formRef.current) return;
    if (!validateAll()) return;

    setSending(true);
    setStatus("idle");

    try {
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        formRef.current,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );
      setStatus("success");
      formRef.current.reset();
    } catch {
      setStatus("error");
    } finally {
      setSending(false);
    }
  }

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
    >
      {/* Backdrop */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        ref={modalRef}
        tabIndex={-1}
        className="relative w-full max-w-lg animate-in rounded-2xl border border-border bg-background p-6 shadow-2xl focus:outline-none sm:p-8"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          aria-label="Fechar"
        >
          <svg
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>

        <h2 id="contact-modal-title" className="text-2xl font-bold">Enviar Mensagem</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Preencha os campos abaixo e sua mensagem chegará direto no meu email.
        </p>

        <form ref={formRef} onSubmit={handleSubmit} aria-label="Formulário de contato" className="mt-6 space-y-4">
          {/* Remetente */}
          <div>
            <label
              htmlFor="from_name"
              className="mb-1.5 block text-sm font-medium"
            >
              Seu nome
            </label>
            <input
              id="from_name"
              name="from_name"
              type="text"
              required
              minLength={2}
              placeholder="Como deseja ser chamado"
              onBlur={handleBlur}
              onChange={handleChange}
              aria-describedby={touched.from_name && errors.from_name ? "error-from_name" : undefined}
              className={`w-full rounded-lg border bg-muted/30 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 ${
                touched.from_name && errors.from_name
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                  : "border-border focus:border-primary focus:ring-primary/20"
              }`}
            />
            {touched.from_name && errors.from_name && (
              <p id="error-from_name" role="alert" className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.from_name}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="from_email"
              className="mb-1.5 block text-sm font-medium"
            >
              Seu email
            </label>
            <input
              id="from_email"
              name="from_email"
              type="email"
              required
              placeholder="seuemail@exemplo.com"
              onBlur={handleBlur}
              onChange={handleChange}
              aria-describedby={touched.from_email && errors.from_email ? "error-from_email" : undefined}
              className={`w-full rounded-lg border bg-muted/30 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 ${
                touched.from_email && errors.from_email
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                  : "border-border focus:border-primary focus:ring-primary/20"
              }`}
            />
            {touched.from_email && errors.from_email && (
              <p id="error-from_email" role="alert" className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.from_email}</p>
            )}
          </div>

          {/* Assunto */}
          <div>
            <label
              htmlFor="subject"
              className="mb-1.5 block text-sm font-medium"
            >
              Assunto
            </label>
            <input
              id="subject"
              name="subject"
              type="text"
              required
              minLength={3}
              placeholder="Sobre o que deseja conversar?"
              onBlur={handleBlur}
              onChange={handleChange}
              aria-describedby={touched.subject && errors.subject ? "error-subject" : undefined}
              className={`w-full rounded-lg border bg-muted/30 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 ${
                touched.subject && errors.subject
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                  : "border-border focus:border-primary focus:ring-primary/20"
              }`}
            />
            {touched.subject && errors.subject && (
              <p id="error-subject" role="alert" className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.subject}</p>
            )}
          </div>

          {/* Mensagem */}
          <div>
            <label
              htmlFor="message"
              className="mb-1.5 block text-sm font-medium"
            >
              Mensagem
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={4}
              minLength={10}
              placeholder="Escreva sua mensagem..."
              onBlur={handleBlur}
              onChange={handleChange}
              aria-describedby={touched.message && errors.message ? "error-message" : undefined}
              className={`w-full resize-none rounded-lg border bg-muted/30 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 ${
                touched.message && errors.message
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                  : "border-border focus:border-primary focus:ring-primary/20"
              }`}
            />
            {touched.message && errors.message && (
              <p id="error-message" role="alert" className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.message}</p>
            )}
          </div>

          {/* Status messages */}
          {status === "success" && (
            <div role="alert" className="flex items-center gap-2 rounded-lg bg-green-500/10 px-4 py-3 text-sm font-medium text-green-600 dark:text-green-400">
              <svg
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 6 9 17l-5-5" />
              </svg>
              Mensagem enviada com sucesso!
            </div>
          )}

          {status === "error" && (
            <div role="alert" className="flex items-center gap-2 rounded-lg bg-red-500/10 px-4 py-3 text-sm font-medium text-red-600 dark:text-red-400">
              <svg
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="15" x2="9" y1="9" y2="15" />
                <line x1="9" x2="15" y1="9" y2="15" />
              </svg>
              Erro ao enviar. Tente novamente.
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={sending}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50"
          >
            {sending ? (
              <>
                <svg
                  aria-hidden="true"
                  className="h-4 w-4 animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                Enviando...
              </>
            ) : (
              <>
                <svg
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m22 2-7 20-4-9-9-4z" />
                  <path d="M22 2 11 13" />
                </svg>
                Enviar Mensagem
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
