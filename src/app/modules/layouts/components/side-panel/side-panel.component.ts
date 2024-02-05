import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: 'app-side-panel',
  templateUrl: './side-panel.component.html',
  styleUrls: ['./side-panel.component.scss'],
})
export class SidePanelComponent implements OnInit {
 @Input() showSideBar!: boolean;
public menuItems :Array<string>=["Home", "About us", "Contact us"]
  
  constructor(
    private _router: Router
  ) {}

  ngOnInit(): void {}

}
