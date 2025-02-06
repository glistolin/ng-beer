export interface Beer {
  id: number;
  name: string;
  description: string;
  abv: number;
  image_url: string;
  favourite?: boolean;
}

export enum BeerSort {
  Name = 'name',
  Alcohol = 'alcohol',
}