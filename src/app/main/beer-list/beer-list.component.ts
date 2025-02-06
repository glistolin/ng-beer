import { Component, inject, OnInit } from '@angular/core';
import { Beer } from '../models/beer.model';
import { BeerService } from '../../services/beer.service';

@Component({
  selector: 'app-beer-list',
  templateUrl: './beer-list.component.html',
  styleUrls: ['./beer-list.component.scss'],
  standalone: true,
})
export class BeerListComponent implements OnInit {
  beers: Beer[] = [];
  filteredBeers: Beer[] = [];
  favorites = new Set<number>();
  private beerService = inject(BeerService);

  constructor() { 
    this.fetchBeers()
  }

  fetchBeers() {
    this.beerService.fetchBeers().subscribe((data) => {
      this.beers = data;
      this.filteredBeers = data.map(beer => ({
        ...beer,
        image_url: beer.image_url ? beer.image_url : 'assets/placeholder.png'
      }));;

      console.log(this.filteredBeers)
    });
  }

  onImageError(event: any): void {
    event.target.src = 'assets/placeholder.png';
  }

  toggleFavorite(beer: any) {
    beer.favourite = !beer.favourite;
  }

  ngOnInit() {
  }

}
