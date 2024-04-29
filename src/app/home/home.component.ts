import { ChangeDetectionStrategy, Component } from '@angular/core';
import { JokesComponent } from '../jokes/jokes.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'cnjg-home',
  standalone: true,
  imports: [JokesComponent, MatIconModule, MatButtonModule, MatToolbarModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {}
