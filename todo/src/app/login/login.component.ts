import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { delay } from 'rxjs/operators';
import { AuthManagerService } from '../auth-service/auth-manager.service';
import { overlayViewComponent } from '../overlay-view/overlay-view.component';
import { RestService } from '../REST.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

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
  gotoCreateAccount() { }

  async login() {

    let dialog = this.waiting();

    console.log('[User Login Data] ' + JSON.stringify(this.data));

    const result = await this.auth.login(this.data.email).toPromise();
    await delay(2000);
    dialog.close();
    if (result.success) {
      this.route.navigate(['/']);
    } else {
      dialog = this.fail(result.message);
      const res = await dialog.afterClosed().toPromise();
      if (res) {
        this.login();
      }
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
