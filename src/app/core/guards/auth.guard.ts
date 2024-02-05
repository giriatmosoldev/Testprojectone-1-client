import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CredentialService } from 'src/app/shared/services/credential/credential.service'

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(
    private _credentialService: CredentialService,
    private _router: Router
  ) { }

  canActivate(): boolean {
    if (!this._credentialService.isAuthenticated()) {
      this._router.navigate(['/auth/login']);
      return false;
    }
    return true;
  }

}
