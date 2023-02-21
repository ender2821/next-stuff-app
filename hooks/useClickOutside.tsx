

"use client";

import { useEffect, useRef, useState } from "react";

const useClickOutside = <T extends HTMLElement>({callback}: {callback?: () => void} = {}) => {
  const [expanded, setExpanded] = useState(false);
  const ref = useRef<T>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setExpanded(false);
        if(callback) callback();
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [ref, callback]);
 
  return {expanded, setExpanded, ref}
}

export default useClickOutside;