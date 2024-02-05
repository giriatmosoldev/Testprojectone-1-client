import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/shared/services/main/main.service';

@Component({
  selector: 'app-page-loader',
  templateUrl: './page-loader.component.html',
  styleUrls: ['./page-loader.component.scss'],
})
export class PageLoaderComponent implements OnInit {
  public loading!: boolean;

  constructor(private _mainService: MainService) {}

  ngOnInit(): void {
    this._mainService.loading$.subscribe((loading: boolean) => {
      this.loading = loading;
    });
  }
}