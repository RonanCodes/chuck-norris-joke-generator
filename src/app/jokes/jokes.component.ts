import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'cnjg-jokes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './jokes.component.html',
  styleUrl: './jokes.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JokesComponent {
  public jokes = [
    'Joke 1',
    'Joke 2',
    'Joke 3',
    'Joke 4',
    'Joke 5',
    'Joke 6',
    'Joke 7',
    'Joke 8',
    'Joke 9',
    'Joke 10',
    'Joke 11',
    'Joke 12',
    'Joke 13',
    'Joke 14',
    'Joke 15',
    'Joke 16',
    'Joke 17',
    'Joke 18',
    'Joke 19',
    'Joke 20',
    'Joke 21',
    'Joke 22',
    'Joke 23',
    'Joke 24',
    'Joke 25',
    'Joke 26',
    'Joke 27',
    'Joke 28',
    'Joke 29',
    'Joke 30',
    'Joke 31',
    'Joke 32',
  ];
}
