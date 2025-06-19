import { SearchFilterType } from "@/components/search/types";

export const defaultSearchFilters: SearchFilterType = [
  {
    id: "Instructions",
    type: "input",
    label: "Filter by card instructions",
    placeholder: "Filter by card instructions",
  },
  {
    id: "Requirements",
    type: "input",
    label: "Filter by card requirements",
    placeholder: "Filter by card requirements",
  },
  {
    id: "Set",
    type: "multiselect",
    label: "Filter by card set",
    placeholder: "Select card sets",
    options: ["Demo Set", "Set Zero", "Set One", "Set Two"],
  },
  {
    id: "Rarity",
    type: "multiselect",
    label: "Filter by card rarity",
    placeholder: "Select card rarity",
    options: ["Common", "Uncommon", "Rare", "Ultra Rare", "Promotional"],
  },
  {
    id: "Type",
    type: "multiselect",
    label: "Filter by card type",
    placeholder: "Select card type",
    options: [
      "Character",
      "Combat",
      "Enhancement",
      "Equipment",
      "Flash Effect",
      "Global Effect",
      "Haven",
      "Item",
      "Location",
      "Major Disaster",
      "Minor Disaster",
    ],
  },
];

export default defaultSearchFilters;
