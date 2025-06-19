import { Card as GameCard } from "@/game-specific/animayhem-schema";
import { Box, Image, type HTMLChakraProps } from "@chakra-ui/react";
import { useNavigate } from "@tanstack/react-router";
import { memo, useCallback } from "react";

export const CardImages = memo(({ card }: { card: GameCard }) => {
  let aspectRatio = 2.5 / 3.5; // Default for vertical cards
  let borderRadius = "4.2% / 3%"; // Default border radius
  let width = "65%";
  let height = "auto";
  let frontTransform = "rotate(-2deg) translate(-25%, 0)";
  let backTransform = "rotate(2deg) translate(25%, 0)";

  // if (card.Front.Orientation == "Horizontal") {
  //   aspectRatio = 3.5 / 2.5; // Adjust for horizontal cards
  //   borderRadius = "3% / 4.2%"; // Adjust border radius for horizontal cards
  //   width = "auto"; // Use full width for horizontal cards
  //   height = "65%"; // Use full width for horizontal cards
  //   frontTransform = "rotate(2deg) translate(0%, 25%)"; // Adjust transform for horizontal cards
  //   backTransform = "rotate(-2deg) translate(0%, -25%)"; // Adjust transform for horizontal cards
  // }

  let backImageUrl: string;
  switch (card.BackColor) {
    case "purple":
      backImageUrl = "./images/purple.jpg";
      break;
    case "green":
      backImageUrl = "./images/green.jpg";
      break;
    case "red":
      backImageUrl = "./images/red.jpg";
      break;
  }

  const navigate = useNavigate({ from: "/cards/search" });
  const handleClick = useCallback(() => {
    navigate({ to: "/cards/$card", params: { card: card.ImageFile } });
  }, [card.ImageFile, navigate]);

  return (
    <>
      <Image
        src={`https://raw.githubusercontent.com/wishmstr/Ani-Mayhem/refs/heads/main/sets/setimages/${card.Set.replace(" ", "_")}/${card.ImageFile}.jpg`}
        alt={card.Name}
        bg={"night.800"}
        width={width}
        height={height}
        aspectRatio={aspectRatio}
        borderRadius={borderRadius}
        borderWidth={3}
        borderStyle={"solid"}
        borderColor={"night.800"}
        zIndex={20}
        transform={frontTransform}
        onClick={handleClick}
        cursor="pointer"
      />
      <Image
        src={backImageUrl}
        alt={"Back of card"}
        bg={"night.800"}
        width={width}
        height={height}
        aspectRatio={aspectRatio}
        position={"absolute"}
        borderRadius={borderRadius}
        borderWidth={3}
        borderStyle={"solid"}
        borderColor={"night.800"}
        zIndex={10}
        transform={backTransform}
      />
    </>
  );
});

export const ArtOnly = memo(
  ({
    card,
    ...rootProps
  }: {
    card: GameCard;
  } & HTMLChakraProps<"div">) => {
    return (
      <Box
        width={"100%"}
        height={"100%"}
        position={"relative"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        aspectRatio={1}
        {...rootProps}
      >
        <CardImages card={card} />
      </Box>
    );
  },
);

export default ArtOnly;
