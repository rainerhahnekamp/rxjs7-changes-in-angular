import { HttpClientModule } from '@angular/common/http';
import { LOCALE_ID, NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { APP_ROUTES } from './app.routes';
import { HeaderComponent } from './header/header.component';
import { HolidayDetailComponent } from './holiday-detail/holiday-detail.component';
import { HolidaysComponent } from './holidays/holidays.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HolidaysComponent,
    HolidayDetailComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    HttpClientModule,
    RouterModule.forRoot(APP_ROUTES),
  ],
  providers: [
    {
      provide: MAT_DATE_LOCALE,
      useValue: 'de-AT',
    },
    { provide: LOCALE_ID, useValue: 'de-AT' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
