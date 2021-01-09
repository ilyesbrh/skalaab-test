import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MiniStateManagerService {


  Todo = [];

  selected = null;

  constructor() { }
}
