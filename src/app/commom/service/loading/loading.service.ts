import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private _loading = new BehaviorSubject<boolean>(false);
  readonly loading$ = this._loading.asObservable();
  private requests = 0;
  private showTimeout: any;

  show(delay = 300) {
    this.requests++;
    if (this.requests === 1) {
      // debounce tránh flicker
      this.showTimeout = setTimeout(() => {
        this._loading.next(true);
      }, delay);
    }
  }

  hide() {
    if (this.requests > 0) {
      this.requests--;
    }
    if (this.requests === 0) {
      clearTimeout(this.showTimeout);
      this._loading.next(false);
    }
  }
}
