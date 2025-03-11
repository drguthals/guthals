"use client";

import { SessionProvider } from "next-auth/react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    return (
        <html>
          <body>
            <SessionProvider>{children}</SessionProvider>
          </body>
        </html>
      );
} 