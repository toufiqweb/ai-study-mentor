"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import {
  GraduationCap,
  Mail,
  Lock,
  User,
  Loader2,
  Eye,
  EyeOff,
} from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    await authClient.signUp.email(
      {
        email,
        password,
        name,
        callbackURL: "/",
      },
      {
        onRequest: () => {
          setLoading(true);
        },
        onSuccess: () => {
          setLoading(false);
          router.push("/");
        },
        onError: (ctx) => {
          setLoading(false);
          setErrorMsg(ctx.error.message);
        },
      },
    );
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-(--ternary) opacity-[0.08] rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-(--primary) opacity-[0.05] rounded-full blur-3xl"></div>

      <div className="max-w-md w-full space-y-8 bg-white p-8 md:p-10 rounded-2xl shadow-xl border border-gray-100 z-10 relative">
        <div className="text-center">
          <div className="mx-auto h-14 w-14 bg-(--ternary) rounded-2xl flex items-center justify-center shadow-lg transform rotate-3">
            <GraduationCap className="w-7 h-7 text-white" />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-(--primary) tracking-tight">
            Create Account
          </h2>
          <p className="mt-2 text-sm text-(--secondary)">
            Join AI Study Mentor today
          </p>
        </div>
        <form className="mt-8 space-y-5" onSubmit={handleRegister}>
          <div className="space-y-4">
            <div>
              <label
                className="block text-sm font-semibold text-(--primary) mb-1.5"
                htmlFor="name"
              >
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="appearance-none block w-full pl-11 pr-3 py-3 border border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-(--ternary) focus:border-transparent sm:text-sm transition-all bg-gray-50 focus:bg-white"
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div>
              <label
                className="block text-sm font-semibold text-(--primary) mb-1.5"
                htmlFor="email"
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full pl-11 pr-3 py-3 border border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-(--ternary) focus:border-transparent sm:text-sm transition-all bg-gray-50 focus:bg-white"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label
                className="block text-sm font-semibold text-(--primary) mb-1.5"
                htmlFor="password"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  minLength={8}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full pl-11 pr-11 py-3 border border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-(--ternary) focus:border-transparent sm:text-sm transition-all bg-gray-50 focus:bg-white"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" aria-hidden="true" />
                  ) : (
                    <Eye className="h-5 w-5" aria-hidden="true" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {errorMsg && (
            <div className="text-red-600 text-sm font-medium bg-red-50 p-3 rounded-xl border border-red-100 flex items-center shadow-sm">
              <span className="shrink-0 mr-2 text-lg">⚠️</span>
              {errorMsg}
            </div>
          )}

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3.5 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-(--ternary) hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-(--ternary) transition-all shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                "Create Account"
              )}
            </button>
          </div>
        </form>

        <div className="mt-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-(--secondary) font-medium">
                Already have an account?
              </span>
            </div>
          </div>

          <div className="mt-6">
            <Link
              href="/login"
              className="w-full flex justify-center py-3.5 px-4 border-2 border-gray-200 rounded-xl shadow-sm bg-white text-sm font-bold text-(--ternary) hover:bg-gray-50 hover:border-gray-300 transition-all"
            >
              Log in instead
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
