import { useEffect, useState } from "react";

export function useClickOutside(ref, state:boolean) {
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setExpanded(state);
      }
    };
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [ref, state]);

  return expanded
}