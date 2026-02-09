import { ThemeProvider } from "@/src/components/common/theme-providers";
import { AppDependencies } from "@/src/core/di/AppDependencies";
import { QueryProvider } from "@/src/provider/query-provider";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next.js App",
  description: "Best practice Next.js architecture",
};

import { getLocale, getMessages } from "next-intl/server";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            disableTransitionOnChange
          >
            <AppDependencies>
              <QueryProvider>{children}</QueryProvider>
            </AppDependencies>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
