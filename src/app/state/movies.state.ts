import { Action, Selector, State, StateContext, Store } from "@ngxs/store";
import { MoviesHttpClientService } from "../http/movies-http-client.service";
import { IMovie } from "../models/i-movie.interface";
import {
  AddToNominations,
  GetMovieByTitle,
  SearchMovieByTitle,
  DeleteFromNominations,
} from "./movies.actions";
import { tap, catchError } from "rxjs/operators";
import { HttpErrorResponse } from "@angular/common/http";
import { throwError } from "rxjs";
import { Injectable } from "@angular/core";
import { Movie } from "../models/movie.class";
import { IResponse } from "../models/i-response.interface";

export class MovieStateModel {
  movie: Movie;
  movies: IResponse<IMovie>;
  nominations: Array<IMovie>;
  nominationsLimit: number = 0;
}

@State<MovieStateModel>({
  name: "movie",
  defaults: {
    movie: null,
    movies: null,
    nominations: [],
    nominationsLimit: 0,
  },
})
@Injectable()
export class MovieState {
  constructor(
    private movieHttpClient: MoviesHttpClientService,
    private store: Store
  ) {}
  @Selector()
  public static movie(state: MovieStateModel): Movie {
    return state.movie;
  }
  @Selector()
  public static movies(state: MovieStateModel): IResponse<IMovie> {
    return state.movies;
  }
  @Selector()
  public static nominations(state: MovieStateModel): Array<IMovie> {
    return state.nominations;
  }
  @Selector()
  public static nominationsLimit(state: MovieStateModel): number {
    return state.nominationsLimit;
  }

  @Action(GetMovieByTitle)
  getMovieByTitle(ctx: StateContext<MovieStateModel>, action: GetMovieByTitle) {
    const state = ctx.getState();
    let query = {};

    if (action.payload) {
      query = action.payload;
    }

    return this.movieHttpClient.getById(action.payload.title).pipe(
      tap((res) => {
        ctx.setState({
          ...state,
          movie: res,
        });
      }),
      catchError((err: HttpErrorResponse) => {
        alert("Please try again.");
        return throwError(new Error(err.message));
      })
    );
  }

  @Action(SearchMovieByTitle)
  SearchMovieByTitle(
    ctx: StateContext<MovieStateModel>,
    action: SearchMovieByTitle
  ) {
    const state = ctx.getState();
    const nominations = ctx.getState().nominations;

    return this.movieHttpClient.searchByTitle(action.payload.title).pipe(
      tap((res) => {
        if (res.totalResults > 0) {
          nominations.forEach((e) => {
            res.Search.forEach((m) => {
              if (e.Title == m.Title) {
                m.Nominated = true;
              }
            });
          });
        }
        ctx.patchState({
          movies: res,
        });
      }),
      catchError((err: HttpErrorResponse) => {
        alert("Please try again.");
        return throwError(new Error(err.message));
      })
    );
  }
  @Action(AddToNominations)
  AddToNominations(
    ctx: StateContext<MovieStateModel>,
    action: AddToNominations
  ) {
    const nominations = ctx.getState().nominations;
    const movies = ctx.getState().movies;
    const nominationsLimit = ctx.getState().nominationsLimit;
    const objIndex = movies.Search.findIndex(
      (obj) => obj.Title == action.payload.movie.Title
    );
    movies.Search[objIndex].Nominated = true;
    nominations.push(action.payload.movie);
    ctx.patchState({
      nominations: nominations,
      movies: movies,
      nominationsLimit: nominationsLimit + 1,
    });
  }

  @Action(DeleteFromNominations)
  DeleteFromNominations(
    ctx: StateContext<MovieStateModel>,
    action: DeleteFromNominations
  ) {
    const movies = ctx.getState().movies;
    if (movies.totalResults > 0) {
      const objIndex = movies.Search.indexOf(action.payload.movie);
      if (objIndex > -1) {
        movies.Search[objIndex].Nominated = false;
      }
    }
    const nominations = ctx.getState().nominations;
    const nominationsLimit = ctx.getState().nominationsLimit;
    const newNominations = nominations.filter(function (e) {
      return e.Title != action.payload.movie.Title;
    });
    ctx.patchState({
      nominations: newNominations,
      movies: movies,
      nominationsLimit: nominationsLimit - 1,
    });
  }
}
