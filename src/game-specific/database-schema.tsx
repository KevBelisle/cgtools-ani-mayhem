import {
  DummyDriver,
  Kysely,
  QueryResult,
  Selectable,
  SqliteAdapter,
  SqliteIntrospector,
  SqliteQueryCompiler,
} from "kysely";

export interface Database {
  cards: CardTable;
}

export interface CardTable {
  Name: string;
  Set: string;
  ImageFile: string;
  BackColor: "purple" | "green" | "red";
  Rarity: string;
  Type: string;
  Attack: string | null;
  Defense: string | null;
  Movement: string | null;
  Charm: string | null;
  Energy: string | null;
  Skills: string | null;
  Requirements: string | null;
  Uses: string | null;
  Categories: string | null;
  Instructions: string | null;
}

export type Card = Selectable<CardTable>;

export const kysely = new Kysely<Database>({
  dialect: {
    createAdapter: () => new SqliteAdapter(),
    createDriver: () => new DummyDriver(),
    createIntrospector: (db) => new SqliteIntrospector(db),
    createQueryCompiler: () => new SqliteQueryCompiler(),
  },
});

export const cardBaseQuery = kysely.selectFrom("cards as c").selectAll("c");

const compiledCardBaseQuery = cardBaseQuery.compile();
type CompiledCardBaseQuery = typeof compiledCardBaseQuery;

export function execCompiledQuery(
  compiledQuery: CompiledCardBaseQuery,
  db: Kysely<Database>,
) {
  return db.executeQuery(compiledQuery);
}
type extractGeneric<Type> = Type extends QueryResult<infer X> ? X : never;
export type CardBaseQueryResult = extractGeneric<
  Awaited<ReturnType<typeof execCompiledQuery>>
>;
