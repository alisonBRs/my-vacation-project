"use client";
import localFont from "next/font/local";
import "./globals.css";
import { Provider } from "@/components/ui/provider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { QueryClient, QueryClientProvider } from "react-query";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient();
  return (
    <html suppressHydrationWarning lang="pt_BR">
      <body
        style={{ background: "white", color: "black" }}
        className={`${geistSans.variable} ${geistMono.variable}`}
      >
        <BrowserRouter>
          <QueryClientProvider client={queryClient}>
            <Provider>
              {children}
              <ToastContainer />
            </Provider>
          </QueryClientProvider>
        </BrowserRouter>
      </body>
    </html>
  );
}
