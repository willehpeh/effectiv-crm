import { Directive } from '@angular/core';

@Directive({
  selector: '[cardSubheading]',
  host: {
    'class': 'text-center block text-slate-600 dark:text-slate-400 text-lg'
  }
})
export class CardSubheadingDirective {
}
