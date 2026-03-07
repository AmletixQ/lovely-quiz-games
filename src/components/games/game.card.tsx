import { Link } from "react-router-dom";
import Button from "../ui/Button";
import type { IGame } from "./game.interface";
import { memo } from "react";
import { cn } from "../../lib/cn";

interface Props {
  game: IGame;
  className?: string;
  openDescription: (id: string) => void;
}

function GameCard({ game, className, openDescription }: Props) {
  return (
    <article
      className={cn(
        "bg-secondary text-background/90",
        "relative flex h-40 w-85 flex-col items-center justify-center gap-4 rounded-lg",
        className,
      )}
    >
      <h2 className="text-3xl font-bold">
        <span>{game.image}</span> {game.name}
      </h2>
      <div className="flex gap-2">
        <Link to={`/games/${game.id}`}>
          <Button className="text-md w-auto animate-none px-4 py-1 font-semibold">
            Играть
          </Button>
        </Link>
        <Button
          onClick={() => openDescription(game.id)}
          className="bg-accent text-md hover:bg-accent/60 w-auto animate-none px-4 py-1 font-semibold"
        >
          Подробнее
        </Button>
      </div>
    </article>
  );
}

export default memo(GameCard);
