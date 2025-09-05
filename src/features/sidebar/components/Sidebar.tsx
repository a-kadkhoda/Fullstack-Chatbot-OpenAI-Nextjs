"use client";
import { Button } from "@heroui/button";
import React from "react";
import { Edit, Menu, Search } from "lucide-react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";
import { User } from "@heroui/user";

interface SidebarProps {
  isOpen: boolean;
  onIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const recents = [
  {
    title: "Chat",
  },
  {
    title: "Chat",
  },
  {
    title: "Chat",
  },
  {
    title: "Chat",
  },
  {
    title: "Chat",
  },
  {
    title: "Chat",
  },
];

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onIsOpen }) => {
  return (
    <div
      className={`z-50 h-full bg-primary-50 px-4 py-6 flex flex-col transition-all duration-300 ${
        isOpen
          ? "w-4/5 md:w-64 absolute md:static  translate-x-0 md:translate-x-0"
          : "w-4/5 md:w-20 absolute md:static -translate-x-full md:translate-x-0"
      }`}
    >
      <div className="size-full flex flex-col items-center gap-8">
        <div
          className={`w-full flex ${
            isOpen ? "justify-between" : "justify-center"
          }`}
        >
          {isOpen && (
            <div className="size-8 rounded-full hover:bg-secondary-200 cursor-pointer flex justify-center items-center transition-colors">
              <Search size={20} />
            </div>
          )}
          <div
            onClick={() => onIsOpen((prev) => !prev)}
            className=" size-8 rounded-full hover:bg-secondary-200 cursor-pointer flex justify-center items-center transition-colors"
          >
            <Menu size={20} />
          </div>
        </div>
        <Button
          className={`bg-transparent hover:bg-secondary-200 w-full flex  ${
            isOpen ? " justify-start gap-4" : "justify-center "
          }`}
        >
          <Edit size={20} />
          {isOpen && <span>New Chat</span>}
        </Button>
        {isOpen && (
          <div className="flex flex-col gap-2 w-full h-full overflow-y-auto rounded-lg p-2 ">
            <span className="">Recents</span>
            <div>
              {recents.map((conv, index) => {
                return (
                  <Button
                    className="bg-transparent hover:bg-secondary-200 w-full flex  justify-start gap-4"
                    key={index}
                  >
                    {conv.title}
                  </Button>
                );
              })}
            </div>
          </div>
        )}
      </div>
      <Dropdown backdrop="blur" placement="right">
        <DropdownTrigger>
          <div
            className={`hover:bg-secondary-200 p-1  ${
              isOpen ? "rounded-lg" : "rounded-full"
            } flex items-center`}
          >
            <User
              avatarProps={{
                src: "/me.jpg",
              }}
              description={isOpen ? "FullStack Developer" : ""}
              name={isOpen ? "Aliakbar Kadkhoda" : ""}
              className={` cursor-pointer ${
                isOpen ? " justify-start gap-4" : "justify-center"
              }`}
            />
          </div>
        </DropdownTrigger>
        <DropdownMenu>
          <DropdownItem key="GitHub">GitHub</DropdownItem>
          <DropdownItem key="Log Out" className="text-danger" color="danger">
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default Sidebar;
