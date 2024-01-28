import Navbar from "@/components/navigation/navbar/Navbar";
import React from "react";
const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="bg-default-sys-light-surface-container">
      <Navbar />
      <div className="flex flex-col p-[3.1rem] min-h-screen">
        {children}
      </div>
    </section>
  );
};
export default DashboardLayout;
