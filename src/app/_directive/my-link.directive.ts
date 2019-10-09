import { Directive, HostListener, Input } from '@angular/core';

// @Directive({
//   selector: '[appMyInheritLink]'
// })
// export class MyInheritLinkDirective {
//
//   constructor() { }
//
// }

@Directive({
  selector : '[href]'
})
export class MyLinkDirective {
  @Input() href: string;

  @HostListener('click', ['$event'])
  noop(event: MouseEvent) {
    if (this.href.length === 0 || this.href === '#') {
      event.preventDefault();
    }
  }
}
