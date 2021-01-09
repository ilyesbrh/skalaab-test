import { MiniStateManagerService } from './../mini-state-manager.service';
import { Router } from '@angular/router';
import { AuthManagerService } from './../auth-service/auth-manager.service';
import { RestService } from './../REST.service';
import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  constructor(private http: RestService, private auth: AuthManagerService, private route: Router, public state: MiniStateManagerService) { }

  async ngOnInit() {

    this.state.Todo = await this.http.getTODOList({}).toPromise();


  }

  open(todo) {
    this.state.selected = todo;
    this.route.navigate(['details']);
  }

  disconnect() {
    this.auth.logout();
  }


  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.state.Todo, event.previousIndex, event.currentIndex);
  }
}
