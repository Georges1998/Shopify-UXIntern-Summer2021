import { Component, Input, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Select, Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { FirebaseHttpClientService } from "src/app/http/firebase-http-client.services";
import { IMovie } from "src/app/models/i-movie.interface";
import { MovieState } from "src/app/state/movies.state";
import * as movieActions from "../../state/movies.actions";
import { DialogueViewComponent } from "../dialogue-view/dialogue-view.component";
import { ClipboardService } from "ngx-clipboard";
import { Router } from "@angular/router";

@Component({
  selector: "app-nominations-list",
  templateUrl: "./nominations-list.component.html",
  styleUrls: ["./nominations-list.component.scss"],
})
export class NominationsListComponent implements OnInit {
  constructor(
    private store: Store,
    private _snackBar: MatSnackBar,
    private firebase: FirebaseHttpClientService,
    private clipboardService: ClipboardService,
    private router: Router
  ) {}
  @Select(MovieState.nominations) nominations$: Observable<Array<IMovie>>;
  @Input() lightTheme: boolean = false;
  @Select(MovieState.nominationsLimit) nominationsLimit$: Observable<number>;
  durationInSeconds = 5;
  ngOnInit(): void {
    this.nominationsLimit$.subscribe((res) => {
      if (res >= 5) {
        this.openSnackBar();
      }
    });
  }

  remove(m: IMovie) {
    this.store.dispatch(new movieActions.DeleteFromNominations({ movie: m }));
  }
  openSnackBar() {
    this._snackBar.openFromComponent(DialogueViewComponent, {
      duration: this.durationInSeconds * 1000,
      panelClass: ["blue-snackbar"],
    });
  }
  createLink() {
    console.log(window.location.href);
    var nominationsList = [];
    this.nominations$.subscribe((e) => {
      nominationsList = e;
    });
    this.firebase.createLink(nominationsList).then(() => {
      this.clipboardService.copyFromContent(window.location.href);
      this._snackBar.open("Link copied","Close");
    });
  }
}
