import { Textarea } from "@heroui/input";
import { Send } from "lucide-react";
import React from "react";

const PromptInput = () => {
  return (
    <div className=" relative w-full md:w-3/4  max-h-48 flex items-center overflow-hidden bg-default-100 rounded-xl">
      <Textarea
        type="text"
        className="h-full w-[calc(100%-80px)] "
        placeholder="Ask Me"
      />
      <div className=" absolute right-0 w-20 h-full flex justify-center items-center  transition-colors duration-300 hover:bg-secondary-200 cursor-pointer">
        <Send size={20} />
      </div>
    </div>
  );
};

export default PromptInput;
