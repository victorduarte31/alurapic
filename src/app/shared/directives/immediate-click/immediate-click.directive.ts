import {AfterViewInit, Directive, ElementRef} from "@angular/core";
import {PlatformDetectorService} from "../../../core/platform-detector/platform-detector.service";

@Directive({
  selector: '[immediateClick]'
})
export class ImmediateClickDirective implements AfterViewInit{

  constructor(private element: ElementRef<any>, private platFormDetector: PlatformDetectorService) {
  }

  ngAfterViewInit(): void {
    this.platFormDetector.isPlatformBrowser() &&
      this.element.nativeElement.click();
  }

}
