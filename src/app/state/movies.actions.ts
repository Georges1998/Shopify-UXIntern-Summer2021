import { exhaustMap } from "rxjs/operators";
import { IMovie } from "../models/i-movie.interface";

export class GetMovieByTitle {
  static readonly type = "[MOVIE] Get by Title";
  constructor(public payload: { title: string }) {}
}

export class SearchMovieByTitle {
  static readonly type = "[MOVIE] Search by Title";
  constructor(public payload: { title: string }) {}
}

export class AddToNominations {
  static readonly type = "[MOVIE] Add to Nominations";
  constructor(public payload: { movie: IMovie }) {}
}

export class DeleteFromNominations {
  static readonly type = "[MOVIE] Delete from Nominations";
  constructor(public payload: { movie: IMovie }) {}
}
