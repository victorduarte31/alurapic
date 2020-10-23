import {NgModule} from '@angular/core';

import {PhotoListModule} from "./photo-list/photo-list.module";
import {PhotoFormModule} from "./photo-form/photo-form.module";
import { PhotoModule } from './photo/photo.module';
import {RouterModule} from "@angular/router";
import { PhotoDetailModule } from './photo-detail/photo-detail.module';

@NgModule({
  imports: [
    PhotoModule,
    PhotoListModule,
    PhotoFormModule,
    PhotoDetailModule,
    RouterModule
  ],
})
export class PhotosModule {
}
