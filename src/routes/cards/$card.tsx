import {
  Card,
  lotrCardFromCardBaseQuery,
} from "@/game-specific/animayhem-schema";
import {
  cardBaseQuery,
  CardBaseQueryResult,
} from "@/game-specific/database-schema";
import SmallCard from "@/game-specific/display/small-card";
import execCompiledQuery from "@/sqljs/exec-compiled-query";
import { Container, HStack, Image } from "@chakra-ui/react";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/cards/$card")({
  component: RouteComponent,

  loader: async ({ params, context }) => {
    const compiledQuery = cardBaseQuery
      .where("c.ImageFile", "=", params["card"])
      .limit(1)
      .compile();

    const queryResult = execCompiledQuery(
      compiledQuery,
      context.sqljsDbContext.sqljsDb!,
    )[0];
    return lotrCardFromCardBaseQuery(
      queryResult as CardBaseQueryResult,
    ) as Card;
  },
});

function RouteComponent() {
  const card = Route.useLoaderData();

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

  let aspectRatio = 2.5 / 3.5; // Default for vertical cards
  let borderRadius = "4.2% / 3%"; // Default border radius
  let width = "40vw";
  let maxWidth = "400px";
  let height = "auto";
  let maxHeight = "unset";
  let frontTransform = "rotate(-2deg)";
  let backTransform = "rotate(2deg)";

  // if (card.Front.Orientation == "Horizontal") {
  //   aspectRatio = 3.5 / 2.5; // Adjust for horizontal cards
  //   borderRadius = "3% / 4.2%"; // Adjust border radius for horizontal cards
  //   width = "auto"; // Use full width for horizontal cards
  //   maxWidth = "100%";
  //   height = "unset"; // Use full width for horizontal cards
  //   maxHeight = "400px";
  //   frontTransform = "rotate(2deg)"; // Adjust transform for horizontal cards
  //   backTransform = "rotate(-2deg)"; // Adjust transform for horizontal cards
  // }

  return (
    <Container py={8}>
      <HStack justifyContent={"space-around"} mb={8} flexWrap="wrap">
        <Image
          src={`https://raw.githubusercontent.com/wishmstr/Ani-Mayhem/refs/heads/main/sets/setimages/${card.Set}/${card.ImageFile}.jpg`}
          alt={card.Name}
          bg={"night.800"}
          width={width}
          maxWidth={maxWidth}
          height={height}
          maxHeight={maxHeight}
          aspectRatio={aspectRatio}
          borderRadius={borderRadius}
          borderWidth={3}
          borderStyle={"solid"}
          borderColor={"night.800"}
          transform={frontTransform}
        />
        <Image
          src={backImageUrl}
          alt={"Back of card"}
          bg={"night.800"}
          width={width}
          maxWidth={maxWidth}
          height={height}
          maxHeight={maxHeight}
          aspectRatio={aspectRatio}
          borderRadius={borderRadius}
          borderWidth={3}
          borderStyle={"solid"}
          borderColor={"night.800"}
          transform={backTransform}
        />
      </HStack>
      <SmallCard card={card} />
    </Container>
  );
}
