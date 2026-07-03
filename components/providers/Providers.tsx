"use client";

import { ThemeProvider } from "./ThemeProvider";
import { LanguageProvider } from "./LanguageProvider";
import { AuthSessionProvider } from "./SessionProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthSessionProvider>
      <ThemeProvider>
        <LanguageProvider>{children}</LanguageProvider>
      </ThemeProvider>
    </AuthSessionProvider>
  );
}
