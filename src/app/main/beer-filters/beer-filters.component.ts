import { Component, model, OnInit, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { SliderModule } from 'primeng/slider';
import { BeerSort } from '../models/beer.model';

@Component({
  selector: 'app-beer-filters',
  templateUrl: './beer-filters.component.html',
  styleUrls: ['./beer-filters.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, InputTextModule, SliderModule, CheckboxModule,
    DropdownModule,]
})
export class BeerFiltersComponent implements OnInit {
  beerNameFilter = new FormControl('', { nonNullable: true });
  alcoholRangeFilter = new FormControl<[number, number]>([0, 100], {
    nonNullable: true,
  });
  favoriteBeersFilter = new FormControl(false, { nonNullable: true });
  beerSortControl = new FormControl<BeerSort>(BeerSort.Name, {
    nonNullable: true,
  });

  alcoholContent = model<[number, number]>([0, 100]);

  ngOnInit() {
  }

  sortOptions = signal<{ label: string; value: BeerSort }[]>([
    { label: 'Sort by name', value: BeerSort.Name },
    { label: 'Sort by alcohol', value: BeerSort.Alcohol },
  ]);

}
