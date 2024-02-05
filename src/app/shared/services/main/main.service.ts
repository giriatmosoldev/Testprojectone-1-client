import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MainService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();
  private sidePanelVisibleSubject = new BehaviorSubject<boolean>(true);
  public sidePanelVisible$ = this.sidePanelVisibleSubject.asObservable();
  private readonly SIDE_PANEL_KEY: string = 'sidePanelVisible';
  private activeProjectIdSubject = new BehaviorSubject<number>(0);
  public activeProjectId$ = this.activeProjectIdSubject.asObservable();

  constructor() {
    this.initializeSidePanelState();
  }

  public showLoader() {
    this.loadingSubject.next(true);
  }

  public hideLoader() {
    this.loadingSubject.next(false);
  }

  public toggleSidePanelVisibility() {
    const visible = !this.sidePanelVisibleSubject.getValue();
    this.sidePanelVisibleSubject.next(visible);
    localStorage.setItem(this.SIDE_PANEL_KEY, String(visible));
  }
  private initializeSidePanelState() {
    const storedValue = localStorage.getItem(this.SIDE_PANEL_KEY);
    if (storedValue !== null) {
      const visible = storedValue === 'true';
      this.sidePanelVisibleSubject.next(visible);
    }
  }
}
