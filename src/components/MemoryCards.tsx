import { useCallback, useEffect, useRef, useState } from "react";
import GameContainer from "./games/game.container";
import { cn } from "../lib/cn";
import Button from "./ui/Button";

interface ICard {
  id: number;
  emoji: string;
  flipped: boolean;
  matched: boolean;
}

const EMOJIS = ["❤️", "💕", "💖", "💗", "🌹", "🌷", "🌺", "💝"];

export default function MemoryCards() {
  const [cards, setCards] = useState<ICard[]>([]);
  const [status, setStatus] = useState<"playing" | "waiting" | "finished">(
    "waiting",
  );
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matches, setMatches] = useState(0);
  const [moves, setMoves] = useState(0);
  const [timeLeft, setTimeLeft] = useState(120);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canFlipRef = useRef(true);

  const initCards = useCallback(() => {
    const pairs = [...EMOJIS, ...EMOJIS];
    const shuffled = pairs
      .map((emoji, i) => ({
        id: i,
        emoji,
        flipped: false,
        matched: false,
      }))
      .sort(() => Math.random() - 0.5);

    setCards(shuffled);
    setMatches(0);
    setMoves(0);
    setFlippedCards([]);
    setTimeLeft(120);
  }, []);

  const flipCard = useCallback(
    (id: number) => {
      const card = cards.find((c) => c.id === id)!;
      if (!canFlipRef.current || card.flipped || card.matched) return;

      setCards((prev) =>
        prev.map((card) =>
          card.id === id ? { ...card, flipped: true } : card,
        ),
      );
      setFlippedCards((prev) => [...prev, id]);
      setMoves((prev) => prev + 1);
    },
    [cards],
  );

  useEffect(() => {
    if (flippedCards.length !== 2) return;

    const [firstId, secondId] = flippedCards;
    canFlipRef.current = false;

    const timeout = setTimeout(() => {
      const firstEmoji = cards.find((card) => card.id === firstId)!.emoji;
      const secondEmoji = cards.find((card) => card.id === secondId)!.emoji;

      if (firstEmoji === secondEmoji) {
        setCards((prev) =>
          prev.map((card) =>
            card.id === firstId || card.id === secondId
              ? { ...card, matched: true }
              : card,
          ),
        );
        setMatches((m) => m + 1);
      } else {
        setCards((prev) =>
          prev.map((card) =>
            (card.id === firstId || card.id === secondId) && !card.matched
              ? { ...card, flipped: false }
              : card,
          ),
        );
      }

      setFlippedCards([]);
      canFlipRef.current = true;
    }, 800);

    return () => clearTimeout(timeout);
  }, [flippedCards, cards]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (matches === EMOJIS.length) setStatus("finished");
  }, [matches]);

  useEffect(() => {
    if (status !== "playing") return;

    if (timeLeft > 0) {
      timerRef.current = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    } else {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCards([]);
      setStatus("finished");
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [status, timeLeft]);

  const start = () => {
    setStatus("playing");
    initCards();
  };

  useEffect(
    () => () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    },
    [],
  );

  const inGame = status === "playing";
  const isFinished = status === "finished";

  return (
    <>
      <article className="text-primary flex items-center gap-10">
        <div className="flex items-center gap-2">
          <h4 className="text-md">Совпадений </h4>
          <h3 className="text-xl font-bold">{matches}/8</h3>
        </div>
        <div className="flex items-center gap-2">
          <h4 className="text-md">⏰</h4>
          <h3 className="text-xl font-bold">{timeLeft}с</h3>
        </div>
        <div className="flex items-center gap-2">
          <h4 className="text-md">Ходов </h4>
          <h3 className="text-xl font-bold">{moves}</h3>
        </div>
      </article>
      <GameContainer className="mx-auto grid grid-cols-4 place-items-center gap-4 p-6">
        {cards.map((card) => (
          <div
            key={card.id}
            className={cn(
              "group bg-background relative aspect-square h-30 w-45 cursor-pointer rounded-md select-none",
              card.matched && "matched",
              card.flipped && "flipped",
            )}
            onClick={() => flipCard(card.id)}
          >
            <h3 className="text-primary absolute flex h-full w-full items-center justify-center text-7xl backface-hidden">
              {card.flipped ? card.emoji : "?"}
            </h3>
          </div>
        ))}

        {!inGame && (
          <div className="animate-fade-in text-backround absolute top-1/2 left-1/2 z-5 flex h-full w-full -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-2 bg-black/80 text-center">
            {isFinished ? (
              <>
                <div className="animate-heart-beat mb-6 text-7xl">🎉</div>
                <h2 className="mb-4 text-3xl font-bold">
                  {matches === 8 ? "Ты выиграла!" : "Время вышло!"}
                </h2>
                <p className="mb-8 text-xl">
                  {matches === 8
                    ? `Супер! ${moves} ходов — ты гений! 💖`
                    : `Найдено ${matches}/8 пар. Попробуй ещё! 🌸`}
                </p>
              </>
            ) : (
              <p className="mb-8 text-2xl">Готова найти все пары любви?</p>
            )}

            <Button onClick={start}>
              {isFinished ? "Играть заново" : "Начать игру"}
            </Button>
          </div>
        )}
      </GameContainer>
    </>
  );
}
