import { IMovie } from "./i-movie.interface";

export class Movie implements IMovie {
  Title: string;
  Year: number;
  Poster?: string;
  Nominated?: boolean;
  constructor(m: IMovie) {
    this.Title = m.Title;
    this.Year = m.Year;
    this.Poster = m.Poster;
    this.Nominated = m.Nominated;
  }
}
