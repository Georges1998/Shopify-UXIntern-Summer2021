import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class DarkModeService {
  darkMode = true;
  eventsSubject: Subject<boolean> = new Subject<boolean>();

  constructor() {}

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    this.eventsSubject.next(this.darkMode);
  }

  getMode() {
    return this.eventsSubject;
  }
}
