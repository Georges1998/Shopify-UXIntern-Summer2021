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
import { DarkModeService } from "src/app/services/dark-mode.service";

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
    private darkMode: DarkModeService
  ) {}
  @Select(MovieState.nominations) nominations$: Observable<Array<IMovie>>;
  lightTheme: boolean;
  @Select(MovieState.nominationsLimit) nominationsLimit$: Observable<number>;
  durationInSeconds = 5;
  button = "Generate new link to share with friends";
  ngOnInit(): void {
    this.darkMode.getMode().subscribe((e) => {
      this.lightTheme = e;
    });

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
    var nominationsList = [];
    this.nominations$.subscribe((e) => {
      nominationsList = e;
    });
    this.firebase.createLink(nominationsList).then(() => {
      this.clipboardService.copyFromContent(window.location.href);
      this._snackBar.open(
        "Link was automatically copied: " + window.location.href,
        "Close",
        { panelClass: ["blue-snackbar"] }
      );
    });
  }
}
