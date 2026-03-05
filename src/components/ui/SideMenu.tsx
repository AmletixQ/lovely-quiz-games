import { useState, type PropsWithChildren } from "react";
import { cn } from "../../lib/cn";
import Button from "./Button";
import { ChevronsLeft, ChevronsRight, LogOut } from "react-feather";
import { Link } from "react-router-dom";

export default function SideMenu({ children }: PropsWithChildren) {
  const [isHide, setIsHide] = useState(false);

  return (
    <aside
      className={cn(
        "flex w-full flex-col gap-4 rounded-lg bg-white p-6 shadow transition-all duration-300",
        isHide ? "max-w-12 p-2 pt-6" : "max-w-sm",
      )}
    >
      <Button
        isAnimate={false}
        onClick={() => setIsHide(!isHide)}
        className="w-fit p-1"
      >
        {!isHide ? <ChevronsRight /> : <ChevronsLeft />}
      </Button>

      {!isHide && children}

      <Link
        to="/games"
        className="bg-accent hover:bg-accent/80 w-fit cursor-pointer rounded-md p-1 transition duration-300 mt-auto"
      >
        <LogOut color="white" strokeWidth={2} size={24} />
      </Link>
    </aside>
  );
}
