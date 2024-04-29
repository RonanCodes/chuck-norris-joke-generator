import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { JokeStoreService } from '../joke-store/joke-store.service';

@Component({
  selector: 'cnjg-jokes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './jokes.component.html',
  styleUrl: './jokes.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JokesComponent {
  constructor(public jokeStoreService: JokeStoreService) {}
}
