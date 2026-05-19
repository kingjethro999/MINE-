import type { Metadata } from "next";
import { Syne, DM_Sans, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Toaster } from "sonner";
import ForceDarkMode from "@/components/layout/ForceDarkMode";
import { auth } from "@/auth";
import prisma from "@/lib/db";
import NextTopLoader from "nextjs-toploader";

const syne = Syne({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-syne",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dm-sans",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "MINE$ Protocol",
  description: "Stake MINE$ and earn real Naira through our decentralized yield protocol.",
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "MINE$ Protocol",
  },
  referrer: "no-referrer-when-downgrade",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  let showAds = true; // default: show ads for guests

  if (session?.user?.id) {
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { showAds: true },
    });
    if (user) showAds = user.showAds;
  }

  return (
    <html
      lang="en"
      className={`${syne.variable} ${dmSans.variable} ${jetbrains.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <ForceDarkMode />
        <NextTopLoader color="var(--gold-500)" height={3} showSpinner={false} shadow="0 0 10px #d4af37,0 0 5px #d4af37" />
        {showAds && (
          <Script id="ads-script" strategy="lazyOnload">
            {`(function(drqr){
var d = document,
    s = d.createElement('script'),
    l = d.scripts[d.scripts.length - 1];
s.settings = drqr || {};
s.src = "\/\/profitable-grocery.com\/b.XlVksZdrG\/lI0gYvWYct\/Reqmx9butZwUsl\/k\/PETUY\/5-NFT\/Qh1wOcTlcgt\/Nmj\/kx1aN\/DyYQwdM\/Qu";
s.async = true;
s.referrerPolicy = 'no-referrer-when-downgrade';
l.parentNode.insertBefore(s, l);
})({})`}
          </Script>
        )}
        {children}
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}

