import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-burger',
  standalone: true,
  imports: [CommonModule],
  template: `<button
    type="button"
    (click)="toggle.emit()"
    [class.open]="isOpen"
  >
    <span></span>
    <span></span>
    <span></span>
  </button> `,
  styleUrls: ['./burger.component.scss'],
})
export class BurgerComponent {
  @Input() isOpen: boolean = false;
  @Output() toggle = new EventEmitter<boolean>();
}
