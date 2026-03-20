import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import "./globals.css";

export const metadata: Metadata = {
  title: "TaskFlow — Manage your work",
  description: "A clean, fast task management system",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#1A1A24",
              color: "#F5F4F0",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "10px",
              fontFamily: "Outfit, sans-serif",
              fontSize: "14px",
            },
            success: {
              iconTheme: { primary: "#E8FF47", secondary: "#0A0A0F" },
            },
            error: {
              iconTheme: { primary: "#F87171", secondary: "#0A0A0F" },
            },
          }}
        />
      </body>
    </html>
  );
}
