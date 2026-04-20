import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Covenant Clean Co | Professional Cleaning Services",
    template: "%s | Covenant Clean Co"
  },
  description: "Premium residential and commercial cleaning services. From deep home cleaning to office maintenance and post-construction cleanup, we deliver spotless results you can trust.",
  keywords: ["cleaning services", "commercial cleaning", "residential cleaning", "deep cleaning", "office cleaning", "post-construction cleanup", "janitorial services"],
  authors: [{ name: "Covenant Clean Co" }],
  creator: "Covenant Clean Co",
  metadataBase: new URL("https://covenantcleanco.netlify.app"), // Replace with your actual domain
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://covenantcleanco.netlify.app",
    siteName: "Covenant Clean Co",
    title: "Covenant Clean Co | Sparkling Clean, Every Single Time",
    description: "Professional cleaning services for homes and businesses. Book your free quote today!",
    images: [
      {
        url: "/logo.png", // Create a 1200x630px image in your public folder
        width: 1200,
        height: 630,
        alt: "Covenant Clean Co Professional Cleaning",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Covenant Clean Co | Professional Cleaning",
    description: "Premium residential and commercial cleaning services.",
    images: ["/logo.png"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/logo.png.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-slate-900">
        <AuthProvider>
          {children}
        </AuthProvider>
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}