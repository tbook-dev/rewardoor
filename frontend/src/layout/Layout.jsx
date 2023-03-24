import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";

export default function LayoutAdmin({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F5F5]">
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <main className="w-full flex-auto py-10">
        {children}
      </main>
      <Footer />
    </div>
  );
}