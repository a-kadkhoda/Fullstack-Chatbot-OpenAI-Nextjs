import { useEffect, useState } from "react";
import { ScreenSize } from "./useWindowSize";

const useIsMobile = (): boolean | undefined => {
  const [isMobile, setIsMobile] = useState<boolean>();
  useEffect(() => {
    if (window.innerWidth <= ScreenSize.md) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, []);

  return isMobile;
};

export default useIsMobile;
