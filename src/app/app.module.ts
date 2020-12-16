import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { MovieState } from "./state/movies.state";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NgxsModule } from "@ngxs/store";
import { NgxsReduxDevtoolsPluginModule } from "@ngxs/devtools-plugin";
import { NgxsLoggerPluginModule } from "@ngxs/logger-plugin";
import { HttpClientModule } from '@angular/common/http';
import { ShoppiesPageComponent } from './view/shoppies-page/shoppies-page.component';
import { NominationsListComponent } from './view/nominations-list/nominations-list.component';
import { MoviesListComponent } from './view/movies-list/movies-list.component';

@NgModule({
  declarations: [AppComponent, ShoppiesPageComponent, NominationsListComponent, MoviesListComponent],
  imports: [
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
