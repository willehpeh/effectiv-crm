import { Component } from '@angular/core';

@Component({
  selector: 'app-card-heading',
  standalone: true,
  template: `
		<div class="text-center">
			<h2 class="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-3">
				<ng-content/>
			</h2>
    </div>
  `
})
export class CardHeadingComponent {
}
