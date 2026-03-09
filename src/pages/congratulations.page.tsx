import GameContainer from "../components/games/game.container";

export default function CongratulationsPage() {
  return (
    <article className="flex h-screen w-screen items-center justify-center">
      <GameContainer className="text-primary animate-fade-in-down flex h-fit flex-col items-center justify-center gap-8 p-10 text-5xl font-bold">
        <h1 className="text-accent text-6xl font-bold">Королева,</h1>

        <div
          className="text-primary flex flex-col gap-2 text-center text-xl"
          aria-label="Letter for congratulations for woman's day"
        >
          <p>
            Дорогая, Любимая моя, поздравляю тебя с праздничным днем! Не найти
            слов, которые я мог бы отобразить на этом цифровом листе. Но я
            скажу.
          </p>
          <p>
            Пусть каждый твой день озаряется теплыми солнечными лучами! Пусть на
            твоем лице будет стоять твоя самая прекрасная улыбка, которую я так
            обожаю!
          </p>
          <p>
            Прошу только об одном, никогда не грусти, а если все же грустно,
            погрусти со мной, ведь я всегда к твоим услугам и никогда не оставлю
            тебя одну.
          </p>
          <p className="text-3xl">
            Не вешай нос - не будь лапшой. Живи долго и счастливо.
            <br />
            <span className="text-accent">С любовью, твой любимый!</span>
          </p>
        </div>
      </GameContainer>
    </article>
  );
}
