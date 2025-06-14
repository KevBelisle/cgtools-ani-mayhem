import { Tag } from "@/components/ui/tag";
import { Card as GameCard } from "@/game-specific/animayhem-schema";
import {
  Card,
  Em,
  HStack,
  Text,
  VStack,
  type HTMLChakraProps,
} from "@chakra-ui/react";
import { Link } from "@tanstack/react-router";

export const SmallCard = ({
  card,
  ...rootProps
}: {
  card: GameCard;
} & HTMLChakraProps<"div">) => {
  let backgroundColor: string;
  let borderColor: string;

  switch (card.BackColor) {
    case "purple":
      backgroundColor = "purple.950/80";
      borderColor = "purple.800";
      break;
    case "green":
      backgroundColor = "green.950/80";
      borderColor = "green.800";
      break;
    case "red":
      backgroundColor = "red.950/80";
      borderColor = "red.800";
      break;
  }

  return (
    <Card.Root
      size={"sm"}
      borderWidth={2}
      boxShadow={"0 0.5rem 2.5rem -2rem var(--chakra-colors-night-950)"}
      backgroundColor={backgroundColor}
      borderColor={borderColor}
      fontSize="sm"
      {...rootProps}
    >
      <Card.Header fontWeight={"bold"} fontSize="2xl">
        <HStack justifyContent="space-between">
          <Link to="/cards/$card" params={{ card: card.ImageFile }}>
            {card.Name}
          </Link>
        </HStack>
      </Card.Header>
      <Card.Body position="relative" pt={1}>
        <VStack gap={2} alignItems="stretch">
          <HStack justifyContent="space-between" flexWrap={"wrap"}>
            <HStack justifyContent="flex-end">
              <Tag>{card.Type}</Tag>

              {/* {cardSide.EngagementCost != null && (
                <Tooltip content="Engagement cost">
                  <Tag size="lg" fontFamily={"vafthrudnir"} variant={"subtle"}>
                    <Threat
                      style={{
                        display: "inline",
                        height: "1rem",
                        width: "1rem",
                      }}
                    />{" "}
                    {cardSide.EngagementCost}
                  </Tag>
                </Tooltip>
              )} */}
            </HStack>
            <HStack flexGrow={1} justifyContent="flex-end">
              {/* {cardSide.Defense != null && (
                <Tooltip content="Defense">
                  <Tag fontFamily={"vafthrudnir"} variant={"subtle"}>
                    <HStack gap="1">
                      <span style={{ transform: "translate(0, 3px)" }}>
                        {cardSide.Defense}
                      </span>
                      <Defense
                        style={{
                          width: "15px",
                          height: "15px",
                        }}
                      />
                    </HStack>
                  </Tag>
                </Tooltip>
              )} */}
            </HStack>
          </HStack>
          <Em>{card.Skills ? card.Skills : null}</Em>

          {card.Instructions && (
            <Text textWrap={"pretty"}>
              {card.Instructions.replaceAll('\\"', '"')
                .split("\\r\\n")
                .flatMap((str, index) => [str, <br key={index} />])}
            </Text>
          )}
        </VStack>
      </Card.Body>
    </Card.Root>
  );
};

export default SmallCard;
