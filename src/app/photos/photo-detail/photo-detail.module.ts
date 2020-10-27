import {NgModule} from '@angular/core';

import {PhotoDetailComponent} from "./photo-detail.component";
import {CommonModule} from "@angular/common";
import {PhotoModule} from "../photo/photo.module";
import { PhotoCommentsComponent } from './photo-comments/photo-comments.component';
import {RouterModule} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {VmessageModule} from "../../shared/components/vmessage/vmessage.module";
import {PhotoOwnerOnly} from "./photo-owner-only/photo-owner-only";
import {ShowIfLoggedModule} from "../../shared/directives/show-if-logged/show-if-logged.module";

@NgModule({
  imports: [
    CommonModule,
    PhotoModule,
    RouterModule,
    ReactiveFormsModule,
    VmessageModule,
    ShowIfLoggedModule
  ],
  declarations: [PhotoDetailComponent, PhotoCommentsComponent, PhotoOwnerOnly],
  exports: [PhotoDetailComponent, PhotoCommentsComponent]
})
export class PhotoDetailModule {
}
