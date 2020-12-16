import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ShoppiesPageComponent } from "./view/shoppies-page/shoppies-page.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "shoppies",
    pathMatch: "full",
  },
  {
    path: "shoppies",
    component: ShoppiesPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
