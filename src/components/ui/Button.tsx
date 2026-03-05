import { memo, type ButtonHTMLAttributes } from "react";
import { cn } from "../../lib/cn";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  isAnimate?: boolean;
}

function Button({ isAnimate = true, className, ...props }: Props) {
  return (
    <button
      {...props}
      className={cn(
        isAnimate && "animate-fade-in-down",
        "transition duration-200",
        "bg-primary text-background rounded-md px-5 py-2",
        "text-xl font-semibold",
        "hover:bg-primary/80 w-55 cursor-pointer",

        className,
      )}
    />
  );
}
export default memo(Button);
