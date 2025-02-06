import { Component, OnInit } from '@angular/core';
import { BeerFiltersComponent } from './beer-filters/beer-filters.component';
import { RouterOutlet } from '@angular/router';
import { BeerListComponent } from './beer-list/beer-list.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  standalone: true,
  imports: [RouterOutlet, BeerFiltersComponent, BeerListComponent]
})
export class MainComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
