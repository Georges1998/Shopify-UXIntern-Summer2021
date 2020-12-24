import { Action, Selector, State, StateContext, Store } from "@ngxs/store";
import { MoviesHttpClientService } from "../http/movies-http-client.service";
import { IMovie } from "../models/i-movie.interface";
import {
  AddToNominations,
  GetMovieByTitle,
  SearchMovieByTitle,
  DeleteFromNominations,
  GetNominationsFromLink,
} from "./movies.actions";
import { tap, catchError } from "rxjs/operators";
import { HttpErrorResponse } from "@angular/common/http";
import { observable, throwError } from "rxjs";
import { Injectable } from "@angular/core";
import { Movie } from "../models/movie.class";
import { IResponse } from "../models/i-response.interface";
import { ILink } from "../models/i-link.interface";
import { FirebaseHttpClientService } from "../http/firebase-http-client.services";
import { map } from "rxjs/operators";

export class MovieStateModel {
  movie: Movie;
  link: ILink;
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
    link: null,
  },
})
@Injectable()
export class MovieState {
  constructor(
    private movieHttpClient: MoviesHttpClientService,
    private firebaseHttpClient: FirebaseHttpClientService,
    private store: Store
  ) {}
  @Selector()
  public static movie(state: MovieStateModel): Movie {
    return state.movie;
  }
  @Selector()
  public static link(state: MovieStateModel): ILink {
    return state.link;
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

  @Action(GetNominationsFromLink)
  GetNominationsFromLink(
    ctx: StateContext<MovieStateModel>,
    action: GetNominationsFromLink
  ) {
    const state = ctx.getState();
    var nominations: Array<IMovie> = ctx.getState().nominations;
    console.log("HIIII");

    return this.firebaseHttpClient
      .getLinkById(action.payload.id)
      .subscribe((e) => {
        // e.forEach((b)=>n.push(b.data()));
        var n = [];
        e.docs.forEach((s) => {
          n.push(s.data());
        });

        ctx.patchState({
          nominations: n,
          nominationsLimit: n.length,
        });
        console.log(ctx.getState().link);

        // console.log(e.data());
      });
    console.log("HIIII");
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
      (obj) =>
        obj.Title == action.payload.movie.Title &&
        obj.Year == action.payload.movie.Year
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
    console.log(movies);
    if (movies?.totalResults > 0) {
      console.log("INSIDE THE LOOP");
      const obj = movies.Search.find(
        (o) =>
          o.Title == action.payload.movie.Title &&
          o.Year == action.payload.movie.Year
      );
      console.log(obj);
      if (obj != null) {
        console.log("LOLOLO");
        obj.Nominated = false;
      }
    }
    const nominations = ctx.getState().nominations;
    const nominationsLimit = ctx.getState().nominationsLimit;
    const objIndex = nominations.findIndex(
      (obj) =>
        obj.Title == action.payload.movie.Title &&
        obj.Year == action.payload.movie.Year
    );
    if (objIndex > -1) {
      nominations[objIndex].Nominated = false;
      console.log(nominations[objIndex].Nominated);
      nominations.splice(objIndex, 1);
    }
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
