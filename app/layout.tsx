import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-serif" });

export const metadata: Metadata = {
  metadataBase: new URL("https://venturekenya.co.ke"),
  title: "Venture Kenya | Discover Kenya. Celebrate Our Culture.",
  description:
    "A digital tourism and cultural promotion platform dedicated to showcasing Kenya's cultural diversity, historical landmarks, and excursion destinations.",
  icons: {
    icon: [{ url: "/vk-logo.png", type: "image/png" }],
    shortcut: "/vk-logo.png",
    apple: "/vk-logo.png",
  },
  openGraph: {
    title: "Venture Kenya | Discover Kenya. Celebrate Our Culture.",
    description:
      "A digital tourism and cultural promotion platform dedicated to showcasing Kenya's cultural diversity, historical landmarks, and excursion destinations.",
    url: "https://venturekenya.co.ke",
    siteName: "Venture Kenya",
    images: [
      {
        url: "/vk-logo.png",
        width: 512,
        height: 512,
        alt: "Venture Kenya Logo",
      },
    ],
    locale: "en_KE",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${playfair.variable} font-sans bg-slate-950 text-slate-50`}>
        {children}
      </body>
    </html>
  );
}