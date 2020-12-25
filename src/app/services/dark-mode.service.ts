import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class DarkModeService {
  lightTheme = true;
  eventsSubject: Subject<boolean> = new Subject<boolean>();

  constructor() {}

  toggleDarkMode() {
    this.eventsSubject.next(this.lightTheme);
    this.lightTheme = !this.lightTheme;
  }

  getMode() {
    return this.eventsSubject;
  }
}
