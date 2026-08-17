import { Component, input, output } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Task } from '../task.model';

@Component({
  selector: 'app-task-card',
  imports: [DatePipe],
  templateUrl: './task-card.html',
  styleUrl: './task-card.css',
})
export class TaskCard {
  task = input.required<Task>();

  toggled = output<number>();
  deleted = output<number>();

  onToggle() {
    this.toggled.emit(this.task().id);
  }

  onDelete() {
    this.deleted.emit(this.task().id);
  }
}
