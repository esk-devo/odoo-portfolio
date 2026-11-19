import { useEffect, useState } from "react";

// True only on devices with a real mouse/trackpad (hover + fine pointer).
// Used to switch off tilt effects on phones and tablets.
export default function useFinePointer() {
  const [fine, setFine] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    setFine(mq.matches);
    const onChange = (e) => setFine(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return fine;
}
