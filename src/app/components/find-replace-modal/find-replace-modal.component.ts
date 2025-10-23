import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-find-replace-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './find-replace-modal.component.html',
  styleUrl: './find-replace-modal.component.scss'
})
export class FindReplaceModalComponent {
  @Input() isVisible = false;
  @Output() close = new EventEmitter<void>();

  findText = '';
  replaceText = '';
  excludeText = '';
  scope = 'selection';
  contentType = 'All content types';
  tlfType = 'All TLF types';
  caseSensitive = false;

  closeModal(): void {
    this.close.emit();
  }

  previewChanges(): void {
    // Placeholder for preview changes functionality
    console.log('Preview changes clicked');
  }
}



