import { createFileRoute, useNavigate } from "@tanstack/react-router";

import { CardSearch } from "@/components/pages/card-search";
import { lotrCardFromCardBaseQuery } from "@/game-specific/animayhem-schema";
import {
  cardBaseQuery,
  CardBaseQueryResult,
} from "@/game-specific/database-schema";
import execCompiledQuery from "@/sqljs/exec-compiled-query";
import { sql } from "kysely";
import { useState } from "react";

type TitleSearch = {
  query: string;
};

export const Route = createFileRoute("/cards/search/")({
  component: CardSearchRouteComponent,

  validateSearch: (search: Record<string, unknown>): TitleSearch => {
    return {
      query: search.query as string,
    };
  },
  loaderDeps: ({ search: { query } }) => ({ query }),
  staleTime: 0,
  preloadStaleTime: 0,

  loader: async ({ context, deps: { query: titleSearch } }) => {
    const searchFilters = context.searchFilterContext[0];
    const sortOrder = context.sortOrderContext[0];

    let filteredQuery = cardBaseQuery;

    for (const filter of Object.values(searchFilters)) {
      const frontColumn = `c.${filter.id}` as keyof CardBaseQueryResult;

      switch (filter.type) {
        case "input":
          if (filter.value) {
            filteredQuery = filteredQuery.where((eb) =>
              eb(frontColumn, "like", `%${filter.value}%`),
            );
          }
          break;

        case "multiselect":
          if (filter.value) {
            filteredQuery = filteredQuery.where((eb) => {
              return eb.or(filter.value!.map((v) => eb(frontColumn, "=", v)));
            });
          }
          break;
      }
    }

    if (titleSearch) {
      filteredQuery = filteredQuery.where((eb) =>
        eb("c.Name", "like", `%${titleSearch}%`),
      );
    }

    if (sortOrder === "Random") {
      filteredQuery = filteredQuery.orderBy(sql`random()`);
    } else {
      const sortColumn = `c.${String(sortOrder)}` as keyof CardBaseQueryResult;
      filteredQuery = filteredQuery.orderBy(sortColumn, (ob) =>
        ob.asc().nullsLast(),
      );
    }

    const compiledQuery = filteredQuery.limit(30).compile();

    const queryResults = execCompiledQuery(
      compiledQuery,
      context.sqljsDbContext.sqljsDb!,
    );

    return (queryResults as CardBaseQueryResult[]).map(
      lotrCardFromCardBaseQuery,
    );
  },
});

function debounce(fn: Function, ms = 300) {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
}

function CardSearchRouteComponent() {
  const { query: urlQuery } = Route.useSearch();
  const [query, setQuery] = useState(urlQuery);
  const cards = Route.useLoaderData();
  const navigate = useNavigate({ from: Route.fullPath });

  const debouncedNavigate = debounce(navigate, 300);

  // Immediately setQuery in local state
  // and then navigate after a delay to avoid too many navigations and DB queries
  const rawSetQuery = (query: string) => {
    setQuery(query);
    debouncedNavigate({
      search: (prev: any) => {
        return { ...prev, query: query };
      },
      replace: true,
    });
  };

  return (
    <>
      <CardSearch query={query} setQuery={rawSetQuery} cards={cards} />
    </>
  );
}
