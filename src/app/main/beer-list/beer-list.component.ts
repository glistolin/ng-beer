import { Component, inject, input, OnInit } from "@angular/core";
import { Beer } from "../models/beer.model";
import { BeersStore } from "../../store/beers.store";
import { BeerDialogComponent } from "../beer-dialog/beer-dialog.component";
import { DialogService } from "primeng/dynamicdialog";

@Component({
  selector: "app-beer-list",
  templateUrl: "./beer-list.component.html",
  styleUrls: ["./beer-list.component.scss"],
  imports: [BeerDialogComponent],
  standalone: true,
  providers: [DialogService],
})
export class BeerListComponent {
  filteredBeers: Beer[] = [];
  favorites = new Set<number>();
  readonly beers = input<Beer[]>([]);
  private _dialogService = inject(DialogService);

  store = inject(BeersStore);

  onImageError(event: any): void {
    event.target.src = "assets/placeholder.png";
  }

  toggleFavorite(beer: any): void {
    this.store.toggleFavorite(beer.id);
  }

  showDetails(beer: Beer) {
    this._dialogService.open(BeerDialogComponent, {
      modal: true,
      styleClass: "dialog",
      header: beer.name,
      data: { beer: beer },
    });
  }
}
