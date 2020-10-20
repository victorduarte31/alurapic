import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../core/auth/auth.service";
import {Router} from "@angular/router";
import {PlatformDetectorService} from "../../core/platform-detector/platform-detector.service";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit, AfterViewInit {

  loginForm: FormGroup;
  @ViewChild('userNameInput') userNameInput: ElementRef<HTMLInputElement>;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private platFormDetectorService: PlatformDetectorService
  ) {
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  ngAfterViewInit(): void {
    this.platFormDetectorService.isPlatformBrowser() && this.userNameInput.nativeElement.focus(); // DOM manipulation to be client-side only
  }

  login() {
    const userName = this.loginForm.get('userName').value;
    const password = this.loginForm.get('password').value;

    this.authService.authenticate(userName, password).subscribe(
      () => this.router.navigate(['user', userName]),
      error => {
        console.log(error);
        this.loginForm.reset();
        this.platFormDetectorService.isPlatformBrowser() && this.userNameInput.nativeElement.focus(); // DOM manipulation to be client-side only
        alert('invalid user name or password');
      }
    );
  }



}
