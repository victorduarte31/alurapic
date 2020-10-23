import {NgModule} from '@angular/core';

import {PhotoDetailComponent} from "./photo-detail.component";
import {CommonModule} from "@angular/common";
import {PhotoModule} from "../photo/photo.module";
import { PhotoCommentsComponent } from './photo-comments/photo-comments.component';
import {RouterModule} from "@angular/router";

@NgModule({
  imports: [
    CommonModule,
    PhotoModule,
    RouterModule
  ],
  declarations: [PhotoDetailComponent, PhotoCommentsComponent],
  exports: [PhotoDetailComponent, PhotoCommentsComponent]
})
export class PhotoDetailModule {
}
