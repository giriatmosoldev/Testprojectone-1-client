import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  public isLoading: boolean = false;
  private ngUnsubscribe = new Subject<void>();
  public forgotPasswordForm !: FormGroup;
  public isInvalidForm: boolean = false;
  constructor(
    private router: Router,
    private _authService: AuthService,
    private _toastrService: ToastrService,
    private _formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.createForm();
  }
  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public get formControls() { return this.forgotPasswordForm.controls; }

  private createForm() {
    this.forgotPasswordForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)]],
    });
  }

  public onSubmit() {
    if (this.forgotPasswordForm.invalid) {
      this.isInvalidForm = true;
      return;
    }
    this.isLoading = true;
    this.router.navigate(['/auth/resetpassword']);
    this._authService.forgotpassword(this.forgotPasswordForm.value)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: () => {
          this._toastrService.success('Email sent successfully');
        },
        error: (errRes: HttpErrorResponse) => {
          if (errRes?.error?.message)
            this._toastrService.error(errRes.error.message);
          else
            this._toastrService.error('Unable to perform the action!');
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
