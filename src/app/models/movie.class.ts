import { IMovie } from "./i-movie.interface";

export class Movie implements IMovie {
  Title: string;
  Year: number;
  Rated: string;
  Plot: string;
  Genre: string;
  Nominated?: boolean;
  constructor(m: IMovie) {
    this.Title = m.Title;
    this.Genre = m.Genre;
    this.Year = m.Year;
    this.Plot = m.Plot;
    this.Rated = m.Rated;
    this.Nominated = m.Nominated;
  }
}
