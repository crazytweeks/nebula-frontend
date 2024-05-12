"use client";

import type { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { NextUIProvider } from "@nextui-org/system";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import { I18nProvider } from "@react-aria/i18n";
import MuiWrapper from "@/components/mui/muiWrapper";

export interface ProvidersProps {
  children: ReactNode;
  themeProps?: Omit<ThemeProviderProps, "children">;
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter();

  return (
    <NextUIProvider navigate={router.push}>
      <NextThemesProvider {...themeProps}>
        <MuiWrapper>
          <I18nProvider locale="en-US">{children}</I18nProvider>
        </MuiWrapper>
      </NextThemesProvider>
    </NextUIProvider>
  );
}
