import { IMovie } from "./i-movie.interface";

export interface ILink {
  id?: string;
  nominations?: Array<IMovie>;
  date?: Date;
}
