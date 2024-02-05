import { Component, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { CreditdetailsService } from '../../services/creditdetails.service';
import { BtnCellRendererComponent } from 'src/app/shared/components/btn-cell-renderer/btn-cell-renderer.component';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { Credit } from 'src/app/models/credit.model';

import { ToastrService } from 'ngx-toastr';
import { ModalDialogComponent } from '../../../../shared/components/modal-dialog/modal-dialog.component';
@Component({
  selector: 'app-creditdetails',
  templateUrl: './creditdetails.component.html',
  styleUrls: ['./creditdetails.component.scss']
})
export class CreditdetailsComponent implements OnInit {
private _modalReference!: NgbModalRef;
public columnDefs: ColDef[] = [];
public customNames : any = [];

 public rowData = [
    { id: 1, name: 'Toyota', price: '20000', make: '2020' },
    { id: 2, name: 'Volkswagon', price: '30000', make: '2021' },
    { id: 3, name: 'Hyundai', price: '14000', make: '2021' },
  ];
constructor(private creditdetailsService: CreditdetailsService,private _modalService: NgbModal,private _toastrService: ToastrService) { }

  ngOnInit(): void {
    
    this.loadCreditList();
    
    this.generateColumnDefs();
  }



public generateColumnDefs()
{
  const propertiesArray = [{
       headerName : "name",
       field : "name" 
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




  creditList: Credit[] = [];
  
  loadCreditList(): void {
    this.creditdetailsService.getCreditList().subscribe(
      (data : Credit[]) => {
        this.creditList = data;
      },
      (error : unknown) => {
        console.error('Error loading creditdetails list:', error);
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
        this.creditdetailsService.deleteCredit(e.rowData.id).subscribe(
          () => {this._toastrService.success('Record deleted successfully!'); this.loadCreditList() },
          (error: unknown) => {
             this._toastrService.success('Error deleting record!');
            console.error('Error deleting credit:', error);
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
