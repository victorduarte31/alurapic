import {PhotoService} from "../photo/photo.service";
import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Photo} from "../photo/photo";
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class PhotoListResolver implements Resolve<Photo>{

  constructor(private serivce: PhotoService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Photo> | Promise<any> | any {
    const userName = route.params.userName;

    return this.serivce.listFromUserPagineted(userName, 1);
  }


}
