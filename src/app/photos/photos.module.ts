import {NgModule} from '@angular/core';

import {PhotoListModule} from "./photo-list/photo-list.module";
import {PhotoFormModule} from "./photo-form/photo-form.module";
import { PhotoModule } from './photo/photo.module';
import {RouterModule} from "@angular/router";

@NgModule({
  imports: [
    PhotoModule,
    PhotoListModule,
    PhotoFormModule,
    RouterModule
  ],
})
export class PhotosModule {
}
