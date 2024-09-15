import type { Metadata } from "next";

import "./globals.css";
import { MainLayout } from "@/layouts/main";
import AuthProvider from "@/providers/auth";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Psyscribe",
  description: "AI Powered Scribe for Psychiatrists",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta
          http-equiv="Content-Security-Policy"
          content="upgrade-insecure-requests"
        />
      </head>
      <body>
        <AuthProvider>
          <Toaster />
          <MainLayout>{children}</MainLayout>
        </AuthProvider>
      </body>
    </html>
  );
}
