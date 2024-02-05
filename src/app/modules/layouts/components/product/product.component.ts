import { Component, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { ProductService } from '../../services/product.service';
import { BtnCellRendererComponent } from 'src/app/shared/components/btn-cell-renderer/btn-cell-renderer.component';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { Product } from 'src/app/models/product.model';

import { ToastrService } from 'ngx-toastr';
import { ModalDialogComponent } from '../../../../shared/components/modal-dialog/modal-dialog.component';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
private _modalReference!: NgbModalRef;
public columnDefs: ColDef[] = [];
public customNames : any = [];

 public rowData = [
    { id: 1, name: 'Toyota', price: '20000', make: '2020' },
    { id: 2, name: 'Volkswagon', price: '30000', make: '2021' },
    { id: 3, name: 'Hyundai', price: '14000', make: '2021' },
  ];
constructor(private productService: ProductService,private _modalService: NgbModal,private _toastrService: ToastrService) { }

  ngOnInit(): void {
    
    this.loadProductList();
    
    this.generateColumnDefs();
  }



public generateColumnDefs()
{
  const propertiesArray = [{
       headerName : "name",
       field : "name" 
      },{
       headerName : "price",
       field : "price" 
      },{
       headerName : "description",
       field : "description" 
      }];
  for (const property of propertiesArray) {
    this.customNames.push(property);
  }
  this.customNames.push({
      headerName: 'Actions',
      cellRenderer: BtnCellRendererComponent,
      cellRendererParams: {
        onDeleteClick: this.onRemoveClick.bind(this),
        onEditClick: this.onEditClick.bind(this),
      },
  })
}




  productList: Product[] = [];
  
  loadProductList(): void {
    this.productService.getProductList().subscribe(
      (data : Product[]) => {
        this.productList = data;
      },
      (error : unknown) => {
        console.error('Error loading product list:', error);
      }
    );
  }


  onRemoveClick(e: any) {
    this._modalReference = this._modalService.open(ModalDialogComponent, {
      centered: true,
    });
    this._modalReference.componentInstance.title = 'Delete Info';
    this._modalReference.componentInstance.closeBtnTitle = 'Cancel';
    this._modalReference.componentInstance.submitBtnTitle = 'Delete';
    this._modalReference.componentInstance.modalBodyContent = `Do you want to delete this entry ?`;

    this._modalReference.componentInstance.submitBtnAction.subscribe({
      next: () => {
        this.productService.deleteProduct(e.rowData.id).subscribe(
          () => {this._toastrService.success('Record deleted successfully!'); this.loadProductList() },
          (error: unknown) => {
             this._toastrService.success('Error deleting record!');
            console.error('Error deleting product:', error);
          }
        )
        this._modalReference.close();
      },
    });
  }
  onEditClick(e: any) {
    console.log("test", e)
  }
}
