import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { delay } from 'rxjs/operators';
import { AuthManagerService } from '../auth-service/auth-manager.service';
import { overlayViewComponent } from '../overlay-view/overlay-view.component';
import { RestService } from '../REST.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  data = {
    email: 'user@example.com'
  }

  constructor(
    public auth: AuthManagerService,
    public http: RestService, public route: Router, public dialog: MatDialog) { }

  ngOnInit() {
    if (this.auth.isLoggedIn()) {
      this.route.navigate(['/']);
    }
  }

  async register() {

    let dialog = this.waiting();

    console.log('[User Login Data] ' + JSON.stringify(this.data));

    try {
      const result = await this.http.register(this.data.email).toPromise();
      setTimeout(() => {
        dialog.close();
        this.route.navigate(['/login']);
      }, 3000);

    } catch (error) {

      dialog.close();
      dialog = this.fail('Cant register you, sorry 🙁');
    }

  }

  fail(description) {
    const dialog = this.dialog.open(overlayViewComponent, {
      width: '400px',
      panelClass: 'custom-dialog-container',
      data: {
        src: '/assets/svg/cancel.svg',
        description,
        primary: { icon: 'refresh', text: ' try again' },
        secondary: { icon: 'close', text: ' cancel' },
      }
    });
    return dialog;
  }
  waiting() {
    const dialog = this.dialog.open(overlayViewComponent, {
      width: '400px',
      panelClass: 'custom-dialog-container',
      data: {
        src: 'waiting',
      }
    });
    return dialog;
  }

}
