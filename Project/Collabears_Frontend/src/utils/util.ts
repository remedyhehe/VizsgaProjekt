export interface Project {
  id: number;
  name: string;
  description: string;
  category?: string; // Ha van ilyen mező az API-ban
  member_number?: number;
  start_date?: string;
  end_date?: string;
}


export interface IColumn {
  name: string;
  project_id: number;
  taskIds: number[];
}

export interface ITask {
  name: string;
  description: string;
  column_id: number;
}