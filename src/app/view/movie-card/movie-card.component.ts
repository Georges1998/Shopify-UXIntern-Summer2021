import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Movie } from "src/app/models/movie.class";
import { DarkModeService } from "src/app/services/dark-mode.service";

@Component({
  selector: "app-movie-card",
  templateUrl: "./movie-card.component.html",
  styleUrls: ["./movie-card.component.scss"],
})
export class MovieCardComponent implements OnInit {
  constructor(private darkMode: DarkModeService) {}

  @Input() movie: Movie;
  @Input() disable: boolean = false;
  @Input() buttonAction: string;
  @Input() lightTheme: boolean;

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
