import { Component, Input, OnInit } from "@angular/core";
import { Select, Store } from "@ngxs/store";
import { Observable, Subscription } from "rxjs";
import { IMovie } from "src/app/models/i-movie.interface";
import { IResponse } from "src/app/models/i-response.interface";
import { Movie } from "src/app/models/movie.class";
import { DarkModeService } from "src/app/services/dark-mode.service";
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

  constructor(private store: Store, private darkMode: DarkModeService) {}
  @Input() events: Observable<void>;
  @Select(MovieState.movies) movies$: Observable<IResponse<IMovie>>;
  @Select(MovieState.nominations) nominations$: Observable<Array<IMovie>>;
  lightTheme: boolean;

  ngOnInit() {
    this.eventsSubscription = this.events.subscribe((e) => {
      this.search = e;
      this.store.dispatch(new SearchMovieByTitle({ title: this.search }));
    });
    this.darkMode.getMode().subscribe((e) => {
      this.lightTheme = e;
    });
  }
  ngOnDestroy() {
    this.eventsSubscription.unsubscribe();
  }

  addtoNominations(m: Movie) {
    this.store.dispatch(new AddToNominations({ movie: m }));
  }
}
