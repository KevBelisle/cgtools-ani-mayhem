import type { Card } from "@/game-specific/animayhem-schema";
import { ArtOnly } from "@/game-specific/display/art-only";
import { SmallCard } from "@/game-specific/display/small-card";
import type { ComponentType } from "react";
import type { IconType } from "react-icons/lib";
import { SmallCardWithArt } from "./display/small-card-with-art";

import { HTMLChakraProps } from "@chakra-ui/react";
import {
  LuFile,
  LuFileSpreadsheet,
  LuRectangleHorizontal,
} from "react-icons/lu";

export type DisplayOptionType = {
  name: string;
  component: ComponentType<{ card: Card } & HTMLChakraProps<"div">>;
  icon: IconType;
  minWidth?: string;
};

export const displayOptions: DisplayOptionType[] = [
  {
    name: "Info card",
    component: SmallCard,
    icon: LuRectangleHorizontal,
    minWidth: "400px",
  },
  {
    name: "Info card + art",
    component: SmallCardWithArt,
    icon: LuFileSpreadsheet,
    minWidth: "400px",
  },
  { name: "Art only", component: ArtOnly, icon: LuFile, minWidth: "300px" },
];

export type DisplayOptionsType = typeof displayOptions;
export default displayOptions;
