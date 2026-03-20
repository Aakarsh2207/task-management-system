"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import Spinner from "@/components/ui/Spinner";

const schema = z
  .object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirm: z.string(),
  })
  .refine((d) => d.password === d.confirm, {
    message: "Passwords don't match",
    path: ["confirm"],
  });
type FormValues = z.infer<typeof schema>;

export default function RegisterPage() {
  const { register: registerUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
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
      await registerUser(values.email, values.password);
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message || "Registration failed. Please try again.";
      setServerError(msg);
    } finally {
      setLoading(false);
    }
  };

  const fieldLabel = (text: string) => (
    <label
      style={{
        display: "block",
        fontSize: 12,
        fontWeight: 500,
        color: "var(--chalk-muted)",
        marginBottom: 7,
        letterSpacing: "0.05em",
      }}>
      {text}
    </label>
  );

  const fieldError = (msg?: string) => (msg ? <p style={{ color: "#F87171", fontSize: 12, marginTop: 5 }}>{msg}</p> : null);

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
              Create account
            </h1>
            <p style={{ fontSize: 14, color: "var(--chalk-muted)" }}>Start managing your tasks today</p>
          </div>

          {/* Card */}
          <div className="glass" style={{ borderRadius: 20, padding: 32 }}>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
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
                {fieldLabel("EMAIL")}
                <input {...register("email")} type="email" className="input-base" placeholder="you@example.com" disabled={loading} autoComplete="email" />
                {fieldError(errors.email?.message)}
              </div>

              {/* Password */}
              <div style={{ marginBottom: 16 }}>
                {fieldLabel("PASSWORD")}
                <div style={{ position: "relative" }}>
                  <input {...register("password")} type={showPwd ? "text" : "password"} className="input-base" placeholder="At least 6 characters" disabled={loading} autoComplete="new-password" style={{ paddingRight: 42 }} />
                  <button
                    type="button"
                    onClick={() => setShowPwd((v) => !v)}
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
                    }}>
                    {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {fieldError(errors.password?.message)}
              </div>

              {/* Confirm */}
              <div style={{ marginBottom: 24 }}>
                {fieldLabel("CONFIRM PASSWORD")}
                <input {...register("confirm")} type={showPwd ? "text" : "password"} className="input-base" placeholder="Repeat password" disabled={loading} autoComplete="new-password" />
                {fieldError(errors.confirm?.message)}
              </div>

              <button type="submit" className="btn-accent" style={{ width: "100%" }} disabled={loading}>
                {loading ? <Spinner size="sm" color="white" /> : "Create account"}
              </button>
            </form>
          </div>

          <p style={{ textAlign: "center", marginTop: 20, fontSize: 14, color: "var(--chalk-muted)" }}>
            Already have an account?{" "}
            <Link href="/login" style={{ color: "var(--accent)", textDecoration: "none", fontWeight: 500 }}>
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
