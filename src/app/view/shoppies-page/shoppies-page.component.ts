import { Component, OnInit } from "@angular/core";
import { Subject } from "rxjs";
import { DarkModeService } from "src/app/services/dark-mode.service";

@Component({
  selector: "app-shoppies-page",
  templateUrl: "./shoppies-page.component.html",
  styleUrls: ["./shoppies-page.component.scss"],
})
export class ShoppiesPageComponent implements OnInit {
  eventsSubject: Subject<void> = new Subject<void>();
  checked = false;

  constructor(private darkMode: DarkModeService) {}
  ngOnInit(): void {}

  onSearchMovie(event: any) {
    this.eventsSubject.next(event.target.value);
  }
  changed(){
    this.darkMode.toggleDarkMode();
  }
}
