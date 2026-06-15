import type { Metadata } from "next";
import "./globals.css";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";


export const metadata: Metadata = {
  title: "Hack Club - Your School's Hacking Community",
  description: "Join your school's Hack Club to learn coding, build projects, and compete in hackathons.",
  keywords: "hackathon, coding, club, events, competitions",
  openGraph: {
    title: "Hack Club - Your School's Hacking Community",
    description: "Join your school's Hack Club to learn coding, build projects, and compete in hackathons.",
    images: ["https://assets.hackclub.com/flag-standalone.svg"],
  },
  icons: {
    icon: "https://assets.hackclub.com/icon-rounded.svg",
    shortcut: "/vercel.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="stylesheet" href="https://assets.hackclub.com/fonts/Phantom_Sans.css" />
      </head>
      <body className="min-h-full flex flex-col font-sans">
        <Navigation />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
