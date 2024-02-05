import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';
import { ValidatorService } from '../../services/validator/validator.service';
import { ResetPasswordModel } from 'src/app/models/user.model';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})

export class ResetPasswordComponent implements OnInit {

  public submitStatus: boolean = false;
  public isInvalidForm: boolean = false;
  public isLoading: boolean = false;
  public resetPasswordForm !: FormGroup;
  public resetPasswordModel: ResetPasswordModel = new ResetPasswordModel();
  private ngUnsubscribe = new Subject<void>();

  constructor(
    private _formBuilder: FormBuilder,
    private router: Router,
    private _authService: AuthService,
    private _toastrService: ToastrService,
    private route: ActivatedRoute,
    private _validatorService: ValidatorService,
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.resetPasswordModel.token = params['_t'];
      if (this.resetPasswordModel.token == null || this.resetPasswordModel.token == '') {
        this._toastrService.error('Invalid link')
      }
    })
    this.createForm();
  }

  get formControls() { return this.resetPasswordForm.controls; }

  private createForm() {
    this.resetPasswordForm = this._formBuilder.group({
      password: ['', [Validators.required, Validators.maxLength(50), ValidatorService.cannotContainSpace,
      ValidatorService.passwordStrength]],
      confirmpassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(50), ValidatorService.cannotContainSpace]],
    }, {
      validators: this._validatorService.passwordMatch('password', 'confirmpassword')
    });
  }


  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public onSubmit() {
    if (this.resetPasswordForm.invalid) {
      this.isInvalidForm = true;
      return;
    }
    this.isInvalidForm = false;
    this.isLoading = true;
    this.submitStatus = true;
    this.resetPasswordModel.password = this.resetPasswordForm.value.password;
    this.resetPasswordModel.confirmpassword = this.resetPasswordForm.value.confirmpassword;
    this._authService.resetpassword(this.resetPasswordModel)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: (response: any) => {
          this.submitStatus = true;
          this._toastrService.success('Reset password successful.');
        },
        error: (errRes: HttpErrorResponse) => {
          if (errRes?.error?.message) {
            this._toastrService.error(errRes.error.message);
          }
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
        }
      });
  }
  public redirectToLogin() {
    this.router.navigate(['/auth/login']);
  }
}