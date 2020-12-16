export class GetMovieByTitle {
  static readonly type = "[MOVIE] Get by Title";

  constructor(public payload: { title: string }) {}
}
