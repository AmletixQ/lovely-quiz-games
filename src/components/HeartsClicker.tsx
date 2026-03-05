import { useCallback, useEffect, useRef, useState } from "react";
import GameContainer from "./games/game.container";
import { cn } from "../lib/cn";
import Button from "./ui/Button";

interface IHeart {
  id: number;
  x: number;
  y: number;
  size: number;
  emoji: string;
  collected: boolean;
}

const HEART_EMOJIS = ["❤️", "💕", "💖", "💗", "💘", "💝", "💞", "💓", "💔"];

export default function HeartsClicker() {
  const [status, setStatus] = useState<"playing" | "waiting" | "finished">(
    "waiting",
  );
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(45);
  const [hearts, setHearts] = useState<IHeart[]>([]);
  const [combo, setCombo] = useState(0);

  const nextId = useRef(0);
  const spawnRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastClickRef = useRef(0);

  const spawnHeart = useCallback(() => {
    const x = 10 + Math.random() * 80;
    const y = 10 + Math.random() * 70;
    const size = 1 + Math.random();
    const emoji = HEART_EMOJIS[Math.floor(Math.random() * HEART_EMOJIS.length)];

    setHearts((prev) => [
      ...prev,
      {
        id: nextId.current++,
        x,
        y,
        size,
        emoji,
        collected: false,
      },
    ]);
  }, []);

  const clickHeart = useCallback(
    (id: number) => {
      const now = Date.now();
      const comboTime = 700;

      setHearts((prev) =>
        prev.map((heart) =>
          heart.id === id && !heart.collected
            ? { ...heart, collected: true }
            : heart,
        ),
      );

      if (now - lastClickRef.current < comboTime) setCombo((c) => c + 1);
      else setCombo(0);

      lastClickRef.current = now;

      setTimeout(() => {
        setHearts((prev) => prev.filter((h) => h.id !== id));
        setScore((s) => s + 1 + Math.floor(combo / 3));
      }, 350);

      if (combo > 5) {
        setTimeout(spawnHeart, 100);
        setTimeout(spawnHeart, 200);
      }
    },
    [combo, spawnHeart],
  );

  const start = () => {
    setStatus("playing");
    setScore(0);
    setTimeLeft(45);
    setCombo(0);
    setHearts([]);
    nextId.current = 0;
    lastClickRef.current = 0;

    spawnRef.current = setInterval(() => {
      const delay = 200 + Math.random() * 600;
      setTimeout(spawnHeart, delay);
    }, 800);

    for (let i = 0; i < 6; ++i) setTimeout(spawnHeart, 200 + i * 150);
  };

  const stop = useCallback(() => {
    if (spawnRef.current) clearInterval(spawnRef.current);
    if (timerRef.current) clearTimeout(timerRef.current);
    setHearts([]);
  }, []);

  useEffect(() => {
    if (status !== "playing") return;

    if (timeLeft > 0)
      timerRef.current = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    else {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setStatus("finished");
      stop();
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [status, timeLeft, stop]);

  useEffect(() => () => stop(), [stop]);

  const inGame = status === "playing";
  const isFinished = status === "finished";

  const getResultMessage = useCallback(() => {
    if (score > 1000)
      return "МИРОВОЙ РЕКОРД СЕРДЦЕБИЕНИЙ! Ты - королева страсти!";
    if (score > 700) return "Ого! Это круто! Я влюблен окончательно!";
    if (score > 500)
      return "Отличный результат! Я тебя обожаю! Теперь сделай 700 сердцебиений!";
    if (score > 200) return "Скромно, но мило! Ты можешь лучше!";

    return "Попробуй теперь сделать 200!";
  }, [score]);

  return (
    <>
      <article className="text-primary flex items-center gap-10">
        <div className="flex items-center gap-2">
          <h4 className="text-md">⏰</h4>
          <h3 className="text-2xl font-bold">{timeLeft}с</h3>
        </div>

        <div className="flex items-center gap-2">
          <h3 className="text-2xl font-bold">x{combo}</h3>
        </div>
      </article>

      <GameContainer>
        {hearts.map((heart) => (
          <div
            key={heart.id}
            onClick={() => !heart.collected && clickHeart(heart.id)}
            style={{
              left: `${heart.x}%`,
              top: `${heart.y}%`,
              fontSize: `${heart.size}em`,
              transform: heart.collected
                ? "scale(0) translateY(-100px) rotate(720deg)"
                : undefined,
            }}
            className={cn(
              "absolute text-4xl transition-all duration-500 select-none",
              heart.collected
                ? "animate-heart-collect pointer-events-none"
                : "hover:scale-125 hover:rotate-12 hover:drop-shadow-2xl active:scale-110",
            )}
          >
            {heart.emoji}
          </div>
        ))}

        {!inGame && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/50 text-center">
            {isFinished ? (
              <>
                <div className="animate-heart-explode mb-8 text-8xl">
                  💥💖💥
                </div>
                <h2 className="mb-6 text-4xl font-black drop-shadow-lg">
                  {score} сердцебиений!
                </h2>
                <h2 className="mb-6 text-4xl font-black drop-shadow-lg text-green-500">
                  {getResultMessage()}
                </h2>
              </>
            ) : (
              <p className="mb-8 text-3xl font-semibold">
                Покажи, на что способна!
              </p>
            )}

            <Button onClick={start}>{isFinished ? "Еще!" : "Начнем?"}</Button>
          </div>
        )}
      </GameContainer>
    </>
  );
}
