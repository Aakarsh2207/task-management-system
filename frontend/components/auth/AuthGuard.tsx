"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAccessToken, getUser } from "@/lib/auth";
import Spinner from "@/components/ui/Spinner";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const [checking, setChecking] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = getAccessToken();
    const user = getUser();
    if (!token || !user) {
      router.replace("/login");
    } else {
      setChecking(false);
    }
  }, [router]);

  if (checking) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "var(--ink)",
        }}>
        <Spinner size="lg" />
      </div>
    );
  }

  return <>{children}</>;
}
