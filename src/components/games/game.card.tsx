import { Link } from "react-router-dom";
import Button from "../ui/Button";
import type { IGame } from "./game.interface";

interface Props {
  game: IGame;
  openDescription: (id: string) => void;
}

export default function GameCard({ game, openDescription }: Props) {
  return (
    <article className="bg-secondary text-background/90 relative flex w-fit flex-col items-center gap-4 rounded-lg p-4">
      <h2 className="text-2xl font-bold">
        <span>{game.image}</span> {game.name}
      </h2>
      <div className="flex gap-2">
        <Link to={`/games/${game.id}`}>
          <Button
            isAnimate={false}
            className="text-md w-auto animate-none px-4 py-1 font-semibold"
          >
            Играть
          </Button>
        </Link>
        <Button
          onClick={() => openDescription(game.id)}
          isAnimate={false}
          className="bg-accent text-md hover:bg-accent/60 w-auto animate-none px-4 py-1 font-semibold"
        >
          Подробнее
        </Button>
      </div>
    </article>
  );
}
