import { Tag } from "@/components/ui/tag";
import { Tooltip } from "@/components/ui/tooltip";
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

import Attack from "@/game-specific/icons/game icons/attack-mono.svg?react";
import Charm from "@/game-specific/icons/game icons/charm.svg?react";
import Defense from "@/game-specific/icons/game icons/defense.svg?react";
import Energy from "@/game-specific/icons/game icons/energy.svg?react";
import Movement from "@/game-specific/icons/game icons/movement.svg?react";

function StatTag({
  Icon,
  value,
  label,
}: {
  Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  value: string | null;
  label: string;
}) {
  if (value == null) return null;

  return (
    <Tooltip content={label}>
      <Tag size="lg" fontFamily={"Auriol"} variant={"subtle"}>
        <HStack gap="1">
          <Icon
            style={{
              width: "20px",
              height: "20px",
            }}
          />
          <span
            style={{
              transform: "translate(0, 0)",
              fontSize: "1.2rem",
              fontWeight: "bold",
            }}
          >
            {value}
          </span>
        </HStack>
      </Tag>
    </Tooltip>
  );
}

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
      {...rootProps}
    >
      <Card.Header
        fontWeight={"bold"}
        fontSize="2xl"
        fontFamily="Auriol, sans-serif"
      >
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
              {card.Attack != null && (
                <StatTag Icon={Attack} value={card.Attack} label="Attack" />
              )}
              {card.Defense != null && (
                <StatTag Icon={Defense} value={card.Defense} label="Defense" />
              )}
              {card.Movement != null && (
                <StatTag
                  Icon={Movement}
                  value={card.Movement}
                  label="Movement"
                />
              )}
              {card.Charm != null && (
                <StatTag Icon={Charm} value={card.Charm} label="Charm" />
              )}
              {card.Energy != null && (
                <StatTag Icon={Energy} value={card.Energy} label="Energy" />
              )}
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

          {card.Set && (
            <Text fontSize="sm" color={borderColor} textAlign="right" mb={-2}>
              {card.Set}
            </Text>
          )}
        </VStack>
      </Card.Body>
    </Card.Root>
  );
};

export default SmallCard;
