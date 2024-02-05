import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginAuthGuard } from './core/guards/login-auth.guard';
import { AuthGuard } from './core/guards/auth.guard';


const routes: Routes = [{ path: 'auth', loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule) },
{ path: 'user', loadChildren: () => import('./modules/layouts/layouts.module').then(m => m.LayoutsModule) },
{path : "", redirectTo: "auth/login"  , pathMatch : "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
