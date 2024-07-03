import React from "react";
import AppBar from "./[lang]/components/AppBar";
import LeftMenu from "./[lang]/components/LeftMenu";
import "@/app/globals.css";
import { Poppins, Roboto_Mono } from "next/font/google";
import { Providers } from "./[lang]/providers";
import { MessageProvider } from "@/context/MessageContext/Index";
import MessageToast from "@/components/MessageToast/Index";

const poppins = Poppins({
  variable: "--font-poppins",
  weight: "400",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  display: "swap",
  subsets: ["latin"],
});

export const metadata = {
  title: "Flowdapt - Dashboard",
  description: "Flowdapt - Dashboard (by Emergent Methods)",
};
export const revalidate = 0;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      suppressHydrationWarning
      lang="en"
      className={`${robotoMono.variable} ${poppins.variable} `}
    >
      <body className="flex flex-col min-h-screen">
        <Providers>
          <AppBar />
          <div className="flex flex-grow">
            <div className="flex-none w-25">
              <LeftMenu />
            </div>
            <div className="w-full mx-auto overflow-x-auto grow">
              <MessageProvider>
                {children}
                <MessageToast />
              </MessageProvider>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
