import Navbar from "@/components/navigation/navbar/Navbar";
import React from "react";
const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="bg-default-sys-light-surface-container min-h-screen">
      <Navbar />
      <div className="flex flex-col px-[1rem] md:px-[2rem] lg:px-[3rem]">
        {children}
      </div>
    </section>
  );
};
export default DashboardLayout;
