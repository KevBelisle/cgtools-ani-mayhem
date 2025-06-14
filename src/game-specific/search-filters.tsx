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
    options: ["Demo_Set", "Set_One", "Set_Two", "Set_Zero"],
  },
  {
    id: "Rarity",
    type: "multiselect",
    label: "Filter by card rarity",
    placeholder: "Select card rarity",
    options: ["Promotional", "Common", "Uncommon", "Rare", "Ultra Rare"],
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
