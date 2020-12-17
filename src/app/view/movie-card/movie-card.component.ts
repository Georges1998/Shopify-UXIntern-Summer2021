import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Movie } from "src/app/models/movie.class";

@Component({
  selector: "app-movie-card",
  templateUrl: "./movie-card.component.html",
  styleUrls: ["./movie-card.component.scss"],
})
export class MovieCardComponent implements OnInit {
  constructor() {}

  @Input() movie: Movie;
  @Input() disable: boolean = false;
  @Input() buttonAction: string;
  @Input() lightTheme: boolean = false;

  @Output() pressed: EventEmitter<any> = new EventEmitter();

  showMore: boolean = false;
  ngOnInit(): void {}

  toggle() {
    this.pressed.emit(null);
  }
  expandCard() {
    this.showMore = !this.showMore;
  }
}
