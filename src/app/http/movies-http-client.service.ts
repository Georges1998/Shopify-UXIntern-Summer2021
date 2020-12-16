import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { IMovie } from "../models/i-movie.interface";
import { IResponse } from "../models/i-response.interface";
import { Movie } from "../models/movie.class";

@Injectable({
  providedIn: "root",
})
export class MoviesHttpClientService {
  private url = environment.apiUrl;
  private key = environment.key;

  baseUrl = this.url;

  constructor(private http: HttpClient) {}

  getById(title: string): Observable<Movie> {
    const url = `${this.baseUrl}/?t=${title}&apikey=${this.key}`;
    return this.http.get<Movie>(url);
  }

  searchByTitle(title: string): Observable<IResponse<IMovie>> {
    const url = `${this.baseUrl}/?s=${title}&Type=movie&apikey=${this.key}`;
    return this.http.get<IResponse<IMovie>>(url).pipe(
      map((res) => {
        const items = res;
        return items;
      })
    );
  }
}
