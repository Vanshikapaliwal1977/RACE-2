export interface TextElement {
  id: string;
  order: number;
  line: number;
  justified: string;
  text: string;
  classification?: string;
  associatedTLFs: AssociatedTLF[];
}

export interface AssociatedTLF {
  id: string;
  label: string;
  type?: 'default' | 'highlighted';
}

export interface AvailableTLF {
  tlfType: string;
  outputNumber: string;
  title: string;
  analysisSet: string;
  uniqueRepeat: string;
  uniqueParent: string;
  selectedForText?: boolean;
}

export interface FilterOptions {
  tlfType: string;
  analysisSet: string;
  uniqueRepeat: string;
  searchText: string;
}
