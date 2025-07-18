import { Component } from '@angular/core';

@Component({
  selector: 'app-card-header',
  standalone: true,
  template: `
		<div class="text-center">
			<ng-content/>
		</div>
  `,
  styles: `
    :host {
      @apply block;
    }
  `
})
export class CardHeaderComponent {
}
