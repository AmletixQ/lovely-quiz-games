import { useMemo, useState } from "react";
import { GAMES } from "../../constants/games.tsx";
import GameCard from "./game.card";
import Modal from "../ui/Modal";
import { Link } from "react-router-dom";
import Button from "../ui/Button";
import { LINKS } from "../../constants/links.ts";

export default function GamesList() {
  const [currentGame, setCurrentGame] = useState<string | null>(null);

  const GAME = useMemo(
    () => GAMES.find((game) => game.id === currentGame),
    [currentGame],
  );

  return (
    <div className="mx-auto flex items-center justify-between gap-4">
      {GAMES.map((game) => (
        <GameCard
          className={game.className}
          key={game.id}
          game={game}
          openDescription={() => setCurrentGame(game.id)}
        />
      ))}

      {!!currentGame && (
        <Modal onClose={() => setCurrentGame(null)}>
          <div className="flex flex-col items-center gap-3">
            <h2 className="text-4xl font-bold">
              {GAME?.name} {GAME?.image}
            </h2>
            <p className="text-center">{GAME?.description}</p>

            <div className="flex items-center gap-2">
              <Link to={`${LINKS.game}/${GAME?.id}`}>
                <Button>Играть</Button>
              </Link>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
