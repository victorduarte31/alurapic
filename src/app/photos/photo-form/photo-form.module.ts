import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PhotoFormComponent} from "./photo-form.component";
import {ReactiveFormsModule} from "@angular/forms";
import {VmessageModule} from "../../shared/components/vmessage/vmessage.module";
import {RouterModule} from "@angular/router";
import {PhotoModule} from "../photo/photo.module";



@NgModule({
  declarations: [PhotoFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    VmessageModule,
    RouterModule,
    PhotoModule
  ]
})
export class PhotoFormModule { }
