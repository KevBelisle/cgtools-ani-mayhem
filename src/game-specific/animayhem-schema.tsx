import { CardBaseQueryResult } from "@/game-specific/database-schema";

export type Card = {
  Name: string;
  Set: string;
  ImageFile: string;
  BackColor: "purple" | "green" | "red";
  Rarity: string;
  Type: string;
  Attack: string | null;
  Defense: string | null;
  Movement: string | null;
  Charm: string | null;
  Energy: string | null;
  Skills: string | null;
  Requirements: string | null;
  Uses: string | null;
  Categories: string | null;
  Instructions: string | null;
};

export function lotrCardFromCardBaseQuery(card: CardBaseQueryResult): Card {
  return card as Card;
}
