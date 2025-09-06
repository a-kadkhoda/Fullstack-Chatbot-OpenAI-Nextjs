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
import Image from "next/image";
import { useProfileStore } from "@/zustand/useProfileStore";
import { useLogout } from "@/queries/auth";
import { addToast } from "@heroui/toast";
import { useRouter } from "next/navigation";

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
  const { avatarUrl, email, name } = useProfileStore();
  const { push } = useRouter();
  const { mutate: Logout } = useLogout({
    onSuccess(data) {
      addToast({
        title: data.message,
      });
    },
    onError(error) {
      addToast({
        title: error?.error,
      });
    },
    onSettled(data) {
      if (data?.isSuccess) push("/auth");
    },
  });

  return (
    <div
      className={`z-50 h-full bg-primary-50 px-4 py-6 flex flex-col  transition-all duration-300 absolute md:static ${
        isOpen ? "w-4/5 md:max-w-64   " : "w-4/5 md:max-w-20 hidden md:flex "
      }`}
      onMouseEnter={() => onIsOpen(true)}
    >
      <div className={`size-full flex flex-col items-center gap-8`}>
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
          <div className="flex flex-col gap-2 w-full h-full  rounded-lg p-2 ">
            <span className="">Recents</span>
            <div>
              {recents.map((conv, index) => {
                return (
                  <Button
                    className="bg-transparent hover:bg-secondary-200 w-full flex  justify-start gap-4 text-left"
                    key={index}
                  >
                    <span className="truncate">{conv.title}</span>
                  </Button>
                );
              })}
            </div>
          </div>
        )}
      </div>
      <Dropdown backdrop="blur">
        <DropdownTrigger>
          <div
            className={` flex gap-2 transition-colors duration-300 hover:bg-secondary-200 p-1 cursor-pointer ${
              isOpen ? "rounded-lg" : "rounded-full"
            } flex items-center  overflow-hidden`}
          >
            <Image
              src={!!avatarUrl ? avatarUrl : "/profile.png"}
              width={1920}
              height={1080}
              alt="profile"
              className="rounded-full size-10 "
            />
            <div
              className={`w-full flex flex-col overflow-hidden transition-opacity duration-300 ${
                isOpen ? "opacity-100 delay-200" : "opacity-0"
              }`}
            >
              <span className="truncate">{name}</span>
              <span className="truncate text-sm text-gray-500">{email}</span>
            </div>
          </div>
        </DropdownTrigger>
        <DropdownMenu>
          <DropdownItem key="GitHub">GitHub</DropdownItem>
          <DropdownItem key="Setting">Setting</DropdownItem>
          <DropdownItem
            key="Log Out"
            className="text-danger"
            color="danger"
            onClick={() => Logout()}
          >
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default Sidebar;
