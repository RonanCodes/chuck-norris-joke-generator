import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'cnjg-joke-list',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './joke-list.component.html',
  styleUrl: './joke-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JokeListComponent {
  @Input() jokes: string[] = [];
  // @Output() jokeClicked = new EventEmitter<string>();
}
