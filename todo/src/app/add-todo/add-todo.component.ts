import { MiniStateManagerService } from './../mini-state-manager.service';
import { Router } from '@angular/router';
import { RestService } from './../REST.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss']
})
export class AddTodoComponent implements OnInit {

  title = '';
  description = '';
  date = null;

  constructor(private http: RestService, private router: Router, private state: MiniStateManagerService) { }

  ngOnInit() {
  }

  async save() {

    try {
      await this.http.createTODO({ title: this.title, description: this.description, date: this.date });

      this.router.navigate(['']);
    } catch (error) {
      alert('try again')
    }
  }
}
