import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import "katex/dist/katex.min.css";
import "./globals.css";
import PrimaryNav from "@/components/PrimaryNav";
import ClientShell from "@/components/ClientShell";

const headingFont = Fraunces({
  subsets: ["latin"],
  variable: "--font-heading"
});

const bodyFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-body"
});

export const metadata: Metadata = {
  title: "i-scream math with Oman",
  description: "Interactive math demo aligned to Oman curriculum"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${headingFont.variable} ${bodyFont.variable}`}>
      <body>
        <ClientShell>
          <PrimaryNav />
          <main className="main-content">{children}</main>
          <footer className="site-footer">
            <p>
              Built for the Oman Ministry of Education demo. Cambridge-aligned
              strands with Knowledge, Understanding, Application, Reasoning
              analysis.
            </p>
          </footer>
        </ClientShell>
      </body>
    </html>
  );
}
