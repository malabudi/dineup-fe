import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

export type ButtonVariant = 'primary' | 'danger' | 'secondary';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {

  @Input() label: string = 'Submit';
  @Input() type: 'submit' | 'button' = 'submit';
  @Input() disabled: boolean = false;
  @Input() loading: boolean = false;
  @Input() variant: ButtonVariant = 'primary';

  @Output() clicked = new EventEmitter<void>();

  onClick() {
    if (!this.disabled && !this.loading) {
      this.clicked.emit();
    }
  }
}
