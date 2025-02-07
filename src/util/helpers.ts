import { Beer, BeerSort } from "../app/main/models/beer.model";

export function searchBeers(beers: Beer[], query: string): Beer[] {
  return beers.filter(({ name }) => name.toLowerCase().includes(query));
}

export function sortBeers(beers: Beer[], sort: BeerSort): Beer[] {
  return [...beers].sort((a, b) => {
    return sort === BeerSort.Name
      ? a.name.localeCompare(b.name)
      : a.abv - b.abv;
  });
}
