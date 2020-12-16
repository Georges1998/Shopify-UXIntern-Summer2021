import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class MoviesHttpClientService {
  private url = "https://localhost:";

  baseUrl = this.url;

  constructor(private http: HttpClient) {}
}
