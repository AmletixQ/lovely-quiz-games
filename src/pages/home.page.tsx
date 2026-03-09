import { useState } from "react";
import Button from "../components/ui/Button";
import Modal from "../components/ui/Modal";
import { Link } from "react-router-dom";
import { LINKS } from "../constants/links";

export default function HomePage() {
  const [isOpen, setIsOpen] = useState(false);
  const firstOpenedAnniversary = localStorage.getItem("first-opened");

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-8">
      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <div className="flex flex-col items-center gap-3 px-3">
            <h2 className="text-accent text-center text-3xl font-bold">
              Вот и пришла наша годовщина
            </h2>
            <div className="flex flex-col gap-2 text-lg">
              <p>Хмммм, какую бы вступительную речь выдать..?</p>
              <p>
                Конечно, получилось не так колоритно, эстетично и красочно, как
                в прошлом году с проектом{" "}
                <span className="font-semibold">"Memories Day"</span>. Но в
                защиту этого проектика могу сказать, что я старался реализовать
                все круто с технической точки зрения... хотя это мало что
                значит...
              </p>
              <p>
                В общем, я рад, что мы находимся там, где мы сейчас есть
                (имеется ввиду временной промежуток, а не пространственный,
                хе-хе). Хотя, несмотря на шутки, я бы очень хотел оказаться
                рядом с тобой в этот момент.
              </p>
              <p>
                В общем, не задерживаю тебя на этом моменте и приглашаю тебя
                зайти с исследованиями проекта дальше!
              </p>
              <p className="font-bold">
                Но пока ты не ушла.. спасибо за то, что появилась в моей жизни.
                Ты мой самый яркий и любимый луч света!
              </p>
              <h2 className="text-center font-bold text-3xl">Люблю тебя ❤</h2>
            </div>
          </div>
        </Modal>
      )}
      <h1 className="text-primary animate-fade-in-down text-center text-6xl font-bold">
        Приветствую, моя <br />
        <span className="text-accent">арбузно-дынная сладкая шалунья!</span>
      </h1>

      <div className="flex flex-col items-center gap-2">
        <div className="flex items-center gap-4">
          <Button
            animation="animate-fade-in-left"
            onClick={() => setIsOpen(true)}
            className=""
          >
            Открой карточку
          </Button>
          <Link to={LINKS.games}>
            <Button
              animation="animate-fade-in-right"
              className="bg-accent hover:bg-accent/90"
            >
              Готова?
            </Button>
          </Link>
        </div>
        {firstOpenedAnniversary === "true" && (
          <Link to={LINKS.anniversary}>
            <Button
              animation="animate-fade-in-up"
              className="bg-secondary hover:bg-secondary/90"
            >
              Письмо
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}
