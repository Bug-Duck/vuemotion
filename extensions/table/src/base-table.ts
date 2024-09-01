import type { Widget } from '../../../packages/core/src/widget.ts';

export interface TableColumn {
  header: string;
  field: string;
}

export interface TableData {
  id: number;
  [key: string]: any;  
}

export interface TableOptions extends Widget {
  columns: TableColumn[];
  data: TableData[];
  sortedBy?: string;
  sortOrder?: 'asc' | 'desc';
  wid?: string;  
}

export function createDefaultTableOptions(): TableOptions {
  return {
    columns: [],
    data: [],
    sortedBy: undefined,
    sortOrder: 'asc',
  };
}
