import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MovieResolver } from "./resolvers/movie.resolver";
import { ShoppiesPageComponent } from "./view/shoppies-page/shoppies-page.component";

const routes: Routes = [
  {
    path: "",
    component: ShoppiesPageComponent,
    children: [
      {
        path: ":id",
        component: ShoppiesPageComponent,
        resolve: {
          movie: MovieResolver,
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: "legacy" })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
