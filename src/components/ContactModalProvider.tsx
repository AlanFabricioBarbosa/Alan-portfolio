"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  lazy,
  Suspense,
  type ReactNode,
} from "react";

const ContactModal = lazy(() =>
  import("@/components/ContactModal").then((m) => ({ default: m.ContactModal }))
);

type ContactModalContextType = {
  openModal: () => void;
};

const ContactModalContext = createContext<ContactModalContextType>({
  openModal: () => {},
});

export function useContactModal() {
  return useContext(ContactModalContext);
}

export function ContactModalProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  const openModal = useCallback(() => setOpen(true), []);
  const closeModal = useCallback(() => setOpen(false), []);

  return (
    <ContactModalContext.Provider value={{ openModal }}>
      {children}
      {open && (
        <Suspense fallback={null}>
          <ContactModal open={open} onClose={closeModal} />
        </Suspense>
      )}
    </ContactModalContext.Provider>
  );
}
