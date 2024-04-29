import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './home/home.component';

@Component({
  selector: 'cnjg-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, HomeComponent],
  template: '<cnjg-home></cnjg-home>',
})
export class AppComponent {}
