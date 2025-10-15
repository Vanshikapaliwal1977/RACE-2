import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-preview-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './preview-modal.component.html',
  styleUrl: './preview-modal.component.scss'
})
export class PreviewModalComponent {
  @Input() isVisible = false;
  @Output() close = new EventEmitter<void>();

  tocStatusToggle = false;

  closeModal(): void {
    this.close.emit();
  }
}
