import { overlayViewComponent } from './overlay-view/overlay-view.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
/* Angular material components */
import {
  MatRippleModule, MatListModule, MatFormFieldModule, MatButtonModule, MatIconModule, MatInputModule,
  MatSidenavModule, MatToolbarModule, MatButtonToggleModule, MatExpansionModule, MatSlideToggleModule,
  MatDialogModule, MatStepperModule, MatSelectModule, MatAutocompleteModule,
  MatRadioModule, MatProgressSpinnerModule, MatNativeDateModule
} from '@angular/material';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { DragDropModule } from '@angular/cdk/drag-drop';

// import { NgxMatDatetimePickerModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
// import { NgxMatMomentModule } from '@angular-material-components/moment-adapter';

// import { CalendarModule, DateAdapter } from 'angular-calendar';
// import { adapterFactory } from 'angular-calendar/date-adapters/moment';
import * as moment from 'moment';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './auth-service/token-interceptor';
import { DetailsComponent } from './details/details.component';
import { AddTodoComponent } from './add-todo/add-todo.component';

// export function momentAdapterFactory() {
//   return adapterFactory(moment);
// };

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    SignUpComponent,
    overlayViewComponent,
    DetailsComponent,
    AddTodoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule, ReactiveFormsModule,
    SweetAlert2Module.forRoot(),
    /* material components */
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatRippleModule,
    MatExpansionModule,
    MatSlideToggleModule,
    MatButtonToggleModule,
    MatDialogModule,
    MatStepperModule,
    MatListModule,
    MatSelectModule,
    MatRadioModule,
    MatProgressSpinnerModule,
    DragDropModule,

    /* datetime Picker */
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [
    MatNativeDateModule,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [overlayViewComponent]
})
export class AppModule { }
