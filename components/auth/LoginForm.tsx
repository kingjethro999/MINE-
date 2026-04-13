"use client";

import { useActionState, useEffect } from "react";
import { loginAction } from "@/lib/actions/auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const [state, action, isPending] = useActionState(async (prevState: any, formData: FormData) => {
    return await loginAction(formData);
  }, null);

  useEffect(() => {
    if (state?.success) {
      toast.success("Successfully logged in!");
      router.push("/dashboard");
      router.refresh();
    }
    if (state?.error) {
      toast.error(state.error);
    }
  }, [state, router]);

  return (
    <form action={action} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-[var(--text-muted)] mb-1">Email</label>
        <input
          name="email"
          type="email"
          required
          className="w-full bg-[var(--surface-900)] border border-[var(--surface-600)] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[var(--gold-500)] transition-colors"
          placeholder="you@email.com"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-[var(--text-muted)] mb-1">Password</label>
        <input
          name="password"
          type="password"
          required
          className="w-full bg-[var(--surface-900)] border border-[var(--surface-600)] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[var(--gold-500)] transition-colors"
          placeholder="••••••••"
        />
      </div>

      <button 
        type="submit" 
        disabled={isPending}
        className="w-full bg-[var(--gold-500)] text-black font-bold text-sm tracking-widest uppercase py-4 rounded-lg mt-4 hover:bg-[var(--gold-600)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPending ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}
