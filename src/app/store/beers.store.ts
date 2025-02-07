import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from "@ngrx/signals";
import { beerInitialState } from "./beers-state";
import { computed, inject } from "@angular/core";
import { BeerService } from "../services/beer.service";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { exhaustMap, pipe, tap } from "rxjs";
import { tapResponse } from "@ngrx/operators";
import { searchBeers, sortBeers } from "../../util/helpers";
import { Beer, BeerSort } from "../main/models/beer.model";

export const BeersStore = signalStore(
  { providedIn: "root" },
  withState({
    ...beerInitialState,
    favoriteIds: new Set<number>(),
  }),
  withMethods((store, beerService = inject(BeerService)) => ({
    loadAllBeers: rxMethod<void>(
      pipe(
        tap(() => patchState(store)),
        exhaustMap(() => {
          return beerService.fetchBeers().pipe(
            tapResponse({
              next: (beers: Beer[]) => {
                patchState(store, { beers });
              },
              error: (error: { message: string }) => {
                patchState(store);
              },
            }),
          );
        }),
      ),
    ),
    toggleFavorite(beerId: number): void {
      const favoriteIds = new Set(store.favoriteIds());
      if (favoriteIds.has(beerId)) {
        favoriteIds.delete(beerId);
      } else {
        favoriteIds.add(beerId);
      }
      sessionStorage.setItem(
        "favoriteBeers",
        JSON.stringify(Array.from(favoriteIds)),
      );
      patchState(store, { favoriteIds });
    },
    loadFavorites(): void {
      const storedFavorites = sessionStorage.getItem("favoriteBeers");
      const favoriteIds = storedFavorites
        ? new Set<number>(JSON.parse(storedFavorites) as number[])
        : new Set<number>();
      patchState(store, { favoriteIds });
    },
    updateQuery(query: string): void {
      patchState(store, { query });
    },
    updateOrder(order: BeerSort): void {
      patchState(store, { sort: order });
    },
    updateAlcoholRange(range: [number, number]): void {
      patchState(store, { alcoholRange: range });
    },
    updateShowFavorites(show: boolean): void {
      patchState(store, { showFavorites: show });
    },
  })),
  withComputed(
    ({ beers, query, sort, alcoholRange, showFavorites, favoriteIds }) => ({
      filteredBeers: computed(() => {
        console.log(
          "Computed triggered:",
          query(),
          sort(),
          alcoholRange(),
          showFavorites(),
        );

        let filtered = searchBeers(beers(), query());

        filtered = filtered.filter(
          (beer) =>
            beer.abv >= alcoholRange()[0] && beer.abv <= alcoholRange()[1],
        );

        if (showFavorites()) {
          filtered = filtered.filter((beer) => favoriteIds().has(beer.id));
        }

        return sortBeers(filtered, sort());
      }),
    }),
  ),
  withHooks({
    onInit(store) {
      store.loadAllBeers();
      store.loadFavorites();
    },
  }),
);
