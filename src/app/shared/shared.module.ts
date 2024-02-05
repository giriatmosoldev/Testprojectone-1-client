import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { BtnCellRendererComponent } from './components/btn-cell-renderer/btn-cell-renderer.component';



@NgModule({
  declarations: [
    BtnCellRendererComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AgGridModule
  ],
  exports: [
    ReactiveFormsModule,
    AgGridModule
  ]
})
export class SharedModule { }
