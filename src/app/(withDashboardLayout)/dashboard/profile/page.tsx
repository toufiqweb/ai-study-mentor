"use client";

import { useState } from "react";
import Link from "next/link";
import { Loader2, Save, Target, Clock, CheckCircle2, Flame } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { goals } from "@/lib/mock/goals";
import StatCard from "@/components/dashboard/StatCard";

const activeGoals = goals.filter((g) => g.status !== "completed");

export default function ProfilePage() {
  const { data: session, isPending } = authClient.useSession();
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const user = session?.user;
  const displayName = name || user?.name || "";
  const displayImage = image || user?.image || "";

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage(null);
    try {
      await authClient.updateUser({
        name: name || user?.name,
        image: image || user?.image || undefined,
      });
      setMessage({ type: "success", text: "Profile updated successfully." });
    } catch {
      setMessage({ type: "error", text: "Something went wrong. Please try again." });
    } finally {
      setIsSaving(false);
    }
  };

  if (isPending) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-(--primary)" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-100 pb-5">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Profile</h1>
        <p className="mt-1 text-sm text-gray-500">Manage your account and see your learning stats.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm lg:col-span-2">
          <h2 className="text-lg font-semibold text-gray-900">Student Information</h2>
          <form onSubmit={handleSave} className="mt-5 space-y-5">
            <div className="flex items-center gap-4">
              {displayImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={displayImage}
                  alt={displayName}
                  className="h-16 w-16 rounded-full object-cover"
                />
              ) : (
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-(--primary)/10 text-xl font-bold text-(--primary)">
                  {displayName.charAt(0).toUpperCase() || "S"}
                </div>
              )}
              <div className="flex-1 space-y-1.5">
                <label className="text-sm font-medium text-gray-700" htmlFor="image">
                  Profile Image URL
                </label>
                <input
                  id="image"
                  type="url"
                  placeholder="https://example.com/photo.jpg"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2 text-sm focus:border-(--primary) focus:bg-white focus:outline-none focus:ring-1 focus:ring-(--primary)"
                />
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700" htmlFor="name">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name || user?.name || ""}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2 text-sm focus:border-(--primary) focus:bg-white focus:outline-none focus:ring-1 focus:ring-(--primary)"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={user?.email ?? ""}
                  disabled
                  className="w-full rounded-xl border border-gray-200 bg-gray-100 px-4 py-2 text-sm text-gray-500"
                />
              </div>
            </div>

            <p className="text-xs text-gray-400">
              Joined{" "}
              {user?.createdAt
                ? new Date(user.createdAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })
                : "—"}
            </p>

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
                className="inline-flex items-center gap-2 rounded-xl bg-(--primary) px-5 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-(--secondary) disabled:opacity-60"
              >
                {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                Update Profile
              </button>
            </div>
          </form>
        </div>

        <div className="space-y-4">
          <StatCard label="Active Goals" value={String(activeGoals.length)} icon={Target} accent="primary" />
          <StatCard label="Total Study Hours" value="142h" icon={Clock} accent="secondary" />
          <StatCard label="Completed Tasks" value="86" icon={CheckCircle2} accent="accent" />
          <StatCard label="Current Streak" value="12 days" icon={Flame} accent="neutral" />
        </div>
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900">Current Goals</h2>
        <div className="mt-4 space-y-3">
          {activeGoals.map((goal) => (
            <Link
              key={goal.id}
              href={`/dashboard/goals/${goal.id}`}
              className="flex items-center justify-between rounded-xl border border-gray-100 px-4 py-3 hover:bg-gray-50"
            >
              <div>
                <p className="text-sm font-bold text-gray-900">{goal.title}</p>
                <p className="text-xs text-gray-400">{goal.category}</p>
              </div>
              <span className="text-sm font-bold text-(--primary)">{goal.progress}%</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
