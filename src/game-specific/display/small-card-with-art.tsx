import { Card as GameCard } from "@/game-specific/animayhem-schema";
import { Box, type HTMLChakraProps } from "@chakra-ui/react";

import { CardImages } from "@/game-specific/display/art-only";
import { SmallCard } from "@/game-specific/display/small-card";

export const SmallCardWithArt = ({
  card,
  ...rootProps
}: {
  card: GameCard;
} & HTMLChakraProps<"div">) => {
  return (
    <Box {...rootProps}>
      <Box
        height="270px"
        overflow="hidden"
        display={"flex"}
        justifyContent={"center"}
      >
        <Box
          height="400px"
          width="400px"
          position="relative"
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <CardImages card={card} />
        </Box>
      </Box>
      <SmallCard card={card} />
    </Box>
  );
};

export default SmallCardWithArt;
