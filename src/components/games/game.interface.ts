import type { ReactNode } from "react";

export interface IGame {
  id: string;
  name: string;
  description: string;
  image: string;
  className?: string;
  instructions: ReactNode;
  game: ReactNode;
}
