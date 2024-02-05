import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';
import { ValidatorService } from '../../services/validator/validator.service';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public tncChecklist: string = '';
  public isInvalidForm: boolean = false;
  public isLoading: boolean = false;
  public signupForm !: FormGroup;
  private ngUnsubscribe = new Subject<void>();

  constructor(
    private router: Router,
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _toastrService: ToastrService,
    private _validatorService: ValidatorService,
  ) { }

  ngOnInit(): void {
    this.createSignUpForm();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
  get formControls() { return this.signupForm.controls; }

  private createSignUpForm() {
    this.signupForm = this._formBuilder.group({
      firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30), ValidatorService.cannotContainOnlySpace]],
      lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30), ValidatorService.cannotContainOnlySpace]],
      companyName: ['', [Validators.required, ValidatorService.cannotContainOnlySpace]],
      phone: ['', [Validators.required, ValidatorService.phoneNumberValidation]],
      email: ['', [Validators.required, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)]],
      password: ['', [Validators.required, Validators.maxLength(50), ValidatorService.cannotContainSpace,
      ValidatorService.passwordStrength]],
      confirmpassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(50), ValidatorService.cannotContainSpace]],
      tncchecklist: ['', [Validators.required]]
    }, {
      validators: this._validatorService.passwordMatch('password', 'confirmpassword')
    });
  }

  public onSubmit() {
    if (this.signupForm.invalid) {
      this.isInvalidForm = true;
      return;
    }
    this.isLoading = true;
    this._authService.signup(this.signupForm.value)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: () => {
          this._toastrService.success('Signup success');
          this.router.navigate(['/auth/login']);
        },
        error: (errRes: HttpErrorResponse) => {
          this.isLoading = false;
          if (errRes?.error?.message)
            this._toastrService.error(errRes.error.message);
          else
            this._toastrService.error('Unable to perform the action!');
        },
        complete: () => {
          this.isLoading = false;
        }
      });
  }
}