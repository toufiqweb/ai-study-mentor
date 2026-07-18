"use client";

import { useState } from "react";
import { KeyRound, Loader2, Save } from "lucide-react";
import { authClient } from "@/lib/auth-client";

export default function SettingsPage() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setIsSaving(true);
    await authClient.changePassword(
      { currentPassword, newPassword, revokeOtherSessions: true },
      {
        onSuccess: () => {
          setMessage({ type: "success", text: "Password updated successfully." });
          setCurrentPassword("");
          setNewPassword("");
        },
        onError: (ctx) => {
          setMessage({ type: "error", text: ctx.error.message });
        },
      }
    );
    setIsSaving(false);
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="border-b border-gray-100 pb-5">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Settings</h1>
        <p className="mt-1 text-sm text-gray-500">Manage your account security.</p>
      </div>

      <form
        onSubmit={handleChangePassword}
        className="space-y-5 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:p-8"
      >
        <h2 className="flex items-center gap-2 border-b border-gray-100 pb-2 text-lg font-semibold text-gray-900">
          <KeyRound className="h-4 w-4 text-(--ternary)" />
          Change Password
        </h2>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-700" htmlFor="currentPassword">
            Current Password
          </label>
          <input
            id="currentPassword"
            type="password"
            required
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm focus:border-(--primary) focus:bg-white focus:outline-none focus:ring-1 focus:ring-(--primary)"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-700" htmlFor="newPassword">
            New Password
          </label>
          <input
            id="newPassword"
            type="password"
            required
            minLength={8}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm focus:border-(--primary) focus:bg-white focus:outline-none focus:ring-1 focus:ring-(--primary)"
          />
        </div>

        {message && (
          <p
            className={`rounded-xl px-4 py-2.5 text-sm font-medium ${
              message.type === "success" ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
            }`}
          >
            {message.text}
          </p>
        )}

        <div className="flex justify-end border-t border-gray-100 pt-4">
          <button
            type="submit"
            disabled={isSaving}
            className="inline-flex items-center gap-2 rounded-xl bg-(--ternary) px-5 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-blue-700 disabled:opacity-60"
          >
            {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            Update Password
          </button>
        </div>
      </form>

      <p className="text-center text-sm text-gray-400">More settings are on the way.</p>
    </div>
  );
}
