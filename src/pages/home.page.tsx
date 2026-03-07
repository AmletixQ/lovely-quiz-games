import { useState } from "react";
import Button from "../components/ui/Button";
import Modal from "../components/ui/Modal";
import { Link } from "react-router-dom";

export default function HomePage() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-8">
      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <div className="flex flex-col items-center gap-3">
            <h2 className="text-accent text-center text-3xl font-bold">
              Ты самая лучшая девушка на свете!
            </h2>

            <p>Пожелания...</p>
          </div>
        </Modal>
      )}
      <h1 className="text-primary animate-fade-in-down text-center text-6xl font-bold">
        Приветствую, моя <br />
        <span className="text-accent">арбузно-дынная сладкая шалунья!</span>
      </h1>

      <div className="flex items-center gap-4">
        <Button
          animation="animate-fade-in-left"
          onClick={() => setIsOpen(true)}
          className=""
        >
          Открой карточку
        </Button>
        <Link to="/games">
          <Button
            animation="animate-fade-in-right"
            className="bg-accent hover:bg-accent/90"
          >
            Готова?
          </Button>
        </Link>
      </div>
    </div>
  );
}
