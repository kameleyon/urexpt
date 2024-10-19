import './globals.css';
import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import { ThemeProvider } from "@/components/theme-provider"
import SessionProvider from "@/components/SessionProvider"

const montserrat = Montserrat({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'URExpert Dashboard',
  description: 'AI-powered patient review generator',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={montserrat.className}>
        <SessionProvider>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            <div className="min-h-screen bg-gradient-to-b from-[#001F3F] to-[#003366]">
              {children}
            </div>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}