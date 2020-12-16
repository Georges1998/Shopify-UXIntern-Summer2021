import { Component, OnInit } from "@angular/core";
import { Subject } from "rxjs";

@Component({
  selector: "app-shoppies-page",
  templateUrl: "./shoppies-page.component.html",
  styleUrls: ["./shoppies-page.component.scss"],
})
export class ShoppiesPageComponent implements OnInit {
  eventsSubject: Subject<void> = new Subject<void>();

  constructor() {}
  ngOnInit(): void {}

  onSearchMovie(event: any) {
    this.eventsSubject.next(event.target.value);
  }
}
