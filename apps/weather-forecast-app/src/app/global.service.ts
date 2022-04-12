import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  cityGlobal='';
  coordonnateGlobal: any;
  longitude='';
  latitude='';

  constructor() {
    console.log(this.cityGlobal);
    console.log(this.coordonnateGlobal);
  }
}
