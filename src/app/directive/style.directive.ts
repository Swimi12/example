import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appStyle]',
  standalone: true,
})
export class StyleDirective {
  colorArr: string[] = ['red', 'blue', 'pink', 'orange', 'yellow'];
  @HostBinding('style.color') elColor = '';

  @HostListener('mouseenter') onEnter() {
    const randomNumber = Math.floor(Math.random() * 6);
    this.elColor = this.colorArr[randomNumber];
  }
}
