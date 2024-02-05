import { Injectable } from '@angular/core';
import { Router, RouterStateSnapshot } from '@angular/router';
import { CredentialService } from 'src/app/shared/services/credential/credential.service';


@Injectable({
  providedIn: 'root'
})
export class LoginAuthGuard {
  constructor(
    private _router: Router,
    private _credentialService: CredentialService
  ) { }

  canActivate(state: RouterStateSnapshot): boolean {
    if (this._credentialService.isAuthenticated()) {
      this._router.navigate(['/'], { queryParams: { redirect: state.url }, replaceUrl: true });
      return false;
    }
    return true;
  }
}
