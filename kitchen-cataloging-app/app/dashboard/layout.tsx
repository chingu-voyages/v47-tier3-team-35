import Navbar from "@/components/navigation/navbar/Navbar";
import React from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section>
      <Navbar />
      <div className="flex flex-col p-[1.5rem]">{children}</div>
    </section>
  );
};
export default DashboardLayout;
