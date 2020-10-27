import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { tap } from 'rxjs/operators';
import {UserService} from "../user/user.service";
import {environment} from "../../../environments/environment";

const API_URL = environment.ApiUrl;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private userService: UserService) {
  }

  authenticate(userName: string, password: string) {
    return this.http.post(API_URL + '/user/login', {userName, password}, {observe: 'response'})
      .pipe(tap(res => {
        const authToken = res.headers.get('x-access-token'); // to access the headers it is necessary to pass the note as a parameter in the request call
        this.userService.setToken(authToken);
        console.log(authToken);
      }))
  }
}
