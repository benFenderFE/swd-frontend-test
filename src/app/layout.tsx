import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Provider from "@/app/provider";
import LayoutNavbar from "@/components/LayoutNavbar";
import I18nProvider from "@/app/I18nProvider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "React Test Assisgnments 2",
  description: "for test assisgnments",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Provider>
          <I18nProvider>
            <LayoutNavbar />
            {children}
          </I18nProvider>
        </Provider>
      </body>
    </html>
  );
}
