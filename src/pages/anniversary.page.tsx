import { useEffect, type PropsWithChildren } from "react";
import GameContainer from "../components/games/game.container";

function AccentSpan({ children }: PropsWithChildren) {
  return <span className="font-bold text-red-800">{children}</span>;
}

export default function AnniversaryPage() {
  useEffect(() => {
    if (localStorage.getItem("first-opened")) return;

    localStorage.setItem("first-opened", "true");
  }, []);

  return (
    <article className="text-primary relative flex h-screen w-screen flex-col items-center justify-center gap-2">
      <GameContainer
        id="letter-container"
        className="text-primary flex h-[85%] w-[60%] flex-col gap-2 overflow-y-scroll bg-white/50 px-10 pt-10 text-xl"
      >
        <h2 className="text-center text-5xl font-bold text-black">
          <AccentSpan>Третий</AccentSpan> год, да?
        </h2>
        <div className="flex flex-col gap-4 px-20">
          <p className="pt-4">
            Не изменяя традициям, я решил реализовать новый проект в качестве
            подарка. Честно говоря, я долго раздумывал над идеей, не зная что я
            мог бы подарить. Было множество вариантов, но остановился на этом.
            Не самый большой, но и не самый маленький проект, в котором я
            использовал свои накопленные навыки.
          </p>
          <p>
            Много воды утекло, да? С одной стороны кажется, что 3 года - долгий
            срок, но с моей - действительно быстрый. Я рад, неумоверно рад, что
            могу в очередной раз праздновать вступление в новый год первых и
            единственных отношений с такой замечательной девушкой, как ты,{" "}
            <AccentSpan>Анджелина</AccentSpan>.
          </p>
          <p>
            С прошедшим временем, прошло много разговоров, молчаний, ссор, но
            несмотря на это, мы вновь празднуем очередную годовщину, коих,
            надеюсь, будет еще очень-очень много.
          </p>
          <p>
            С прошлого года, как я делал такой же анализ, я могу с уверенностью
            сказать, что так произошло. Конечно, меня могут беспокоить
            всякое-разное, пугать всякое-ужасное, заставлять думать о неприятных
            темах, но я чувствую, что за время с тобой, могу прямо смотреть на
            множество вещей. <AccentSpan>Спасибо тебе!</AccentSpan>
          </p>
          <p>
            В последнее время на меня много навалилось. Ответственность, которая
            лежит на моих плечах перед моими людьми тяжела, но я стараюсь
            оставаться стойким и непринужденным, как в наш первый год, хотя, мне
            это начинает с трудом удаваться.
          </p>
          <p>
            Но я рад работать над собой, зная, какая награда меня ждет за это.
            Мечта о хорошей жизни двигает меня вперед, хотя иногда я могу
            споткнуться и впасть в уныние. Мне нравится обсуждать с тобой такие
            сложные и глубокие темы. Я до безумия благодарен, что ты
            выслушиваешь меня и мои мысли, которые могут казаться глупыми и
            бессмысленными. Правда, безумно рад.
          </p>
          <p>
            Хочу еще раз поблагодарить мир за такую прекрасную девушку, как ты,
            светлейшего человека. Пусть у нас все получится, пусть мы преодолеем
            все стены перед нами, а после заживем жизнью как во сне!
          </p>
        </div>

        <h1 className="py-10 text-center text-6xl font-bold">
          С годовщиной, любимая ❤
        </h1>
      </GameContainer>
      <p className="text-md text-gray-600">
        P.S. Оставь отзыв о проекте в нашем чатике ^_^
      </p>

      <a
        href="https://amletixq.github.io/memories-day"
        target="_blank"
        className="absolute right-2 bottom-2 text-gray-600 underline"
      >
        Помнишь?
      </a>
    </article>
  );
}
