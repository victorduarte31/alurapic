import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Photo} from "../photo/photo";
import {Subject} from "rxjs";
import {debounceTime} from "rxjs/operators";
import {PhotoService} from "../photo/photo.service";

@Component({
  selector: 'ap-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css']
})
export class PhotoListComponent implements OnInit, OnDestroy {

  photos: Photo[] = [];
  filter: string = '';
  debounce: Subject<string> = new Subject<string>();
  hasMore: boolean = true;
  currentPage: number = 1;
  userName: string = '';

  constructor(private activetedRoute: ActivatedRoute, private photoService: PhotoService) {
  }

  ngOnInit(): void {
    this.userName = this.activetedRoute.snapshot.params.userName;
    this.photos = this.activetedRoute.snapshot.data['photos'];
    this.debounce
      .pipe(debounceTime(400))
      .subscribe(filter => this.filter = filter); // waits for a period of milliseconds to run
  }

  ngOnDestroy(): void {
    this.debounce.unsubscribe(); // destroy observable - avoid allocated memory
  }

  load() {
    this.photoService.listFromUserPagineted(this.userName, ++this.currentPage)
      .subscribe(photos => {
        this.photos = this.photos.concat(photos);
        if (!photos.length)
          this.hasMore = false;
      })
  }
}
