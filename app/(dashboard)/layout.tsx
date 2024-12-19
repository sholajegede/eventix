import Header from "@/components/header";
import React, { ReactNode } from "react";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <>
      <Header />
      <div className="pt-28 sm:pt-20">{children}</div>
    </>
  );
}