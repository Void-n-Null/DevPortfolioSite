import type { Metadata } from "next";
import { 
  Geist, 
  Geist_Mono,
  Inter,
  Roboto,
  Poppins,
  Montserrat,
  Playfair_Display,
  Merriweather,
  Orbitron,
  Syncopate,
  Audiowide,
  Fira_Code,
  JetBrains_Mono,
  Space_Grotesk,
  Oswald,
  Raleway
} from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Sans Serif
const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const roboto = Roboto({ variable: "--font-roboto", weight: ["400", "700"], subsets: ["latin"] });
const poppins = Poppins({ variable: "--font-poppins", weight: ["400", "600", "700"], subsets: ["latin"] });
const montserrat = Montserrat({ variable: "--font-montserrat", subsets: ["latin"] });
const spaceGrotesk = Space_Grotesk({ variable: "--font-space-grotesk", subsets: ["latin"] });
const raleway = Raleway({ variable: "--font-raleway", subsets: ["latin"] });
const oswald = Oswald({ variable: "--font-oswald", subsets: ["latin"] });

// Serif
const playfair = Playfair_Display({ variable: "--font-playfair", subsets: ["latin"] });
const merriweather = Merriweather({ variable: "--font-merriweather", weight: ["400", "700"], subsets: ["latin"] });

// Display / Tech
const orbitron = Orbitron({ variable: "--font-orbitron", subsets: ["latin"] });
const syncopate = Syncopate({ variable: "--font-syncopate", weight: ["400", "700"], subsets: ["latin"] });
const audiowide = Audiowide({ variable: "--font-audiowide", weight: "400", subsets: ["latin"] });

// Mono
const firaCode = Fira_Code({ variable: "--font-fira-code", subsets: ["latin"] });
const jetbrainsMono = JetBrains_Mono({ variable: "--font-jetbrains-mono", subsets: ["latin"] });

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
          ${geistSans.variable} 
          ${geistMono.variable} 
          ${inter.variable}
          ${roboto.variable}
          ${poppins.variable}
          ${montserrat.variable}
          ${spaceGrotesk.variable}
          ${raleway.variable}
          ${oswald.variable}
          ${playfair.variable}
          ${merriweather.variable}
          ${orbitron.variable}
          ${syncopate.variable}
          ${audiowide.variable}
          ${firaCode.variable}
          ${jetbrainsMono.variable}
          font-sans antialiased
        `}
      >
        {children}
      </body>
    </html>
  );
}
