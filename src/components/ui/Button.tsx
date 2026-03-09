import { memo, type ButtonHTMLAttributes } from "react";
import { cn } from "../../lib/cn";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  animation?:
    | "animate-fade-in-down"
    | "animate-fade-in-right"
    | "animate-fade-in-left"
    | "animate-fade-in-up";
}

function Button({ animation, className, ...props }: Props) {
  return (
    <button
      {...props}
      className={cn(
        "transition duration-200",
        "bg-primary text-background rounded-md px-5 py-2",
        "text-xl font-semibold",
        "hover:bg-primary/80 w-55 cursor-pointer",
        animation,
        className,
      )}
    />
  );
}
export default memo(Button);
