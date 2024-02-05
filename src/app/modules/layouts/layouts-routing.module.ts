import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutsComponent } from './layouts.component';
import { ProductComponent } from './components/product/product.component';
import { ProductformComponent } from './components/productform/productform.component';
import { CreditdetailsComponent } from './components/creditdetails/creditdetails.component';

const routes: Routes = [{ path: '', component: LayoutsComponent, children: [{path : 'product/grid', component : ProductComponent , pathMatch : "full" }, {path : 'productform/form', component : ProductformComponent , pathMatch : "full" }, {path : 'creditdetails/grid', component : CreditdetailsComponent , pathMatch : "full" }]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutsRoutingModule { }
