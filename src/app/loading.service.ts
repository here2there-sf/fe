import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  _loading = false;
  private _message = 'Loading...';

  constructor() { }

  get loading() {
    return this._loading;
  }

  set loading(value: boolean) {
    this._loading = value;
  }

  get message(): string {
    return this._message;
  }

  set message(value: string) {
    this._message = value;
  }

  start = (message: string) => {
    this.message = message;
    this.loading = true;
  };

  stop = () => {
    this.message = '';
    this.loading = false;
  };
}
