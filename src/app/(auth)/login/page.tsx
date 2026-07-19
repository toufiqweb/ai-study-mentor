"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Mail, Lock, Loader2, Eye, EyeOff, AlertCircle } from "lucide-react";
import { FcGoogle } from "react-icons/fc";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    await authClient.signIn.email(
      {
        email,
        password,
        callbackURL: "/",
        rememberMe: true,
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

  const handleGoogleLogin = async () => {
    try {
      const data = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });

      if (!data) {
        setErrorMsg("Something went wrong with Google authentication.");
      }
    } catch (err: any) {
      console.error("Google login error:", err);
      setErrorMsg(String(err?.message || err || "Something went wrong"));
    }
  };

  const handleDemoLogin = async () => {
    const demoEmail = "demo@studymentor.com";
    const demoPassword = "password123";
    const demoName = "Demo Student";

    setEmail(demoEmail);
    setPassword(demoPassword);
    setErrorMsg("");
    setLoading(true);

    try {
      await authClient.signIn.email(
        {
          email: demoEmail,
          password: demoPassword,
          callbackURL: "/",
          rememberMe: true,
        },
        {
          onSuccess: () => {
            setLoading(false);
            router.push("/");
          },
          onError: async () => {
            // Self-heal: If sign-in fails (e.g. user doesn't exist), register user automatically
            await authClient.signUp.email(
              {
                email: demoEmail,
                password: demoPassword,
                name: demoName,
                callbackURL: "/",
              },
              {
                onSuccess: () => {
                  setLoading(false);
                  router.push("/");
                },
                onError: (ctx) => {
                  setLoading(false);
                  setErrorMsg(ctx.error.message || "Demo login failed");
                },
              }
            );
          },
        }
      );
    } catch (err: any) {
      setLoading(false);
      setErrorMsg(err?.message || "Demo login encountered an error.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gray-50/50">
      {/* Background Decorative Elements */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-(--ternary) opacity-[0.06] rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-(--primary) opacity-[0.04] rounded-full blur-3xl pointer-events-none"></div>

      {/* Main Login Card */}
      <div className="max-w-md w-full space-y-8 bg-white p-8 md:p-10 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 z-10 relative">
        {/* Header Section */}
        <div className="text-center flex flex-col items-center">
          <div className="mb-6 relative w-16 h-16 sm:w-20 sm:h-20 drop-shadow-sm">
            <Image
              src="/logo.png"
              alt="AI Study Mentor Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-(--primary) tracking-tight">
            Welcome back
          </h2>
          <p className="mt-2 text-sm text-(--secondary) font-medium">
            Sign in to AI Study Mentor to continue
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          {/* Social & Demo Auth */}
          <div className="space-y-3">
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-3 border border-gray-200 bg-white hover:bg-gray-50 text-(--primary) font-semibold py-3 rounded-xl text-sm transition-all duration-200 shadow-sm focus:ring-2 focus:ring-offset-1 focus:ring-gray-200 cursor-pointer"
            >
              <FcGoogle className="text-xl" />
              <span>Continue with Google</span>
            </button>

            <button
              type="button"
              onClick={handleDemoLogin}
              className="w-full flex items-center justify-center gap-2 border border-(--ternary)/20 bg-(--ternary)/5 hover:bg-(--ternary)/10 text-(--ternary) font-semibold py-3 rounded-xl text-sm transition-all duration-200 shadow-sm focus:ring-2 focus:ring-offset-1 focus:ring-(--ternary)/20 cursor-pointer"
            >
              <span>Try Demo Login (Auto-fill)</span>
            </button>
          </div>

          {/* Divider */}
          <div className="relative flex items-center justify-center py-2">
            <div className="border-t border-gray-200 w-full"></div>
            <span className="absolute bg-white px-4 text-xs font-semibold tracking-wider text-gray-400 uppercase">
              Or continue with email
            </span>
          </div>

          {/* Form Fields */}
          <div className="space-y-5">
            {/* Email Field */}
            <div>
              <label
                className="block text-sm font-semibold text-(--primary) mb-1.5"
                htmlFor="email"
              >
                Email Address
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-(--ternary) transition-colors" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full pl-11 pr-3 py-3 text-sm border border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-(--ternary)/20 focus:border-(--ternary) transition-all bg-gray-50 focus:bg-white"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  className="block text-sm font-semibold text-(--primary)"
                  htmlFor="password"
                >
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-xs font-semibold text-(--ternary) hover:text-(--primary) transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-(--ternary) transition-colors" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full pl-11 pr-11 py-3 text-sm border border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-(--ternary)/20 focus:border-(--ternary) transition-all bg-gray-50 focus:bg-white"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none transition-colors"
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

          {/* Error Message */}
          {errorMsg && (
            <div className="animate-in fade-in slide-in-from-top-1 text-red-600 text-sm font-medium bg-red-50 p-3.5 rounded-xl border border-red-100 flex items-start gap-2.5 shadow-sm">
              <AlertCircle className="w-5 h-5 shrink-0 text-red-500" />
              <span className="leading-tight pt-0.5">{errorMsg}</span>
            </div>
          )}

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center items-center gap-2 py-3.5 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-(--ternary) hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-(--ternary) transition-all shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Signing in...</span>
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </div>
        </form>

        {/* Footer Link */}
        <div className="pt-6 mt-6 border-t border-gray-100 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="font-bold text-(--ternary) hover:text-(--primary) transition-colors"
            >
              Sign up for free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
