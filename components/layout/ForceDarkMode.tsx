"use client";

import { useEffect } from "react";

export default function ForceDarkMode() {
  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 1023px)").matches;
    
    if (isMobile) {
      document.documentElement.classList.add("dark");
    }
    
    const handleResize = (e: MediaQueryListEvent | MediaQueryList) => {
      if (e.matches) {
        document.documentElement.classList.add("dark");
      }
    };
    
    const mql = window.matchMedia("(max-width: 1023px)");
    mql.addEventListener("change", handleResize);
    
    return () => mql.removeEventListener("change", handleResize);
  }, []);
  
  return null;
}
