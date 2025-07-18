import { Component, ChangeDetectionStrategy, input } from '@angular/core';

@Component({
  selector: 'app-menu-icon',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="relative h-5 w-5 flex flex-col justify-center items-center">
      <div class="flex flex-col space-y-1 transition-all duration-300 ease-in-out" 
           [class.transform]="isOpen()" 
           [class.rotate-45]="isOpen()">
        <!-- Top line -->
        <div class="w-5 h-0.5 bg-current transition-all duration-300 ease-in-out rounded-full"
             [class.translate-y-1.5]="isOpen()"
             [class.rotate-90]="isOpen()"></div>
        <!-- Middle line -->
        <div class="w-5 h-0.5 bg-current transition-all duration-300 ease-in-out rounded-full"
             [class.opacity-0]="isOpen()"></div>
        <!-- Bottom line -->
        <div class="w-5 h-0.5 bg-current transition-all duration-300 ease-in-out rounded-full"
             [class.-translate-y-1.5]="isOpen()"
             [class.rotate-90]="isOpen()"></div>
      </div>
    </div>
  `
})
export class MenuIconComponent {
  isOpen = input<boolean>(false);
}
