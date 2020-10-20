import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {lowerCaseValidator} from "../../shared/Validators/lowerCaseValidator";
import {UserNotTakenValidatorService} from "./user-not-taken.validator.service";
import {NewUser} from "./new-user";
import {SignupService} from "./signup.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userNotTakenValidatorService: UserNotTakenValidatorService,
    private signupService: SignupService,
    private router: Router
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
    })
  }

  signup() {
    const newUser = this.signupForm.getRawValue() as NewUser;
    this.signupService.signup(newUser).subscribe(
      () => this.router.navigate(['']),
      error => console.log(error)
    )
  }
}
