import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MainLayoutComponent } from './core/ui/layout/main-layout/main-layout.component';

@Component({
  selector: 'app-root',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MainLayoutComponent],
  template: `
    <app-main-layout/>
  `
})
export class App {

}
