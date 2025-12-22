import type { Metadata } from "next";
import { 
  Geist_Mono,
  Inter,
  Red_Hat_Mono
} from "next/font/google";
import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Default readable body font (sans)
const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });

// “Tech” display accent font (used sparingly on headings/labels)
const redHatMono = Red_Hat_Mono({ variable: "--font-red-hat-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Blake Werlinger",
  description: "Systems architect and developer. Early AutoGPT contributor. Building things that click together.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`
          ${geistMono.variable} 
          ${inter.variable}
          ${redHatMono.variable}
          font-sans antialiased
        `}
      >
        {children}
      </body>
    </html>
  );
}
