import Footer from "@/components/components/Footer";
import AppContextProvider from "@/context/AppContext";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import Navbar from "@/components/components/Navbar/Navbar";
import NextTopLoader from 'nextjs-toploader';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CareVita - Your Healthcare Partner",
  description: "Manage your healthcare needs conveniently and efficiently",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased mx-4 sm:mx-[10%]`}
        suppressHydrationWarning
      >
        <NextTopLoader />
        <AppContextProvider>
          <Navbar />
          {children}
          <ToastContainer position="top-right" />
        </AppContextProvider>
        <Footer />
      </body>
    </html>
  );
}
