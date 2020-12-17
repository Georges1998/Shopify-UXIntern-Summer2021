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

  @Output() pressed: EventEmitter<any> = new EventEmitter();

  ngOnInit(): void {
    console.log(this.disable)
  }

  toggle() {
    this.pressed.emit(null);
  }
}
