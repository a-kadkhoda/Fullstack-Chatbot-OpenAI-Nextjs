"use client";

import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { Menu } from "lucide-react";

const SidebarWrapper = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="relative flex size-full">
      <Sidebar isOpen={isOpen} onIsOpen={setIsOpen} />
      <div className="h-[calc(100%-48px)] md:h-full w-full flex flex-col">
        <div className={`w-full h-max p-2  md:hidden`}>
          <div
            onClick={() => setIsOpen((prev) => !prev)}
            className="size-8 rounded-full hover:bg-secondary-200 cursor-pointer flex justify-center items-center transition-colors"
          >
            <Menu size={24} />
          </div>
        </div>

        <div className={`size-full `}>{children}</div>
      </div>
    </div>
  );
};

export default SidebarWrapper;
