import { RestService } from './../REST.service';
import { MiniStateManagerService } from './../mini-state-manager.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  data = {
    id: '',
    title: 'Test',
    description: 'lotem epsem dolar tonaro tencent kola',
    date: new Date(),
    done: false,
  }
  constructor(public activatedRoute: ActivatedRoute, public state: MiniStateManagerService, public http: RestService, private router: Router) { }

  ngOnInit() {

    this.data = this.state.selected;


  }

  async done() {
    try {

      await this.http.updateTODO({ ...this.data, done: !this.data.done });
      this.data.done = !this.data.done;
      this.router.navigate(['']);
    } catch (error) {
      alert('cant do changes try again');
    }
  }
  async delete() {
    try {
      await this.http.deleteTODO(this.data.id);

      this.router.navigate(['']);
    } catch (error) {
      alert('cant do changes try again');

    }

  }

}
