import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
    selector: 'app-button-renderer',
    template: `
    <div class="d-flex align-items-center flex-start">
      <button class="icon-wrapper action-btn" (click)="onDeleteClick(params)">
        <i class="icon-trash"></i>
      </button>
      <button class="icon-wrapper action-btn ms-4" (click)="onEditClick(params)">
        <i class="icon-edit"></i>
      </button>
    </div>
  `,
    styleUrls: ["./btn-cell-renderer.component.scss"]
})
export class BtnCellRendererComponent implements ICellRendererAngularComp {
    public params: any;
    public label: string = '';

    constructor() { }

    agInit(params: any): void {
        this.params = params;
        this.label = this.params.label || null;
    }
    refresh(params?: ICellRendererParams): boolean {
        return false;
    }

    onDeleteClick(params: any): void {
        if (params.onDeleteClick) {
            const data = {
                rowData: this.params.node.data,
            };
            params.onDeleteClick(data);
        }
    }

    onEditClick(params: any): void {
        if (params.onEditClick) {
            const data = {
                rowData: this.params.node.data,
            };
            params.onEditClick(data);
        }
    }

}
