import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TlfService } from '../../services/tlf.service';
import { TextElement } from '../../models/tlf.model';
import { AssociateTlfsModalComponent } from '../associate-tlfs-modal/associate-tlfs-modal.component';

@Component({
  selector: 'app-tlf-editor',
  standalone: true,
  imports: [CommonModule, FormsModule, AssociateTlfsModalComponent],
  templateUrl: './tlf-editor.component.html',
  styleUrls: ['./tlf-editor.component.scss']
})
export class TlfEditorComponent implements OnInit {
  textElements: TextElement[] = [];
  searchText: string = '';
  selectedFootnoteLocation: string = 'current';
  showAssociateModal: boolean = false;
  selectedElementId: string = '';
  currentOutput: string = 'F12.3.1.3';

  constructor(private tlfService: TlfService) {}

  ngOnInit(): void {
    this.tlfService.getTextElements().subscribe(elements => {
      this.textElements = elements;
    });
  }

  openAssociateModal(elementId: string): void {
    this.selectedElementId = elementId;
    this.showAssociateModal = true;
  }

  closeAssociateModal(): void {
    this.showAssociateModal = false;
    this.selectedElementId = '';
  }

  onTLFsAssociated(tlfs: any[]): void { // Add this method
    if (this.selectedElementId && tlfs.length > 0) {
      this.tlfService.addAssociatedTLFs(this.selectedElementId, tlfs);
    }
    this.closeAssociateModal();
  }

  removeAssociatedTLF(elementId: string, tlfId: string): void {
    this.tlfService.removeAssociatedTLF(elementId, tlfId);
  }

  getAssociatedCount(element: TextElement): number {
    return element.associatedTLFs.length;
  }
}
