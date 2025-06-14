import {
  createListCollection,
  IconButton,
  Portal,
  Select,
  useSelectContext,
} from "@chakra-ui/react";
import { useRouter } from "@tanstack/react-router";
import { useCallback, useContext, useMemo } from "react";
import { LuArrowDownNarrowWide } from "react-icons/lu";

import { sortOptions } from "@/game-specific/sort-options";
import { SortOrderContext, SortOrderType } from "../ui/sort-order-provider";

function SelectTrigger() {
  const select = useSelectContext();
  return (
    <IconButton
      size="lg"
      borderColor="sand.500"
      borderWidth={2}
      background="sand.100"
      variant="subtle"
      color="night.900"
      borderRadius={0}
      {...select.getTriggerProps()}
    >
      <LuArrowDownNarrowWide />
    </IconButton>
  );
}

export function OrderSelect() {
  const [sortOrder, setSortOrder] = useContext(SortOrderContext);
  const router = useRouter();

  const onValueChange = useCallback(
    (e: { value: string[] }) => {
      setSortOrder(e.value[0] as SortOrderType);
      router.invalidate();
    },
    [setSortOrder, router],
  );

  const sortOptionsCollection = useMemo(
    () =>
      createListCollection({
        items: [
          { label: "Random", value: "Random" },
          ...sortOptions.map((option) => ({
            label: option,
            value: option,
          })),
        ],
      }),
    [sortOptions],
  );

  return (
    <Select.Root
      positioning={{ sameWidth: false }}
      collection={sortOptionsCollection}
      size="sm"
      width="auto"
      marginInlineEnd={"-2px"}
      value={[sortOrder as string]}
      onValueChange={onValueChange}
    >
      <Select.HiddenSelect />
      <Select.Control>
        <SelectTrigger />
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content minW="32">
            {sortOptionsCollection.items.map((option) => (
              <Select.Item item={option} key={option.value}>
                {option.label}
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  );
}
