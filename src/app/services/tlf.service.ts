import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TextElement, AvailableTLF } from '../models/tlf.model';

@Injectable({
  providedIn: 'root'
})
export class TlfService {
  private textElementsSubject = new BehaviorSubject<TextElement[]>(this.getMockTextElements());
  public textElements$ = this.textElementsSubject.asObservable();

  constructor() { }

  getTextElements(): Observable<TextElement[]> {
    return this.textElements$;
  }

  getAvailableTLFs(): AvailableTLF[] {
    return [
      {
        tlfType: 'Table',
        outputNumber: '14.1.1.1',
        title: 'Demographic Data',
        analysisSet: 'Efficacy',
        uniqueRepeat: 'Unique',
        uniqueParent: 'Unique parent ON'
      },
      {
        tlfType: 'Table',
        outputNumber: '14.1.1.2',
        title: 'Prior Medications',
        analysisSet: 'Efficacy',
        uniqueRepeat: 'Unique',
        uniqueParent: 'Unique parent ON'
      },
      {
        tlfType: 'Table',
        outputNumber: '14.1.1.3',
        title: 'Summary Statistics',
        analysisSet: 'Efficacy',
        uniqueRepeat: 'Unique',
        uniqueParent: 'Unique parent ON'
      },
      {
        tlfType: 'Table',
        outputNumber: '14.1.1.4',
        title: 'Adverse Events',
        analysisSet: 'Safety',
        uniqueRepeat: 'Unique',
        uniqueParent: 'Unique parent ON'
      },
      {
        tlfType: 'Figure',
        outputNumber: '14.2.1.1',
        title: 'Efficacy Over Time',
        analysisSet: 'Efficacy',
        uniqueRepeat: 'Repeat',
        uniqueParent: 'Unique parent OFF'
      },
      {
        tlfType: 'Listing',
        outputNumber: '16.1.1.1',
        title: 'Subject Listings',
        analysisSet: 'Safety',
        uniqueRepeat: 'Unique',
        uniqueParent: 'Unique parent ON'
      }
    ];
  }

  addAssociatedTLFs(elementId: string, tlfs: any[]): void {
    const currentElements = this.textElementsSubject.value;
    const updatedElements = currentElements.map(element => {
      if (element.id === elementId) {
        // Filter out TLFs already associated
        const existingIds = new Set(element.associatedTLFs.map(tlf => tlf.id));
        const newTLFs = tlfs
          .filter(tlf => !existingIds.has(tlf.outputNumber))
          .map(tlf => ({
            id: tlf.outputNumber,
            label: tlf.outputNumber,
            type: 'highlighted' as const
          }));
        return {
          ...element,
          associatedTLFs: [...element.associatedTLFs, ...newTLFs]
        };
      }
      return element;
    });
    this.textElementsSubject.next(updatedElements);
  }

  removeAssociatedTLF(elementId: string, tlfId: string): void {
    const currentElements = this.textElementsSubject.value;
    const updatedElements = currentElements.map(element => {
      if (element.id === elementId) {
        return {
          ...element,
          associatedTLFs: element.associatedTLFs.filter(tlf => tlf.id !== tlfId)
        };
      }
      return element;
    });
    this.textElementsSubject.next(updatedElements);
  }

  private getMockTextElements(): TextElement[] {
    return [
      {
        id: 'te-1',
        order: 1,
        line: 1,
        justified: 'C',
        text: 'Demographic data: Descriptive statistics',
        associatedTLFs: [
          { id: 'T14010102', label: 'T14010102', type: 'highlighted' }
        ]
      },
      {
        id: 'te-2',
        order: 2,
        line: 1,
        justified: 'C',
        text: 'Population: Full analysis set',
        associatedTLFs: [
          { id: 'T14010103', label: 'T14010103', type: 'highlighted' }
        ]
      },
      {
        id: 'te-3',
        order: 1,
        line: 1,
        justified: 'L',
        text: 'Note: Age recorded at screening visit',
        associatedTLFs: [
          { id: 'T14010102', label: 'T14010102', type: 'highlighted' },
          { id: 'L16020101', label: 'L16020101', type: 'highlighted' }
        ]
      },
      {
        id: 'te-4',
        order: 2,
        line: 1,
        justified: 'L',
        text: 'Denominator for percentage calculations = total number of subjects in each treatment group in the full analysis set',
        associatedTLFs: [
          { id: 'T14010105', label: 'T14010105', type: 'highlighted' }
        ]
      },
      {
        id: 'te-5',
        order: 3,
        line: 1,
        justified: 'L',
        text: 'Analysis Set: Full Analysis Set (FAS) - all randomized subjects who received at least one dose of study medication',
        classification: 'analysis-set',
        associatedTLFs: []
      }
    ];
  }
}
