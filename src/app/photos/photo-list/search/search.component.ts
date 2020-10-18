import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Subject} from "rxjs";
import {debounceTime, filter} from "rxjs/operators";

@Component({
  selector: 'ap-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {

  @Output() onTyping = new EventEmitter<string>(); //raise event for parent component
  @Input() value: string = '';
  debounce: Subject<string> = new Subject<string>();


  constructor() { }

  ngOnInit(): void {
    this.debounce
      .pipe(debounceTime(400))
      .subscribe(filter => this.onTyping.emit(filter)) // waits for a period of milliseconds to run
  }

  ngOnDestroy(): void {
    this.debounce.unsubscribe();
  }

}
