import { NgModule } from "@angular/core";
import { MatSliderModule } from "@angular/material/slider";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
@NgModule({
  imports: [MatSliderModule, MatSlideToggleModule],

  exports: [MatSliderModule, MatSlideToggleModule],
})
export class MaterialModule {}
