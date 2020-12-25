import { Component } from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { DarkModeService } from "./services/dark-mode.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "shoppies";
  lightTheme: boolean;
  private eventsSubscription: Subscription;
  events: Observable<boolean>;
  constructor(private darkMode: DarkModeService) {}

  ngOnInit() {
    this.darkMode.getMode().subscribe((e) => {
      this.lightTheme = e;
    });
  }
  ngOnDestroy() {
    this.eventsSubscription.unsubscribe();
  }
}
