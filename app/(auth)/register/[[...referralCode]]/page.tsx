import Image from "next/image";
import RegisterForm from "@/components/auth/RegisterForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Join me on Mine$ and start earning!",
  description: "I use Mine$ to earn cash playing games and watching videos. Click here to join me and claim your rewards now!",
  openGraph: {
    title: "Join me on Mine$ and start earning!",
    description: "I use Mine$ to earn cash playing games and watching videos. Click here to join me and claim your rewards now!",
    type: "website",
    siteName: "Mine$",
    images: [
      {
        url: "/icon.png",
        width: 150,
        height: 150,
        alt: "Mine$ Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Join me on Mine$ and start earning!",
    description: "I use Mine$ to earn real cash playing games and watching videos. Click here to join me and claim your rewards now!",
    images: ["/icon.png"],
  },
};

export default async function RegisterPage({ params }: { params: Promise<{ referralCode?: string[] }> }) {
  const resolvedParams = await params;
  const code = resolvedParams.referralCode?.[0] || "";

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg-primary)] px-4 py-12">
      <div className="flex flex-col items-center gap-4 w-full max-w-md">
        <Image src="/icon.png" alt="Mines Logo" width={150} height={150} priority />

        <div className="bg-[var(--surface-800)] p-8 rounded-2xl border border-[var(--surface-600)] w-full card-lift">
          <h2 className="text-2xl font-bold text-center text-white mb-8 tracking-wider uppercase">Join Mine$</h2>

          <RegisterForm code={code} />

          <div className="mt-6 text-center text-sm text-[var(--text-secondary)]">
            Already have an account? <a href="/login" className="text-[var(--link)] hover:text-white transition-colors">Login</a>
          </div>
        </div>
      </div>
    </div>
  );
}
