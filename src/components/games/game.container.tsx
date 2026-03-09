import type { PropsWithChildren } from "react";
import { cn } from "../../lib/cn";

interface Props extends PropsWithChildren {
  className?: string;
  id?: string;
}

export default function GameContainer({ children, className, id }: Props) {
  return (
    <article
      id={id}
      className={cn(
        "border-secondary bg-secondary/60 relative h-3/4 w-250 overflow-hidden rounded-lg border-2 p-2 text-white/80 shadow-2xl backdrop-blur-[2px]",
        className,
      )}
    >
      {children}
    </article>
  );
}
