import { ChangeDetectionStrategy, Component } from '@angular/core';
import { JokesComponent } from '../jokes/jokes.component';

@Component({
  selector: 'cnjg-home',
  standalone: true,
  imports: [JokesComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {}
