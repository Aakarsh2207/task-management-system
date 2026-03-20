"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import Spinner from "@/components/ui/Spinner";

const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});
type FormValues = z.infer<typeof schema>;

export default function LoginPage() {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: FormValues) => {
    setLoading(true);
    setServerError("");
    try {
      await login(values.email, values.password);
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message || "Login failed. Please try again.";
      setServerError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
      <div style={{ width: "100%", maxWidth: 420, animation: "slideUp 0.4s ease" }}>
        <div style={{ width: "100%", maxWidth: 420, animation: "slideUp 0.4s ease" }}>
          {/* Brand */}
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: 52,
                height: 52,
                background: "var(--accent)",
                borderRadius: 14,
                marginBottom: 16,
              }}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                <path d="M9 12l2 2 4-4" stroke="#0A0A0F" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                <rect x="3" y="4" width="18" height="16" rx="3" stroke="#0A0A0F" strokeWidth="2" />
              </svg>
            </div>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 30,
                color: "var(--chalk)",
                marginBottom: 6,
              }}>
              Welcome back
            </h1>
            <p style={{ fontSize: 14, color: "var(--chalk-muted)" }}>Sign in to your TaskFlow account</p>
          </div>

          {/* Card */}
          <div className="glass" style={{ borderRadius: 20, padding: 32 }}>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              {/* Server error */}
              {serverError && (
                <div
                  style={{
                    background: "rgba(248,113,113,0.1)",
                    border: "1px solid rgba(248,113,113,0.3)",
                    borderRadius: 10,
                    padding: "12px 16px",
                    fontSize: 14,
                    color: "#F87171",
                    marginBottom: 20,
                  }}>
                  {serverError}
                </div>
              )}

              {/* Email */}
              <div style={{ marginBottom: 16 }}>
                <label
                  style={{
                    display: "block",
                    fontSize: 12,
                    fontWeight: 500,
                    color: "var(--chalk-muted)",
                    marginBottom: 7,
                    letterSpacing: "0.05em",
                  }}>
                  EMAIL
                </label>
                <input {...register("email")} type="email" className="input-base" placeholder="you@example.com" disabled={loading} autoComplete="email" />
                {errors.email && <p style={{ color: "#F87171", fontSize: 12, marginTop: 5 }}>{errors.email.message}</p>}
              </div>

              {/* Password */}
              <div style={{ marginBottom: 24 }}>
                <label
                  style={{
                    display: "block",
                    fontSize: 12,
                    fontWeight: 500,
                    color: "var(--chalk-muted)",
                    marginBottom: 7,
                    letterSpacing: "0.05em",
                  }}>
                  PASSWORD
                </label>
                <div style={{ position: "relative" }}>
                  <input {...register("password")} type={showPassword ? "text" : "password"} className="input-base" placeholder="••••••••" disabled={loading} autoComplete="current-password" style={{ paddingRight: 42 }} />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    style={{
                      position: "absolute",
                      right: 13,
                      top: "50%",
                      transform: "translateY(-50%)",
                      background: "none",
                      border: "none",
                      color: "var(--ink-faint)",
                      cursor: "pointer",
                      padding: 0,
                      display: "flex",
                    }}
                    aria-label="Toggle password visibility">
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {errors.password && <p style={{ color: "#F87171", fontSize: 12, marginTop: 5 }}>{errors.password.message}</p>}
              </div>

              {/* Submit */}
              <button type="submit" className="btn-accent" style={{ width: "100%" }} disabled={loading}>
                {loading ? <Spinner size="sm" color="white" /> : "Sign in"}
              </button>
            </form>
          </div>

          {/* Footer */}
          <p style={{ textAlign: "center", marginTop: 20, fontSize: 14, color: "var(--chalk-muted)" }}>
            No account?{" "}
            <Link href="/register" style={{ color: "var(--accent)", textDecoration: "none", fontWeight: 500 }}>
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
