import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MainService } from "src/app/shared/services/main/main.service";
@Component({
  selector: "app-layouts",
  templateUrl: "./layouts.component.html",
  styleUrls: ["./layouts.component.css"],
})
export class LayoutsComponent implements OnInit {
    
  public sidePanelVisible!: boolean;

  constructor(
    private _mainservice: MainService
  ) {}

 ngOnInit(): void {
      this._mainservice.sidePanelVisible$.subscribe(visible => {
      this.sidePanelVisible = visible;
    });
  }
}
