import { Component, signal, computed } from '@angular/core';
import { TaskCard } from './task-card/task-card';
import { Task } from './task.model';

type FilterMode = 'ALL' | 'OPEN' | 'DONE';

@Component({
  selector: 'app-root',
  imports: [TaskCard],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  tasks = signal<Task[]>([
    { id: 1, title: 'Forbered demo',    description: 'Slides og kørende app',    priority: 'HIGH',   deadline: '2026-08-14', completed: false },
    { id: 2, title: 'Skriv refleksion', description: 'Java vs TypeScript',       priority: 'MEDIUM', deadline: '2026-08-20', completed: false },
    { id: 3, title: 'Ryd op i repo',    description: 'Slet gamle branches',      priority: 'LOW',    deadline: '2026-08-11', completed: true  },
    { id: 4, title: 'Ret bug i login',  description: 'Fejl 500 ved tomt felt',   priority: 'HIGH',   deadline: '2026-08-09', completed: false },
    { id: 5, title: 'Opdater README',   description: 'Beskriv opsætning',        priority: 'LOW',    deadline: '2026-08-25', completed: true  },
  ]);

  filter = signal<FilterMode>('ALL');
  sortBy = signal<'deadline' | 'priority'>('deadline');

  visibleTasks = computed(() => {
    const all = this.tasks();

    const filtered =
      this.filter() === 'OPEN' ? all.filter(t => !t.completed) :
        this.filter() === 'DONE' ? all.filter(t => t.completed) :
          all;

    const rank: Record<string, number> = { HIGH: 0, MEDIUM: 1, LOW: 2 };

    return [...filtered].sort((a, b) =>
      this.sortBy() === 'deadline'
        ? a.deadline.localeCompare(b.deadline)
        : rank[a.priority] - rank[b.priority]
    );
  });

  openCount = computed(() => this.tasks().filter(t => !t.completed).length);

  setFilter(mode: FilterMode) {
    this.filter.set(mode);
  }

  onTaskToggled(id: number) {
    this.tasks.update(list =>
      list.map(t => t.id === id ? { ...t, completed: !t.completed } : t)
    );
  }

  onTaskDeleted(id: number) {
    this.tasks.update(list => list.filter(t => t.id !== id));
  }
}
