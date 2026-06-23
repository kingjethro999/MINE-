"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { User, Bell, Shield, CreditCard, Moon, Loader2, Check } from "lucide-react";

interface UserSettings {
  id: string;
  name: string;
  email: string;
  plan: string;
  showAds: boolean;
  bankName: string | null;
  bankAccountNumber: string | null;
  bankAccountName: string | null;
  bankCode: string | null;
  createdAt: string;
}

export default function SettingsPage() {
  const [user, setUser] = useState<UserSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showAds, setShowAds] = useState(true);
  const [adsSaved, setAdsSaved] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  async function fetchSettings() {
    try {
      const res = await fetch("/api/user/settings");
      const data = await res.json();
      if (data.success) {
        setUser(data.data);
        setShowAds(data.data.showAds);
      }
    } catch {
      toast.error("Failed to load settings");
    } finally {
      setLoading(false);
    }
  }

  async function toggleAds() {
    const newValue = !showAds;
    setShowAds(newValue);
    setSaving(true);

    try {
      const res = await fetch("/api/user/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ showAds: newValue }),
      });
      const data = await res.json();

      if (data.success) {
        toast.success(newValue ? "Ads enabled" : "Ads disabled");
        setAdsSaved(true);
        setTimeout(() => setAdsSaved(false), 2000);
      } else {
        setShowAds(!newValue);
        toast.error(data.error || "Failed to update");
      }
    } catch {
      setShowAds(!newValue);
      toast.error("Failed to update settings");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="animate-spin text-[var(--gold-500)]" size={32} />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center text-[var(--text-muted)]">
        Failed to load user settings
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header>
        <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
        <p className="text-[var(--text-secondary)]">Manage your account preferences.</p>
      </header>

      {/* Account Info */}
      <section className="bg-[var(--surface-800)] border border-[var(--surface-600)] rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-[var(--gold-500)]/10 rounded-lg">
            <User size={20} className="text-[var(--gold-500)]" />
          </div>
          <h2 className="text-lg font-bold text-white">Account</h2>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center py-3 border-b border-[var(--surface-600)]">
            <div>
              <p className="text-sm font-medium text-white">Name</p>
              <p className="text-xs text-[var(--text-muted)]">{user.name}</p>
            </div>
          </div>
          <div className="flex justify-between items-center py-3 border-b border-[var(--surface-600)]">
            <div>
              <p className="text-sm font-medium text-white">Email</p>
              <p className="text-xs text-[var(--text-muted)]">{user.email}</p>
            </div>
          </div>
          <div className="flex justify-between items-center py-3 border-b border-[var(--surface-600)]">
            <div>
              <p className="text-sm font-medium text-white">Plan</p>
              <p className="text-xs text-[var(--text-muted)]">{user.plan}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
              user.plan === "PREMIUM" ? "bg-[var(--gold-500)] text-black" :
              user.plan === "PRO" ? "bg-[var(--green-500)] text-black" :
              "bg-[var(--surface-600)] text-white"
            }`}>
              {user.plan}
            </span>
          </div>
          <div className="flex justify-between items-center py-3">
            <div>
              <p className="text-sm font-medium text-white">Member Since</p>
              <p className="text-xs text-[var(--text-muted)]">
                {new Date(user.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Preferences */}
      <section className="bg-[var(--surface-800)] border border-[var(--surface-600)] rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-[var(--gold-500)]/10 rounded-lg">
            <Bell size={20} className="text-[var(--gold-500)]" />
          </div>
          <h2 className="text-lg font-bold text-white">Preferences</h2>
        </div>

        <div className="space-y-4">
          {/* Ads Toggle */}
          <div className="flex justify-between items-center py-3">
            <div className="flex-1">
              <p className="text-sm font-medium text-white">Show Ads</p>
              <p className="text-xs text-[var(--text-muted)]">
                {user.plan === "PREMIUM"
                  ? "Premium accounts have ads off by default"
                  : "Upgrade to Premium to disable ads"}
              </p>
            </div>
            <button
              onClick={() => {
                if (user.plan !== "PREMIUM") {
                  toast.error("Upgrade to Premium to disable ads");
                  return;
                }
                toggleAds();
              }}
              disabled={saving || user.plan !== "PREMIUM"}
              className={`relative w-14 h-7 rounded-full transition-colors ${
                showAds ? "bg-[var(--gold-500)]" : "bg-[var(--surface-600)]"
              } ${user.plan !== "PREMIUM" ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
            >
              {saving ? (
                <Loader2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-spin text-black" size={16} />
              ) : (
                <span
                  className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow transition-transform ${
                    showAds ? "left-8" : "left-1"
                  }`}
                />
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Bank Details */}
      <section className="bg-[var(--surface-800)] border border-[var(--surface-600)] rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-[var(--gold-500)]/10 rounded-lg">
            <CreditCard size={20} className="text-[var(--gold-500)]" />
          </div>
          <h2 className="text-lg font-bold text-white">Bank Details</h2>
        </div>

        {user.bankName ? (
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-[var(--text-muted)]">Bank</span>
              <span className="text-sm text-white">{user.bankName}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-[var(--text-muted)]">Account Number</span>
              <span className="text-sm text-white mono-figure">{user.bankAccountNumber}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-[var(--text-muted)]">Account Name</span>
              <span className="text-sm text-white">{user.bankAccountName}</span>
            </div>
            <p className="text-xs text-[var(--text-muted)] mt-4">
              Update your bank details from the{" "}
              <a href="/withdraw" className="text-[var(--gold-500)] hover:underline">
                Withdraw page
              </a>
              .
            </p>
          </div>
        ) : (
          <div className="text-center py-6">
            <p className="text-sm text-[var(--text-muted)] mb-4">No bank details saved</p>
            <a
              href="/withdraw"
              className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--gold-500)] text-black font-semibold rounded-lg hover:bg-[var(--gold-600)] transition-colors"
            >
              <CreditCard size={16} />
              Add Bank Details
            </a>
          </div>
        )}
      </section>
    </div>
  );
}
