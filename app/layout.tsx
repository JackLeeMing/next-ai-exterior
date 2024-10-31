import type { Metadata } from "next";
import { Analytics } from '@/components/analytics';
import { ThemeProvider } from '@/components/theme-provider';
import { TailwindIndicator } from '@/components/tailwind-indicator';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ConfigProvider } from "antd";
import theme from "@/app/themeConfig";
import localFont from "next/font/local";
import "./globals.css";

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
  title: "AI Exterior Home Design",
  description: "AI home exterior design free, house design interior and exterior,online exterior design",
};


interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script async src="/js/juxtapose.min.js?v=v1.1.6"></script>
      </head>
      <body
        className={`min-h-screen bg-background font-sans ${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <div className="relative flex min-h-screen flex-col">
            <AntdRegistry>
              <ConfigProvider theme={theme}>
                {children}
              </ConfigProvider>
            </AntdRegistry>
          </div>
          <Analytics />
          <TailwindIndicator />
        </ThemeProvider>
      </body>
    </html>
  );
}
