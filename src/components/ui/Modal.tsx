import { useEffect, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { X } from "react-feather";

interface Props {
  onClose: () => void;
  children: ReactNode;
}
export default function Modal({ children, onClose }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (containerRef && containerRef.current)
      containerRef.current.addEventListener("click", onClose);

    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
      if (containerRef.current)
        containerRef.current.removeEventListener("click", onClose);
    };
  }, [onClose]);

  return createPortal(
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
    >
      <div className="bg-background z-10 animate-fade-in-down relative w-[78%] max-w-xl rounded-2xl p-6 shadow-lg">
        <button
          onClick={() => onClose()}
          className="p-1/2 hover:bg-primary/20 absolute top-1 right-1 cursor-pointer rounded-lg transition duration-200"
          aria-label="Close modal"
        >
          <X size={28} color="var(--color-gray-500)" />
        </button>
        <div className="flex items-center justify-center">{children}</div>
      </div>
    </div>,
    document.body,
  );
}
