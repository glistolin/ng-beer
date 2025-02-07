import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  signal,
  ViewChild,
} from "@angular/core";
import { BeerFiltersComponent } from "./beer-filters/beer-filters.component";
import { RouterOutlet } from "@angular/router";
import { BeerListComponent } from "./beer-list/beer-list.component";
import { BeersStore } from "../store/beers.store";
import { ButtonModule } from "primeng/button";

@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.scss"],
  standalone: true,
  imports: [
    RouterOutlet,
    BeerFiltersComponent,
    BeerListComponent,
    ButtonModule,
  ],
})
export class MainComponent implements AfterViewInit {
  @ViewChild("scrollable", { static: false })
  scrollableEl!: ElementRef<HTMLElement>;

  readonly store = inject(BeersStore);
  isScrolled = signal<boolean>(false);

  ngAfterViewInit(): void {
    const scrollable = this.scrollableEl.nativeElement;

    scrollable.addEventListener("scroll", () => {
      this.isScrolled.set(scrollable.scrollTop > 0);
    });
  }

  scrollToTop() {
    this.scrollableEl.nativeElement.scrollTo({ top: 0, behavior: "smooth" });
  }
}
