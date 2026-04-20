import type { Metadata } from "next";
import { Inter, Marcellus, Oregano } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

const marcellus = Marcellus({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-marcellus",
});

const oregano = Oregano({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-oregano",
});

export const metadata: Metadata = {
  title: "Muslim Association of Hamilton",
  description:
    "The Muslim Association of Hamilton is a registered charitable organization dedicated to providing religious, educational, and social services for the diverse Muslim community in Hamilton.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} tracking-wider ${marcellus.variable} ${oregano.variable} antialiased`}
      >
        <Toaster position="bottom-center" reverseOrder={false} />
        {children}
      </body>
    </html>
  );
}
