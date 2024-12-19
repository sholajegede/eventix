import { Geist } from "next/font/google";
import "./globals.css";
import { ConvexClientProvider } from "./convexClientProvider";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "./authProvider";
import { Metadata } from "next";

const geist = Geist({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "Event Notification Application",
  description:
    "Event Notification Application using NextJs and Convex",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <AuthProvider>
      <html lang="en">
        <body className={`${geist.className} antialiased`}>
          <ConvexClientProvider>
            <Toaster />
            <div>{children}</div>
          </ConvexClientProvider>
        </body>
      </html>
    </AuthProvider>
  );
};