import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { JokeStoreService } from '../joke-store/joke-store.service';

@Component({
  selector: 'cnjg-jokes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './jokes.component.html',
  styleUrl: './jokes.component.scss',
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JokesComponent {
  public jokes: string[] = [];

  constructor(private jokeStoreService: JokeStoreService) {
    // TODO: Look into using async pipe?
    this.jokeStoreService.getJokes().subscribe((jokes) => {
      this.jokes = jokes;
    });
  }
}
