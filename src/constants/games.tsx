import BouquetGame from "../components/BouquetGame";
import type { IGame } from "../components/games/game.interface";
import HeartsClicker from "../components/HeartsClicker";
import MemoryCards from "../components/MemoryCards";

export const GAMES: IGame[] = [
  {
    id: "collect-bouquet",
    name: "Собери букетик",
    description:
      "Собери букетик из 5 цветов. Но будь осторожна, не все цветы одинаковые! Некоторые из них могут быть ядовитыми и испортить твой букет. Удачи! Я верю в тебя!",
    image: "🌹",
    instructions: (
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-semibold text-green-500">
          Собери как можно больше цветов
        </h2>
        <h2 className="text-xl font-semibold text-red-500">
          Остерегайся бомб и кактусов
        </h2>
      </div>
    ),
    game: <BouquetGame />,
  },
  {
    id: "pair-memory-cards",
    name: "Парные карточки",
    description:
      'Тебе предстоит собрать 8 пар карточек. Задание непростое! Используй навык "Память" для успешного успеха в этой игре. Удачи!',
    image: "♥️",
    instructions: (
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-semibold text-green-500">
          Запоминай расположение карточек
        </h2>
        <h2 className="text-xl font-semibold text-red-500">
          Следи за временем
        </h2>
      </div>
    ),
    game: <MemoryCards />,
  },
  {
    id: "hearts-clicker",
    name: "Клики в сердце",
    description:
      "Тебе предстоит испытать свою скорость реакции! Попробуй набрать как можно большое количество собранных сердец!",
    image: "💗",
    instructions: (
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-semibold text-green-500 underline">
          Терпение и труд - все перетрут
        </h2>
        <h2 className="text-xl font-semibold text-green-500">
          Следи за новыми сердцами
        </h2>
        <h2 className="text-xl font-semibold text-green-500">
          Комбо дает бонусы
        </h2>
        <h2 className="text-xl font-semibold text-red-500">
          Следи за временем
        </h2>
      </div>
    ),
    game: <HeartsClicker />,
  },
];
