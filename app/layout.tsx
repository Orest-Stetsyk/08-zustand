import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import Footer from "@/components/Footer/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NoteHub",
  description: "A note-taking app to dont forget your ideas.",
  openGraph: {
    title: "NoteHub",
    description: "A note-taking app to dont forget your ideas.",
    url: "https://notehub.com/",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub Open Graph Image",
      },
    ],
  },
};

export default function RootLayout({
  children, modal,
}: Readonly<{
  children: React.ReactNode
  modal: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <TanStackProvider>
        <Header />
        <main>
          {children}
          {modal}
        </main>
        
        <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
};
