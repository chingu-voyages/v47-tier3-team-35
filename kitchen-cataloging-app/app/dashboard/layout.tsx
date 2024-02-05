import Navbar from "@/components/navigation/navbar/Navbar";
import React from "react";
const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="bg-default-sys-light-surface-container min-h-screen">
      <Navbar />
        {children}
    </section>
  );
};
export default DashboardLayout;
