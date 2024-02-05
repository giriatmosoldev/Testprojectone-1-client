import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { AuthenticationResponse } from 'src/app/models/user.model';
import { AuthService } from '../../services/auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { CredentialService } from 'src/app/shared/services/credential/credential.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit, OnDestroy {
  public isLoading: boolean = false;
  public loginForm!: FormGroup;
  public showPassword: boolean = false;
  private ngUnsubscribe = new Subject<void>();

  constructor(
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _toastrService: ToastrService,
    private _credentialService: CredentialService
  ) {}

  ngOnInit(): void {
    this.initLoginForm();
  }

  public get formControls() {
    return this.loginForm.controls;
  }

  private initLoginForm(): void {
    this.loginForm = this._formBuilder.group({
      username : [
        '',
        [
          Validators.required,
          Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/),
        ],
      ],
      password: ['', [Validators.required]],
    });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public onSubmit(): void {
    this.isLoading = true;
     this._authService
       .login(this.loginForm.value)
       .pipe(takeUntil(this.ngUnsubscribe))
       .subscribe({
         next: (user: AuthenticationResponse) => {
           this._credentialService.setCredentials(user);
           this._credentialService.toggleLoginStatus();
           this._router.navigate(['/user']);
           setTimeout(() => {
             this._credentialService.removeCredentials();
             this._router.navigate(['/auth/login']);
           }, environment.cookieExpiry * 60 * 1000);
         },
         error: (errRes: HttpErrorResponse) => {
           this.isLoading = false;
           if (errRes?.error?.message)
             this._toastrService.error(errRes.error.message);
           else this._toastrService.error('Unable to perform the action!');
         },
         complete: () => {
           this.isLoading = false;
         },
       });
  }
}
