import { api, Query } from "encore.dev/api";

interface SearchParams {
  filter: Query<string>;
}

interface Response {
  matches: string;
}

export const search = api<SearchParams, Response>(
  {
    method: "GET",
    path: "/greeting/search",
    expose: true,
  },
  async ({ filter }) => {
    return { matches: `Matches: ${filter}` };
  }
);
