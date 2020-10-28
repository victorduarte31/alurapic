import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {lowerCaseValidator} from "../../shared/Validators/lowerCaseValidator";
import {UserNotTakenValidatorService} from "./user-not-taken.validator.service";
import {NewUser} from "./new-user";
import {SignupService} from "./signup.service";
import {Router} from "@angular/router";
import {PlatformDetectorService} from "../../core/platform-detector/platform-detector.service";
import { userNamePassword } from './username-password.validator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css',],
  providers: [ UserNotTakenValidatorService ]
})
export class SignupComponent implements OnInit, AfterViewInit {

  signupForm: FormGroup;
  @ViewChild('emailInput') emailInput: ElementRef<HTMLInputElement>;

  constructor(
    private formBuilder: FormBuilder,
    private userNotTakenValidatorService: UserNotTakenValidatorService,
    private signupService: SignupService,
    private router: Router,
    private platFormDetectorService: PlatformDetectorService
  ) {
  }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      userName: ['',
        [Validators.required, lowerCaseValidator, Validators.minLength(2), Validators.maxLength(30)],
        this.userNotTakenValidatorService.checkUserNameTaken()
      ],
      fullName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(40)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(14)]],
    }, {
      validator: userNamePassword
    })

  }

  ngAfterViewInit(): void {
    this.platFormDetectorService.isPlatformBrowser() && this.emailInput.nativeElement.focus()// DOM manipulation to be client-side only
  }

  signup() {
    if (this.signupForm.valid && !this.signupForm.pending) {
      const newUser = this.signupForm.getRawValue() as NewUser;
      this.signupService.signup(newUser).subscribe(
        () => this.router.navigate(['']),
        error => console.log(error)
      )
    }
  }


}
