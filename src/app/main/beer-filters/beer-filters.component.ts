import { Component, model, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { SliderModule } from 'primeng/slider';

@Component({
  selector: 'app-beer-filters',
  templateUrl: './beer-filters.component.html',
  styleUrls: ['./beer-filters.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, InputTextModule, SliderModule]
})
export class BeerFiltersComponent implements OnInit {
  beerNameFilter = new FormControl('', { nonNullable: true });
  alcoholRangeFilter = new FormControl<[number, number]>([0, 100], {
    nonNullable: true,
  });
  favoriteBeersFilter = new FormControl(false, { nonNullable: true });
  beerSortControl = new FormControl('name', {
    nonNullable: true,
  });

  alcoholContent = model<[number, number]>([0, 100]);

  ngOnInit() {
  }

}
