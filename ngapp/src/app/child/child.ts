import { Component, input, output } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-child',
  styleUrl: './child.css',
  templateUrl: './child.html',
})

export class Child {
  content = input<string>('');
  states = input<string[]>([]);
  selected = output<string>();

  select(state: string) {
    this.selected.emit(state);
  }
}