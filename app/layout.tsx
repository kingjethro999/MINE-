import type { Metadata } from "next";
import { Syne, DM_Sans, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Toaster } from "sonner";
import ForceDarkMode from "@/components/layout/ForceDarkMode";

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
  title: "Mines Platform",
  description: "Mine MINE$ and earn real naira",
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Mines Platform",
  },
  referrer: "no-referrer-when-downgrade",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${dmSans.variable} ${jetbrains.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <ForceDarkMode />
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
        {children}
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
