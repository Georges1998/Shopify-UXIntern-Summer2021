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
  themeDark: boolean = true;
  private eventsSubscription: Subscription;
  events: Observable<boolean>;
  constructor(private darkMode: DarkModeService) {}

  ngOnInit() {
    this.events = this.darkMode.getMode().asObservable();
    this.eventsSubscription = this.events.subscribe((e) => {
      this.themeDark = e;
    });
  }
  ngOnDestroy() {
    this.eventsSubscription.unsubscribe();
  }
}
