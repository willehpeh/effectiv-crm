import { Directive } from '@angular/core';

@Directive({
  selector: '[cardHeading]',
  host: {
    class: 'text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-3'
  }
})
export class CardHeadingDirective {
}
