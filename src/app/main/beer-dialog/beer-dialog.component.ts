import { Component, inject, signal } from "@angular/core";
import { DynamicDialogConfig } from "primeng/dynamicdialog";
import { Beer } from "../models/beer.model";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-beer-dialog",
  templateUrl: "./beer-dialog.component.html",
  styleUrls: ["./beer-dialog.component.scss"],
  imports: [CommonModule],
  standalone: true,
})
export class BeerDialogComponent {
  private _config = inject(DynamicDialogConfig);
  beer = signal<Beer | undefined>(undefined);

  constructor() {
    this.beer.set(this._config.data.beer as Beer);
  }
}
