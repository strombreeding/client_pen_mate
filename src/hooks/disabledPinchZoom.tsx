import { useEffect } from "react";

const useDisablePinchZoom = () => {
  useEffect(() => {
    const handleTouchStart = (event: TouchEvent) => {
      if (event.touches.length >= 2) {
        event.preventDefault();
      }
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (event.touches.length >= 2) {
        event.preventDefault();
      }
    };

    document.addEventListener("touchstart", handleTouchStart, {
      passive: false,
    });
    document.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);
};

export default useDisablePinchZoom;
