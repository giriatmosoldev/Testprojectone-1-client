import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject,takeUntil } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Params } from '@angular/router';
import { ProductformService } from '../../services/productform.service';


import { Product } from 'src/app/models/product.model';


@Component({
  selector: 'app-productform',
  templateUrl: './productform.component.html',
  styleUrls: ['./productform.component.scss']
})
export class ProductformComponent implements OnInit {

  
  public ProductForm! : FormGroup;
  public  ProductId!: number;
   
  private ngUnsubscribe = new Subject<void>();

  constructor(private productformService: ProductformService ,
  private _formBuilder: FormBuilder,
  private _toastrService: ToastrService,
  private _route: ActivatedRoute) { }


  ngOnInit(): void {
    
    this.initProductForm();
    
    this._route.params.subscribe((params: Params) => {
      this.ProductId = Number(params['id']);
      this.getProductById(this.ProductId);
    });
  }
  
  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }


  productList: Product[] = [];


public get ProductFormControls() {
    return this.ProductForm.controls;
}


  private initProductForm() :  void
  {
    this.ProductForm = this._formBuilder.group({
        id: [0],
      
        name : ['', [Validators.required, Validators.pattern(/^[A-Za-z]*$/)]],
      
        price : [0, [Validators.required]],
      
        description : [0],
      
    });
  }






public onSave() {
  if (this.ProductId > 0) {
      this.editProduct(this.ProductForm.value);
    } else {
      this.createProduct(this.ProductForm.value);
    }
}

private createProduct(ProductData : Product) {
  console.log(ProductData);
  this.productformService
      .addProduct(ProductData)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: (Product: Product) => {
          console.log(Product);
          this._toastrService.success('Product created successfully.');
        },
        error: (errRes: HttpErrorResponse) => {
          if (errRes?.error?.message) {
            this._toastrService.error(errRes.error.message);
          } else {
            this._toastrService.error('Unable to load the Product!');
          }
        },
        complete: () => {
        },
      });
}

private editProduct(ProductData : Product){
  console.log(ProductData);
  this.productformService
      .updateProduct(this.ProductId,ProductData)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: () => {
          this._toastrService.success('Product details updated successfully.');
        },
        error: (errRes: HttpErrorResponse) => {
          if (errRes?.error?.message) {
            this._toastrService.error(errRes.error.message);
          } else {
            this._toastrService.error('Unable to update the Product!');
          }
        },
        complete: () => {
        },
      });
}

  private getProductById(ProductId: number) {
    if (ProductId > 0) {
      this.productformService
        .getProduct(this.ProductId)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe({
          next: (Product: Product) => {
            this.populateForm(Product);
          },
          error: (errRes: HttpErrorResponse) => {
            if (errRes?.error?.message) {
              this._toastrService.error(errRes.error.message);
            } else {
              this._toastrService.error('Unable to load the Product!');
            }
          },
          complete: () => {
          },
        });
    }
  }

 private populateForm(Product: Product): void {
    this.ProductForm.patchValue({
       
          name : Product.name,
        
          price : Product.price,
        
          description : Product.description,
        
    });
  }

}