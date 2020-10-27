import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PhotoService} from "../photo/photo.service";
import {Photo} from "../photo/photo";
import {Observable} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {UserService} from "../../core/user/user.service";

@Component({
  selector: 'app-photo-detail',
  templateUrl: './photo-detail.component.html',
  styleUrls: ['./photo-detail.component.css']
})
export class PhotoDetailComponent implements OnInit {

  photo$: Observable<Photo>;
  photoId: number

  constructor(
    private route: ActivatedRoute,
    private photoService: PhotoService,
    private router: Router,
    private userService: UserService,
    private  toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.photoId = this.route.snapshot.params.photoId;
    this.photo$ = this.photoService.findById(this.photoId);
    this.photo$.subscribe(() => {}, error => this.router.navigate(['not-found']));
  }

  removePhoto() {
    this.photoService.removePhoto(this.photoId).subscribe(
      () => {
        this.toastr.success('Photo removed');
        this.router.navigate(['/user', this.userService.getUserName()])
      },
      error => this.toastr.error('Could not delete the photo!')
    );
  }

  like(photo: Photo) {
    this.photoService.like(photo.id).subscribe(
      liked => {
        if (liked)
          this.photo$ = this.photoService.findById(photo.id)
      },
      error => this.toastr.error('Erro ao requisitar a API', 'ERROR')
    )
  }
}
