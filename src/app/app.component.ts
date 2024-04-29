import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'cnjg-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule],
  template: '<router-outlet />',
})
export class AppComponent {}
