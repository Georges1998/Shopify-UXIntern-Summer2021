import { Component, OnInit } from "@angular/core";
import { Select, Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { IMovie } from "src/app/models/i-movie.interface";
import { MovieState } from "src/app/state/movies.state";
import * as movieActions from "../../state/movies.actions";

@Component({
  selector: "app-nominations-list",
  templateUrl: "./nominations-list.component.html",
  styleUrls: ["./nominations-list.component.scss"],
})
export class NominationsListComponent implements OnInit {
  constructor(private store: Store) {}
  @Select(MovieState.nominations) nominations$: Observable<Array<IMovie>>;
  ngOnInit(): void {}

  remove(m: IMovie) {
    this.store.dispatch(new movieActions.DeleteFromNominations({ movie: m}));
    console.log(m);
  }
}
