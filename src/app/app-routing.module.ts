import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ShoppiesPageComponent } from "./view/shoppies-page/shoppies-page.component";

const routes: Routes = [
  {
    path: "",
    component: ShoppiesPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
