import type { ReactNode } from "react";

export interface IGame {
  id: string;
  name: string;
  description: string;
  image: string;
  instructions: ReactNode;
  game: ReactNode;
}
