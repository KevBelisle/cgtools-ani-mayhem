import { CardTable } from "@/game-specific/database-schema";

export const sortOptions: (keyof CardTable)[] = [
  "Name",
  "Attack",
  "Defense",
  "Movement",
  "Charm",
  "Energy",
];

export default sortOptions;
