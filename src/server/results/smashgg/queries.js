import gql from "nanographql";

const ENTRANT_FRAGMENT = `
  {
    pageInfo {
      totalPages
    }
    nodes {
      name
      standing {
        placement
      }
    }
  }
`;

const getEntrantsFragments = (entrants) =>
  entrants.map(
    (entrant, index) =>
      `entrant_${index}: entrants(query: { filter: { name: "${entrant}" }, perPage: 500 }) ${ENTRANT_FRAGMENT}`
  );

export const TOURNAMENT = (entrants) =>
  gql(`
  query TournamentQuery($slug: String) {
    tournament(slug: $slug) {
      name
      events {
        id
        state
        name
        slug
        ${getEntrantsFragments(entrants)}
      }
    }
  }
`);

export const EVENT = (entrants) =>
  gql(`
  query EventQuery($slug: String) {
    event(slug: $slug) {
      id
      state
      name
      slug
      ${getEntrantsFragments(entrants)}
    }
  }
`);
