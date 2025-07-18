import { Directive } from '@angular/core';

@Directive({
  selector: '[appCardSubheading]',
  host: {
    'class': 'text-center block text-slate-600 dark:text-slate-400 text-lg'
  }
})
export class CardSubheadingDirective {
}
