import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import FallingHearts from "../components/FallingHearts";
import { ArrowLeft } from "react-feather";

export default function RootLayout() {
  const { pathname } = useLocation();
  const { id } = useParams();

  return (
    <main className="bg-background relative z-0 h-screen w-screen">
      {pathname !== "/" && !id && (
        <Link
          to="/"
          className="text-md animate-fade-in-left fixed top-3 left-3 z-1 flex cursor-pointer items-center text-gray-500"
          viewTransition
        >
          <ArrowLeft /> на главную
        </Link>
      )}

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
