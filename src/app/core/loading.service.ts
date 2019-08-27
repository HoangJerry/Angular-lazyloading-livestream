import { Injectable } from '@angular/core';
import { Subject ,  Observable }    from 'rxjs';

@Injectable()
export class LoadingService {
  public isLoading: boolean;
  public loadingAnnounced$: Observable<boolean>;
  private isLoadingChange: Subject<boolean> = new Subject<boolean>();
  private _numberLoading: any[];

  constructor() {
    this.isLoading = false;
    this._numberLoading = [];
    this.loadingAnnounced$ = this.isLoadingChange.asObservable();
  }

  public start() {
    this._numberLoading.push(true);
    this.isLoading = true;
    this.isLoadingChange.next(this.isLoading);
  }

  public stop() {
    this._numberLoading.splice(0, 1);
    this.isLoading = this._numberLoading.length !== 0;
    this.isLoadingChange.next(this.isLoading);
  }
}
