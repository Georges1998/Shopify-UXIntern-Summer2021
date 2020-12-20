import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { MovieState } from "./state/movies.state";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NgxsModule } from "@ngxs/store";
import { NgxsReduxDevtoolsPluginModule } from "@ngxs/devtools-plugin";
import { NgxsLoggerPluginModule } from "@ngxs/logger-plugin";
import { HttpClientModule } from "@angular/common/http";
import { ShoppiesPageComponent } from "./view/shoppies-page/shoppies-page.component";
import { NominationsListComponent } from "./view/nominations-list/nominations-list.component";
import { MoviesListComponent } from "./view/movies-list/movies-list.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatSliderModule } from "@angular/material/slider";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MovieCardComponent } from "./view/movie-card/movie-card.component";
import { FooterComponent } from "./view/footer/footer.component";
import { FormsModule } from "@angular/forms";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { DialogueViewComponent } from "./view/dialogue-view/dialogue-view.component";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
@NgModule({
  declarations: [
    AppComponent,
    ShoppiesPageComponent,
    NominationsListComponent,
    MoviesListComponent,
    MovieCardComponent,
    FooterComponent,
    DialogueViewComponent,
  ],
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatSnackBarModule,
    FormsModule,
    MatSliderModule,
    MatSlideToggleModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxsModule.forRoot([MovieState]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
