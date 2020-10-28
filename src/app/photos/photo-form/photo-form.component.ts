import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PhotoService} from "../photo/photo.service";
import {Router} from "@angular/router";
import {ToastrService} from 'ngx-toastr';
import {UserService} from "../../core/user/user.service";
import {HttpEvent, HttpEventType, HttpResponse} from "@angular/common/http";
import {finalize} from "rxjs/operators";

@Component({
  selector: 'ap-photo-form',
  templateUrl: './photo-form.component.html',
  styleUrls: ['./photo-form.component.css']
})
export class PhotoFormComponent implements OnInit {

  photoForm: FormGroup;
  file: File;
  preview: string;
  percentDone: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private photoService: PhotoService,
    private router: Router,
    private userService: UserService,
    private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.photoForm = this.formBuilder.group({
      file: ['', [Validators.required]],
      description: ['', [Validators.maxLength(300)]],
      allowComments: [true]
    })
  }

  upload() {
    if (this.file) {
      const description = this.photoForm.get('description').value;
      const allowComments = this.photoForm.get('allowComments').value;

      this.photoService.upload(description, allowComments, this.file)
        .pipe(finalize(() => {
          this.router.navigate(['/user', this.userService.getUserName()])
        }))
        .subscribe((event: HttpEvent<any>) => {
          if (event.type == HttpEventType.UploadProgress) {
            this.percentDone = Math.round(100 * event.loaded / event.total);
          } else if (event instanceof HttpResponse) {
            this.toastr.success('Upload complete');
          }
        }, error => this.toastr.error('Upload error!', 'ERROR'));
    }
  }

  handleFile(file: File) {
    this.file = file;
    const reader = new FileReader();
    reader.onload = (event: any) => this.preview = event.target.result;
    reader.readAsDataURL(file);
  }
}
