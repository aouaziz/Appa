import type { Metadata } from "next";
import { Inter} from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});



export const metadata: Metadata = {
  title: "APPA",
  description: "APPA forme les futurs professionnels de la santé en Afrique, transformant la passion du soin en un véritable impact sociétal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
       <head>
        <link rel="icon" href="/favicon.png" />
      </head>
      <body className={`${inter.variable} antialiased`}>
      <Navbar />
      {children}
      <Footer/>
      </body>
    </html>
  );
}
