export interface Project {
  id: number;
  name: string;
  description: string;
  category?: string; // Ha van ilyen mező az API-ban
  member_number?: number;
  start_date?: string;
  end_date?: string;
  created_at: Date;
  image_url?: string;
}

export interface IUser{
  name: string;
  email: string;
}


export interface IColumn {
  id: number;
  name: string;
  project_id: number;
  taskIds: number[];
}

export interface ITask {
  name: string;
  description: string;
  column_id: number;
}