import { Component, Injectable } from "@angular/core";
import { AngularFireList } from "@angular/fire/database";
import { AngularFirestore } from "@angular/fire/firestore";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { ILink } from "../models/i-link.interface";
import { IMovie } from "../models/i-movie.interface";

@Injectable({
  providedIn: "root",
})
export class FirebaseHttpClientService {
  nominationsRef: AngularFireList<any>;
  constructor(private firestore: AngularFirestore, private router: Router) {}

  createLink(movies: IMovie[]) {
    var utc = new Date();
    var link: ILink = { date: utc };
    return this.firestore
      .collection("sharedLink")
      .add(link)
      .then((e) => {
        movies.forEach((m) => {
          this.firestore
            .collection("sharedLink/" + e.id + "/nominations")
            .add(m);
          this.router.navigate([`./${e.id}`]);
        });
      });
  }

  getUsers(id) {
    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection("/sharedLink")
        .doc(id)
        .collection("nominations")
        .snapshotChanges()
        .subscribe((snapshots) => {
          resolve(snapshots);
        });
    });
  }

  getLinkById(id: string): Observable<any> {
    this.firestore
      .collection("sharedLink")
      .doc(id)
      .get()
      .subscribe((e) => {
        if (!e.exists) {
          this.router.navigate(["./"]);
        }
      });
    return this.firestore
      .collection("sharedLink")
      .doc(id)
      .collection("nominations")
      .get();
  }

  getLinks() {
    var links = this.firestore.collection("sharedLink").snapshotChanges();
    links.subscribe((e) => {
      e.forEach((s) => {});
    });
  }
}
