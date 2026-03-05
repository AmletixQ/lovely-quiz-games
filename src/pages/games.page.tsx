import GamesList from "../components/games/games.list";

export default function GamesPage() {
  return (
    <div className="relative flex flex-col gap-4 px-4 pt-20">
      <h1 className="text-primary animate-fade-in-down text-center text-4xl font-bold">
        Тут собрана маленькая библиотека игр, которые я приготовил <br />
        для тебя, <span className="text-accent">моя Любимая</span>
      </h1>

      <GamesList />
    </div>
  );
}
