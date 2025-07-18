import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-projects',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="p-8">
      <h1 class="text-3xl font-bold text-slate-900 dark:text-slate-100">
        Projects
      </h1>
    </div>
  `
})
export class ProjectsComponent {
}
