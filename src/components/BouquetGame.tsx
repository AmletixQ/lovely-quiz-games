import { useCallback, useEffect, useRef, useState } from "react";
import Button from "./ui/Button";
import GameContainer from "./games/game.container";

interface IFlower {
  id: string;
  type: "flower" | "cactus" | "bomb";
  left: number;
  speed: number;
  emoji: string;
  collected: boolean;
}

const FLOWER_TYPES = [
  { type: "flower" as const, emoji: "🌸", points: 10 },
  { type: "flower" as const, emoji: "🌷", points: 12 },
  { type: "flower" as const, emoji: "🌺", points: 15 },
  { type: "flower" as const, emoji: "🌹", points: 20 },
  { type: "cactus" as const, emoji: "🌵", points: -15 },
  { type: "bomb" as const, emoji: "💣", points: -25 },
] as const;

export default function BouquetGame() {
  const [status, setStatus] = useState<"playing" | "waiting" | "finished">(
    "waiting",
  );
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(45);
  const [flowers, setFlowers] = useState<IFlower[]>([]);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const spawnRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const spawnFlower = useCallback(() => {
    const item = FLOWER_TYPES[Math.floor(Math.random() * FLOWER_TYPES.length)];
    const newFlower: IFlower = {
      id: Math.random().toString(36),
      type: item.type,
      left: Math.random() * 90,
      speed: 3.5 + Math.random(),
      emoji: item.emoji,
      collected: false,
    };
    setFlowers((prev) => [...prev, newFlower]);
  }, []);

  const collectFlower = useCallback((id: string) => {
    setFlowers((prev) =>
      prev.map((f) =>
        f.id === id && !f.collected ? { ...f, collected: true } : f,
      ),
    );

    setTimeout(() => {
      setFlowers((prev) => {
        const flower = prev.find((f) => f.id === id);
        if (!flower) return prev;

        setScore((s) => Math.max(0, s + (flower.type === "flower" ? 10 : -15)));

        return prev.filter((f) => f.id !== id);
      });
    }, 400);
  }, []);

  const start = useCallback(() => {
    setStatus("playing");
    setScore(0);
    setTimeLeft(45);
    setFlowers([]);

    spawnRef.current = setInterval(spawnFlower, 1100);

    for (let i = 0; i < 4; i++) {
      setTimeout(spawnFlower, 300 + i * 450);
    }
  }, [spawnFlower]);

  const stop = useCallback(() => {
    if (spawnRef.current) clearInterval(spawnRef.current);
    if (timerRef.current) clearTimeout(timerRef.current);
    setFlowers([]);
  }, []);

  useEffect(() => {
    if (status !== "playing") return;

    if (timeLeft > 0) {
      timerRef.current = setTimeout(() => {
        setTimeLeft((t) => t - 1);
      }, 1000);
    } else {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setStatus("finished");
      stop();
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [timeLeft, status, stop]);

  useEffect(() => {
    return () => stop();
  }, [stop]);

  const inGame = status === "playing";
  const isFinished = status === "finished";

  return (
    <>
      <GameContainer>
        {!inGame && (
          <div className="animate-fade-in text-backround absolute top-1/2 left-1/2 z-5 flex h-full w-full -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-2 bg-black/50 text-center">
            {isFinished ? (
              <>
                <div className="animate-heart-beat mb-4 text-6xl">💐</div>
                <h2 className="mb-3 text-3xl font-bold text-green-600">
                  Итог: {score} очков
                </h2>
                <p className="text-background mb-8 text-xl">
                  {score >= 200
                    ? "Ты настоящая фея цветов! ✨"
                    : score >= 100
                      ? "Очень красивый букет получился ♡"
                      : "Попробуем ещё раз? 🌷"}
                </p>
              </>
            ) : (
              <p className="mb-6 text-xl">
                Готова собрать самый красивый букет?
              </p>
            )}

            <Button onClick={start}>
              {isFinished ? "Играть ещё раз" : "Начать"}
            </Button>
          </div>
        )}

        <div className="flex items-center justify-between rounded-md border-b border-white/30 bg-linear-to-r from-rose-100/60 to-pink-100/60 px-6 py-4">
          <div className="text-2xl font-bold text-rose-700">💖 {score}</div>
          <div className="text-2xl font-bold text-rose-700">
            {timeLeft} сек ⏳
          </div>
        </div>

        <div className="relative h-full">
          {/* Падающие цветы */}
          {flowers.map((flower) => (
            <div
              key={flower.id}
              className={`absolute cursor-pointer text-5xl transition-all duration-300 select-none sm:text-6xl`}
              style={{
                left: `${flower.left}%`,
                top: 0,
                animation: flower.collected
                  ? undefined
                  : `fall-flowers ${flower.speed}s linear forwards`,
              }}
              onClick={() => !flower.collected && collectFlower(flower.id)}
            >
              {flower.emoji}
            </div>
          ))}
        </div>
      </GameContainer>
    </>
  );
}
