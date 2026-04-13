import Image from "next/image";
import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg-primary)] px-4">
      <div className="flex flex-col items-center gap-4 w-full max-w-md">
        <Image src="/icon.png" alt="Mines Logo" width={150} height={150} priority />

        <div className="bg-[var(--surface-800)] p-8 rounded-2xl border border-[var(--surface-600)] w-full card-lift">

          <h2 className="text-2xl font-bold text-center text-white mt-4 mb-8 tracking-wider uppercase">Welcome Back</h2>

          <LoginForm />

          <div className="mt-6 text-center text-sm text-[var(--text-secondary)]">
            Don't have an account? <a href="/register" className="text-[var(--link)] hover:text-white transition-colors">Create one</a>
          </div>
        </div>
      </div>
    </div>
  );
}
