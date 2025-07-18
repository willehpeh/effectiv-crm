import { Component } from '@angular/core';

@Component({
  selector: 'app-card-subheading',
  standalone: true,
  template: `
		<div class="text-center">
			<p class="text-slate-600 dark:text-slate-400 text-lg">
        <ng-content/>
			</p>
		</div>
  `
})
export class CardSubheadingComponent {
}
