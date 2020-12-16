import { Component, Input, OnInit } from "@angular/core";
import { Select, Store } from "@ngxs/store";
import { Observable, Subscription } from "rxjs";
import { IMovie } from "src/app/models/i-movie.interface";
import { IResponse } from "src/app/models/i-response.interface";
import { Movie } from "src/app/models/movie.class";
import {
  AddToNominations,
  SearchMovieByTitle,
} from "src/app/state/movies.actions";
import { MovieState } from "src/app/state/movies.state";

@Component({
  selector: "app-movies-list",
  templateUrl: "./movies-list.component.html",
  styleUrls: ["./movies-list.component.scss"],
})
export class MoviesListComponent implements OnInit {
  private eventsSubscription: Subscription;

  search;

  constructor(private store: Store) {}
  @Input() events: Observable<void>;
  @Select(MovieState.movies) movies$: Observable<IResponse<IMovie>>;
  @Select(MovieState.nominations) nominations$: Observable<Array<IMovie>>;

  ngOnInit() {
    this.eventsSubscription = this.events.subscribe((e) => {
      this.search = e;
      this.store.dispatch(new SearchMovieByTitle({ title: this.search }));
    });
  }
  ngOnDestroy() {
    this.eventsSubscription.unsubscribe();
  }

  addtoNominations(m: Movie) {
    this.store.dispatch(new AddToNominations({ movie: m }));
  }
}
