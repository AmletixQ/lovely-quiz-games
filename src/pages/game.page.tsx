import { useParams } from "react-router-dom";
import { GAMES } from "../constants/games.tsx";
import SideMenu from "../components/ui/SideMenu";

export default function GamePage() {
  const { id } = useParams();
  const GAME = GAMES.find((game) => game.id === id);

  if (!GAME) {
    return <div>Game not found</div>;
  }

  return (
    <div className="flex h-screen justify-between gap-2">
      <section className="flex h-full w-full flex-col items-center justify-center gap-2">
        {GAME.game}
      </section>

      <SideMenu>
        <h2 className="text-2xl font-bold">{GAME.name}</h2>
        <p>{GAME.description}</p>
        {GAME.instructions}
      </SideMenu>
    </div>
  );
}
