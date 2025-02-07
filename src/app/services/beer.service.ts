import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class BeerService {
  private apiUrl = "https://api.adscanner.tv/punkapi/v2/beers";

  constructor(private http: HttpClient) {}

  fetchBeers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
