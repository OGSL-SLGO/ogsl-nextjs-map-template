import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import config from "./config.js";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { getLocale } from "next-intl/server";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default async function RootLayout({ children }) {

const messages = await getMessages();
const locale = await getLocale();
  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextIntlClientProvider locale="fr" messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
