import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TlfService } from '../../services/tlf.service';
import { AvailableTLF, FilterOptions } from '../../models/tlf.model';

@Component({
  selector: 'app-associate-tlfs-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './associate-tlfs-modal.component.html',
  styleUrls: ['./associate-tlfs-modal.component.scss']
})
export class AssociateTlfsModalComponent implements OnInit {
  @Output() close = new EventEmitter<void>();
  @Output() submit = new EventEmitter<AvailableTLF[]>();

  availableTLFs: AvailableTLF[] = [];
  filteredTLFs: AvailableTLF[] = [];
  selectedTLFs: AvailableTLF[] = [];

  filters: FilterOptions = {
    tlfType: 'All Types',
    analysisSet: 'All Sets',
    uniqueRepeat: 'All',
    searchText: ''
  };

  tlfTypes: string[] = ['All Types', 'Table', 'Figure', 'Listing'];
  analysisSets: string[] = ['All Sets', 'Efficacy', 'Safety'];
  uniqueRepeats: string[] = ['All', 'Unique', 'Repeat'];

  constructor(private tlfService: TlfService) {}

  ngOnInit(): void {
    this.availableTLFs = this.tlfService.getAvailableTLFs();
    this.applyFilters();
  }

  applyFilters(): void {
    this.filteredTLFs = this.availableTLFs.filter(tlf => {
      const matchesType = this.filters.tlfType === 'All Types' || tlf.tlfType === this.filters.tlfType;
      const matchesSet = this.filters.analysisSet === 'All Sets' || tlf.analysisSet === this.filters.analysisSet;
      const matchesUnique = this.filters.uniqueRepeat === 'All' || tlf.uniqueRepeat === this.filters.uniqueRepeat;
      const matchesSearch = !this.filters.searchText ||
        tlf.outputNumber.toLowerCase().includes(this.filters.searchText.toLowerCase()) ||
        tlf.title.toLowerCase().includes(this.filters.searchText.toLowerCase());

      return matchesType && matchesSet && matchesUnique && matchesSearch;
    });
  }

  toggleSelection(tlf: AvailableTLF): void {
    const index = this.selectedTLFs.findIndex(t => t.outputNumber === tlf.outputNumber);
    if (index > -1) {
      this.selectedTLFs.splice(index, 1);
      tlf.selectedForText = false;
    } else {
      this.selectedTLFs.push(tlf);
      tlf.selectedForText = true;
    }
  }

  isSelected(tlf: AvailableTLF): boolean {
    return this.selectedTLFs.some(t => t.outputNumber === tlf.outputNumber);
  }

  onSubmit(): void {
    this.submit.emit(this.selectedTLFs);
  }

  onCancel(): void {
    this.close.emit();
  }

  onFilterChange(): void {
    this.applyFilters();
  }
}
