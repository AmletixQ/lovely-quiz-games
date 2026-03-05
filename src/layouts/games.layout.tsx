import { ArrowLeft } from "react-feather";
import { Link, Outlet, useParams } from "react-router-dom";

export default function GamesLayout() {
  const { id } = useParams();

  return (
    <main className="bg-background relative h-screen w-screen">
      {!id && (
        <Link
          to="/"
          className="text-md animate-fade-in-left fixed top-3 left-3 z-1 flex cursor-pointer items-center text-gray-500"
          viewTransition
        >
          <ArrowLeft /> на главную
        </Link>
      )}

      <Outlet />
    </main>
  );
}
