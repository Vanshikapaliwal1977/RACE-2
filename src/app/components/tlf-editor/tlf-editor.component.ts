import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { TlfService } from '../../services/tlf.service';
import { TextElement, AvailableTLF } from '../../models/tlf.model';
import { AssociateTlfsModalComponent } from '../associate-tlfs-modal/associate-tlfs-modal.component';
import { PreviewModalComponent } from '../preview-modal/preview-modal.component';
import { FindReplaceModalComponent } from '../find-replace-modal/find-replace-modal.component';

@Component({
  selector: 'app-tlf-editor',
  standalone: true,
  imports: [CommonModule, FormsModule, AssociateTlfsModalComponent, PreviewModalComponent, FindReplaceModalComponent],
  templateUrl: './tlf-editor.component.html',
  styleUrl: './tlf-editor.component.scss'
})
export class TlfEditorComponent implements OnInit, OnDestroy {
  textElements: TextElement[] = [];
  showAssociateModal = false;
  currentElementId = '';
  currentOutput = 'F12.3.1.3';
  searchText = '';
  selectedFootnoteLocation = 'current';
  showMenu = false;
  showPreviewModal = false;
  showFindReplaceModal = false;

  private subscription: Subscription = new Subscription();

  constructor(private tlfService: TlfService) {}

  ngOnInit(): void {
    this.subscription = this.tlfService.getTextElements().subscribe(elements => {
      this.textElements = elements;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  openAssociateModal(elementId: string): void {
    this.currentElementId = elementId;
    this.showAssociateModal = true;
  }

  closeAssociateModal(): void {
    this.showAssociateModal = false;
    this.currentElementId = '';
  }

  onTLFsAssociated(tlfs: AvailableTLF[]): void {
    if (this.currentElementId) {
      this.tlfService.addAssociatedTLFs(this.currentElementId, tlfs);
    }
    this.closeAssociateModal();
  }

  getAssociatedCount(element: TextElement): number {
    return element.associatedTLFs.length;
  }

  removeAssociatedTLF(elementId: string, tlfId: string): void {
    this.tlfService.removeAssociatedTLF(elementId, tlfId);
  }

  toggleMenu(): void {
    this.showMenu = !this.showMenu;
  }

  preview(): void {
    this.showPreviewModal = true;
    this.showMenu = false;
  }

  closePreviewModal(): void {
    this.showPreviewModal = false;
  }

  findAndReplace(): void {
    this.showFindReplaceModal = true;
    this.showMenu = false;
  }

  closeFindReplaceModal(): void {
    this.showFindReplaceModal = false;
  }
}
