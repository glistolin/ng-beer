import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  model,
  OnInit,
  signal,
  ViewChild,
} from "@angular/core";
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CheckboxModule } from "primeng/checkbox";
import { DropdownModule } from "primeng/dropdown";
import { InputTextModule } from "primeng/inputtext";
import { SliderModule } from "primeng/slider";
import { BeerSort } from "../models/beer.model";
import { BeersStore } from "../../store/beers.store";
import { ButtonModule } from "primeng/button";

@Component({
  selector: "app-beer-filters",
  templateUrl: "./beer-filters.component.html",
  styleUrls: ["./beer-filters.component.scss"],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    InputTextModule,
    SliderModule,
    CheckboxModule,
    DropdownModule,
    ButtonModule,
  ],
})
export class BeerFiltersComponent implements OnInit, AfterViewInit {
  @ViewChild("leftValue") leftValue!: ElementRef;
  @ViewChild("rightValue") rightValue!: ElementRef;

  beerName = model<string>();
  beerSort = model<BeerSort>(BeerSort.Name);
  alcoholContent = model<[number, number]>([0, 23]);

  beerNameFilter = new FormControl("", { nonNullable: true });
  alcoholRangeFilter = new FormControl<[number, number]>([0, 23], {
    nonNullable: true,
  });
  favoriteBeersFilter = new FormControl(false, { nonNullable: true });
  beerSortControl = new FormControl<BeerSort>(BeerSort.Name, {
    nonNullable: true,
  });

  readonly store = inject(BeersStore);
  el = inject(ElementRef);

  filtersOpen = false;

  ngOnInit() {
    this.beerNameFilter.valueChanges.subscribe((query) => {
      this.store.updateQuery(query.trim().toLowerCase());
    });

    this.beerSortControl.valueChanges.subscribe((sortOption) => {
      this.store.updateOrder(sortOption);
    });

    this.alcoholRangeFilter.valueChanges.subscribe((range) => {
      this.store.updateAlcoholRange(range);
      this.updateSliderPositions();
    });

    this.favoriteBeersFilter.valueChanges.subscribe((showFavorites) => {
      this.store.updateShowFavorites(showFavorites);
    });
  }

  ngAfterViewInit() {
    this.updateSliderPositions();
  }

  toggleFilters(): void {
    this.filtersOpen = !this.filtersOpen;
  }

  updateSliderPositions() {
    const slider = this.el.nativeElement.querySelector(
      ".p-slider",
    ) as HTMLElement;

    if (slider) {
      const handles = slider.querySelectorAll(
        ".p-slider-handle",
      ) as NodeListOf<HTMLElement>;

      if (handles.length === 2) {
        const leftHandle = handles[0];
        const rightHandle = handles[1];

        const leftValue = this.el.nativeElement.querySelector(
          ".left-value",
        ) as HTMLElement;
        const rightValue = this.el.nativeElement.querySelector(
          ".right-value",
        ) as HTMLElement;

        if (leftValue && rightValue) {
          leftValue.style.left = `${leftHandle.offsetLeft + 15}px`;
          rightValue.style.left = `${rightHandle.offsetLeft + 15}px`;
        }
      }
    }
  }

  sortOptions = signal<{ label: string; value: BeerSort }[]>([
    { label: "Sort by name", value: BeerSort.Name },
    { label: "Sort by alcohol", value: BeerSort.Alcohol },
  ]);
}
