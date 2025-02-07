import { Beer, BeerSort } from "../main/models/beer.model";

export interface BeersState {
  beers: Beer[];
  query: string;
  sort: BeerSort;
  alcoholRange: [number, number];
  showFavorites: boolean;
}

export const beerInitialState: BeersState = {
  beers: [],
  query: "",
  sort: BeerSort.Name,
  alcoholRange: [0, 23],
  showFavorites: false,
};
