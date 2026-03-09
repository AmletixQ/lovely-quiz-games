import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft } from "react-feather";

import FallingHearts from "../components/FallingHearts";
import Button from "../components/ui/Button";
import { cn } from "../lib/cn";
import { LINKS } from "../constants/links";

export default function RootLayout() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (localStorage.getItem("first-opened") !== "true")
      timerRef.current = setTimeout(() => setShow(true), 50000);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [pathname, navigate]);

  return (
    <main className="bg-background relative z-0 h-screen w-screen">
      {show && (
        <div className="animate-fade-in-down fixed -top-2 left-1/2 w-fit -translate-x-1/2">
          <Link to={LINKS.anniversary}>
            <Button
              className={cn("animate-shaking bg-secondary/60 w-full py-1")}
              onClick={() => setShow(false)}
            >
              Это очень важно!
            </Button>
          </Link>
        </div>
      )}

      <Link
        to={LINKS.home}
        className="text-md animate-fade-in-left fixed top-3 left-3 z-1 flex cursor-pointer items-center text-gray-500"
        viewTransition
      >
        <ArrowLeft /> на главную
      </Link>

      <FallingHearts
        count={60}
        speedMin={11}
        speedMax={40}
        sizeMin={14}
        sizeMax={32}
        density={1.2}
      />
      <Outlet />
    </main>
  );
}
