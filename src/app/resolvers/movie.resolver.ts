import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";
import { Observable, of } from "rxjs";
import { Injectable } from "@angular/core";
import { Store } from "@ngxs/store";
import { catchError, map } from "rxjs/operators";
import { HttpErrorResponse } from "@angular/common/http";
import { IMovie } from "../models/i-movie.interface";
import {
  GetMovieByTitle,
  GetNominationsFromLink,
} from "../state/movies.actions";
import { MovieState } from "../state/movies.state";

@Injectable({
  providedIn: "root",
})
export class MovieResolver implements Resolve<IMovie> {
  constructor(private store: Store) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): IMovie | Observable<IMovie> | Promise<IMovie> {
    return this.store
      .dispatch(new GetNominationsFromLink({ id: route.params.id }))
      .pipe(
        catchError((err: any, caught) => {
          return of(err);
        }),
        map((v) => {
          if (v instanceof HttpErrorResponse) {
            return { error: v };
          }
          const dataState = this.store.selectSnapshot(MovieState);
          return dataState.link;
        })
      );
  }
}
